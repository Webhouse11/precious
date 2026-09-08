import { 
  CheckCircle2, 
  Calendar, 
  ShieldCheck, 
  FileText, 
  CreditCard, 
  Truck, 
  HelpCircle,
  Clock,
  ArrowRight
} from 'lucide-react';
import { BUSINESS_INFO } from '../../data/mockData';

interface HowItWorksSectionProps {
  onStartSaving: () => void;
  onContactAssistance: () => void;
}

export function HowItWorksSection({ onStartSaving, onContactAssistance }: HowItWorksSectionProps) {
  const steps = [
    {
      num: '01',
      title: 'CHOOSE YOUR SAVINGS OPTION',
      desc: 'Select ₦2,000, ₦3,000, ₦5,000, ₦10,000 or ₦15,000 weekly based on your Christmas budget.',
      icon: CreditCard
    },
    {
      num: '02',
      title: 'REGISTER',
      desc: 'Provide your name, contact phone, delivery location, and communication preferences.',
      icon: FileText
    },
    {
      num: '03',
      title: 'MAKE PAYMENT',
      desc: 'Make payment smoothly through the designated official PGFV bank channel.',
      icon: CreditCard
    },
    {
      num: '04',
      title: 'PAYMENT VERIFICATION',
      desc: 'PGFV accounts team promptly checks and verifies the transaction.',
      icon: ShieldCheck
    },
    {
      num: '05',
      title: 'RECEIVE YOUR SAVINGS DETAILS',
      desc: 'Participant receives an official Savings Card, Unique Participant ID, payment receipt, and savings record.',
      icon: CheckCircle2
    },
    {
      num: '06',
      title: 'CONTINUE SAVING',
      desc: 'Continue payments weekly or upfront monthly according to your selected schedule.',
      icon: Clock
    },
    {
      num: '07',
      title: 'RECEIVE YOUR FOODSTUFF PACKAGE',
      desc: 'Package is hygienically prepared according to total savings, market prices and product availability, delivered to your doorstep.',
      icon: Truck
    }
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-[#FDFBF7] border-b border-[#E8E2D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Important Savings Dates Ribbon */}
        <div className="bg-[#1B4332] text-white rounded-3xl p-6 sm:p-10 mb-16 shadow-lg border border-[#2B5441]">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E2B13C] block mb-1">
              IMPORTANT PROGRAMME TIMELINE
            </span>
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
              KEY DATES FOR THE 2026 SAVINGS PLAN
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#143527] p-6 rounded-2xl border border-[#285541] flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#E2B13C]/20 text-[#E2B13C] flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#A8C7BA] uppercase block">
                  Savings Start
                </span>
                <h4 className="font-heading font-bold text-lg text-white">
                  {BUSINESS_INFO.dates.savingsStart}
                </h4>
                <p className="text-xs text-[#B2CEC2] mt-1">
                  Registration opens and weekly savings begin.
                </p>
              </div>
            </div>

            <div className="bg-[#143527] p-6 rounded-2xl border border-[#E2B13C]/40 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#E2B13C] text-[#122A20] flex items-center justify-center shrink-0 font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#E2B13C] uppercase block">
                  Final Payment / Catch-up Deadline
                </span>
                <h4 className="font-heading font-bold text-lg text-white">
                  {BUSINESS_INFO.dates.catchUpDeadline}
                </h4>
                <p className="text-xs text-[#B2CEC2] mt-1">
                  Final day to reconcile missed payments and complete savings.
                </p>
              </div>
            </div>

            <div className="bg-[#143527] p-6 rounded-2xl border border-[#285541] flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#E2B13C]/20 text-[#E2B13C] flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#A8C7BA] uppercase block">
                  Delivery Begins
                </span>
                <h4 className="font-heading font-bold text-lg text-white">
                  {BUSINESS_INFO.dates.deliveryBegins}
                </h4>
                <p className="text-xs text-[#B2CEC2] mt-1">
                  Doorstep distribution of Christmas foodstuffs kicks off.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 7-Step Visual Journey */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C68A1B] block mb-2">
            STEP-BY-STEP PROCESS
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-[#143527]">
            HOW TO JOIN & PARTICIPATE
          </h2>
          <p className="text-sm sm:text-base text-[#56655D] mt-2">
            Seven straightforward steps from initial plan selection to festive package delivery.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.slice(0, 4).map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-[#E8E2D5] shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-9 h-9 rounded-xl bg-[#1B4332] text-white flex items-center justify-center font-heading font-bold text-sm">
                      {step.num}
                    </span>
                    <Icon className="w-5 h-5 text-[#C68A1B]" />
                  </div>
                  <h4 className="font-heading font-bold text-sm text-[#143527] mb-2 leading-snug">
                    {step.title}
                  </h4>
                  <p className="text-xs text-[#55635C] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto">
          {steps.slice(4, 7).map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-[#E8E2D5] shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-9 h-9 rounded-xl bg-[#1B4332] text-white flex items-center justify-center font-heading font-bold text-sm">
                      {step.num}
                    </span>
                    <Icon className="w-5 h-5 text-[#C68A1B]" />
                  </div>
                  <h4 className="font-heading font-bold text-sm text-[#143527] mb-2 leading-snug">
                    {step.title}
                  </h4>
                  <p className="text-xs text-[#55635C] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Late Joining & Management Cards (Section 15 & 17) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Late Joining Card */}
          <div className="bg-[#FAF5EC] p-6 sm:p-8 rounded-3xl border border-[#E5DECة border-[#E5DDCF] flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C68A1B]/15 text-[#8F610E] text-xs font-bold uppercase mb-3">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>LATE JOINING POLICY</span>
              </div>
              <h3 className="font-heading font-bold text-xl text-[#143527] mb-3">
                CAN I JOIN AFTER THE PLAN HAS STARTED?
              </h3>
              <p className="text-sm font-bold text-[#1B4332] mb-2">
                YES.
              </p>
              <p className="text-xs sm:text-sm text-[#525E56] leading-relaxed mb-6">
                Participants joining after the plan has started will need to make up for the weeks already passed so that their savings can align with their selected plan.
              </p>
            </div>

            <button
              onClick={onContactAssistance}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#1B4332] hover:bg-[#143527] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors self-start"
              id="late-joining-assist-btn"
            >
              <span>CONTACT PGFV FOR ASSISTANCE</span>
              <ArrowRight className="w-4 h-4 text-[#E2B13C]" />
            </button>
          </div>

          {/* Accountability Card */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E3DCD0] shadow-sm flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1B4332]/10 text-[#1B4332] text-xs font-bold uppercase mb-3">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>ACCOUNTABILITY & TRUST</span>
              </div>
              <h3 className="font-heading font-bold text-xl text-[#143527] mb-2">
                YOUR SAVINGS. YOUR RECORD. YOUR CONFIDENCE.
              </h3>
              <p className="text-xs sm:text-sm text-[#525E56] leading-relaxed mb-4">
                PGFV understands that trust is important when participating in a savings plan. Every registered participant receives:
              </p>

              <div className="grid grid-cols-2 gap-2.5 mb-6 text-xs text-[#2B3831] font-medium">
                <div className="p-2 rounded-lg bg-[#F5EFE6] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1B4332] shrink-0" />
                  <span>Unique Participant ID</span>
                </div>
                <div className="p-2 rounded-lg bg-[#F5EFE6] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1B4332] shrink-0" />
                  <span>Official Savings Card</span>
                </div>
                <div className="p-2 rounded-lg bg-[#F5EFE6] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1B4332] shrink-0" />
                  <span>Verified Payment Receipts</span>
                </div>
                <div className="p-2 rounded-lg bg-[#F5EFE6] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1B4332] shrink-0" />
                  <span>Maintained Savings Records</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#EAE3D6] flex items-center justify-between">
              <span className="font-heading font-bold text-xs uppercase tracking-wider text-[#1B4332]">
                TRANSPARENCY MATTERS TO US.
              </span>
              <button
                onClick={onStartSaving}
                className="text-xs font-bold text-[#C68A1B] hover:underline"
              >
                Register Now →
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
