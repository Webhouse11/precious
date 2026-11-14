import {
  collection,
  doc,
  getDoc,
  serverTimestamp,
  writeBatch,
  setDoc
} from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';
import {
  Campaign,
  ReferralAttributionCookie,
  ReferralCodeDoc
} from '../types/referral';
import {
  DEFAULT_CHRISTMAS_CAMPAIGN,
  generateAttributionRef,
  generateOrderRef,
  generateUniqueDocId,
  getLagosDateString,
  isAfterCampaignEnd,
  normalizeEmail,
  normalizePhoneNumber,
  sha256Hex
} from '../utils/referralUtils';

const COOKIE_NAME = 'pgfv_ref_attr';
const STORAGE_BACKUP_KEY = 'pgfv_ref_attr_v1';
const SESSION_VISIT_KEY = 'pgfv_ref_visited_session_v1';
const SESSION_ID_KEY = 'pgfv_anon_session_v1';

function getOrCreateAnonSessionId(): string {
  try {
    const existing = sessionStorage.getItem(SESSION_ID_KEY);
    if (existing) return existing;
    const created = generateUniqueDocId('sess');
    sessionStorage.setItem(SESSION_ID_KEY, created);
    return created;
  } catch {
    return generateUniqueDocId('sess');
  }
}

function setCookie(name: string, value: string, days: number): void {
  if (typeof document === 'undefined') return;
  const maxAge = Math.max(60, Math.floor(days * 86400));
  const secure = typeof window !== 'undefined' && window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax${secure}`;
}

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const prefix = `${name}=`;
  const parts = document.cookie.split(';');
  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed.startsWith(prefix)) {
      return decodeURIComponent(trimmed.slice(prefix.length));
    }
  }
  return null;
}

function clearCookie(name: string): void {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax`;
}

