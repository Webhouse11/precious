import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  writeBatch,
  limit
} from 'firebase/firestore';
import { User } from 'firebase/auth';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import {
  Ambassador,
  AmbassadorStatus,
  AuditLogRecord,
  Campaign,
  CustomerRecord,
  NewCustomerFlag,
  NotificationRecord,
  OrderChannel,
  OrderRecord,
  OrderStatus,
  PaymentStatus,
  QualificationRewardStatus,
  ReferralRecord,
  ReferralVisit,
  RewardRecord
} from '../types/referral';
import {
  buildReferralLink,
  DEFAULT_CHRISTMAS_CAMPAIGN,
  generateApplicationRef,
  generateCandidateReferralCode,
  generateOrderRef,
  generateUniqueDocId,
  getLagosDateString,
  isDateWithinCampaignWindow,
  normalizeEmail,
  normalizePhoneNumber,
  sha256Hex
} from '../utils/referralUtils';

// =========================================================================
// CAMPAIGNS
// =========================================================================

export async function getActiveCampaign(campaignId: string = 'christmas-2026'): Promise<Campaign> {
  try {
    const snap = await getDoc(doc(db, 'campaigns', campaignId));
    if (snap.exists()) {
      return snap.data() as Campaign;
    }
    return DEFAULT_CHRISTMAS_CAMPAIGN;
  } catch {
    return DEFAULT_CHRISTMAS_CAMPAIGN;
  }
}

export async function listCampaigns(): Promise<Campaign[]> {
  try {
    const snap = await getDocs(collection(db, 'campaigns'));
    if (snap.empty) {
      return [DEFAULT_CHRISTMAS_CAMPAIGN];
    }
    return snap.docs.map((d) => d.data() as Campaign);
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'campaigns');
  }
}

export async function ensureDefaultCampaignExists(adminUser: User): Promise<Campaign> {
  const ref = doc(db, 'campaigns', DEFAULT_CHRISTMAS_CAMPAIGN.id);
  try {
    const snap = await getDoc(ref);
    if (snap.exists()) {
      return snap.data() as Campaign;
    }
    const payload = {
      ...DEFAULT_CHRISTMAS_CAMPAIGN,
      createdBy: adminUser.email || adminUser.uid,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    await setDoc(ref, payload);
    return DEFAULT_CHRISTMAS_CAMPAIGN;
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `campaigns/${DEFAULT_CHRISTMAS_CAMPAIGN.id}`);
  }
}

