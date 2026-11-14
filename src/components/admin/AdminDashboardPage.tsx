import React, { useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  Gift,
  Megaphone,
  GitBranch,
  LogOut,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Ban,
  Download,
  Plus,
  Search,
  Bell,
  ShieldCheck,
  AlertCircle,
  FileText,
  X
} from 'lucide-react';
import { auth, checkIsAdminUser, signOutUser } from '../../lib/firebase';
import {
  approveAmbassador,
  approveAmbassadorReward,
  createOrReconcileOrder,
  ensureDefaultCampaignExists,
  getNotificationsForUid,
  listAllAmbassadors,
  listAllCustomers,
  listAllOrders,
  listAllReferralRecords,
  listAllReferralVisits,
  listAllRewards,
  listAuditLogs,
  listCampaigns,
  markNotificationRead,
  markRewardCollected,
  overrideReferralQualification,
  rejectOrCancelOrder,
  saveCampaign,
  updateAmbassadorAccountStatus,
  verifyPaymentAndEvaluateQualification
} from '../../services/referralService';
import {
  Ambassador,
  AuditLogRecord,
  Campaign,
  CampaignStatus,
  CustomerRecord,
  NotificationRecord,
  OrderRecord,
  ReferralRecord,
  ReferralVisit,
  RewardRecord
} from '../../types/referral';
import {
  DEFAULT_CHRISTMAS_CAMPAIGN,
  downloadCsv,
  formatFirestoreTimestamp,
  getLagosDateString
} from '../../utils/referralUtils';
import { PageView } from '../../types';

interface AdminDashboardPageProps {
  currentPage: PageView;
  onNavigate: (page: PageView, sectionId?: string) => void;
}

type AdminTab = 'overview' | 'ambassadors' | 'orders' | 'referrals' | 'rewards' | 'campaigns';

