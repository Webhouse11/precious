export type CampaignStatus = 'active' | 'draft' | 'paused' | 'ended';

export type AmbassadorStatus = 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED' | 'SUSPENDED';

export type QualificationRewardStatus =
  | 'NOT_YET_QUALIFIED'
  | 'IN_PROGRESS'
  | 'TARGET_ACHIEVED'
  | 'REWARD_AWAITING_APPROVAL'
  | 'REWARD_APPROVED'
  | 'REWARD_COLLECTED';

export type OrderChannel = 'website' | 'whatsapp';

export type OrderStatus = 'PENDING' | 'COMPLETED' | 'CANCELLED' | 'REFUNDED';

export type PaymentStatus =
  | 'PENDING_VERIFICATION'
  | 'VERIFIED_PAID'
  | 'PAYMENT_REJECTED'
  | 'REFUNDED';

export type NewCustomerFlag =
  | 'PENDING_CHECK'
  | 'VERIFIED_NEW'
  | 'EXISTING_CUSTOMER'
  | 'SELF_REFERRAL'
  | 'NEEDS_REVIEW';

export type QualificationState = 'PENDING' | 'QUALIFIED' | 'REJECTED';

export type ReferralRecordStatus = 'AWAITING_PAYMENT' | 'QUALIFIED' | 'REJECTED';

export type RewardStatus =
  | 'REWARD_AWAITING_APPROVAL'
  | 'REWARD_APPROVED'
  | 'REWARD_COLLECTED';

export interface Campaign {
  id: string;
  name: string;
  slug: string;
  description: string;
  startDate: string; // YYYY-MM-DD in Africa/Lagos
  endDate: string;   // YYYY-MM-DD in Africa/Lagos
  timezone: string;  // 'Africa/Lagos'
  referralTarget: number;
  rewardDescription: string;
  rewardValueNgn: number;
  attributionWindowDays: number;
  qualificationRules: string;
  status: CampaignStatus;
  registrationOpen: boolean;
  createdBy: string;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface Ambassador {
  uid: string;
  applicationRef: string;
  campaignId: string;
  fullName: string;
  phone: string;
  normalizedPhone: string;
  email: string;
  normalizedEmail: string;
  state: string;
  city: string;
  socialPlatform: string;
  agreedToTerms: boolean;
  status: AmbassadorStatus;
  referralCode: string;
  referralLink: string;
  qualificationStatus: QualificationRewardStatus;
  rewardStatus: QualificationRewardStatus;
  visitCount: number;
  attributedCustomersCount: number;
  ordersReceivedCount: number;
  ordersAwaitingVerificationCount: number;
  confirmedReferralsCount: number;
  rejectedReferralsCount: number;
  approvedBy?: string;
  approvedAt?: unknown;
  rejectionReason?: string;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface ReferralCodeDoc {
  code: string;
  ambassadorId: string;
  campaignId: string;
  active: boolean;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface ReferralVisit {
  id: string;
  referralCode: string;
  ambassadorId: string;
  campaignId: string;
  landingPage: string;
  trafficSource: string;
  sessionId: string;
  visitedAt?: unknown;
}

export interface ReferralAttributionCookie {
  referralCode: string;
  ambassadorId: string;
  campaignId: string;
  attributionRef: string;
  sessionId: string;
  firstVisitIso: string;
  expiresAtIso: string;
  landingPage: string;
  trafficSource: string;
}

export interface OrderRecord {
  orderRef: string;
  channel: OrderChannel;
  campaignId: string;
  customerName: string;
  customerPhone: string;
  normalizedPhone: string;
  customerEmail?: string;
  normalizedEmail?: string;
  deliveryLocation: string;
  itemsSummary: string;
  orderTotalNgn: number;
  hasUnpricedItems: boolean;
  orderDate: string; // YYYY-MM-DD (Africa/Lagos)
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  referralCode: string;
  ambassadorId: string;
  attributionRef: string;
  isNewCustomerFlag: NewCustomerFlag;
  qualificationState: QualificationState;
  rejectionReason?: string;
  paymentBankRef?: string;
  paymentAmountReceived?: number;
  paymentDate?: string;
  paymentNotes?: string;
  paymentEvidenceNote?: string;
  verifiedByAdminUid?: string;
  verifiedByAdminEmail?: string;
  verifiedAt?: unknown;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface ReferralRecord {
  recordId: string;
  orderRef: string;
  ambassadorId: string;
  referralCode: string;
  campaignId: string;
  channel: OrderChannel;
  orderSummaryLabel: string;
  orderTotalNgn: number;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  qualificationStatus: ReferralRecordStatus;
  rejectionReason?: string;
  customerKeyHash?: string;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface CustomerRecord {
  normalizedPhone: string;
  customerName: string;
  normalizedEmail?: string;
  firstOrderRef: string;
  qualifyingOrderRef?: string;
  qualifyingCampaignId?: string;
  totalOrdersCount: number;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface PaymentRecord {
  paymentId: string;
  orderRef: string;
  bankTransactionRef: string;
  amountReceived: number;
  paymentDate: string;
  verificationState: PaymentStatus;
  notes?: string;
  evidenceNote?: string;
  verifiedByUid: string;
  verifiedByEmail: string;
  createdAt?: unknown;
}

export interface RewardRecord {
  rewardId: string;
  campaignId: string;
  ambassadorId: string;
  ambassadorName: string;
  referralCode: string;
  qualifyingReferralsCount: number;
  rewardDescription: string;
  rewardValueNgn: number;
  status: RewardStatus;
  approvedBy?: string;
  approvedAt?: string;
  collectedAt?: string;
  fulfilmentNotes?: string;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface NotificationRecord {
  notificationId: string;
  recipientRole: 'admin' | 'ambassador';
  recipientUid: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  linkPath?: string;
  createdAt?: unknown;
}

export interface AuditLogRecord {
  logId: string;
  actorUid: string;
  actorEmail: string;
  action: string;
  targetCollection: string;
  targetId: string;
  summary: string;
  createdAt?: unknown;
}