export async function saveCampaign(
  campaign: Omit<Campaign, 'createdAt' | 'updatedAt'>,
  adminUser: User,
  isNew: boolean
): Promise<void> {
  const ref = doc(db, 'campaigns', campaign.id);
  const batch = writeBatch(db);
  try {
    if (isNew) {
      batch.set(ref, {
        ...campaign,
        createdBy: adminUser.email || adminUser.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } else {
      const existingSnap = await getDoc(ref);
      const existingData = existingSnap.exists() ? existingSnap.data() : null;
      batch.set(ref, {
        ...campaign,
        createdBy: existingData?.createdBy || adminUser.email || adminUser.uid,
        createdAt: existingData?.createdAt || serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }

    const logId = generateUniqueDocId('log');
    batch.set(doc(db, 'audit_logs', logId), {
      logId,
      actorUid: adminUser.uid,
      actorEmail: adminUser.email || 'admin',
      action: isNew ? 'CREATE_CAMPAIGN' : 'UPDATE_CAMPAIGN',
      targetCollection: 'campaigns',
      targetId: campaign.id,
      summary: `${isNew ? 'Created' : 'Updated'} campaign "${campaign.name}" (Target: ${campaign.referralTarget}, Window: ${campaign.startDate} to ${campaign.endDate}, Status: ${campaign.status}).`,
      createdAt: serverTimestamp(),
    });

    await batch.commit();
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `campaigns/${campaign.id}`);
  }
}

// =========================================================================
// AMBASSADOR REGISTRATION & PROFILE
// =========================================================================

export async function getAmbassadorByUid(uid: string): Promise<Ambassador | null> {
  try {
    const snap = await getDoc(doc(db, 'ambassadors', uid));
    return snap.exists() ? (snap.data() as Ambassador) : null;
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, `ambassadors/${uid}`);
  }
}

export interface AmbassadorRegistrationInput {
  fullName: string;
  phone: string;
  email: string;
  state: string;
  city: string;
  socialPlatform: string;
  agreedToTerms: boolean;
  campaignId?: string;
}

export async function registerAmbassador(
  user: User,
  input: AmbassadorRegistrationInput
): Promise<Ambassador> {
  if (!user.emailVerified) {
    throw new Error('Your Google account email must be verified to register as an ambassador.');
  }

  const campaignId = input.campaignId || DEFAULT_CHRISTMAS_CAMPAIGN.id;
  const normalizedPhone = normalizePhoneNumber(input.phone);
  const normalizedEmail = normalizeEmail(input.email || user.email || '');

  if (normalizedPhone.length < 10) {
    throw new Error('Please enter a valid Nigerian phone/WhatsApp number.');
  }
  if (!normalizedEmail.includes('@')) {
    throw new Error('Please enter a valid email address.');
  }
  if (!input.agreedToTerms) {
    throw new Error('You must agree to the Campaign Terms & Conditions and Privacy Notice.');
  }

  const phoneKey = await sha256Hex(normalizedPhone);
  const emailKey = await sha256Hex(normalizedEmail);

  const ambassadorRef = doc(db, 'ambassadors', user.uid);
  const phoneIndexRef = doc(db, 'ambassador_phone_index', phoneKey);
  const emailIndexRef = doc(db, 'ambassador_email_index', emailKey);

  // Pre-check duplicates cleanly for helpful UI errors
  try {
    const [existingAmb, existingPhone, existingEmail] = await Promise.all([
      getDoc(ambassadorRef),
      getDoc(phoneIndexRef),
      getDoc(emailIndexRef),
    ]);

    if (existingAmb.exists()) {
      throw new Error('An ambassador application already exists for this account. Please sign in to check your status.');
    }
    if (existingPhone.exists()) {
      throw new Error('This phone number is already registered with a PGFV Ambassador application.');
    }
    if (existingEmail.exists()) {
      throw new Error('This email address is already registered with a PGFV Ambassador application.');
    }
  } catch (err) {
    if (err instanceof Error && err.message.includes('already')) {
      throw err;
    }
    // Continue into atomic transaction which also enforces !exists in rules
  }

  const applicationRef = generateApplicationRef();
  const notifId = generateUniqueDocId('notif');

  const newAmbassador: Omit<Ambassador, 'createdAt' | 'updatedAt'> = {
    uid: user.uid,
    applicationRef,
    campaignId,
    fullName: input.fullName.trim().slice(0, 120),
    phone: input.phone.trim().slice(0, 30),
    normalizedPhone: normalizedPhone.slice(0, 25),
    email: (input.email || user.email || '').trim().slice(0, 180),
    normalizedEmail: normalizedEmail.slice(0, 180),
    state: input.state.trim().slice(0, 60),
    city: input.city.trim().slice(0, 80),
    socialPlatform: input.socialPlatform.trim().slice(0, 60),
    agreedToTerms: true,
    status: 'PENDING_APPROVAL',
    referralCode: '',
    referralLink: '',
    qualificationStatus: 'NOT_YET_QUALIFIED',
    rewardStatus: 'NOT_YET_QUALIFIED',
    visitCount: 0,
    attributedCustomersCount: 0,
    ordersReceivedCount: 0,
    ordersAwaitingVerificationCount: 0,
    confirmedReferralsCount: 0,
    rejectedReferralsCount: 0,
  };

  const batch = writeBatch(db);
  batch.set(ambassadorRef, {
    ...newAmbassador,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  batch.set(phoneIndexRef, {
    ambassadorUid: user.uid,
    campaignId,
    createdAt: serverTimestamp(),
  });
  batch.set(emailIndexRef, {
    ambassadorUid: user.uid,
    campaignId,
    createdAt: serverTimestamp(),
  });
  batch.set(doc(db, 'notifications', notifId), {
    notificationId: notifId,
    recipientRole: 'admin',
    recipientUid: 'ADMIN',
    type: 'NEW_AMBASSADOR_APPLICATION',
    title: `New Ambassador Application (${applicationRef})`,
    message: `${newAmbassador.fullName} from ${newAmbassador.city}, ${newAmbassador.state} applied via ${newAmbassador.socialPlatform}. Status: PENDING APPROVAL.`,
    read: false,
    linkPath: '/admin/ambassadors',
    createdAt: serverTimestamp(),
  });

  try {
    await batch.commit();
    return newAmbassador as Ambassador;
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `ambassadors/${user.uid}`);
  }
}

// =========================================================================
// AMBASSADOR DASHBOARD QUERIES (STRICTLY SCOPED TO OWN UID)
// =========================================================================

export async function getAmbassadorVisits(uid: string): Promise<ReferralVisit[]> {
  try {
    const q = query(
      collection(db, 'referral_visits'),
      where('ambassadorId', '==', uid),
      orderBy('visitedAt', 'desc'),
      limit(200)
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => d.data() as ReferralVisit);
  } catch {
    // Fallback without orderBy if composite index isn't built yet
    try {
      const q2 = query(
        collection(db, 'referral_visits'),
        where('ambassadorId', '==', uid)
      );
      const snap2 = await getDocs(q2);
      return snap2.docs.map((d) => d.data() as ReferralVisit);
    } catch (err) {
      handleFirestoreError(err, OperationType.LIST, 'referral_visits');
    }
  }
}

export async function getAmbassadorReferralRecords(uid: string): Promise<ReferralRecord[]> {
  try {
    const q = query(
      collection(db, 'referral_records'),
      where('ambassadorId', '==', uid)
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => d.data() as ReferralRecord);
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'referral_records');
  }
}

export async function getAmbassadorReward(
  uid: string,
  campaignId: string = 'christmas-2026'
): Promise<RewardRecord | null> {
  const rewardId = `${campaignId}_${uid}`;
  try {
    const snap = await getDoc(doc(db, 'rewards', rewardId));
    return snap.exists() ? (snap.data() as RewardRecord) : null;
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, `rewards/${rewardId}`);
  }
}

export async function getNotificationsForUid(recipientUid: string): Promise<NotificationRecord[]> {
  try {
    const q = query(
      collection(db, 'notifications'),
      where('recipientUid', '==', recipientUid)
    );
    const snap = await getDocs(q);
    return snap.docs
      .map((d) => d.data() as NotificationRecord)
      .sort((a, b) => {
        const ta = (a.createdAt as { seconds?: number })?.seconds || 0;
        const tb = (b.createdAt as { seconds?: number })?.seconds || 0;
        return tb - ta;
      });
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'notifications');
  }
}

export async function markNotificationRead(notificationId: string): Promise<void> {
  try {
    await updateDoc(doc(db, 'notifications', notificationId), { read: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, `notifications/${notificationId}`);
  }
}

// =========================================================================
// ADMIN OPERATIONS — AMBASSADOR APPROVAL & LIFECYCLE
// =========================================================================

export async function listAllAmbassadors(): Promise<Ambassador[]> {
  try {
    const snap = await getDocs(collection(db, 'ambassadors'));
    return snap.docs.map((d) => d.data() as Ambassador);
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'ambassadors');
  }
}

