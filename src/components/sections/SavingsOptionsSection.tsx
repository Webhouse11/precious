import { Check, Sparkles, ArrowRight, HelpCircle } from 'lucide-react';
import { SAVINGS_PLANS } from '../../data/mockData';
import { SavingsPlan } from '../../types';

interface SavingsOptionsSectionProps {
  onSelectPlan: (plan: SavingsPlan) => void;
  onAskMonthly: () => void;
}

export function SavingsOptionsSection({ onSelectPlan, onAskMonthly }: SavingsOptionsSectionProps) {
  return (
    <section id="savings-options" className="py-16 sm:py-24 bg-[#FDFBF7] border-b border-[#E8E2D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C68A1B] block mb-2">
            FIVE FLEXIBLE TIERS
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-[#143527]">
            CHOOSE YOUR SAVINGS OPTION
          </h2>
          <p className="text-sm sm:text-base text-[#56655D] mt-3">
            Select a weekly plan that aligns with your family budget. No hidden fees, no interest claims — pure foodstuff planning.
          </p>
        </div>

        {/* 5 Savings Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-12">
          {SAVINGS_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl p-6 flex flex-col justify-between transition-all duration-200 relative ${
                plan.popular
                  ? 'bg-white border-2 border-[#1B4332] shadow-lg scale-100 sm:scale-105 z-10'
                  : 'bg-white border border-[#E5DECة border-[#E5DDD0] shadow-xs hover:shadow-md'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#E2B13C] text-[#122A20] text-[10px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                  MOST POPULAR
                </div>
              )}

              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#796B5E] mb-2">
                  Weekly Plan
                </div>

                <div className="font-heading font-extrabold text-2xl text-[#143527] mb-2">
                  {plan.label}
                </div>

                <div className="p-2.5 rounded-xl bg-[#F7F4ED] border border-[#EAE3D5] text-xs font-medium text-[#1B4332] mb-4">
                  “{plan.tagline}”
                </div>

                <p className="text-xs text-[#55635C] leading-relaxed mb-6">
                  {plan.recommendedFor}
                </p>

                <ul className="space-y-2 text-xs text-[#4F5B54] mb-6">
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#1B4332]" />
                    <span>Official Savings Card</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#1B4332]" />
                    <span>Unique Participant ID</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#1B4332]" />
                    <span>Verified Digital Receipts</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#1B4332]" />
                    <span>Food Preference Option</span>
                  </li>
                </ul>
              </div>

              <div>
                <button
                  onClick={() => onSelectPlan(plan)}
                  className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                    plan.popular
                      ? 'bg-[#1B4332] hover:bg-[#143527] text-white shadow-sm'
                      : 'bg-[#F2ECE1] hover:bg-[#1B4332] text-[#1B4332] hover:text-white'
                  }`}
                  id={`select-plan-${plan.weeklyAmount}`}
                >
                  <span>SELECT THIS PLAN</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Section 16 Highlight: Prefer to pay monthly? */}
        <div className="max-w-3xl mx-auto bg-[#F4EFE6] rounded-2xl p-6 sm:p-8 border border-[#DFD6C7] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B4332] bg-[#E2B13C]/20 px-2.5 py-0.5 rounded-full">
              <HelpCircle className="w-3.5 h-3.5 text-[#C68A1B]" />
              <span>MONTHLY SAVINGS OPTION</span>
            </div>
            <h3 className="font-heading font-bold text-lg text-[#143527]">
              PREFER TO PAY MONTHLY?
            </h3>
            <p className="text-xs sm:text-sm text-[#4E5A53] leading-relaxed max-w-xl">
              YES. Participants who prefer monthly payment can pay the equivalent of their selected weekly savings amount upfront for the applicable weeks (e.g. A participant on the ₦5,000 weekly plan may pay ₦20,000 upfront for 4 weeks).
            </p>
          </div>

          <button
            onClick={onAskMonthly}
            className="shrink-0 px-5 py-2.5 rounded-xl bg-white hover:bg-[#1B4332] text-[#1B4332] hover:text-white border border-[#C9BFAة border-[#C9BFB0] font-bold text-xs shadow-xs transition-all"
            id="ask-about-monthly-btn"
          >
            ASK ABOUT MONTHLY PAYMENT
          </button>
        </div>

      </div>
    </section>
  );
}
