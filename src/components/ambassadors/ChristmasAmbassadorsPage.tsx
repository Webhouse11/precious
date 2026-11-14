import React, { useEffect, useState } from 'react';
import {
  Gift,
  Users,
  CheckCircle2,
  ArrowRight,
  Calendar,
  Target,
  Award,
  Share2,
  ShieldCheck,
  ChevronDown,
  ChevronRight,
  LogIn,
  ShoppingBag,
  HelpCircle,
  Sparkles,
  FileText
} from 'lucide-react';
import christmasFoodBoxImg from '../../assets/images/pgfv_christmas_food_box_1794694764286.jpg';
import { getActiveCampaign } from '../../services/referralService';
import { DEFAULT_CHRISTMAS_CAMPAIGN } from '../../utils/referralUtils';
import { Campaign } from '../../types/referral';
import { PageView } from '../../types';

interface ChristmasAmbassadorsPageProps {
  onNavigate: (page: PageView, sectionId?: string) => void;
}

const AMBASSADOR_FAQS = [
  {
    q: 'Who can become a PGFV Christmas Ambassador?',
    a: 'Students, professionals, community leaders, homemakers, content creators, and loyal PGFV supporters across Nigeria who want to share trusted PGFV foodstuffs with new customers.'
  },
  {
    q: 'How are my 10 qualifying referrals verified?',
    a: 'Every referred customer must be a genuinely new PGFV customer (checked by normalized phone number and email address) whose order is completed and whose bank transfer or manual payment is verified by PGFV administrators.'
  },
  {
    q: 'Do WhatsApp orders count for referrals?',
    a: 'Yes! Customers who click your referral link and then tap any WhatsApp ordering button on our website will automatically have your referral code and a unique order reference included in their message. Once they pay and PGFV reconciles and verifies the bank transfer, it counts toward your target.'
  },
  {
    q: 'Does clicking my referral link or submitting an unpaid form count as 1 referral?',
    a: 'No. Link visits are tracked separately for your insight, and unpaid forms stay "Awaiting Payment Verification". Only completed orders with manually verified payments from genuine new customers count toward your 10/10 target.'
  },
  {
    q: 'Can I refer myself or existing PGFV customers?',
    a: 'No. Self-referrals (matching your phone number or email) and repeat orders from existing PGFV customers are automatically flagged and excluded from qualification.'
  },
  {
    q: 'When and how do I receive my ₦8,000 PGFV Christmas Food Box?',
    a: 'As soon as your 10th qualifying referral is verified, your dashboard displays a Congratulations notice and alerts PGFV management. Once management approves your reward, we coordinate collection at Ile-Ife or agreed delivery logistics.'
  }
];