export async function approveAmbassador(ambassadorUid: string, adminUser: User): Promise<Ambassador> {
  const ambRef = doc(db, 'ambassadors', ambassadorUid);
  const ambSnap = await getDoc(ambRef);
  if (!ambSnap.exists()) {
    throw new Error('Ambassador record not found.');
  }
  const amb = ambSnap.data() as Ambassador;

  // Reuse existing code if re-approving, otherwise generate a cryptographically unique code
  let code = amb.referralCode;
  if (!code) {
    for (let attempt = 0; attempt < 10; attempt++) {
      const candidate = generateCandidateReferralCode();
      const codeCheck = await getDoc(doc(db, 'referral_codes', candidate));
      if (!codeCheck.exists()) {
        code = candidate;
        break;
      }
    }
    if (!code) {
      throw new Error('Unable to generate a unique referral code. Please retry.');
    }
  }

  const referralLink = buildReferralLink(code);
  const codeDocRef = doc(db, 'referral_codes', code);
  const existingCodeSnap = await getDoc(codeDocRef);

  const batch = writeBatch(db);
  batch.update(ambRef, {
    status: 'APPROVED' as AmbassadorStatus,
    referralCode: code,
    referralLink,
    approvedBy: adminUser.email || adminUser.uid,
    approvedAt: serverTimestamp(),
    rejectionReason: '',
    updatedAt: serverTimestamp(),
  });

  if (existingCodeSnap.exists()) {
    batch.update(codeDocRef, {
      active: true,
      updatedAt: serverTimestamp(),
    });
  } else {
    batch.set(codeDocRef, {
      code,
      ambassadorId: amb.uid,
      campaignId: amb.campaignId,
      active: true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }

  const notifId = generateUniqueDocId('notif');
  batch.set(doc(db, 'notifications', notifId), {
    notificationId: notifId,
    recipientRole: 'ambassador',
    recipientUid: amb.uid,
    type: 'AMBASSADOR_APPROVED',
    title: 'Your PGFV Ambassador Application is Approved!',
    message: `Congratulations ${amb.fullName}! Your referral code ${code} is now active. Share your link to refer 10 new customers and earn a ₦8,000 PGFV Christmas Food Box.`,
    read: false,
    linkPath: '/ambassador/dashboard',
    createdAt: serverTimestamp(),
  });

  const logId = generateUniqueDocId('log');
  batch.set(doc(db, 'audit_logs', logId), {
    logId,
    actorUid: adminUser.uid,
    actorEmail: adminUser.email || 'admin',
    action: 'APPROVE_AMBASSADOR',
    targetCollection: 'ambassadors',
    targetId: amb.uid,
    summary: `Approved ambassador ${amb.fullName} (${amb.applicationRef}) and issued unique referral code ${code}.`,
    createdAt: serverTimestamp(),
  });

  try {
    await batch.commit();
    return { ...amb, status: 'APPROVED', referralCode: code, referralLink };
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, `ambassadors/${ambassadorUid}`);
  }
}

export async function updateAmbassadorAccountStatus(
  ambassadorUid: string,
  newStatus: 'REJECTED' | 'SUSPENDED' | 'APPROVED',
  reason: string,
  adminUser: User
): Promise<void> {
  if (newStatus === 'APPROVED') {
    await approveAmbassador(ambassadorUid, adminUser);
    return;
  }

  const ambRef = doc(db, 'ambassadors', ambassadorUid);
  const ambSnap = await getDoc(ambRef);
  if (!ambSnap.exists()) throw new Error('Ambassador not found.');
  const amb = ambSnap.data() as Ambassador;

  const batch = writeBatch(db);
  batch.update(ambRef, {
    status: newStatus,
    rejectionReason: reason.trim().slice(0, 400),
    updatedAt: serverTimestamp(),
  });

  if (amb.referralCode) {
    const codeRef = doc(db, 'referral_codes', amb.referralCode);
    const codeSnap = await getDoc(codeRef);
    if (codeSnap.exists()) {
      batch.update(codeRef, {
        active: false,
        updatedAt: serverTimestamp(),
      });
    }
  }

  const notifId = generateUniqueDocId('notif');
  batch.set(doc(db, 'notifications', notifId), {
    notificationId: notifId,
    recipientRole: 'ambassador',
    recipientUid: amb.uid,
    type: `AMBASSADOR_${newStatus}`,
    title: newStatus === 'REJECTED' ? 'Ambassador Application Update' : 'Ambassador Account Suspended',
    message: reason.trim() || `Your ambassador account status has been updated to ${newStatus}. Please contact PGFV management for details.`,
    read: false,
    linkPath: '/ambassador/dashboard',
    createdAt: serverTimestamp(),
  });

  const logId = generateUniqueDocId('log');
  batch.set(doc(db, 'audit_logs', logId), {
    logId,
    actorUid: adminUser.uid,
    actorEmail: adminUser.email || 'admin',
    action: `${newStatus}_AMBASSADOR`,
    targetCollection: 'ambassadors',
    targetId: amb.uid,
    summary: `Updated ambassador ${amb.fullName} (${amb.applicationRef}) status to ${newStatus}. Reason: ${reason || 'N/A'}`,
    createdAt: serverTimestamp(),
  });

  try {
    await batch.commit();
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, `ambassadors/${ambassadorUid}`);
  }
}

// =========================================================================
// ADMIN OPERATIONS — ORDERS, WHATSAPP RECONCILIATION & PAYMENT VERIFICATION
// =========================================================================

export async function listAllOrders(): Promise<OrderRecord[]> {
  try {
    const snap = await getDocs(collection(db, 'orders'));
    return snap.docs.map((d) => d.data() as OrderRecord);
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'orders');
  }
}

export async function listAllReferralRecords(): Promise<ReferralRecord[]> {
  try {
    const snap = await getDocs(collection(db, 'referral_records'));
    return snap.docs.map((d) => d.data() as ReferralRecord);
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'referral_records');
  }
}

export async function listAllReferralVisits(): Promise<ReferralVisit[]> {
  try {
    const snap = await getDocs(collection(db, 'referral_visits'));
    return snap.docs.map((d) => d.data() as ReferralVisit);
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'referral_visits');
  }
}

export async function listAllCustomers(): Promise<CustomerRecord[]> {
  try {
    const snap = await getDocs(collection(db, 'customers'));
    return snap.docs.map((d) => d.data() as CustomerRecord);
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'customers');
  }
}

export interface ManualWhatsAppOrderInput {
  orderRef?: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryLocation: string;
  itemsSummary: string;
  orderTotalNgn: number;
  orderDate: string;
  referralCode?: string;
  channel?: OrderChannel;
}