export function getStoredAttribution(): ReferralAttributionCookie | null {
  try {
    const rawCookie = getCookie(COOKIE_NAME);
    const raw = rawCookie || localStorage.getItem(STORAGE_BACKUP_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ReferralAttributionCookie;
    if (!parsed?.referralCode || !parsed?.ambassadorId || !parsed?.expiresAtIso) {
      return null;
    }
    if (new Date(parsed.expiresAtIso).getTime() <= Date.now()) {
      clearStoredAttribution();
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function clearStoredAttribution(): void {
  clearCookie(COOKIE_NAME);
  try {
    localStorage.removeItem(STORAGE_BACKUP_KEY);
  } catch {
    // ignore
  }
}

function persistAttribution(attr: ReferralAttributionCookie, days: number): void {
  const serialized = JSON.stringify(attr);
  setCookie(COOKIE_NAME, serialized, days);
  try {
    localStorage.setItem(STORAGE_BACKUP_KEY, serialized);
  } catch {
    // ignore
  }
}

async function fetchCampaignSafe(campaignId: string): Promise<Campaign> {
  try {
    const snap = await getDoc(doc(db, 'campaigns', campaignId));
    if (snap.exists()) {
      return snap.data() as Campaign;
    }
  } catch {
    // fallback to default if offline or unseeded
  }
  return DEFAULT_CHRISTMAS_CAMPAIGN;
}

/**
 * Verifies URL ?ref=CODE on initial load or navigation, applies first-valid-referral
 * attribution for the campaign's 30-day window (subject to campaign end date),
 * and records an anonymous referral_visit in Firestore once per session.
 */
export async function processIncomingReferralFromUrl(): Promise<ReferralAttributionCookie | null> {
  if (typeof window === 'undefined') return null;

  const existingValid = getStoredAttribution();
  const params = new URLSearchParams(window.location.search);
  const rawRef = params.get('ref')?.trim().toUpperCase();

  // First-valid-referral rule: do not overwrite an existing non-expired valid attribution
  if (existingValid) {
    // Ensure it is still active and campaign has not ended
    try {
      const codeSnap = await getDoc(doc(db, 'referral_codes', existingValid.referralCode));
      if (codeSnap.exists() && (codeSnap.data() as ReferralCodeDoc).active) {
        const campaign = await fetchCampaignSafe(existingValid.campaignId);
        const lagosToday = getLagosDateString();
        if (campaign.status === 'active' && !isAfterCampaignEnd(lagosToday, campaign)) {
          return existingValid;
        }
      }
      clearStoredAttribution();
    } catch {
      return existingValid;
    }
  }

  if (!rawRef || !/^[A-Z0-9\-]{4,32}$/.test(rawRef)) {
    return null;
  }

  try {
    const codeRef = doc(db, 'referral_codes', rawRef);
    const codeSnap = await getDoc(codeRef);
    if (!codeSnap.exists()) {
      return null;
    }
    const codeDoc = codeSnap.data() as ReferralCodeDoc;
    if (!codeDoc.active) {
      return null;
    }

    // Prevent logged-in ambassador from attributing a visit to themselves
    if (auth.currentUser && auth.currentUser.uid === codeDoc.ambassadorId) {
      return null;
    }

    const campaign = await fetchCampaignSafe(codeDoc.campaignId);
    const lagosToday = getLagosDateString();
    if (campaign.status !== 'active' || isAfterCampaignEnd(lagosToday, campaign)) {
      return null;
    }

    const windowDays = campaign.attributionWindowDays || 30;
    const now = new Date();
    const maxExpiry = new Date(now.getTime() + windowDays * 86400 * 1000);
    const campaignEndBoundary = new Date(`${campaign.endDate}T23:59:59+01:00`);
    const effectiveExpiry =
      !isNaN(campaignEndBoundary.getTime()) && campaignEndBoundary > now && campaignEndBoundary < maxExpiry
        ? campaignEndBoundary
        : maxExpiry;

    const sessionId = getOrCreateAnonSessionId();
    const landingPage = (window.location.pathname + window.location.search).slice(0, 240) || '/';
    const trafficSource = (document.referrer || params.get('utm_source') || 'direct').slice(0, 160);

    const attribution: ReferralAttributionCookie = {
      referralCode: codeDoc.code,
      ambassadorId: codeDoc.ambassadorId,
      campaignId: codeDoc.campaignId,
      attributionRef: generateAttributionRef(),
      sessionId,
      firstVisitIso: now.toISOString(),
      expiresAtIso: effectiveExpiry.toISOString(),
      landingPage,
      trafficSource,
    };

    persistAttribution(attribution, windowDays);

    // Record visit once per browser session for this code
    const sessionVisitedKey = `${SESSION_VISIT_KEY}:${codeDoc.code}`;
    let alreadyLogged = false;
    try {
      alreadyLogged = sessionStorage.getItem(sessionVisitedKey) === '1';
    } catch {
      alreadyLogged = false;
    }

    if (!alreadyLogged) {
      const visitId = generateUniqueDocId('visit');
      try {
        await setDoc(doc(db, 'referral_visits', visitId), {
          id: visitId,
          referralCode: codeDoc.code,
          ambassadorId: codeDoc.ambassadorId,
          campaignId: codeDoc.campaignId,
          landingPage,
          trafficSource,
          sessionId,
          visitedAt: serverTimestamp(),
        });
        try {
          sessionStorage.setItem(sessionVisitedKey, '1');
        } catch {
          // ignore
        }
      } catch (err) {
        // Non-fatal if visit logging fails, but log context
        console.warn('Referral visit log skipped:', err);
      }
    }

    return attribution;
  } catch (err) {
    console.warn('Referral verification skipped:', err);
    return null;
  }
}

export interface SubmitWebsiteOrderInput {
  channel: 'website' | 'whatsapp';
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryLocation: string;
  itemsSummary: string;
  orderTotalNgn: number;
  hasUnpricedItems: boolean;
}

export interface SubmittedOrderResult {
  orderRef: string;
  referralCode: string;
  attributionRef: string;
  recordedInDatabase: boolean;
}

/**
 * Records a website or WhatsApp order in Firestore with PENDING_VERIFICATION payment status
 * and attaches valid referral attribution if present.
 */
export async function submitAttributedOrder(
  input: SubmitWebsiteOrderInput
): Promise<SubmittedOrderResult> {
  const orderRef = generateOrderRef();
  const attr = getStoredAttribution();

  // Prevent ambassador self-referral while signed in
  const isSelfSignedIn =
    Boolean(attr && auth.currentUser && auth.currentUser.uid === attr.ambassadorId);

  const referralCode = attr && !isSelfSignedIn ? attr.referralCode : '';
  const ambassadorId = attr && !isSelfSignedIn ? attr.ambassadorId : '';
  const attributionRef = attr && !isSelfSignedIn ? attr.attributionRef : '';
  const campaignId = attr?.campaignId || DEFAULT_CHRISTMAS_CAMPAIGN.id;

  const normalizedPhone = normalizePhoneNumber(input.customerPhone);
  const normalizedEmail = normalizeEmail(input.customerEmail || '');
  const orderDate = getLagosDateString();

  // Only persist full order when we have customer name & phone >= 7 digits
  const hasCustomerDetails =
    input.customerName.trim().length >= 2 && normalizedPhone.length >= 7;

  if (!hasCustomerDetails) {
    return {
      orderRef,
      referralCode,
      attributionRef,
      recordedInDatabase: false,
    };
  }

  const batch = writeBatch(db);
  const orderDocRef = doc(db, 'orders', orderRef);

  const orderPayload: Record<string, unknown> = {
    orderRef,
    channel: input.channel,
    campaignId,
    customerName: input.customerName.trim().slice(0, 140),
    customerPhone: input.customerPhone.trim().slice(0, 30),
    normalizedPhone: normalizedPhone.slice(0, 25),
    deliveryLocation: (input.deliveryLocation || 'Ile-Ife').trim().slice(0, 240),
    itemsSummary: input.itemsSummary.trim().slice(0, 1500),
    orderTotalNgn: Math.max(0, Number(input.orderTotalNgn) || 0),
    hasUnpricedItems: Boolean(input.hasUnpricedItems),
    orderDate,
    orderStatus: 'PENDING',
    paymentStatus: 'PENDING_VERIFICATION',
    referralCode,
    ambassadorId,
    attributionRef,
    isNewCustomerFlag: 'PENDING_CHECK',
    qualificationState: 'PENDING',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  if (input.customerEmail && input.customerEmail.trim()) {
    orderPayload.customerEmail = input.customerEmail.trim().slice(0, 180);
    orderPayload.normalizedEmail = normalizedEmail.slice(0, 180);
  }

  batch.set(orderDocRef, orderPayload);

  if (referralCode && ambassadorId) {
    const customerKeyHash = await sha256Hex(normalizedPhone);
    const refRecordRef = doc(db, 'referral_records', orderRef);
    const summaryLabel =
      input.channel === 'whatsapp'
        ? `WhatsApp Order (${orderRef})`
        : `Website Order (${orderRef})`;

    batch.set(refRecordRef, {
      recordId: orderRef,
      orderRef,
      ambassadorId,
      referralCode,
      campaignId,
      channel: input.channel,
      orderSummaryLabel: summaryLabel,
      orderTotalNgn: Math.max(0, Number(input.orderTotalNgn) || 0),
      orderStatus: 'PENDING',
      paymentStatus: 'PENDING_VERIFICATION',
      qualificationStatus: 'AWAITING_PAYMENT',
      customerKeyHash,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }

  // Admin notification (no PII in notification text)
  const notifId = generateUniqueDocId('notif');
  batch.set(doc(db, 'notifications', notifId), {
    notificationId: notifId,
    recipientRole: 'admin',
    recipientUid: 'ADMIN',
    type: 'NEW_ORDER_SUBMITTED',
    title: `New ${input.channel === 'whatsapp' ? 'WhatsApp' : 'Website'} Order (${orderRef})`,
    message: referralCode
      ? `Order ${orderRef} submitted with referral code ${referralCode}. Payment is awaiting verification.`
      : `Direct order ${orderRef} submitted (${input.channel}). Awaiting payment verification.`,
    read: false,
    linkPath: '/admin/orders',
    createdAt: serverTimestamp(),
  });

  try {
    await batch.commit();
    return {
      orderRef,
      referralCode,
      attributionRef,
      recordedInDatabase: true,
    };
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `orders/${orderRef}`);
  }
}

/**
 * Enhances any WhatsApp ordering message with the active referral attribution
 * and unique order reference (if attribution or orderRef is present).
 */
export function appendReferralToWhatsAppMessage(
  baseMessage: string,
  orderRef?: string
): { message: string; orderRef: string; referralCode: string; attributionRef: string } {
  const attr = getStoredAttribution();
  const isSelfSignedIn =
    Boolean(attr && auth.currentUser && auth.currentUser.uid === attr.ambassadorId);
  const resolvedOrderRef = orderRef || generateOrderRef();
  const referralCode = attr && !isSelfSignedIn ? attr.referralCode : '';
  const attributionRef = attr && !isSelfSignedIn ? attr.attributionRef : '';

  if (!referralCode) {
    return {
      message: `${baseMessage}\n\nOrder Reference: ${resolvedOrderRef}`,
      orderRef: resolvedOrderRef,
      referralCode: '',
      attributionRef: '',
    };
  }

  const refBlock = [
    '',
    `My referral code is: ${referralCode}.`,
    `Referral Attribution Ref: ${attributionRef}.`,
    `My order reference is: ${resolvedOrderRef}.`,
  ].join('\n');

  return {
    message: `${baseMessage}${refBlock}`,
    orderRef: resolvedOrderRef,
    referralCode,
    attributionRef,
  };
}