function pageToTab(page: PageView): AdminTab {
  switch (page) {
    case 'admin-ambassadors':
      return 'ambassadors';
    case 'admin-orders':
      return 'orders';
    case 'admin-referrals':
      return 'referrals';
    case 'admin-rewards':
      return 'rewards';
    case 'admin-campaigns':
      return 'campaigns';
    default:
      return 'overview';
  }
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  currentPage,
  onNavigate
}) => {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [busyAction, setBusyAction] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Core Data State
  const [ambassadors, setAmbassadors] = useState<Ambassador[]>([]);
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [referralRecords, setReferralRecords] = useState<ReferralRecord[]>([]);
  const [visits, setVisits] = useState<ReferralVisit[]>([]);
  const [customers, setCustomers] = useState<CustomerRecord[]>([]);
  const [rewards, setRewards] = useState<RewardRecord[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([DEFAULT_CHRISTMAS_CAMPAIGN]);
  const [notifications, setNotifications] = useState<NotificationRecord[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogRecord[]>([]);

  // Filters
  const [ambFilter, setAmbFilter] = useState<string>('ALL');
  const [ambSearch, setAmbSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');
  const [orderFilter, setOrderFilter] = useState<string>('ALL');
  const [refSearch, setRefSearch] = useState('');

  // Modals
  const [whatsAppOrderModalOpen, setWhatsAppOrderModalOpen] = useState(false);
  const [waForm, setWaForm] = useState({
    orderRef: '',
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    deliveryLocation: 'Ile-Ife',
    itemsSummary: '',
    orderTotalNgn: '',
    orderDate: getLagosDateString(),
    referralCode: ''
  });

  const [verifyOrderTarget, setVerifyOrderTarget] = useState<OrderRecord | null>(null);
  const [verifyForm, setVerifyForm] = useState({
    bankTransactionRef: '',
    amountReceived: '',
    paymentDate: getLagosDateString(),
    paymentNotes: '',
    evidenceNote: '',
    markOrderCompleted: true,
    adminOverrideAsNewCustomer: false
  });

  const [ambActionModal, setAmbActionModal] = useState<{
    amb: Ambassador;
    action: 'REJECTED' | 'SUSPENDED';
  } | null>(null);
  const [ambReason, setAmbReason] = useState('');

  const [rejectOrderModal, setRejectOrderModal] = useState<{
    order: OrderRecord;
    type: 'PAYMENT_REJECTED' | 'CANCELLED' | 'REFUNDED';
  } | null>(null);
  const [rejectOrderReason, setRejectOrderReason] = useState('');

  const [overrideRefModal, setOverrideRefModal] = useState<{
    record: ReferralRecord;
    targetStatus: 'QUALIFIED' | 'REJECTED';
  } | null>(null);
  const [overrideReason, setOverrideReason] = useState('');

  const [rewardActionModal, setRewardActionModal] = useState<{
    reward: RewardRecord;
    mode: 'APPROVE' | 'COLLECT';
  } | null>(null);
  const [rewardNotes, setRewardNotes] = useState('');
  const [rewardCollectDate, setRewardCollectDate] = useState(getLagosDateString());

  const [campaignModal, setCampaignModal] = useState<{
    isNew: boolean;
    data: Omit<Campaign, 'createdAt' | 'updatedAt'>;
  } | null>(null);

  const activeTab = pageToTab(currentPage);

  const loadAllAdminData = async (adminUser: User) => {
    setLoading(true);
    try {
      await ensureDefaultCampaignExists(adminUser);
      const [
        ambList,
        orderList,
        recList,
        visitList,
        custList,
        rwList,
        campList,
        notifList,
        logList
      ] = await Promise.all([
        listAllAmbassadors(),
        listAllOrders(),
        listAllReferralRecords(),
        listAllReferralVisits(),
        listAllCustomers(),
        listAllRewards(),
        listCampaigns(),
        getNotificationsForUid('ADMIN'),
        listAuditLogs()
      ]);
      setAmbassadors(ambList);
      setOrders(orderList);
      setReferralRecords(recList);
      setVisits(visitList);
      setCustomers(custList);
      setRewards(rwList);
      setCampaigns(campList);
      setNotifications(notifList);
      setAuditLogs(logList);
    } catch (err) {
      setFeedback({
        type: 'error',
        text: err instanceof Error ? err.message : 'Failed to load admin records.'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (!u) {
        setAuthorized(false);
        setLoading(false);
        onNavigate('admin-login');
        return;
      }
      const isAdm = await checkIsAdminUser(u);
      if (!isAdm) {
        setAuthorized(false);
        setLoading(false);
        onNavigate('admin-login');
        return;
      }
      setAuthorized(true);
      loadAllAdminData(u);
    });
    return () => unsub();
  }, [onNavigate]);

  const metrics = useMemo(() => {
    const totalAmbassadors = ambassadors.length;
    const approvedAmbassadors = ambassadors.filter((a) => a.status === 'APPROVED').length;
    const pendingAmbassadors = ambassadors.filter((a) => a.status === 'PENDING_APPROVAL').length;
    const suspendedOrRejected = ambassadors.filter(
      (a) => a.status === 'SUSPENDED' || a.status === 'REJECTED'
    ).length;
    const totalVisits = visits.length;
    const attributedOrders = orders.filter((o) => Boolean(o.referralCode)).length;
    const awaitingPayment = orders.filter((o) => o.paymentStatus === 'PENDING_VERIFICATION').length;
    const verifiedPaid = orders.filter((o) => o.paymentStatus === 'VERIFIED_PAID').length;
    const confirmedReferrals = referralRecords.filter((r) => r.qualificationStatus === 'QUALIFIED').length;
    const rejectedReferrals = referralRecords.filter((r) => r.qualificationStatus === 'REJECTED').length;
    const ambassadorsQualified = ambassadors.filter((a) => (a.confirmedReferralsCount || 0) >= 10).length;
    const rewardsFulfilled = rewards.filter(
      (r) => r.status === 'REWARD_APPROVED' || r.status === 'REWARD_COLLECTED'
    ).length;

    return {
      totalAmbassadors,
      approvedAmbassadors,
      pendingAmbassadors,
      suspendedOrRejected,
      totalVisits,
      attributedOrders,
      awaitingPayment,
      verifiedPaid,
      confirmedReferrals,
      rejectedReferrals,
      ambassadorsQualified,
      rewardsFulfilled
    };
  }, [ambassadors, visits, orders, referralRecords, rewards]);

  const filteredAmbassadors = useMemo(() => {
    return ambassadors.filter((a) => {
      const matchStatus = ambFilter === 'ALL' || a.status === ambFilter;
      const q = ambSearch.trim().toLowerCase();
      const matchQuery =
        !q ||
        a.fullName.toLowerCase().includes(q) ||
        a.email.toLowerCase().includes(q) ||
        a.phone.includes(q) ||
        (a.referralCode || '').toLowerCase().includes(q) ||
        a.applicationRef.toLowerCase().includes(q);
      return matchStatus && matchQuery;
    });
  }, [ambassadors, ambFilter, ambSearch]);

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchFilter =
        orderFilter === 'ALL' ||
        (orderFilter === 'ATTRIBUTED' && Boolean(o.referralCode)) ||
        o.paymentStatus === orderFilter;
      const q = orderSearch.trim().toLowerCase();
      const matchQuery =
        !q ||
        o.orderRef.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.customerPhone.includes(q) ||
        (o.referralCode || '').toLowerCase().includes(q);
      return matchFilter && matchQuery;
    });
  }, [orders, orderFilter, orderSearch]);

  const filteredReferrals = useMemo(() => {
    return referralRecords.filter((r) => {
      const q = refSearch.trim().toLowerCase();
      return (
        !q ||
        r.orderRef.toLowerCase().includes(q) ||
        r.referralCode.toLowerCase().includes(q) ||
        r.qualificationStatus.toLowerCase().includes(q)
      );
    });
  }, [referralRecords, refSearch]);

  if (loading && !authorized) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-6">
        <div className="w-8 h-8 border-4 border-[#1B4332]/20 border-t-[#1B4332] rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || !authorized) return null;

  const notify = (type: 'success' | 'error', text: string) => {
    setFeedback({ type, text });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // CSV Exports
  const exportAmbassadorsCsv = () => {
    downloadCsv(
      `pgfv-ambassadors-${getLagosDateString()}.csv`,
      ['App Ref', 'Full Name', 'Phone', 'Email', 'State', 'City', 'Platform', 'Status', 'Referral Code', 'Visits', 'Orders', 'Confirmed Qualifying', 'Rejected', 'Reward Status'],
      ambassadors.map((a) => [
        a.applicationRef, a.fullName, a.phone, a.email, a.state, a.city,
        a.socialPlatform, a.status, a.referralCode, a.visitCount,
        a.ordersReceivedCount, a.confirmedReferralsCount, a.rejectedReferralsCount, a.rewardStatus
      ])
    );
  };

  const exportReferralsCsv = () => {
    downloadCsv(
      `pgfv-referrals-${getLagosDateString()}.csv`,
      ['Order Ref', 'Referral Code', 'Channel', 'Total (NGN)', 'Order Status', 'Payment Status', 'Qualification Status', 'Notes'],
      referralRecords.map((r) => [
        r.orderRef, r.referralCode, r.channel, r.orderTotalNgn,
        r.orderStatus, r.paymentStatus, r.qualificationStatus, r.rejectionReason || ''
      ])
    );
  };

  const exportQualifyingCustomersCsv = () => {
    const qualifiedOrders = orders.filter((o) => o.qualificationState === 'QUALIFIED');
    downloadCsv(
      `pgfv-qualifying-customers-${getLagosDateString()}.csv`,
      ['Order Ref', 'Customer Name', 'Customer Phone', 'Customer Email', 'Channel', 'Order Date', 'Total (NGN)', 'Referral Code', 'Bank Ref', 'Verified By'],
      qualifiedOrders.map((o) => [
        o.orderRef, o.customerName, o.customerPhone, o.customerEmail || '',
        o.channel, o.orderDate, o.orderTotalNgn, o.referralCode,
        o.paymentBankRef || '', o.verifiedByAdminEmail || ''
      ])
    );
  };

  const exportPaymentsCsv = () => {
    const verified = orders.filter((o) => o.paymentStatus === 'VERIFIED_PAID');
    downloadCsv(
      `pgfv-payment-verifications-${getLagosDateString()}.csv`,
      ['Order Ref', 'Customer Name', 'Order Total', 'Amount Received', 'Bank Ref', 'Payment Date', 'Verified By', 'Qualification State'],
      verified.map((o) => [
        o.orderRef, o.customerName, o.orderTotalNgn, o.paymentAmountReceived || o.orderTotalNgn,
        o.paymentBankRef || '', o.paymentDate || '', o.verifiedByAdminEmail || '', o.qualificationState
      ])
    );
  };

  const exportRewardsCsv = () => {
    downloadCsv(
      `pgfv-rewards-${getLagosDateString()}.csv`,
      ['Reward ID', 'Campaign', 'Ambassador', 'Referral Code', 'Qualified Referrals', 'Reward', 'Value (NGN)', 'Status', 'Approved By', 'Approved Date', 'Collected Date'],
      rewards.map((r) => [
        r.rewardId, r.campaignId, r.ambassadorName, r.referralCode,
        r.qualifyingReferralsCount, r.rewardDescription, r.rewardValueNgn,
        r.status, r.approvedBy || '', r.approvedAt || '', r.collectedAt || ''
      ])
    );
  };

  const exportCampaignSummaryCsv = () => {
    downloadCsv(
      `pgfv-campaign-summary-${getLagosDateString()}.csv`,
      ['Total Ambassadors', 'Approved', 'Pending', 'Visits', 'Attributed Orders', 'Awaiting Payment', 'Verified Paid', 'Confirmed Referrals', 'Rejected Referrals', 'Qualified 10/10 Ambassadors', 'Rewards Approved/Collected'],
      [[
        metrics.totalAmbassadors, metrics.approvedAmbassadors, metrics.pendingAmbassadors,
        metrics.totalVisits, metrics.attributedOrders, metrics.awaitingPayment,
        metrics.verifiedPaid, metrics.confirmedReferrals, metrics.rejectedReferrals,
        metrics.ambassadorsQualified, metrics.rewardsFulfilled
      ]]
    );
  };

  const navTabs: { id: AdminTab; page: PageView; label: string; icon: React.ElementType; badge?: number }[] = [
    { id: 'overview', page: 'admin-dashboard', label: 'Overview & Reports', icon: LayoutDashboard },
    { id: 'ambassadors', page: 'admin-ambassadors', label: 'Ambassadors', icon: Users, badge: metrics.pendingAmbassadors },
    { id: 'orders', page: 'admin-orders', label: 'Orders & Payments', icon: ShoppingBag, badge: metrics.awaitingPayment },
    { id: 'referrals', page: 'admin-referrals', label: 'Referrals', icon: GitBranch },
    { id: 'rewards', page: 'admin-rewards', label: 'Rewards', icon: Gift, badge: rewards.filter((r) => r.status === 'REWARD_AWAITING_APPROVAL').length },
    { id: 'campaigns', page: 'admin-campaigns', label: 'Campaigns', icon: Megaphone },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1E2320] pb-16">
      {/* Top Admin Header */}
      <div className="bg-[#122A20] text-white border-b border-[#234838]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#E2B13C] block">
              PGFV Referral Management Console
            </span>
            <h1 className="font-heading font-extrabold text-2xl text-white">
              Administrator Dashboard
            </h1>
            <p className="text-xs text-[#C8DBD1]">Signed in as {user.email}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => loadAllAdminData(user)}
              className="min-h-[44px] px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#E2B13C] ${loading ? 'animate-spin' : ''}`} />
              <span>Sync Data</span>
            </button>
            <button
              type="button"
              onClick={() => signOutUser()}
              className="min-h-[44px] px-4 py-2 rounded-xl bg-black/30 hover:bg-black/50 text-[#E4EDE7] text-xs font-bold flex items-center gap-1.5 border border-white/15 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5 text-[#E2B13C]" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Sub-navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1.5 overflow-x-auto pb-3 no-scrollbar">
          {navTabs.map((t) => {
            const Icon = t.icon;
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => onNavigate(t.page)}
                className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-colors cursor-pointer ${
                  active
                    ? 'bg-[#E2B13C] text-[#143527]'
                    : 'bg-white/10 text-[#E4EDE7] hover:bg-white/15'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{t.label}</span>
                {typeof t.badge === 'number' && t.badge > 0 && (
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-extrabold tabular-nums ${
                      active ? 'bg-[#143527] text-white' : 'bg-[#E2B13C] text-[#143527]'
                    }`}
                  >
                    {t.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {feedback && (
          <div
            className={`p-4 rounded-2xl border flex items-start justify-between gap-3 text-xs sm:text-sm ${
              feedback.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-red-50 border-red-200 text-red-900'
            }`}
          >
            <div className="flex items-start gap-2.5">
              {feedback.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              )}
              <span>{feedback.text}</span>
            </div>
            <button type="button" onClick={() => setFeedback(null)} className="cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ==================== TAB 1: OVERVIEW & REPORTS ==================== */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* 12 Campaign Overview KPIs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
              {[
                ['Registered Ambassadors', metrics.totalAmbassadors],
                ['Approved Ambassadors', metrics.approvedAmbassadors],
                ['Pending Applications', metrics.pendingAmbassadors],
                ['Rejected / Suspended', metrics.suspendedOrRejected],
                ['Referral Link Visits', metrics.totalVisits],
                ['Attributed Orders', metrics.attributedOrders],
                ['Awaiting Payment Verif.', metrics.awaitingPayment],
                ['Verified Paid Orders', metrics.verifiedPaid],
                ['Confirmed Qualifying Refs', metrics.confirmedReferrals],
                ['Rejected / Dup. Referrals', metrics.rejectedReferrals],
                ['Qualified (10/10 Target)', metrics.ambassadorsQualified],
                ['Rewards Approved/Collected', metrics.rewardsFulfilled],
              ].map(([label, val]) => (
                <div
                  key={String(label)}
                  className="bg-white rounded-2xl p-4 border border-[#E5DDD0] shadow-2xs"
                >
                  <p className="font-heading font-extrabold text-2xl text-[#1B4332] tabular-nums">
                    {val}
                  </p>
                  <p className="text-xs font-semibold text-[#52635B] mt-1">{label}</p>
                </div>
              ))}
            </div>

            {/* Export CSV Reports */}
            <div className="bg-white rounded-3xl p-6 border border-[#E5DDD0] space-y-4">
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4 text-[#C68A1B]" />
                <h2 className="font-heading font-bold text-lg text-[#143527]">
                  Export CSV Reports (Excel Compatible)
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  ['Ambassadors List CSV', exportAmbassadorsCsv],
                  ['Referral Records CSV', exportReferralsCsv],
                  ['Qualifying Customers CSV', exportQualifyingCustomersCsv],
                  ['Payment Verification Ledger CSV', exportPaymentsCsv],
                  ['Rewards Fulfilment CSV', exportRewardsCsv],
                  ['Campaign Performance Summary CSV', exportCampaignSummaryCsv],
                ].map(([label, fn]) => (
                  <button
                    key={String(label)}
                    type="button"
                    onClick={fn as () => void}
                    className="min-h-[44px] px-4 py-2.5 rounded-xl bg-[#FAF7F2] hover:bg-[#EFE9DF] border border-[#D5CCBE] text-[#143527] text-xs font-bold flex items-center justify-between cursor-pointer"
                  >
                    <span>{label}</span>
                    <Download className="w-3.5 h-3.5 text-[#1B4332]" />
                  </button>
                ))}
              </div>
            </div>

            {/* Admin Notifications + Audit Logs */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl p-6 border border-[#E5DDD0] space-y-4">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-[#C68A1B]" />
                  <h2 className="font-heading font-bold text-lg text-[#143527]">
                    Admin Notifications ({notifications.filter((n) => !n.read).length} unread)
                  </h2>
                </div>
                {notifications.length === 0 ? (
                  <p className="text-xs text-[#6B7B73]">No admin alerts yet.</p>
                ) : (
                  <div className="space-y-2 max-h-80 overflow-y-auto">
                    {notifications.slice(0, 20).map((n) => (
                      <div
                        key={n.notificationId}
                        className={`p-3.5 rounded-xl border text-xs flex items-start justify-between gap-3 ${
                          n.read ? 'bg-[#FDFBF7] border-[#EFE8DC]' : 'bg-[#FAF5EC] border-[#E2B13C]/50'
                        }`}
                      >
                        <div>
                          <p className="font-bold text-[#143527]">{n.title}</p>
                          <p className="text-[#52635B] mt-0.5">{n.message}</p>
                        </div>
                        {!n.read && (
                          <button
                            type="button"
                            onClick={async () => {
                              await markNotificationRead(n.notificationId);
                              setNotifications((prev) =>
                                prev.map((x) => (x.notificationId === n.notificationId ? { ...x, read: true } : x))
                              );
                            }}
                            className="text-[11px] font-bold text-[#1B4332] hover:underline shrink-0 cursor-pointer"
                          >
                            Mark read
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-white rounded-3xl p-6 border border-[#E5DDD0] space-y-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#1B4332]" />
                  <h2 className="font-heading font-bold text-lg text-[#143527]">
                    Administrative Audit Log
                  </h2>
                </div>
                {auditLogs.length === 0 ? (
                  <p className="text-xs text-[#6B7B73]">No administrative actions logged yet.</p>
                ) : (
                  <div className="space-y-2 max-h-80 overflow-y-auto">
                    {auditLogs.slice(0, 25).map((log) => (
                      <div key={log.logId} className="p-3 rounded-xl bg-[#FDFBF7] border border-[#EFE8DC] text-xs">
                        <div className="flex items-center justify-between gap-2 font-bold text-[#143527]">
                          <span>{log.action}</span>
                          <span className="text-[10px] font-normal text-[#6B7B73]">
                            {formatFirestoreTimestamp(log.createdAt)}
                          </span>
                        </div>
                        <p className="text-[#52635B] mt-0.5">{log.summary}</p>
                        <p className="text-[10px] text-[#7A8A81] mt-0.5">Actor: {log.actorEmail}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 2: AMBASSADORS MANAGEMENT ==================== */}
        {activeTab === 'ambassadors' && (
          <div className="bg-white rounded-3xl p-6 border border-[#E5DDD0] space-y-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <h2 className="font-heading font-extrabold text-xl text-[#143527]">
                  Manage Ambassadors ({filteredAmbassadors.length})
                </h2>
                <p className="text-xs text-[#6B7B73]">
                  Review applications, generate secure referral codes upon approval, suspend, or reactivate accounts.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-[#7A8A81] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={ambSearch}
                    onChange={(e) => setAmbSearch(e.target.value)}
                    placeholder="Search name, phone, code..."
                    className="pl-8 pr-3 py-2 text-xs rounded-xl border border-[#D5CCBE] bg-[#FDFBF7]"
                  />
                </div>
                <select
                  value={ambFilter}
                  onChange={(e) => setAmbFilter(e.target.value)}
                  className="px-3 py-2 text-xs rounded-xl border border-[#D5CCBE] bg-[#FDFBF7] font-semibold"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="PENDING_APPROVAL">Pending Approval</option>
                  <option value="APPROVED">Approved</option>
                  <option value="REJECTED">Rejected</option>
                  <option value="SUSPENDED">Suspended</option>
                </select>
              </div>
            </div>

            {filteredAmbassadors.length === 0 ? (
              <div className="py-10 text-center text-xs sm:text-sm text-[#6B7B73]">
                No ambassador applications match your current filter.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-[#E5DDD0] text-[11px] uppercase tracking-wider text-[#6B7B73]">
                      <th className="py-3 pr-3">Applicant / Contact</th>
                      <th className="py-3 pr-3">Location / Platform</th>
                      <th className="py-3 pr-3">Status</th>
                      <th className="py-3 pr-3">Referral Code</th>
                      <th className="py-3 pr-3">Progress</th>
                      <th className="py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F2ECE1]">
                    {filteredAmbassadors.map((amb) => (
                      <tr key={amb.uid}>
                        <td className="py-3 pr-3">
                          <p className="font-bold text-[#143527] text-sm">{amb.fullName}</p>
                          <p className="text-[#52635B]">{amb.phone} · {amb.email}</p>
                          <p className="font-mono text-[10px] text-[#7A8A81]">{amb.applicationRef}</p>
                        </td>
                        <td className="py-3 pr-3">
                          <p>{amb.city}, {amb.state}</p>
                          <p className="text-[#6B7B73]">{amb.socialPlatform}</p>
                        </td>
                        <td className="py-3 pr-3">
                          <span
                            className={`inline-block font-bold px-2.5 py-0.5 rounded ${
                              amb.status === 'APPROVED'
                                ? 'bg-emerald-50 text-emerald-800'
                                : amb.status === 'PENDING_APPROVAL'
                                ? 'bg-amber-50 text-amber-800'
                                : 'bg-red-50 text-red-700'
                            }`}
                          >
                            {amb.status.replace(/_/g, ' ')}
                          </span>
                        </td>
                        <td className="py-3 pr-3 font-mono font-bold text-[#143527]">
                          {amb.referralCode || '—'}
                        </td>
                        <td className="py-3 pr-3 tabular-nums">
                          <strong>{amb.confirmedReferralsCount || 0}/10</strong>
                          <span className="block text-[10px] text-[#6B7B73]">
                            {amb.visitCount || 0} visits · {amb.ordersReceivedCount || 0} orders
                          </span>
                        </td>
                        <td className="py-3">
                          <div className="flex flex-wrap gap-1.5">
                            {amb.status !== 'APPROVED' && (
                              <button
                                type="button"
                                disabled={busyAction}
                                onClick={async () => {
                                  setBusyAction(true);
                                  try {
                                    const updated = await approveAmbassador(amb.uid, user);
                                    notify('success', `Approved ${updated.fullName} — Referral Code: ${updated.referralCode}`);
                                    await loadAllAdminData(user);
                                  } catch (err) {
                                    notify('error', err instanceof Error ? err.message : 'Approval failed.');
                                  } finally {
                                    setBusyAction(false);
                                  }
                                }}
                                className="px-2.5 py-1.5 rounded-lg bg-[#1B4332] hover:bg-[#143527] text-white font-bold cursor-pointer"
                              >
                                {amb.referralCode ? 'Reactivate' : 'Approve'}
                              </button>
                            )}
                            {amb.status === 'PENDING_APPROVAL' && (
                              <button
                                type="button"
                                onClick={() => { setAmbReason(''); setAmbActionModal({ amb, action: 'REJECTED' }); }}
                                className="px-2.5 py-1.5 rounded-lg border border-red-200 text-red-700 hover:bg-red-50 font-bold cursor-pointer"
                              >
                                Reject
                              </button>
                            )}
                            {amb.status === 'APPROVED' && (
                              <button
                                type="button"
                                onClick={() => { setAmbReason(''); setAmbActionModal({ amb, action: 'SUSPENDED' }); }}
                                className="px-2.5 py-1.5 rounded-lg border border-amber-300 text-amber-800 hover:bg-amber-50 font-bold flex items-center gap-1 cursor-pointer"
                              >
                                <Ban className="w-3 h-3" />
                                <span>Suspend</span>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ==================== TAB 3: ORDERS & PAYMENT VERIFICATION ==================== */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-3xl p-6 border border-[#E5DDD0] space-y-5">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              <div>
                <h2 className="font-heading font-extrabold text-xl text-[#143527]">
                  Orders & Manual Payment Verification ({filteredOrders.length})
                </h2>
                <p className="text-xs text-[#6B7B73]">
                  Reconcile WhatsApp orders, verify actual bank transfers, check new-customer status, and confirm completions.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setWaForm({
                      orderRef: '',
                      customerName: '',
                      customerPhone: '',
                      customerEmail: '',
                      deliveryLocation: 'Ile-Ife',
                      itemsSummary: '',
                      orderTotalNgn: '',
                      orderDate: getLagosDateString(),
                      referralCode: ''
                    });
                    setWhatsAppOrderModalOpen(true);
                  }}
                  className="min-h-[40px] px-4 py-2 rounded-xl bg-[#1B4332] hover:bg-[#143527] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-[#E2B13C]" />
                  <span>Record / Reconcile WhatsApp Order</span>
                </button>
                <input
                  type="text"
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  placeholder="Search order ref, phone, code..."
                  className="px-3 py-2 text-xs rounded-xl border border-[#D5CCBE] bg-[#FDFBF7]"
                />
                <select
                  value={orderFilter}
                  onChange={(e) => setOrderFilter(e.target.value)}
                  className="px-3 py-2 text-xs rounded-xl border border-[#D5CCBE] bg-[#FDFBF7] font-semibold"
                >
                  <option value="ALL">All Orders</option>
                  <option value="ATTRIBUTED">With Referral Code</option>
                  <option value="PENDING_VERIFICATION">Pending Verification</option>
                  <option value="VERIFIED_PAID">Verified Paid</option>
                  <option value="PAYMENT_REJECTED">Payment Rejected</option>
                  <option value="REFUNDED">Refunded</option>
                </select>
              </div>
            </div>

            {filteredOrders.length === 0 ? (
              <div className="py-10 text-center text-xs sm:text-sm text-[#6B7B73]">
                No orders found matching your filter.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-[#E5DDD0] text-[11px] uppercase tracking-wider text-[#6B7B73]">
                      <th className="py-3 pr-3">Order / Channel</th>
                      <th className="py-3 pr-3">Customer</th>
                      <th className="py-3 pr-3">Items / Total</th>
                      <th className="py-3 pr-3">Referral</th>
                      <th className="py-3 pr-3">Payment & Qualification</th>
                      <th className="py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F2ECE1]">
                    {filteredOrders.map((ord) => (
                      <tr key={ord.orderRef}>
                        <td className="py-3 pr-3">
                          <p className="font-mono font-bold text-[#143527]">{ord.orderRef}</p>
                          <p className="capitalize text-[#6B7B73]">{ord.channel} · {ord.orderDate}</p>
                          <p className="text-[10px] font-bold">Order: {ord.orderStatus}</p>
                        </td>
                        <td className="py-3 pr-3">
                          <p className="font-bold text-[#143527]">{ord.customerName}</p>
                          <p className="text-[#52635B]">{ord.customerPhone}</p>
                          <p className="text-[11px] text-[#7A8A81]">{ord.deliveryLocation}</p>
                        </td>
                        <td className="py-3 pr-3 max-w-xs">
                          <p className="line-clamp-2 text-[#3E4D45]">{ord.itemsSummary}</p>
                          <p className="font-bold text-[#143527] tabular-nums mt-0.5">
                            {ord.orderTotalNgn > 0 ? `₦${ord.orderTotalNgn.toLocaleString()}` : 'Unpriced / Quote'}
                          </p>
                        </td>
                        <td className="py-3 pr-3">
                          {ord.referralCode ? (
                            <span className="font-mono font-bold px-2 py-0.5 rounded bg-[#FAF5EC] border border-[#E2B13C]/40 text-[#1B4332]">
                              {ord.referralCode}
                            </span>
                          ) : (
                            <span className="text-[#7A8A81]">Direct</span>
                          )}
                        </td>
                        <td className="py-3 pr-3 space-y-1">
                          <span
                            className={`inline-block font-bold px-2 py-0.5 rounded ${
                              ord.paymentStatus === 'VERIFIED_PAID'
                                ? 'bg-emerald-50 text-emerald-800'
                                : ord.paymentStatus === 'PENDING_VERIFICATION'
                                ? 'bg-amber-50 text-amber-800'
                                : 'bg-red-50 text-red-700'
                            }`}
                          >
                            {ord.paymentStatus.replace(/_/g, ' ')}
                          </span>
                          {ord.referralCode && (
                            <p className="text-[11px] font-semibold">
                              Qual: {ord.qualificationState} ({ord.isNewCustomerFlag.replace(/_/g, ' ')})
                            </p>
                          )}
                          {ord.rejectionReason && (
                            <p className="text-[10px] text-red-700 max-w-xs">{ord.rejectionReason}</p>
                          )}
                        </td>
                        <td className="py-3">
                          <div className="flex flex-wrap gap-1.5">
                            <button
                              type="button"
                              onClick={() => {
                                setVerifyOrderTarget(ord);
                                setVerifyForm({
                                  bankTransactionRef: ord.paymentBankRef || '',
                                  amountReceived: String(ord.orderTotalNgn || ''),
                                  paymentDate: getLagosDateString(),
                                  paymentNotes: ord.paymentNotes || '',
                                  evidenceNote: ord.paymentEvidenceNote || '',
                                  markOrderCompleted: true,
                                  adminOverrideAsNewCustomer: false
                                });
                              }}
                              className="px-2.5 py-1.5 rounded-lg bg-[#1B4332] hover:bg-[#143527] text-white font-bold cursor-pointer"
                            >
                              {ord.paymentStatus === 'VERIFIED_PAID' ? 'Re-Verify' : 'Verify Payment'}
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setRejectOrderReason('');
                                setRejectOrderModal({ order: ord, type: 'PAYMENT_REJECTED' });
                              }}
                              className="px-2.5 py-1.5 rounded-lg border border-red-200 text-red-700 hover:bg-red-50 font-bold cursor-pointer"
                            >
                              Reject
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setRejectOrderReason('');
                                setRejectOrderModal({ order: ord, type: 'REFUNDED' });
                              }}
                              className="px-2 py-1.5 rounded-lg border border-stone-200 text-stone-700 hover:bg-stone-50 font-bold cursor-pointer"
                            >
                              Refund
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ==================== TAB 4: REFERRALS AUDIT & CORRECTIONS ==================== */}
        {activeTab === 'referrals' && (
          <div className="bg-white rounded-3xl p-6 border border-[#E5DDD0] space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="font-heading font-extrabold text-xl text-[#143527]">
                  Referral Attribution & Verification Ledger ({filteredReferrals.length})
                </h2>
                <p className="text-xs text-[#6B7B73]">
                  Inspect customer verification outcomes and override erroneous flags with audit logging. ({customers.length} recorded PGFV customers indexed).
                </p>
              </div>
              <input
                type="text"
                value={refSearch}
                onChange={(e) => setRefSearch(e.target.value)}
                placeholder="Search order ref or code..."
                className="px-3.5 py-2 text-xs rounded-xl border border-[#D5CCBE] bg-[#FDFBF7]"
              />
            </div>

            {filteredReferrals.length === 0 ? (
              <div className="py-10 text-center text-xs sm:text-sm text-[#6B7B73]">
                No referral records logged yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-[#E5DDD0] text-[11px] uppercase tracking-wider text-[#6B7B73]">
                      <th className="py-3 pr-3">Order Ref</th>
                      <th className="py-3 pr-3">Referral Code</th>
                      <th className="py-3 pr-3">Channel / Amount</th>
                      <th className="py-3 pr-3">Payment</th>
                      <th className="py-3 pr-3">Qualification</th>
                      <th className="py-3 pr-3">Reason / Notes</th>
                      <th className="py-3">Admin Correction</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F2ECE1]">
                    {filteredReferrals.map((rec) => (
                      <tr key={rec.recordId}>
                        <td className="py-3 pr-3 font-mono font-bold text-[#143527]">{rec.orderRef}</td>
                        <td className="py-3 pr-3 font-mono font-bold text-[#1B4332]">{rec.referralCode}</td>
                        <td className="py-3 pr-3 capitalize tabular-nums">
                          {rec.channel} · ₦{rec.orderTotalNgn.toLocaleString()}
                        </td>
                        <td className="py-3 pr-3">{rec.paymentStatus.replace(/_/g, ' ')}</td>
                        <td className="py-3 pr-3">
                          <span
                            className={`inline-block font-bold px-2 py-0.5 rounded ${
                              rec.qualificationStatus === 'QUALIFIED'
                                ? 'bg-emerald-50 text-emerald-800'
                                : rec.qualificationStatus === 'REJECTED'
                                ? 'bg-red-50 text-red-700'
                                : 'bg-amber-50 text-amber-800'
                            }`}
                          >
                            {rec.qualificationStatus.replace(/_/g, ' ')}
                          </span>
                        </td>
                        <td className="py-3 pr-3 max-w-xs text-[#52635B]">{rec.rejectionReason || '—'}</td>
                        <td className="py-3">
                          <div className="flex gap-1.5">
                            {rec.qualificationStatus !== 'QUALIFIED' && (
                              <button
                                type="button"
                                onClick={() => {
                                  setOverrideReason('');
                                  setOverrideRefModal({ record: rec, targetStatus: 'QUALIFIED' });
                                }}
                                className="px-2.5 py-1 rounded-lg bg-[#1B4332] text-white font-bold cursor-pointer"
                              >
                                Mark Qualified
                              </button>
                            )}
                            {rec.qualificationStatus !== 'REJECTED' && (
                              <button
                                type="button"
                                onClick={() => {
                                  setOverrideReason('');
                                  setOverrideRefModal({ record: rec, targetStatus: 'REJECTED' });
                                }}
                                className="px-2.5 py-1 rounded-lg border border-red-200 text-red-700 font-bold cursor-pointer"
                              >
                                Reject
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ==================== TAB 5: REWARDS FULFILMENT ==================== */}
        {activeTab === 'rewards' && (
          <div className="bg-white rounded-3xl p-6 border border-[#E5DDD0] space-y-5">
            <div>
              <h2 className="font-heading font-extrabold text-xl text-[#143527]">
                Ambassador Reward Fulfilment ({rewards.length})
              </h2>
              <p className="text-xs text-[#6B7B73]">
                Ambassadors appear here automatically once they reach 10 verified qualifying new customers. Rewards are never marked collected automatically.
              </p>
            </div>

            {rewards.length === 0 ? (
              <div className="py-10 text-center text-xs sm:text-sm text-[#6B7B73]">
                No ambassadors have reached the 10/10 qualification target yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-[#E5DDD0] text-[11px] uppercase tracking-wider text-[#6B7B73]">
                      <th className="py-3 pr-3">Ambassador</th>
                      <th className="py-3 pr-3">Reward Package</th>
                      <th className="py-3 pr-3">Qualifying Referrals</th>
                      <th className="py-3 pr-3">Status</th>
                      <th className="py-3 pr-3">Dates / Notes</th>
                      <th className="py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F2ECE1]">
                    {rewards.map((rw) => (
                      <tr key={rw.rewardId}>
                        <td className="py-3 pr-3">
                          <p className="font-bold text-[#143527] text-sm">{rw.ambassadorName}</p>
                          <p className="font-mono text-[#1B4332]">{rw.referralCode}</p>
                        </td>
                        <td className="py-3 pr-3">
                          <p className="font-bold">{rw.rewardDescription}</p>
                          <p className="text-[#6B7B73] tabular-nums">₦{rw.rewardValueNgn.toLocaleString()}</p>
                        </td>
                        <td className="py-3 pr-3 font-bold tabular-nums">{rw.qualifyingReferralsCount}</td>
                        <td className="py-3 pr-3">
                          <span className="font-bold px-2.5 py-0.5 rounded bg-[#FAF5EC] text-[#143527] border border-[#E2B13C]/40">
                            {rw.status.replace(/_/g, ' ')}
                          </span>
                        </td>
                        <td className="py-3 pr-3 text-[#52635B]">
                          {rw.approvedAt && <p>Approved: {rw.approvedAt}</p>}
                          {rw.collectedAt && <p>Collected: {rw.collectedAt}</p>}
                          {rw.fulfilmentNotes && <p className="italic">{rw.fulfilmentNotes}</p>}
                        </td>
                        <td className="py-3">
                          <div className="flex gap-1.5">
                            {rw.status === 'REWARD_AWAITING_APPROVAL' && (
                              <button
                                type="button"
                                onClick={() => {
                                  setRewardNotes('');
                                  setRewardActionModal({ reward: rw, mode: 'APPROVE' });
                                }}
                                className="px-3 py-1.5 rounded-lg bg-[#1B4332] text-white font-bold cursor-pointer"
                              >
                                Approve Reward
                              </button>
                            )}
                            {rw.status !== 'REWARD_COLLECTED' && (
                              <button
                                type="button"
                                onClick={() => {
                                  setRewardNotes(rw.fulfilmentNotes || '');
                                  setRewardCollectDate(getLagosDateString());
                                  setRewardActionModal({ reward: rw, mode: 'COLLECT' });
                                }}
                                className="px-3 py-1.5 rounded-lg bg-[#E2B13C] text-[#143527] font-bold cursor-pointer"
                              >
                                Mark Collected
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ==================== TAB 6: MULTI-CAMPAIGN MANAGEMENT ==================== */}
        {activeTab === 'campaigns' && (
          <div className="bg-white rounded-3xl p-6 border border-[#E5DDD0] space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-heading font-extrabold text-xl text-[#143527]">
                  Referral Campaigns Configuration ({campaigns.length})
                </h2>
                <p className="text-xs text-[#6B7B73]">
                  Manage active dates, targets, rewards, attribution windows, and launch future referral campaigns without rebuilding code.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setCampaignModal({
                    isNew: true,
                    data: {
                      id: `campaign-${Date.now().toString().slice(-4)}`,
                      name: 'PGFV Seasonal Referral Campaign',
                      slug: 'seasonal-ambassadors',
                      description: 'Share PGFV foodstuffs and earn rewards when referring new customers.',
                      startDate: getLagosDateString(),
                      endDate: getLagosDateString(),
                      timezone: 'Africa/Lagos',
                      referralTarget: 10,
                      rewardDescription: 'One ₦8,000 PGFV Food Box',
                      rewardValueNgn: 8000,
                      attributionWindowDays: 30,
                      qualificationRules: DEFAULT_CHRISTMAS_CAMPAIGN.qualificationRules,
                      status: 'draft',
                      registrationOpen: false,
                      createdBy: user.email || user.uid
                    }
                  })
                }
                className="min-h-[40px] px-4 py-2 rounded-xl bg-[#1B4332] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-[#E2B13C]" />
                <span>Create Future Campaign</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {campaigns.map((camp) => (
                <div
                  key={camp.id}
                  className="p-5 rounded-2xl border border-[#E5DDD0] bg-[#FDFBF7] space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[11px] font-bold text-[#6B7B73]">{camp.id}</span>
                      <span className="text-[11px] font-bold uppercase px-2 py-0.5 rounded bg-[#1B4332] text-[#E2B13C]">
                        {camp.status}
                      </span>
                    </div>
                    <h3 className="font-heading font-extrabold text-lg text-[#143527]">{camp.name}</h3>
                    <p className="text-xs text-[#52635B]">{camp.description}</p>
                    <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                      <div>
                        <span className="text-[#6B7B73] block">Window ({camp.timezone}):</span>
                        <strong>{camp.startDate} to {camp.endDate}</strong>
                      </div>
                      <div>
                        <span className="text-[#6B7B73] block">Target / Reward:</span>
                        <strong>{camp.referralTarget} refs · ₦{camp.rewardValueNgn.toLocaleString()}</strong>
                      </div>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-[#EAE2D6] flex items-center justify-between text-xs">
                    <span>Registration: <strong>{camp.registrationOpen ? 'Open' : 'Closed'}</strong></span>
                    <button
                      type="button"
                      onClick={() => setCampaignModal({ isNew: false, data: { ...camp } })}
                      className="px-3.5 py-1.5 rounded-lg border border-[#D5CCBE] bg-white hover:bg-[#FAF7F2] font-bold text-[#143527] cursor-pointer"
                    >
                      Edit Campaign
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ==================== MODAL: WHATSAPP ORDER RECONCILIATION ==================== */}
      {whatsAppOrderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-extrabold text-lg text-[#143527]">
                Record / Reconcile WhatsApp Order
              </h3>
              <button type="button" onClick={() => setWhatsAppOrderModalOpen(false)} className="cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setBusyAction(true);
                try {
                  const rec = await createOrReconcileOrder(
                    {
                      orderRef: waForm.orderRef || undefined,
                      customerName: waForm.customerName,
                      customerPhone: waForm.customerPhone,
                      customerEmail: waForm.customerEmail,
                      deliveryLocation: waForm.deliveryLocation,
                      itemsSummary: waForm.itemsSummary,
                      orderTotalNgn: Number(waForm.orderTotalNgn) || 0,
                      orderDate: waForm.orderDate,
                      referralCode: waForm.referralCode,
                      channel: 'whatsapp'
                    },
                    user
                  );
                  notify('success', `WhatsApp order ${rec.orderRef} saved. You can verify payment once bank deposit is confirmed.`);
                  setWhatsAppOrderModalOpen(false);
                  await loadAllAdminData(user);
                } catch (err) {
                  notify('error', err instanceof Error ? err.message : 'Unable to save order.');
                } finally {
                  setBusyAction(false);
                }
              }}
              className="space-y-3 text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Order Ref (from WhatsApp msg, or blank for new)</label>
                  <input
                    type="text"
                    value={waForm.orderRef}
                    onChange={(e) => setWaForm({ ...waForm, orderRef: e.target.value })}
                    placeholder="e.g. PGFV-ORDER-XXXX"
                    className="w-full px-3 py-2 rounded-xl border border-[#D5CCBE]"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Ambassador Referral Code (Optional)</label>
                  <input
                    type="text"
                    value={waForm.referralCode}
                    onChange={(e) => setWaForm({ ...waForm, referralCode: e.target.value.toUpperCase() })}
                    placeholder="e.g. PGFV-XXXXX"
                    className="w-full px-3 py-2 rounded-xl border border-[#D5CCBE] font-mono"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Customer Full Name *</label>
                  <input
                    type="text"
                    required
                    value={waForm.customerName}
                    onChange={(e) => setWaForm({ ...waForm, customerName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#D5CCBE]"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Customer Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={waForm.customerPhone}
                    onChange={(e) => setWaForm({ ...waForm, customerPhone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#D5CCBE]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Customer Email (Optional)</label>
                  <input
                    type="email"
                    value={waForm.customerEmail}
                    onChange={(e) => setWaForm({ ...waForm, customerEmail: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#D5CCBE]"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Order Date *</label>
                  <input
                    type="date"
                    required
                    value={waForm.orderDate}
                    onChange={(e) => setWaForm({ ...waForm, orderDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#D5CCBE]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Order Amount (₦) *</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={waForm.orderTotalNgn}
                    onChange={(e) => setWaForm({ ...waForm, orderTotalNgn: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#D5CCBE]"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Delivery Location *</label>
                  <input
                    type="text"
                    required
                    value={waForm.deliveryLocation}
                    onChange={(e) => setWaForm({ ...waForm, deliveryLocation: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#D5CCBE]"
                  />
                </div>
              </div>
              <div>
                <label className="font-bold block mb-1">Ordered Products & Quantities *</label>
                <textarea
                  rows={2}
                  required
                  value={waForm.itemsSummary}
                  onChange={(e) => setWaForm({ ...waForm, itemsSummary: e.target.value })}
                  placeholder="e.g. 2kg Pure Beans Flour x2, 1kg Puff Puff Mix x1"
                  className="w-full px-3 py-2 rounded-xl border border-[#D5CCBE]"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setWhatsAppOrderModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#D5CCBE] font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={busyAction}
                  className="px-5 py-2 rounded-xl bg-[#1B4332] text-white font-bold cursor-pointer"
                >
                  Save Order Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== MODAL: MANUAL PAYMENT VERIFICATION ==================== */}
      {verifyOrderTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-extrabold text-lg text-[#143527]">
                Verify Bank Payment — {verifyOrderTarget.orderRef}
              </h3>
              <button type="button" onClick={() => setVerifyOrderTarget(null)} className="cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E5DDD0] text-xs space-y-1">
              <p><strong>Customer:</strong> {verifyOrderTarget.customerName} ({verifyOrderTarget.customerPhone})</p>
              <p><strong>Referral Code:</strong> {verifyOrderTarget.referralCode || 'Direct Order (No referral)'}</p>
            </div>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setBusyAction(true);
                try {
                  const res = await verifyPaymentAndEvaluateQualification(
                    {
                      orderRef: verifyOrderTarget.orderRef,
                      bankTransactionRef: verifyForm.bankTransactionRef,
                      amountReceived: Number(verifyForm.amountReceived) || 0,
                      paymentDate: verifyForm.paymentDate,
                      paymentNotes: verifyForm.paymentNotes,
                      evidenceNote: verifyForm.evidenceNote,
                      markOrderCompleted: verifyForm.markOrderCompleted,
                      adminOverrideAsNewCustomer: verifyForm.adminOverrideAsNewCustomer
                    },
                    user
                  );
                  notify('success', `Payment verified for ${verifyOrderTarget.orderRef}. Result: ${res.reason}`);
                  setVerifyOrderTarget(null);
                  await loadAllAdminData(user);
                } catch (err) {
                  notify('error', err instanceof Error ? err.message : 'Verification failed.');
                } finally {
                  setBusyAction(false);
                }
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="font-bold block mb-1">Bank Transfer Reference / Session ID *</label>
                <input
                  type="text"
                  required
                  value={verifyForm.bankTransactionRef}
                  onChange={(e) => setVerifyForm({ ...verifyForm, bankTransactionRef: e.target.value })}
                  placeholder="e.g. NIP-20261204-88291"
                  className="w-full px-3 py-2 rounded-xl border border-[#D5CCBE]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Amount Received (₦) *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={verifyForm.amountReceived}
                    onChange={(e) => setVerifyForm({ ...verifyForm, amountReceived: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#D5CCBE]"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Payment Date *</label>
                  <input
                    type="date"
                    required
                    value={verifyForm.paymentDate}
                    onChange={(e) => setVerifyForm({ ...verifyForm, paymentDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#D5CCBE]"
                  />
                </div>
              </div>
              <div>
                <label className="font-bold block mb-1">Evidence / Receipt Summary</label>
                <input
                  type="text"
                  value={verifyForm.evidenceNote}
                  onChange={(e) => setVerifyForm({ ...verifyForm, evidenceNote: e.target.value })}
                  placeholder="e.g. Confirmed in PGFV Zenith bank alert / WhatsApp receipt"
                  className="w-full px-3 py-2 rounded-xl border border-[#D5CCBE]"
                />
              </div>
              <div>
                <label className="font-bold block mb-1">Verification Notes</label>
                <textarea
                  rows={2}
                  value={verifyForm.paymentNotes}
                  onChange={(e) => setVerifyForm({ ...verifyForm, paymentNotes: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#D5CCBE]"
                />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={verifyForm.markOrderCompleted}
                  onChange={(e) => setVerifyForm({ ...verifyForm, markOrderCompleted: e.target.checked })}
                  className="w-4 h-4 accent-[#1B4332]"
                />
                <span>Mark order status as COMPLETED</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={verifyForm.adminOverrideAsNewCustomer}
                  onChange={(e) => setVerifyForm({ ...verifyForm, adminOverrideAsNewCustomer: e.target.checked })}
                  className="w-4 h-4 accent-[#1B4332]"
                />
                <span>Admin override: Treat as verified new customer (if pre-existing record was a false match)</span>
              </label>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setVerifyOrderTarget(null)}
                  className="px-4 py-2 rounded-xl border border-[#D5CCBE] font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={busyAction}
                  className="px-5 py-2 rounded-xl bg-[#1B4332] text-white font-bold cursor-pointer"
                >
                  Confirm Payment & Evaluate Qualification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== MODAL: REJECT / SUSPEND AMBASSADOR ==================== */}
      {ambActionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4">
            <h3 className="font-heading font-bold text-lg text-[#143527]">
              {ambActionModal.action === 'REJECTED' ? 'Reject Application' : 'Suspend Ambassador'} — {ambActionModal.amb.fullName}
            </h3>
            <textarea
              rows={3}
              value={ambReason}
              onChange={(e) => setAmbReason(e.target.value)}
              placeholder="Provide reason for this status change..."
              className="w-full px-3 py-2 text-xs rounded-xl border border-[#D5CCBE]"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setAmbActionModal(null)}
                className="px-4 py-2 text-xs font-bold border border-[#D5CCBE] rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={busyAction}
                onClick={async () => {
                  setBusyAction(true);
                  try {
                    await updateAmbassadorAccountStatus(ambActionModal.amb.uid, ambActionModal.action, ambReason, user);
                    notify('success', `Updated ${ambActionModal.amb.fullName} to ${ambActionModal.action}.`);
                    setAmbActionModal(null);
                    await loadAllAdminData(user);
                  } catch (err) {
                    notify('error', err instanceof Error ? err.message : 'Update failed.');
                  } finally {
                    setBusyAction(false);
                  }
                }}
                className="px-4 py-2 text-xs font-bold bg-red-700 text-white rounded-xl cursor-pointer"
              >
                Confirm {ambActionModal.action}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== MODAL: REJECT / REFUND ORDER ==================== */}
      {rejectOrderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4">
            <h3 className="font-heading font-bold text-lg text-[#143527]">
              Mark {rejectOrderModal.order.orderRef} as {rejectOrderModal.type.replace(/_/g, ' ')}
            </h3>
            <textarea
              rows={3}
              required
              value={rejectOrderReason}
              onChange={(e) => setRejectOrderReason(e.target.value)}
              placeholder="Reason (e.g. transfer not received, order cancelled, refunded)..."
              className="w-full px-3 py-2 text-xs rounded-xl border border-[#D5CCBE]"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setRejectOrderModal(null)}
                className="px-4 py-2 text-xs font-bold border border-[#D5CCBE] rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={busyAction}
                onClick={async () => {
                  setBusyAction(true);
                  try {
                    await rejectOrCancelOrder(
                      rejectOrderModal.order.orderRef,
                      rejectOrderModal.type,
                      rejectOrderReason || 'Updated by admin',
                      user
                    );
                    notify('success', `Order ${rejectOrderModal.order.orderRef} marked ${rejectOrderModal.type}.`);
                    setRejectOrderModal(null);
                    await loadAllAdminData(user);
                  } catch (err) {
                    notify('error', err instanceof Error ? err.message : 'Update failed.');
                  } finally {
                    setBusyAction(false);
                  }
                }}
                className="px-4 py-2 text-xs font-bold bg-red-700 text-white rounded-xl cursor-pointer"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== MODAL: OVERRIDE REFERRAL QUALIFICATION ==================== */}
      {overrideRefModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4">
            <h3 className="font-heading font-bold text-lg text-[#143527]">
              Admin Override: {overrideRefModal.record.orderRef} → {overrideRefModal.targetStatus}
            </h3>
            <p className="text-xs text-[#52635B]">
              This change will update the ambassador's verified count and record an entry in the immutable audit log.
            </p>
            <textarea
              rows={3}
              required
              value={overrideReason}
              onChange={(e) => setOverrideReason(e.target.value)}
              placeholder="Audit reason for manual correction..."
              className="w-full px-3 py-2 text-xs rounded-xl border border-[#D5CCBE]"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setOverrideRefModal(null)}
                className="px-4 py-2 text-xs font-bold border border-[#D5CCBE] rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={busyAction}
                onClick={async () => {
                  setBusyAction(true);
                  try {
                    await overrideReferralQualification(
                      overrideRefModal.record.orderRef,
                      overrideRefModal.targetStatus,
                      overrideReason || 'Admin correction',
                      user
                    );
                    notify('success', `Referral ${overrideRefModal.record.orderRef} updated to ${overrideRefModal.targetStatus}.`);
                    setOverrideRefModal(null);
                    await loadAllAdminData(user);
                  } catch (err) {
                    notify('error', err instanceof Error ? err.message : 'Correction failed.');
                  } finally {
                    setBusyAction(false);
                  }
                }}
                className="px-4 py-2 text-xs font-bold bg-[#1B4332] text-white rounded-xl cursor-pointer"
              >
                Apply Correction
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== MODAL: REWARD APPROVAL / COLLECTION ==================== */}
      {rewardActionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4">
            <h3 className="font-heading font-bold text-lg text-[#143527]">
              {rewardActionModal.mode === 'APPROVE'
                ? `Approve Reward — ${rewardActionModal.reward.ambassadorName}`
                : `Record Food Box Collection — ${rewardActionModal.reward.ambassadorName}`}
            </h3>
            {rewardActionModal.mode === 'COLLECT' && (
              <div>
                <label className="text-xs font-bold block mb-1">Collection / Delivery Date</label>
                <input
                  type="date"
                  value={rewardCollectDate}
                  onChange={(e) => setRewardCollectDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#D5CCBE]"
                />
              </div>
            )}
            <div>
              <label className="text-xs font-bold block mb-1">Fulfilment Notes</label>
              <textarea
                rows={3}
                value={rewardNotes}
                onChange={(e) => setRewardNotes(e.target.value)}
                placeholder="e.g. Pickup scheduled at PGFV Ile-Ife hub / Signed collection sheet..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#D5CCBE]"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setRewardActionModal(null)}
                className="px-4 py-2 text-xs font-bold border border-[#D5CCBE] rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={busyAction}
                onClick={async () => {
                  setBusyAction(true);
                  try {
                    if (rewardActionModal.mode === 'APPROVE') {
                      await approveAmbassadorReward(rewardActionModal.reward.rewardId, rewardNotes, user);
                      notify('success', `Reward approved for ${rewardActionModal.reward.ambassadorName}.`);
                    } else {
                      await markRewardCollected(
                        rewardActionModal.reward.rewardId,
                        rewardCollectDate,
                        rewardNotes,
                        user
                      );
                      notify('success', `Recorded food box collection for ${rewardActionModal.reward.ambassadorName}.`);
                    }
                    setRewardActionModal(null);
                    await loadAllAdminData(user);
                  } catch (err) {
                    notify('error', err instanceof Error ? err.message : 'Action failed.');
                  } finally {
                    setBusyAction(false);
                  }
                }}
                className="px-4 py-2 text-xs font-bold bg-[#1B4332] text-white rounded-xl cursor-pointer"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== MODAL: CAMPAIGN EDITOR ==================== */}
      {campaignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-lg text-[#143527]">
                {campaignModal.isNew ? 'Create New Campaign' : `Edit Campaign (${campaignModal.data.id})`}
              </h3>
              <button type="button" onClick={() => setCampaignModal(null)} className="cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setBusyAction(true);
                try {
                  await saveCampaign(campaignModal.data, user, campaignModal.isNew);
                  notify('success', `Saved campaign "${campaignModal.data.name}".`);
                  setCampaignModal(null);
                  await loadAllAdminData(user);
                } catch (err) {
                  notify('error', err instanceof Error ? err.message : 'Save failed.');
                } finally {
                  setBusyAction(false);
                }
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="font-bold block mb-1">Campaign ID *</label>
                <input
                  type="text"
                  required
                  disabled={!campaignModal.isNew}
                  value={campaignModal.data.id}
                  onChange={(e) =>
                    setCampaignModal({
                      ...campaignModal,
                      data: { ...campaignModal.data, id: e.target.value.replace(/[^a-z0-9\-]/gi, '-').toLowerCase() }
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-[#D5CCBE] font-mono"
                />
              </div>
              <div>
                <label className="font-bold block mb-1">Campaign Name *</label>
                <input
                  type="text"
                  required
                  value={campaignModal.data.name}
                  onChange={(e) =>
                    setCampaignModal({ ...campaignModal, data: { ...campaignModal.data, name: e.target.value } })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-[#D5CCBE]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Start Date (Africa/Lagos) *</label>
                  <input
                    type="date"
                    required
                    value={campaignModal.data.startDate}
                    onChange={(e) =>
                      setCampaignModal({ ...campaignModal, data: { ...campaignModal.data, startDate: e.target.value } })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-[#D5CCBE]"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">End Date (Africa/Lagos) *</label>
                  <input
                    type="date"
                    required
                    value={campaignModal.data.endDate}
                    onChange={(e) =>
                      setCampaignModal({ ...campaignModal, data: { ...campaignModal.data, endDate: e.target.value } })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-[#D5CCBE]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold block mb-1">Target Referrals *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={campaignModal.data.referralTarget}
                    onChange={(e) =>
                      setCampaignModal({
                        ...campaignModal,
                        data: { ...campaignModal.data, referralTarget: Number(e.target.value) || 10 }
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-[#D5CCBE]"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Reward Value (₦) *</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={campaignModal.data.rewardValueNgn}
                    onChange={(e) =>
                      setCampaignModal({
                        ...campaignModal,
                        data: { ...campaignModal.data, rewardValueNgn: Number(e.target.value) || 0 }
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-[#D5CCBE]"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Window (Days)</label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={90}
                    value={campaignModal.data.attributionWindowDays}
                    onChange={(e) =>
                      setCampaignModal({
                        ...campaignModal,
                        data: { ...campaignModal.data, attributionWindowDays: Number(e.target.value) || 30 }
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-[#D5CCBE]"
                  />
                </div>
              </div>
              <div>
                <label className="font-bold block mb-1">Reward Description *</label>
                <input
                  type="text"
                  required
                  value={campaignModal.data.rewardDescription}
                  onChange={(e) =>
                    setCampaignModal({
                      ...campaignModal,
                      data: { ...campaignModal.data, rewardDescription: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-[#D5CCBE]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Campaign Status</label>
                  <select
                    value={campaignModal.data.status}
                    onChange={(e) =>
                      setCampaignModal({
                        ...campaignModal,
                        data: { ...campaignModal.data, status: e.target.value as CampaignStatus }
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-[#D5CCBE]"
                  >
                    <option value="active">active</option>
                    <option value="draft">draft</option>
                    <option value="paused">paused</option>
                    <option value="ended">ended</option>
                  </select>
                </div>
                <label className="flex items-center gap-2 pt-5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={campaignModal.data.registrationOpen}
                    onChange={(e) =>
                      setCampaignModal({
                        ...campaignModal,
                        data: { ...campaignModal.data, registrationOpen: e.target.checked }
                      })
                    }
                    className="w-4 h-4 accent-[#1B4332]"
                  />
                  <span className="font-bold">Registration Open</span>
                </label>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCampaignModal(null)}
                  className="px-4 py-2 rounded-xl border border-[#D5CCBE] font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={busyAction}
                  className="px-5 py-2 rounded-xl bg-[#1B4332] text-white font-bold cursor-pointer"
                >
                  Save Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