export async function createOrReconcileOrder(
  input: ManualWhatsAppOrderInput,
  adminUser: User
): Promise<OrderRecord> {
  const orderRef = (input.orderRef?.trim() || generateOrderRef()).replace(/[^a-zA-Z0-9_\-]/g, '-');
  const normalizedPhone = normalizePhoneNumber(input.customerPhone);
  const normalizedEmail = normalizeEmail(input.customerEmail || '');
  if (normalizedPhone.length < 7) {
    throw new Error('Customer phone number is invalid.');
  }

  let ambassadorId = '';
  let campaignId = DEFAULT_CHRISTMAS_CAMPAIGN.id;
  const cleanCode = (input.referralCode || '').trim().toUpperCase();

  if (cleanCode) {
    const codeSnap = await getDoc(doc(db, 'referral_codes', cleanCode));
    if (!codeSnap.exists()) {
      throw new Error(`Referral code "${cleanCode}" does not exist.`);
    }
    const codeData = codeSnap.data();
    ambassadorId = codeData.ambassadorId;
    campaignId = codeData.campaignId || campaignId;
  }

  const orderDocRef = doc(db, 'orders', orderRef);
  const existingSnap = await getDoc(orderDocRef);

  const batch = writeBatch(db);
  const payload: Record<string, unknown> = {
    orderRef,
    channel: input.channel || 'whatsapp',
    campaignId,
    customerName: input.customerName.trim().slice(0, 140),
    customerPhone: input.customerPhone.trim().slice(0, 30),
    normalizedPhone: normalizedPhone.slice(0, 25),
    deliveryLocation: (input.deliveryLocation || 'Ile-Ife').trim().slice(0, 240),
    itemsSummary: input.itemsSummary.trim().slice(0, 1500),
    orderTotalNgn: Math.max(0, Number(input.orderTotalNgn) || 0),
    hasUnpricedItems: false,
    orderDate: (input.orderDate || getLagosDateString()).slice(0, 40),
    orderStatus: existingSnap.exists() ? (existingSnap.data().orderStatus as OrderStatus) : 'PENDING',
    paymentStatus: existingSnap.exists() ? (existingSnap.data().paymentStatus as PaymentStatus) : 'PENDING_VERIFICATION',
    referralCode: cleanCode,
    ambassadorId,
    attributionRef: existingSnap.exists() ? (existingSnap.data().attributionRef || 'MANUAL-ADMIN') : 'MANUAL-ADMIN',
    isNewCustomerFlag: existingSnap.exists() ? existingSnap.data().isNewCustomerFlag : 'PENDING_CHECK',
    qualificationState: existingSnap.exists() ? existingSnap.data().qualificationState : 'PENDING',
    createdAt: existingSnap.exists() ? existingSnap.data().createdAt : serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  if (input.customerEmail?.trim()) {
    payload.customerEmail = input.customerEmail.trim().slice(0, 180);
    payload.normalizedEmail = normalizedEmail.slice(0, 180);
  }

  batch.set(orderDocRef, payload);

  if (cleanCode && ambassadorId) {
    const customerKeyHash = await sha256Hex(normalizedPhone);
    const refRecRef = doc(db, 'referral_records', orderRef);
    const existingRec = await getDoc(refRecRef);
    batch.set(refRecRef, {
      recordId: orderRef,
      orderRef,
      ambassadorId,
      referralCode: cleanCode,
      campaignId,
      channel: input.channel || 'whatsapp',
      orderSummaryLabel: `WhatsApp Order (${orderRef})`,
      orderTotalNgn: Math.max(0, Number(input.orderTotalNgn) || 0),
      orderStatus: payload.orderStatus,
      paymentStatus: payload.paymentStatus,
      qualificationStatus: existingRec.exists() ? existingRec.data().qualificationStatus : 'AWAITING_PAYMENT',
      customerKeyHash,
      createdAt: existingRec.exists() ? existingRec.data().createdAt : serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }

  const logId = generateUniqueDocId('log');
  batch.set(doc(db, 'audit_logs', logId), {
    logId,
    actorUid: adminUser.uid,
    actorEmail: adminUser.email || 'admin',
    action: existingSnap.exists() ? 'RECONCILE_ORDER' : 'CREATE_WHATSAPP_ORDER',
    targetCollection: 'orders',
    targetId: orderRef,
    summary: `Recorded/reconciled ${input.channel || 'whatsapp'} order ${orderRef} for ${input.customerName} (₦${Number(input.orderTotalNgn).toLocaleString()})${cleanCode ? ` linked to referral ${cleanCode}` : ''}.`,
    createdAt: serverTimestamp(),
  });

  try {
    await batch.commit();
    if (ambassadorId) {
      await recomputeAmbassadorMetrics(ambassadorId, campaignId, adminUser);
    }
    return payload as unknown as OrderRecord;
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `orders/${orderRef}`);
  }
}

export interface VerifyPaymentInput {
  orderRef: string;
  bankTransactionRef: string;
  amountReceived: number;
  paymentDate: string;
  paymentNotes: string;
  evidenceNote?: string;
  markOrderCompleted: boolean;
  adminOverrideAsNewCustomer?: boolean;
}

/**
 * Core Qualification & Payment Verification Engine (Phases 8 & 9):
 * Validates:
 * 1. Approved & active ambassador
 * 2. Valid referral attribution
 * 3. Genuinely new customer (normalized phone & email check against existing customers & orders)
 * 4. Not self-referral (customer phone/email != ambassador phone/email)
 * 5. Order is completed & not cancelled/refunded
 * 6. Payment is manually verified by authorized admin
 * 7. Campaign date window (Africa/Lagos) satisfied
 * 8. Each customer counts only once across the campaign
 */
export async function verifyPaymentAndEvaluateQualification(
  input: VerifyPaymentInput,
  adminUser: User
): Promise<{ qualified: boolean; reason: string; newCustomerFlag: NewCustomerFlag }> {
  const orderRefDoc = doc(db, 'orders', input.orderRef);
  const orderSnap = await getDoc(orderRefDoc);
  if (!orderSnap.exists()) {
    throw new Error(`Order ${input.orderRef} not found.`);
  }
  const order = orderSnap.data() as OrderRecord;
  const campaign = await getActiveCampaign(order.campaignId || 'christmas-2026');
  const orderStatus: OrderStatus = input.markOrderCompleted ? 'COMPLETED' : order.orderStatus;

  let isNewCustomerFlag: NewCustomerFlag = 'VERIFIED_NEW';
  let qualified = false;
  let reason = 'Payment verified.';

  // Check if order has an attributed ambassador
  if (order.referralCode && order.ambassadorId) {
    const ambSnap = await getDoc(doc(db, 'ambassadors', order.ambassadorId));
    if (!ambSnap.exists()) {
      isNewCustomerFlag = 'NEEDS_REVIEW';
      qualified = false;
      reason = 'Attributed ambassador record not found.';
    } else {
      const amb = ambSnap.data() as Ambassador;

      // 1. Self-referral check (phone or email matches ambassador)
      const phoneMatchesAmb = order.normalizedPhone === amb.normalizedPhone;
      const emailMatchesAmb =
        Boolean(order.normalizedEmail) && order.normalizedEmail === amb.normalizedEmail;

      // 2. Existing customer check in customers/{normalizedPhone}
      const customerDocRef = doc(db, 'customers', order.normalizedPhone);
      const customerSnap = await getDoc(customerDocRef);

      // Also check any other verified/existing orders by same normalized email or phone
      const allOrdersSnap = await getDocs(collection(db, 'orders'));
      const priorOrdersForCustomer = allOrdersSnap.docs
        .map((d) => d.data() as OrderRecord)
        .filter(
          (o) =>
            o.orderRef !== order.orderRef &&
            (o.normalizedPhone === order.normalizedPhone ||
              (Boolean(order.normalizedEmail) &&
                Boolean(o.normalizedEmail) &&
                o.normalizedEmail === order.normalizedEmail))
        );

      const alreadyQualifiedInCampaign = priorOrdersForCustomer.some(
        (o) =>
          o.campaignId === campaign.id &&
          o.qualificationState === 'QUALIFIED'
      );

      const hasPriorHistoricalOrder =
        customerSnap.exists() &&
        customerSnap.data().firstOrderRef !== order.orderRef;

      const withinCampaignDates = isDateWithinCampaignWindow(order.orderDate, campaign);

      if (amb.status !== 'APPROVED') {
        isNewCustomerFlag = 'NEEDS_REVIEW';
        qualified = false;
        reason = `Ambassador account status is ${amb.status}, not APPROVED.`;
      } else if (phoneMatchesAmb || emailMatchesAmb) {
        isNewCustomerFlag = 'SELF_REFERRAL';
        qualified = false;
        reason = 'Self-referral rejected: customer contact details match the ambassador.';
      } else if (alreadyQualifiedInCampaign) {
        isNewCustomerFlag = 'EXISTING_CUSTOMER';
        qualified = false;
        reason = 'Duplicate customer rejected: this customer has already been counted as a qualifying referral in this campaign.';
      } else if ((hasPriorHistoricalOrder || priorOrdersForCustomer.some((o) => o.paymentStatus === 'VERIFIED_PAID')) && !input.adminOverrideAsNewCustomer) {
        isNewCustomerFlag = 'EXISTING_CUSTOMER';
        qualified = false;
        reason = 'Existing customer rejected: phone/email appears in prior completed PGFV customer records.';
      } else if (orderStatus !== 'COMPLETED') {
        isNewCustomerFlag = 'VERIFIED_NEW';
        qualified = false;
        reason = 'Payment verified, awaiting order completion status before counting referral.';
      } else if (!withinCampaignDates) {
        isNewCustomerFlag = 'NEEDS_REVIEW';
        qualified = false;
        reason = `Order date (${order.orderDate}) falls outside active campaign period (${campaign.startDate} to ${campaign.endDate} Africa/Lagos).`;
      } else if (campaign.status !== 'active') {
        isNewCustomerFlag = 'NEEDS_REVIEW';
        qualified = false;
        reason = `Campaign status is ${campaign.status}.`;
      } else {
        isNewCustomerFlag = 'VERIFIED_NEW';
        qualified = true;
        reason = 'Payment manually verified, order completed, and genuinely new customer confirmed.';
      }
    }
  }

  const qualificationState = !order.referralCode
    ? 'PENDING'
    : qualified
    ? 'QUALIFIED'
    : reason.includes('rejected')
    ? 'REJECTED'
    : 'PENDING';

  const paymentId = generateUniqueDocId('pay');
  const batch = writeBatch(db);

  // Update order
  batch.update(orderRefDoc, {
    orderStatus,
    paymentStatus: 'VERIFIED_PAID' as PaymentStatus,
    isNewCustomerFlag,
    qualificationState,
    rejectionReason: qualified ? '' : reason,
    paymentBankRef: input.bankTransactionRef.trim().slice(0, 120),
    paymentAmountReceived: Math.max(0, Number(input.amountReceived) || 0),
    paymentDate: input.paymentDate.slice(0, 40),
    paymentNotes: (input.paymentNotes || '').trim().slice(0, 600),
    paymentEvidenceNote: (input.evidenceNote || '').trim().slice(0, 600),
    verifiedByAdminUid: adminUser.uid,
    verifiedByAdminEmail: adminUser.email || 'admin',
    verifiedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  // Payment ledger record
  batch.set(doc(db, 'payments', paymentId), {
    paymentId,
    orderRef: order.orderRef,
    bankTransactionRef: input.bankTransactionRef.trim().slice(0, 120),
    amountReceived: Math.max(0, Number(input.amountReceived) || 0),
    paymentDate: input.paymentDate.slice(0, 40),
    verificationState: 'VERIFIED_PAID',
    notes: (input.paymentNotes || '').trim().slice(0, 600),
    evidenceNote: (input.evidenceNote || '').trim().slice(0, 600),
    verifiedByUid: adminUser.uid,
    verifiedByEmail: adminUser.email || 'admin',
    createdAt: serverTimestamp(),
  });

  // Upsert customer record (keyed by normalizedPhone)
  const customerKey = order.normalizedPhone;
  const custRef = doc(db, 'customers', customerKey);
  const custSnap = await getDoc(custRef);
  if (custSnap.exists()) {
    const existingCust = custSnap.data() as CustomerRecord;
    batch.update(custRef, {
      totalOrdersCount: (existingCust.totalOrdersCount || 1) + 1,
      qualifyingOrderRef: qualified ? order.orderRef : existingCust.qualifyingOrderRef || '',
      qualifyingCampaignId: qualified ? campaign.id : existingCust.qualifyingCampaignId || '',
      updatedAt: serverTimestamp(),
    });
  } else {
    const custPayload: Record<string, unknown> = {
      normalizedPhone: customerKey,
      customerName: order.customerName,
      firstOrderRef: order.orderRef,
      totalOrdersCount: 1,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    if (order.normalizedEmail) custPayload.normalizedEmail = order.normalizedEmail;
    if (qualified) {
      custPayload.qualifyingOrderRef = order.orderRef;
      custPayload.qualifyingCampaignId = campaign.id;
    }
    batch.set(custRef, custPayload);
  }

  // Sync anonymized referral_records
  if (order.referralCode && order.ambassadorId) {
    const refRecordRef = doc(db, 'referral_records', order.orderRef);
    const refRecordSnap = await getDoc(refRecordRef);
    const refQualStatus = qualified
      ? 'QUALIFIED'
      : qualificationState === 'REJECTED'
      ? 'REJECTED'
      : 'AWAITING_PAYMENT';

    if (refRecordSnap.exists()) {
      batch.update(refRecordRef, {
        orderStatus,
        paymentStatus: 'VERIFIED_PAID',
        qualificationStatus: refQualStatus,
        rejectionReason: qualified ? '' : reason,
        updatedAt: serverTimestamp(),
      });
    } else {
      const customerKeyHash = await sha256Hex(order.normalizedPhone);
      batch.set(refRecordRef, {
        recordId: order.orderRef,
        orderRef: order.orderRef,
        ambassadorId: order.ambassadorId,
        referralCode: order.referralCode,
        campaignId: campaign.id,
        channel: order.channel,
        orderSummaryLabel: `${order.channel === 'whatsapp' ? 'WhatsApp' : 'Website'} Order (${order.orderRef})`,
        orderTotalNgn: order.orderTotalNgn,
        orderStatus,
        paymentStatus: 'VERIFIED_PAID',
        qualificationStatus: refQualStatus,
        rejectionReason: qualified ? '' : reason,
        customerKeyHash,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
  }

  // Audit log
  const logId = generateUniqueDocId('log');
  batch.set(doc(db, 'audit_logs', logId), {
    logId,
    actorUid: adminUser.uid,
    actorEmail: adminUser.email || 'admin',
    action: 'VERIFY_PAYMENT',
    targetCollection: 'orders',
    targetId: order.orderRef,
    summary: `Verified payment ₦${Number(input.amountReceived).toLocaleString()} (Ref: ${input.bankTransactionRef}) for order ${order.orderRef}. Qualification: ${qualificationState} — ${reason}`,
    createdAt: serverTimestamp(),
  });

  try {
    await batch.commit();
    if (order.ambassadorId) {
      await recomputeAmbassadorMetrics(order.ambassadorId, campaign.id, adminUser);
    }
    return { qualified, reason, newCustomerFlag: isNewCustomerFlag };
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `orders/${order.orderRef}`);
  }
}

export async function rejectOrCancelOrder(
  orderRef: string,
  actionType: 'PAYMENT_REJECTED' | 'CANCELLED' | 'REFUNDED',
  reason: string,
  adminUser: User
): Promise<void> {
  const orderDocRef = doc(db, 'orders', orderRef);
  const orderSnap = await getDoc(orderDocRef);
  if (!orderSnap.exists()) throw new Error('Order not found.');
  const order = orderSnap.data() as OrderRecord;

  const newOrderStatus: OrderStatus =
    actionType === 'CANCELLED'
      ? 'CANCELLED'
      : actionType === 'REFUNDED'
      ? 'REFUNDED'
      : order.orderStatus;

  const newPaymentStatus: PaymentStatus =
    actionType === 'PAYMENT_REJECTED'
      ? 'PAYMENT_REJECTED'
      : actionType === 'REFUNDED'
      ? 'REFUNDED'
      : order.paymentStatus;

  const batch = writeBatch(db);
  batch.update(orderDocRef, {
    orderStatus: newOrderStatus,
    paymentStatus: newPaymentStatus,
    qualificationState: 'REJECTED',
    rejectionReason: reason.trim().slice(0, 400),
    verifiedByAdminUid: adminUser.uid,
    verifiedByAdminEmail: adminUser.email || 'admin',
    verifiedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  if (order.referralCode && order.ambassadorId) {
    const refRecRef = doc(db, 'referral_records', order.orderRef);
    const refRecSnap = await getDoc(refRecRef);
    if (refRecSnap.exists()) {
      batch.update(refRecRef, {
        orderStatus: newOrderStatus,
        paymentStatus: newPaymentStatus,
        qualificationStatus: 'REJECTED',
        rejectionReason: reason.trim().slice(0, 400),
        updatedAt: serverTimestamp(),
      });
    }
  }

  const logId = generateUniqueDocId('log');
  batch.set(doc(db, 'audit_logs', logId), {
    logId,
    actorUid: adminUser.uid,
    actorEmail: adminUser.email || 'admin',
    action: actionType,
    targetCollection: 'orders',
    targetId: order.orderRef,
    summary: `Marked order ${order.orderRef} as ${actionType}. Reason: ${reason}`,
    createdAt: serverTimestamp(),
  });

  try {
    await batch.commit();
    if (order.ambassadorId) {
      await recomputeAmbassadorMetrics(order.ambassadorId, order.campaignId, adminUser);
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, `orders/${orderRef}`);
  }
}

export async function overrideReferralQualification(
  orderRef: string,
  newQualificationStatus: 'QUALIFIED' | 'REJECTED',
  reason: string,
  adminUser: User
): Promise<void> {
  const orderDocRef = doc(db, 'orders', orderRef);
  const orderSnap = await getDoc(orderDocRef);
  if (!orderSnap.exists()) throw new Error('Order not found.');
  const order = orderSnap.data() as OrderRecord;

  if (!order.ambassadorId || !order.referralCode) {
    throw new Error('This order is not linked to an ambassador.');
  }

  if (newQualificationStatus === 'QUALIFIED') {
    if (order.paymentStatus !== 'VERIFIED_PAID' || order.orderStatus !== 'COMPLETED') {
      throw new Error('Cannot qualify a referral unless order is COMPLETED and payment is VERIFIED_PAID.');
    }
  }

  const batch = writeBatch(db);
  batch.update(orderDocRef, {
    qualificationState: newQualificationStatus,
    rejectionReason: newQualificationStatus === 'REJECTED' ? reason.trim().slice(0, 400) : '',
    updatedAt: serverTimestamp(),
  });

  const refRecRef = doc(db, 'referral_records', order.orderRef);
  const refRecSnap = await getDoc(refRecRef);
  if (refRecSnap.exists()) {
    batch.update(refRecRef, {
      qualificationStatus: newQualificationStatus,
      rejectionReason: newQualificationStatus === 'REJECTED' ? reason.trim().slice(0, 400) : '',
      updatedAt: serverTimestamp(),
    });
  }

  const logId = generateUniqueDocId('log');
  batch.set(doc(db, 'audit_logs', logId), {
    logId,
    actorUid: adminUser.uid,
    actorEmail: adminUser.email || 'admin',
    action: 'ADMIN_CORRECT_REFERRAL',
    targetCollection: 'referral_records',
    targetId: order.orderRef,
    summary: `Admin corrected referral ${order.orderRef} to ${newQualificationStatus}. Notes: ${reason}`,
    createdAt: serverTimestamp(),
  });

  try {
    await batch.commit();
    await recomputeAmbassadorMetrics(order.ambassadorId, order.campaignId, adminUser);
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, `referral_records/${orderRef}`);
  }
}

// =========================================================================
// RECOMPUTE STATS & AUTOMATIC QUALIFICATION ENGINE AT 10 REFERRALS
// =========================================================================

export async function recomputeAmbassadorMetrics(
  ambassadorId: string,
  campaignId: string,
  adminUser: User
): Promise<void> {
  const ambRef = doc(db, 'ambassadors', ambassadorId);
  const ambSnap = await getDoc(ambRef);
  if (!ambSnap.exists()) return;
  const amb = ambSnap.data() as Ambassador;
  const campaign = await getActiveCampaign(campaignId || amb.campaignId);
  const target = campaign.referralTarget || 10;

  const [visitsSnap, recordsSnap, rewardSnap] = await Promise.all([
    getDocs(query(collection(db, 'referral_visits'), where('ambassadorId', '==', ambassadorId))),
    getDocs(query(collection(db, 'referral_records'), where('ambassadorId', '==', ambassadorId))),
    getDoc(doc(db, 'rewards', `${campaign.id}_${ambassadorId}`)),
  ]);

  const records = recordsSnap.docs.map((d) => d.data() as ReferralRecord);
  const visitCount = visitsSnap.size;
  const uniqueCustomers = new Set(
    records.map((r) => r.customerKeyHash || r.orderRef)
  ).size;
  const ordersReceivedCount = records.length;
  const ordersAwaitingVerificationCount = records.filter(
    (r) => r.qualificationStatus === 'AWAITING_PAYMENT'
  ).length;
  const confirmedReferralsCount = records.filter(
    (r) => r.qualificationStatus === 'QUALIFIED'
  ).length;
  const rejectedReferralsCount = records.filter(
    (r) => r.qualificationStatus === 'REJECTED'
  ).length;

  let qualificationStatus: QualificationRewardStatus = 'NOT_YET_QUALIFIED';
  let rewardStatus: QualificationRewardStatus = 'NOT_YET_QUALIFIED';

  if (rewardSnap.exists()) {
    const rw = rewardSnap.data() as RewardRecord;
    qualificationStatus = rw.status;
    rewardStatus = rw.status;
  } else if (confirmedReferralsCount >= target) {
    qualificationStatus = 'REWARD_AWAITING_APPROVAL';
    rewardStatus = 'REWARD_AWAITING_APPROVAL';
  } else if (confirmedReferralsCount > 0 || ordersReceivedCount > 0) {
    qualificationStatus = 'IN_PROGRESS';
    rewardStatus = 'IN_PROGRESS';
  }

  const batch = writeBatch(db);
  batch.update(ambRef, {
    visitCount,
    attributedCustomersCount: uniqueCustomers,
    ordersReceivedCount,
    ordersAwaitingVerificationCount,
    confirmedReferralsCount,
    rejectedReferralsCount,
    qualificationStatus,
    rewardStatus,
    updatedAt: serverTimestamp(),
  });

  // Create reward record strictly once when confirmedReferralsCount >= target and no reward exists yet
  if (confirmedReferralsCount >= target && !rewardSnap.exists()) {
    const rewardId = `${campaign.id}_${ambassadorId}`;
    batch.set(doc(db, 'rewards', rewardId), {
      rewardId,
      campaignId: campaign.id,
      ambassadorId,
      ambassadorName: amb.fullName,
      referralCode: amb.referralCode || 'PENDING',
      qualifyingReferralsCount: confirmedReferralsCount,
      rewardDescription: campaign.rewardDescription,
      rewardValueNgn: campaign.rewardValueNgn,
      status: 'REWARD_AWAITING_APPROVAL',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    // Notify Ambassador
    const ambNotifId = generateUniqueDocId('notif');
    batch.set(doc(db, 'notifications', ambNotifId), {
      notificationId: ambNotifId,
      recipientRole: 'ambassador',
      recipientUid: ambassadorId,
      type: 'QUALIFICATION_ACHIEVED',
      title: 'CONGRATULATIONS! You Qualified for Your ₦8,000 Christmas Food Box!',
      message: `You have successfully referred ${confirmedReferralsCount} qualifying new customers. Your reward is awaiting confirmation from PGFV management.`,
      read: false,
      linkPath: '/ambassador/dashboard',
      createdAt: serverTimestamp(),
    });

    // Notify Admin
    const adminNotifId = generateUniqueDocId('notif');
    batch.set(doc(db, 'notifications', adminNotifId), {
      notificationId: adminNotifId,
      recipientRole: 'admin',
      recipientUid: 'ADMIN',
      type: 'AMBASSADOR_QUALIFIED',
      title: `Ambassador Qualified (${amb.fullName} — ${confirmedReferralsCount}/${target})`,
      message: `${amb.fullName} (${amb.referralCode}) reached ${confirmedReferralsCount} verified referrals! Reward awaiting approval.`,
      read: false,
      linkPath: '/admin/rewards',
      createdAt: serverTimestamp(),
    });

    const logId = generateUniqueDocId('log');
    batch.set(doc(db, 'audit_logs', logId), {
      logId,
      actorUid: adminUser.uid,
      actorEmail: adminUser.email || 'admin',
      action: 'CREATE_REWARD_QUALIFICATION',
      targetCollection: 'rewards',
      targetId: rewardId,
      summary: `Ambassador ${amb.fullName} reached ${confirmedReferralsCount}/${target} verified referrals. Reward record created (${campaign.rewardDescription}).`,
      createdAt: serverTimestamp(),
    });
  }

  await batch.commit();
}

// =========================================================================
// REWARD FULFILMENT & AUDIT LOGS
// =========================================================================

export async function listAllRewards(): Promise<RewardRecord[]> {
  try {
    const snap = await getDocs(collection(db, 'rewards'));
    return snap.docs.map((d) => d.data() as RewardRecord);
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'rewards');
  }
}

export async function approveAmbassadorReward(
  rewardId: string,
  notes: string,
  adminUser: User
): Promise<void> {
  const rewardRef = doc(db, 'rewards', rewardId);
  const rewardSnap = await getDoc(rewardRef);
  if (!rewardSnap.exists()) throw new Error('Reward record not found.');
  const rw = rewardSnap.data() as RewardRecord;

  const batch = writeBatch(db);
  batch.update(rewardRef, {
    status: 'REWARD_APPROVED',
    approvedBy: adminUser.email || adminUser.uid,
    approvedAt: getLagosDateString(),
    fulfilmentNotes: notes.trim().slice(0, 600),
    updatedAt: serverTimestamp(),
  });

  batch.update(doc(db, 'ambassadors', rw.ambassadorId), {
    qualificationStatus: 'REWARD_APPROVED',
    rewardStatus: 'REWARD_APPROVED',
    updatedAt: serverTimestamp(),
  });

  const notifId = generateUniqueDocId('notif');
  batch.set(doc(db, 'notifications', notifId), {
    notificationId: notifId,
    recipientRole: 'ambassador',
    recipientUid: rw.ambassadorId,
    type: 'REWARD_APPROVED',
    title: 'Your ₦8,000 Christmas Food Box Reward is Approved!',
    message: `PGFV management has approved your ${rw.rewardDescription}. ${notes || 'We will coordinate collection/delivery with you shortly.'}`,
    read: false,
    linkPath: '/ambassador/dashboard',
    createdAt: serverTimestamp(),
  });

  const logId = generateUniqueDocId('log');
  batch.set(doc(db, 'audit_logs', logId), {
    logId,
    actorUid: adminUser.uid,
    actorEmail: adminUser.email || 'admin',
    action: 'APPROVE_REWARD',
    targetCollection: 'rewards',
    targetId: rewardId,
    summary: `Approved reward for ${rw.ambassadorName} (${rw.referralCode}). Notes: ${notes || 'N/A'}`,
    createdAt: serverTimestamp(),
  });

  try {
    await batch.commit();
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, `rewards/${rewardId}`);
  }
}

export async function markRewardCollected(
  rewardId: string,
  collectionDate: string,
  fulfilmentNotes: string,
  adminUser: User
): Promise<void> {
  const rewardRef = doc(db, 'rewards', rewardId);
  const rewardSnap = await getDoc(rewardRef);
  if (!rewardSnap.exists()) throw new Error('Reward record not found.');
  const rw = rewardSnap.data() as RewardRecord;

  const batch = writeBatch(db);
  batch.update(rewardRef, {
    status: 'REWARD_COLLECTED',
    collectedAt: (collectionDate || getLagosDateString()).slice(0, 40),
    fulfilmentNotes: fulfilmentNotes.trim().slice(0, 600),
    updatedAt: serverTimestamp(),
  });

  batch.update(doc(db, 'ambassadors', rw.ambassadorId), {
    qualificationStatus: 'REWARD_COLLECTED',
    rewardStatus: 'REWARD_COLLECTED',
    updatedAt: serverTimestamp(),
  });

  const notifId = generateUniqueDocId('notif');
  batch.set(doc(db, 'notifications', notifId), {
    notificationId: notifId,
    recipientRole: 'ambassador',
    recipientUid: rw.ambassadorId,
    type: 'REWARD_COLLECTED',
    title: 'Christmas Food Box Reward Collected',
    message: `Your ${rw.rewardDescription} has been recorded as collected on ${collectionDate || getLagosDateString()}. Thank you for representing PGFV!`,
    read: false,
    linkPath: '/ambassador/dashboard',
    createdAt: serverTimestamp(),
  });

  const logId = generateUniqueDocId('log');
  batch.set(doc(db, 'audit_logs', logId), {
    logId,
    actorUid: adminUser.uid,
    actorEmail: adminUser.email || 'admin',
    action: 'REWARD_COLLECTED',
    targetCollection: 'rewards',
    targetId: rewardId,
    summary: `Marked reward collected for ${rw.ambassadorName} on ${collectionDate || getLagosDateString()}. Notes: ${fulfilmentNotes || 'N/A'}`,
    createdAt: serverTimestamp(),
  });

  try {
    await batch.commit();
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, `rewards/${rewardId}`);
  }
}

export async function listAuditLogs(): Promise<AuditLogRecord[]> {
  try {
    const snap = await getDocs(collection(db, 'audit_logs'));
    return snap.docs
      .map((d) => d.data() as AuditLogRecord)
      .sort((a, b) => {
        const ta = (a.createdAt as { seconds?: number })?.seconds || 0;
        const tb = (b.createdAt as { seconds?: number })?.seconds || 0;
        return tb - ta;
      });
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'audit_logs');
  }
}
