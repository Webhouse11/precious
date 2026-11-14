import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import {
  Copy,
  Check,
  Share2,
  Gift,
  Users,
  MousePointerClick,
  ShoppingBag,
  Clock,
  CheckCircle2,
  XCircle,
  Bell,
  LogOut,
  ShieldCheck,
  AlertCircle,
  MessageCircle,
  RefreshCw,
  Award
} from 'lucide-react';
import { auth, signOutUser } from '../../lib/firebase';
import {
  getActiveCampaign,
  getAmbassadorByUid,
  getAmbassadorReferralRecords,
  getAmbassadorReward,
  getAmbassadorVisits,
  getNotificationsForUid,
  markNotificationRead
} from '../../services/referralService';
import {
  Ambassador,
  Campaign,
  NotificationRecord,
  QualificationRewardStatus,
  ReferralRecord,
  ReferralVisit,
  RewardRecord
} from '../../types/referral';
import {
  buildReferralLink,
  DEFAULT_CHRISTMAS_CAMPAIGN,
  formatFirestoreTimestamp
} from '../../utils/referralUtils';
import { PageView } from '../../types';

interface AmbassadorDashboardPageProps {
  onNavigate: (page: PageView, sectionId?: string) => void;
}

const REWARD_STATUS_LABELS: Record<QualificationRewardStatus, { label: string; tone: string }> = {
  NOT_YET_QUALIFIED: { label: 'Not yet qualified', tone: 'bg-stone-100 text-stone-700 border-stone-200' },
  IN_PROGRESS: { label: 'In progress', tone: 'bg-blue-50 text-blue-800 border-blue-200' },
  TARGET_ACHIEVED: { label: 'Target achieved', tone: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
  REWARD_AWAITING_APPROVAL: { label: 'Reward awaiting approval', tone: 'bg-amber-50 text-amber-800 border-amber-200' },
  REWARD_APPROVED: { label: 'Reward approved', tone: 'bg-emerald-100 text-emerald-900 border-emerald-300' },
  REWARD_COLLECTED: { label: 'Reward collected', tone: 'bg-[#1B4332] text-[#E2B13C] border-[#1B4332]' },
};

export const AmbassadorDashboardPage: React.FC<AmbassadorDashboardPageProps> = ({
  onNavigate
}) => {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [ambassador, setAmbassador] = useState<Ambassador | null>(null);
  const [campaign, setCampaign] = useState<Campaign>(DEFAULT_CHRISTMAS_CAMPAIGN);
  const [visits, setVisits] = useState<ReferralVisit[]>([]);
  const [records, setRecords] = useState<ReferralRecord[]>([]);
  const [reward, setReward] = useState<RewardRecord | null>(null);
  const [notifications, setNotifications] = useState<NotificationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const loadDashboardData = async (uid: string) => {
    setLoading(true);
    try {
      const amb = await getAmbassadorByUid(uid);
      setAmbassador(amb);
      if (amb) {
        const [camp, visitList, recordList, rw, notifs] = await Promise.all([
          getActiveCampaign(amb.campaignId || 'christmas-2026'),
          getAmbassadorVisits(uid),
          getAmbassadorReferralRecords(uid),
          getAmbassadorReward(uid, amb.campaignId || 'christmas-2026'),
          getNotificationsForUid(uid),
        ]);
        setCampaign(camp);
        setVisits(visitList);
        setRecords(recordList);
        setReward(rw);
        setNotifications(notifs);
      }
    } catch (err) {
      console.error('Error loading ambassador dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (!u) {
        setLoading(false);
        onNavigate('ambassador-login');
        return;
      }
      loadDashboardData(u.uid);
    });
    return () => unsub();
  }, [onNavigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-6">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-4 border-[#1B4332]/20 border-t-[#1B4332] rounded-full animate-spin mx-auto" />
          <p className="text-xs font-semibold text-[#52635B]">Loading your Ambassador Dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  if (!ambassador) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] py-16 px-4">
        <div className="max-w-lg mx-auto bg-white rounded-3xl p-8 border border-[#E3DCD0] text-center space-y-4">
          <AlertCircle className="w-10 h-10 text-[#C68A1B] mx-auto" />
          <h1 className="font-heading font-extrabold text-xl text-[#143527]">
            No Ambassador Profile Found
          </h1>
          <p className="text-sm text-[#52635B]">
            Your signed-in account ({user.email}) has not applied for the PGFV Christmas Ambassador Programme yet.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => onNavigate('christmas-ambassadors-register')}
              className="min-h-[44px] px-6 py-2.5 rounded-xl bg-[#1B4332] text-white font-bold text-sm cursor-pointer"
            >
              Apply Now
            </button>
            <button
              type="button"
              onClick={() => signOutUser()}
              className="min-h-[44px] px-5 py-2.5 rounded-xl border border-[#D5CCBE] text-[#143527] font-bold text-sm cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  const target = campaign.referralTarget || 10;
  // Derive live verified stats from ambassador + queries (server/Firestore authoritative)
  const totalVisits = Math.max(ambassador.visitCount || 0, visits.length);
  const attributedCustomersCount = Math.max(
    ambassador.attributedCustomersCount || 0,
    new Set(records.map((r) => r.customerKeyHash || r.orderRef)).size
  );
  const ordersReceivedCount = Math.max(ambassador.ordersReceivedCount || 0, records.length);
  const awaitingPaymentCount = records.length > 0
    ? records.filter((r) => r.qualificationStatus === 'AWAITING_PAYMENT').length
    : ambassador.ordersAwaitingVerificationCount || 0;
  const confirmedCount = records.length > 0
    ? records.filter((r) => r.qualificationStatus === 'QUALIFIED').length
    : ambassador.confirmedReferralsCount || 0;
  const rejectedCount = records.length > 0
    ? records.filter((r) => r.qualificationStatus === 'REJECTED').length
    : ambassador.rejectedReferralsCount || 0;
  const remainingToTarget = Math.max(0, target - confirmedCount);
  const progressPercent = Math.min(100, Math.round((confirmedCount / target) * 100));

  const effectiveRewardStatus: QualificationRewardStatus = reward
    ? reward.status
    : confirmedCount >= target
    ? 'REWARD_AWAITING_APPROVAL'
    : confirmedCount > 0 || ordersReceivedCount > 0
    ? 'IN_PROGRESS'
    : 'NOT_YET_QUALIFIED';

  const rewardBadge = REWARD_STATUS_LABELS[effectiveRewardStatus] || REWARD_STATUS_LABELS.NOT_YET_QUALIFIED;
  const isApproved = ambassador.status === 'APPROVED';
  const activeReferralLink = isApproved && ambassador.referralCode
    ? buildReferralLink(ambassador.referralCode)
    : '';

  const shareText = `Shop hygienic foodstuffs, pure beans flour & Christmas packages from Precious Gem Foods Ventures! Use my referral link: ${activeReferralLink}`;

  const handleCopyLink = () => {
    if (!activeReferralLink) return;
    navigator.clipboard.writeText(activeReferralLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyCode = () => {
    if (!ambassador.referralCode) return;
    navigator.clipboard.writeText(ambassador.referralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleNativeShare = async () => {
    if (!activeReferralLink) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Precious Gem Foods Ventures — Christmas Offer',
          text: shareText,
          url: activeReferralLink,
        });
      } catch {
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1E2320] pb-16">
      {/* Header Bar */}
      <div className="bg-[#1B4332] text-white border-b border-[#122A20]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#E2B13C] block">
              {campaign.name}
            </span>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mt-0.5">
              Ambassador Dashboard
            </h1>
            <p className="text-xs text-[#C8DBD1] mt-1">
              Welcome back, {ambassador.fullName} • App Ref: <span className="font-mono">{ambassador.applicationRef}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => loadDashboardData(user.uid)}
              className="min-h-[44px] px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#E2B13C]" />
              <span>Refresh</span>
            </button>
            <button
              type="button"
              onClick={() => signOutUser()}
              className="min-h-[44px] px-4 py-2 rounded-xl bg-[#122A20] hover:bg-black/40 text-[#E4EDE7] text-xs font-bold flex items-center gap-1.5 border border-white/15 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5 text-[#E2B13C]" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Account Approval Gate Banner */}
        {ambassador.status !== 'APPROVED' && (
          <div
            className={`p-5 rounded-2xl border flex items-start gap-3 ${
              ambassador.status === 'PENDING_APPROVAL'
                ? 'bg-amber-50 border-amber-200 text-amber-900'
                : 'bg-red-50 border-red-200 text-red-900'
            }`}
          >
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs sm:text-sm">
              <p className="font-heading font-bold text-base">
                Account Status: {ambassador.status.replace(/_/g, ' ')}
              </p>
              {ambassador.status === 'PENDING_APPROVAL' ? (
                <p>
                  Your application is currently under review by PGFV administrators. Only approved ambassadors receive an active referral link. Check back shortly after approval.
                </p>
              ) : (
                <p>
                  {ambassador.rejectionReason ||
                    'Your ambassador account is currently inactive. Please contact Precious Gem Foods Ventures management for assistance.'}
                </p>
              )}
            </div>
          </div>
        )}

        {/* 10/10 Congratulations Banner */}
        {confirmedCount >= target && (
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#143527] to-[#1B4332] text-white border-2 border-[#E2B13C] shadow-xl flex flex-col md:flex-row items-start md:items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-[#E2B13C] text-[#143527] flex items-center justify-center shrink-0">
              <Award className="w-8 h-8" />
            </div>
            <div className="space-y-1.5 flex-1">
              <h2 className="font-heading font-extrabold text-2xl text-[#E2B13C]">
                CONGRATULATIONS!
              </h2>
              <p className="text-sm sm:text-base text-white font-medium">
                You have successfully referred 10 new customers and qualified for your PGFV Christmas Food Box worth ₦8,000.
              </p>
              <p className="text-xs sm:text-sm text-[#D3E0D9]">
                {effectiveRewardStatus === 'REWARD_COLLECTED'
                  ? `Your reward collection was recorded on ${reward?.collectedAt || 'file'}. Thank you for representing Precious Gem Foods Ventures!`
                  : effectiveRewardStatus === 'REWARD_APPROVED'
                  ? 'Your reward has been APPROVED by PGFV management! Please watch for collection/delivery coordination.'
                  : 'Your reward is awaiting confirmation from PGFV management.'}
              </p>
            </div>
          </div>
        )}

        {/* Section D & E: Progress Tracker & Reward Status */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-7 border border-[#E5DDD0] shadow-xs space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#C68A1B] block">
                  D. Progress Tracker
                </span>
                <h2 className="font-heading font-extrabold text-xl text-[#143527]">
                  Qualifying New Customers Progress
                </h2>
              </div>
              <div className="text-right">
                <span className="font-heading font-extrabold text-3xl text-[#1B4332] tabular-nums">
                  {confirmedCount}/{target}
                </span>
                <span className="text-xs text-[#6B7B73] block">Verified Paid Referrals</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="w-full h-4 rounded-full bg-[#EFE9DF] overflow-hidden border border-[#E2D9CB]">
                <div
                  className="h-full bg-gradient-to-r from-[#1B4332] to-[#E2B13C] transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="grid grid-cols-10 gap-1.5 pt-1">
                {Array.from({ length: target }).map((_, i) => {
                  const filled = i < confirmedCount;
                  return (
                    <div
                      key={i}
                      className={`h-7 rounded-lg flex items-center justify-center text-[11px] font-bold border tabular-nums ${
                        filled
                          ? 'bg-[#1B4332] text-[#E2B13C] border-[#1B4332]'
                          : 'bg-[#FAF7F2] text-[#8A9A91] border-[#E5DDD0]'
                      }`}
                    >
                      {i + 1}
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-[#52635B] pt-1">
                Progress is calculated strictly from confirmed qualifying new customers after manual payment verification by PGFV administrators.
              </p>
            </div>
          </div>

          {/* Section E: Reward Status */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-7 border border-[#E5DDD0] shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#C68A1B] block">
                E. Reward Status
              </span>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#FAF5EC] border border-[#E5DDD0] text-[#1B4332] flex items-center justify-center">
                  <Gift className="w-5 h-5 text-[#C68A1B]" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base text-[#143527]">
                    {campaign.rewardDescription}
                  </h3>
                  <p className="text-xs text-[#6B7B73]">
                    Target: {target} qualifying new customers
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <span className={`inline-block text-xs font-bold px-3 py-1.5 rounded-lg border ${rewardBadge.tone}`}>
                  {rewardBadge.label}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8E1D5] text-xs text-[#52635B] space-y-1">
              <div className="flex justify-between">
                <span>Remaining to qualify:</span>
                <strong className="text-[#143527] tabular-nums">{remainingToTarget} referrals</strong>
              </div>
              {reward?.approvedAt && (
                <div className="flex justify-between">
                  <span>Approved Date:</span>
                  <strong className="text-[#143527]">{reward.approvedAt}</strong>
                </div>
              )}
              {reward?.collectedAt && (
                <div className="flex justify-between">
                  <span>Collected Date:</span>
                  <strong className="text-[#143527]">{reward.collectedAt}</strong>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section C: Referral Statistics */}
        <div className="space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#C68A1B] block">
            C. Referral Statistics
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
            {[
              { label: 'Total Link Visits', value: totalVisits, icon: MousePointerClick, accent: 'text-[#1B4332]' },
              { label: 'Attributed New Customers', value: attributedCustomersCount, icon: Users, accent: 'text-[#1B4332]' },
              { label: 'Orders Received', value: ordersReceivedCount, icon: ShoppingBag, accent: 'text-[#143527]' },
              { label: 'Awaiting Payment Verif.', value: awaitingPaymentCount, icon: Clock, accent: 'text-amber-700' },
              { label: 'Confirmed Qualifying', value: confirmedCount, icon: CheckCircle2, accent: 'text-emerald-700' },
              { label: 'Rejected Referrals', value: rejectedCount, icon: XCircle, accent: 'text-red-700' },
              { label: 'Remaining to Target', value: remainingToTarget, icon: Gift, accent: 'text-[#C68A1B]' },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="bg-white rounded-2xl p-4 border border-[#E5DDD0] shadow-2xs space-y-2"
                >
                  <Icon className={`w-4 h-4 ${stat.accent}`} />
                  <p className={`font-heading font-extrabold text-2xl tabular-nums ${stat.accent}`}>
                    {stat.value}
                  </p>
                  <p className="text-[11px] font-semibold text-[#52635B] leading-tight">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section A & B: Profile & Referral Link */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Section A: Profile */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-[#E5DDD0] shadow-xs space-y-4">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#C68A1B] block">
              A. Ambassador Profile
            </span>
            <div className="divide-y divide-[#F2ECE1] text-xs sm:text-sm">
              {[
                ['Full Name', ambassador.fullName],
                ['Phone Number', ambassador.phone],
                ['Email Address', ambassador.email],
                ['Location', `${ambassador.city}, ${ambassador.state}`],
                ['Registration Date', formatFirestoreTimestamp(ambassador.createdAt)],
                ['Account Status', ambassador.status.replace(/_/g, ' ')],
                ['Referral Code', ambassador.referralCode || 'Issued upon approval'],
              ].map(([k, v]) => (
                <div key={k} className="py-2.5 flex items-center justify-between gap-4">
                  <span className="text-[#6B7B73]">{k}</span>
                  <span className="font-semibold text-[#143527] text-right break-all">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section B: Referral Link & Sharing */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-[#E5DDD0] shadow-xs space-y-5">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#C68A1B] block">
                B. Your Referral Link & Share Tools
              </span>
              <h2 className="font-heading font-bold text-lg text-[#143527] mt-0.5">
                Invite New Customers to Precious Gem Foods
              </h2>
            </div>

            {isApproved && activeReferralLink ? (
              <>
                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DDD0] space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs text-[#6B7B73] font-semibold">Referral Code:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-extrabold text-sm px-3 py-1 rounded-lg bg-[#1B4332] text-[#E2B13C]">
                        {ambassador.referralCode}
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyCode}
                        className="px-2.5 py-1 rounded-lg border border-[#D5CCBE] bg-white text-xs font-bold text-[#143527] cursor-pointer"
                      >
                        {copiedCode ? 'Copied' : 'Copy Code'}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#6B7B73] block mb-1">
                      Unique Referral URL:
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        readOnly
                        value={activeReferralLink}
                        className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#D5CCBE] bg-white font-mono text-xs text-[#143527]"
                      />
                      <button
                        type="button"
                        onClick={handleCopyLink}
                        className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#1B4332] hover:bg-[#143527] text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                      >
                        {copiedLink ? <Check className="w-4 h-4 text-[#E2B13C]" /> : <Copy className="w-4 h-4 text-[#E2B13C]" />}
                        <span>{copiedLink ? 'Link Copied!' : 'Copy Referral Link'}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Social Share Buttons */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#143527] block">
                    Share Directly With Prospective Customers:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[44px] px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-[#0A1E14] font-bold text-xs flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp</span>
                    </a>

                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(activeReferralLink)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[44px] px-4 py-2.5 rounded-xl bg-[#1877F2] hover:opacity-90 text-white font-bold text-xs flex items-center justify-center gap-2"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>Facebook</span>
                    </a>

                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[44px] px-4 py-2.5 rounded-xl bg-[#14171A] hover:opacity-90 text-white font-bold text-xs flex items-center justify-center gap-2"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>X / Twitter</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleNativeShare}
                      className="min-h-[44px] px-4 py-2.5 rounded-xl border border-[#D5CCBE] bg-[#FAF7F2] hover:bg-[#EFE9DF] text-[#143527] font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Share2 className="w-4 h-4 text-[#C68A1B]" />
                      <span>More Platforms</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E5DDD0] text-center space-y-2">
                <ShieldCheck className="w-8 h-8 text-[#C68A1B] mx-auto" />
                <p className="text-sm font-bold text-[#143527]">Referral Link Not Active Yet</p>
                <p className="text-xs text-[#52635B]">
                  Once PGFV administrators approve your account, your unique referral code and sharing tools will appear here automatically.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Anonymized Referral Records Table (ZERO Customer PII) */}
        <div className="bg-white rounded-3xl p-6 border border-[#E5DDD0] shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#C68A1B] block">
                Referral Verification Feed
              </span>
              <h2 className="font-heading font-bold text-lg text-[#143527]">
                Attributed Order Statuses (Privacy Protected)
              </h2>
            </div>
            <span className="text-xs text-[#6B7B73]">
              Customer personal details are hidden for privacy compliance.
            </span>
          </div>

          {records.length === 0 ? (
            <div className="py-10 text-center text-xs sm:text-sm text-[#6B7B73] bg-[#FAF7F2] rounded-2xl border border-[#EFE8DC]">
              No orders have been attributed to your referral code yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[#E5DDD0] text-[11px] uppercase tracking-wider text-[#6B7B73]">
                    <th className="py-3 pr-4">Order Ref</th>
                    <th className="py-3 pr-4">Channel</th>
                    <th className="py-3 pr-4">Amount</th>
                    <th className="py-3 pr-4">Payment Status</th>
                    <th className="py-3 pr-4">Qualification</th>
                    <th className="py-3">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F2ECE1]">
                  {records.map((rec) => (
                    <tr key={rec.recordId}>
                      <td className="py-3 pr-4 font-mono font-bold text-[#143527]">{rec.orderRef}</td>
                      <td className="py-3 pr-4 capitalize">{rec.channel}</td>
                      <td className="py-3 pr-4 font-bold tabular-nums">
                        {rec.orderTotalNgn > 0 ? `₦${rec.orderTotalNgn.toLocaleString()}` : 'Quote Pending'}
                      </td>
                      <td className="py-3 pr-4 font-medium">{rec.paymentStatus.replace(/_/g, ' ')}</td>
                      <td className="py-3 pr-4">
                        <span
                          className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded ${
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
                      <td className="py-3 text-xs text-[#6B7B73]">{rec.rejectionReason || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Notifications Feed */}
        <div className="bg-white rounded-3xl p-6 border border-[#E5DDD0] shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#C68A1B]" />
            <h2 className="font-heading font-bold text-lg text-[#143527]">
              Notifications ({notifications.filter((n) => !n.read).length} unread)
            </h2>
          </div>

          {notifications.length === 0 ? (
            <p className="text-xs sm:text-sm text-[#6B7B73]">No notifications yet.</p>
          ) : (
            <div className="space-y-2.5">
              {notifications.map((n) => (
                <div
                  key={n.notificationId}
                  className={`p-4 rounded-2xl border flex items-start justify-between gap-4 ${
                    n.read ? 'bg-[#FDFBF7] border-[#EFE8DC]' : 'bg-[#FAF5EC] border-[#E2B13C]/50'
                  }`}
                >
                  <div className="space-y-1">
                    <p className="font-bold text-sm text-[#143527]">{n.title}</p>
                    <p className="text-xs text-[#52635B]">{n.message}</p>
                    <p className="text-[11px] text-[#7A8A81]">{formatFirestoreTimestamp(n.createdAt)}</p>
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
                      className="text-xs font-bold text-[#1B4332] hover:underline shrink-0 cursor-pointer"
                    >
                      Mark read
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