export const ChristmasAmbassadorsPage: React.FC<ChristmasAmbassadorsPageProps> = ({
  onNavigate
}) => {
  const [campaign, setCampaign] = useState<Campaign>(DEFAULT_CHRISTMAS_CAMPAIGN);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showTerms, setShowTerms] = useState(false);

  useEffect(() => {
    getActiveCampaign('christmas-2026').then(setCampaign).catch(() => {});
  }, []);

  const targetCount = campaign.referralTarget || 10;
  const rewardValue = campaign.rewardValueNgn || 8000;

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1E2320]">
      {/* Breadcrumb bar */}
      <div className="bg-[#FAF5EC] border-b border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#6B7B73]">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="hover:text-[#1B4332] font-medium cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#143527] font-bold">PGFV Christmas Ambassador Programme 2026</span>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('ambassador-login')}
            className="inline-flex items-center gap-1.5 text-[#1B4332] hover:text-[#143527] font-bold cursor-pointer"
          >
            <LogIn className="w-3.5 h-3.5 text-[#C68A1B]" />
            <span>Already an Ambassador? Sign In</span>
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#143527] via-[#1B4332] to-[#122A20] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_top_right,#E2B13C,transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E2B13C]">
                <Sparkles className="w-4 h-4" />
                <span>PGFV Christmas Referral Ambassador Programme 2026</span>
              </div>

              <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-[3.25rem] leading-[1.08] tracking-tight text-white">
                BECOME A PGFV CHRISTMAS AMBASSADOR!
              </h1>

              <p className="text-base sm:text-lg text-[#E4EDE7] leading-relaxed max-w-2xl">
                Share the goodness of Precious Gem Foods this Christmas. Invite new customers to shop with us and earn a special PGFV Christmas Food Box when you successfully refer 10 qualifying new customers.
              </p>

              {/* Key Campaign Figures - Clean Grid (No Pill Spam) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E2B13C] mb-1">
                    <Calendar className="w-4 h-4" />
                    <span>Campaign Period</span>
                  </div>
                  <p className="font-heading font-extrabold text-lg text-white">
                    December 1–10, 2026
                  </p>
                  <p className="text-[11px] text-[#C8DBD1] mt-0.5">Africa/Lagos time window</p>
                </div>

                <div className="p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E2B13C] mb-1">
                    <Target className="w-4 h-4" />
                    <span>Target</span>
                  </div>
                  <p className="font-heading font-extrabold text-lg text-white">
                    {targetCount} qualifying new customers
                  </p>
                  <p className="text-[11px] text-[#C8DBD1] mt-0.5">Verified paid orders</p>
                </div>

                <div className="p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E2B13C] mb-1">
                    <Gift className="w-4 h-4" />
                    <span>Reward</span>
                  </div>
                  <p className="font-heading font-extrabold text-lg text-white">
                    One ₦{rewardValue.toLocaleString()} PGFV Christmas Food Box
                  </p>
                  <p className="text-[11px] text-[#C8DBD1] mt-0.5">Hygienic PGFV hamper</p>
                </div>
              </div>

              {/* Primary CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('christmas-ambassadors-register')}
                  className="min-h-[48px] px-7 py-3.5 rounded-xl bg-[#E2B13C] hover:bg-[#d4a32e] text-[#143527] font-heading font-extrabold text-sm sm:text-base shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                  id="hero-ambassador-register-btn"
                >
                  <span>Apply as Christmas Ambassador</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('ambassador-login')}
                  className="min-h-[48px] px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/25 font-bold text-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  <LogIn className="w-4 h-4 text-[#E2B13C]" />
                  <span>Ambassador Dashboard Login</span>
                </button>
              </div>
            </div>

            {/* Clean Visual Asset Showcase */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden border-4 border-[#E2B13C]/40 shadow-2xl bg-[#0E2219]">
                <img
                  src={christmasFoodBoxImg}
                  alt="One ₦8,000 PGFV Christmas Food Box Ambassador Reward"
                  className="w-full h-72 sm:h-96 object-cover"
                />
                <div className="p-5 bg-[#11271D] border-t border-white/10">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#E2B13C]">
                    Ambassador Qualification Reward
                  </p>
                  <h2 className="font-heading font-extrabold text-xl text-white mt-0.5">
                    One ₦{rewardValue.toLocaleString()} PGFV Christmas Food Box
                  </h2>
                  <p className="text-xs text-[#C8DBD1] mt-1">
                    Curated from PGFV’s stone-free beans flour, staple grains, seasonings, and festive essentials.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How the Programme Works */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C68A1B] block">
              STEP-BY-STEP PROCESS
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#143527]">
              How the Christmas Ambassador Programme Works
            </h2>
            <p className="text-sm text-[#52635B]">
              A transparent, fair referral flow tracked from initial link click to verified bank payment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                icon: Users,
                title: 'Register & Get Approved',
                desc: 'Submit your ambassador application online. PGFV management reviews and manually approves your account, generating your unique referral code.'
              },
              {
                step: '02',
                icon: Share2,
                title: 'Share Your Unique Link',
                desc: 'Access your Ambassador Dashboard to copy your personal link (e.g. preciousgemfoods.com.ng/?ref=CODE) and share via WhatsApp, Facebook, or IG.'
              },
              {
                step: '03',
                icon: ShoppingBag,
                title: 'Customers Order & Pay',
                desc: 'New customers browse products and order via the website or WhatsApp. Your referral attribution stays active for 30 days (within Dec 1–10).'
              },
              {
                step: '04',
                icon: Award,
                title: 'Hit 10/10 & Earn Box',
                desc: 'Once 10 genuine new customers complete orders with PGFV-verified bank payments, you unlock your ₦8,000 PGFV Christmas Food Box.'
              }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="p-6 rounded-2xl bg-[#FDFBF7] border border-[#E5DDD0] space-y-3 hover:border-[#1B4332]/40 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-xl bg-[#1B4332] text-[#E2B13C] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-heading font-extrabold text-2xl text-[#D8CFC0]">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-lg text-[#143527]">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#52635B] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits & Qualification Requirements Split */}
      <section className="py-16 sm:py-20 bg-[#FAF7F2] border-b border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Benefits */}
          <div className="bg-white p-7 sm:p-9 rounded-3xl border border-[#E5DDD0] shadow-xs space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#C68A1B] block">
                WHY JOIN US THIS CHRISTMAS
              </span>
              <h2 className="font-heading font-extrabold text-2xl text-[#143527] mt-1">
                Ambassador Benefits
              </h2>
            </div>

            <ul className="space-y-3.5 text-sm text-[#3E4D45]">
              {[
                'Earn one ₦8,000 PGFV Christmas Food Box packed with hygienic foodstuffs upon referring 10 qualifying new customers.',
                'Dedicated personal Ambassador Dashboard to track link visits, pending orders, and verified progress from 0/10 to 10/10.',
                'Zero sign-up cost or inventory purchase required — simply share trusted PGFV products with friends, family, campus peers, and colleagues.',
                'Supports both website catalogue orders and direct WhatsApp orders with automatic referral attribution.',
                'Full 30-day first-valid-referral cookie protection within the campaign window.'
              ].map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#1B4332] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Qualification Requirements */}
          <div className="bg-white p-7 sm:p-9 rounded-3xl border border-[#E5DDD0] shadow-xs space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#1B4332] block">
                TRANSPARENCY & INTEGRITY
              </span>
              <h2 className="font-heading font-extrabold text-2xl text-[#143527] mt-1">
                Qualification Requirements
              </h2>
            </div>

            <ul className="space-y-3.5 text-sm text-[#3E4D45]">
              {[
                'Your ambassador application must be reviewed and approved by PGFV administrators before your referral link goes live.',
                'Referred buyers must be genuinely new customers (verified by normalized phone number and email address).',
                'Orders must be placed between December 1 and December 10, 2026 (Africa/Lagos), completed, and not cancelled or refunded.',
                'Bank transfer or manual payment for the order must be verified by PGFV management.',
                'Self-referrals and duplicate accounts for the same customer are excluded; each unique new customer counts once.'
              ].map((req, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#C68A1B] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#E8E2D5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C68A1B] block">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#143527]">
              Questions About the Programme
            </h2>
          </div>

          <div className="space-y-3">
            {AMBASSADOR_FAQS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-[#E5DDD0] bg-[#FDFBF7] overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="font-heading font-bold text-sm sm:text-base text-[#143527] flex items-center gap-2.5">
                      <HelpCircle className="w-4 h-4 text-[#C68A1B] shrink-0" />
                      <span>{item.q}</span>
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#1B4332] shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-[#52635B] leading-relaxed border-t border-[#EFE8DC]">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Campaign Terms & Conditions */}
      <section className="py-14 bg-[#FAF7F2] border-b border-[#E8E2D5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-[#E5DDD0] p-6 sm:p-8 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-[#1B4332]" />
                <h2 className="font-heading font-extrabold text-xl text-[#143527]">
                  Campaign Terms & Conditions
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setShowTerms(!showTerms)}
                className="text-xs font-bold text-[#1B4332] hover:underline cursor-pointer self-start sm:self-auto"
              >
                {showTerms ? 'Hide Full Terms' : 'Read Full Terms & Conditions'}
              </button>
            </div>

            <p className="text-xs sm:text-sm text-[#52635B] leading-relaxed">
              {campaign.qualificationRules}
            </p>

            {showTerms && (
              <div className="pt-3 border-t border-[#EFE8DC] space-y-2.5 text-xs text-[#52635B] leading-relaxed">
                <p>
                  <strong>1. Eligibility & Approval:</strong> Applicants must submit accurate contact information via the official registration page. Precious Gem Foods Ventures (PGFV) reserves the right to approve, reject, or suspend ambassador accounts suspected of fraud, spam, or policy violation.
                </p>
                <p>
                  <strong>2. Attribution Window:</strong> Referral links use first-valid-referral tracking for up to {campaign.attributionWindowDays || 30} days, subject to campaign closing date ({campaign.endDate}, Africa/Lagos).
                </p>
                <p>
                  <strong>3. Genuine New Customers Only:</strong> Customers who have previously completed orders with PGFV or whose phone number or email matches the referring ambassador do not qualify. Each customer is counted at most once per campaign.
                </p>
                <p>
                  <strong>4. Manual Payment Verification:</strong> Because PGFV accepts bank transfers and manual payment confirmation, an order only qualifies after PGFV administrators confirm the actual bank deposit and mark the order completed. Cancelled, rejected, or refunded orders are excluded.
                </p>
                <p>
                  <strong>5. Privacy Protection:</strong> To comply with data privacy standards, ambassadors receive aggregated counts and anonymized order status updates only. Customer personal details (full names, phone numbers, emails, delivery addresses) are never visible to ambassadors.
                </p>
                <p>
                  <strong>6. Reward Fulfilment:</strong> Qualified ambassadors (10/10 verified referrals) receive One ₦{rewardValue.toLocaleString()} PGFV Christmas Food Box subject to final PGFV management approval and collection scheduling. Rewards are not marked collected automatically.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Final CTA Strip */}
      <section className="py-14 bg-[#1B4332] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
            Ready to Share PGFV Quality This Christmas?
          </h2>
          <p className="text-sm sm:text-base text-[#D8E6DE] max-w-xl mx-auto">
            Apply in under 2 minutes. Once approved, start sharing your referral link with prospective new customers.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('christmas-ambassadors-register')}
              className="min-h-[48px] px-7 py-3 rounded-xl bg-[#E2B13C] hover:bg-[#d4a32e] text-[#143527] font-heading font-extrabold text-sm cursor-pointer"
            >
              Register Now
            </button>
            <button
              type="button"
              onClick={() => onNavigate('catalogue')}
              className="min-h-[48px] px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/25 font-bold text-sm cursor-pointer"
            >
              Explore Product Catalogue
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
