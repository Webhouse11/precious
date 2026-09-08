import { Calendar, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { BUSINESS_INFO } from '../../data/mockData';

interface ChristmasSavingsSectionProps {
  onStartSaving: () => void;
  onScrollToOptions: () => void;
}

export function ChristmasSavingsSection({ onStartSaving, onScrollToOptions }: ChristmasSavingsSectionProps) {
  return (
    <section id="savings-section" className="py-16 sm:py-24 bg-[#1B4332] text-white relative overflow-hidden border-b border-[#244E3B]">
      {/* Decorative Warm Background Accents */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-80 h-80 rounded-full bg-[#E2B13C]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-80 h-80 rounded-full bg-[#122A20] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Pill */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E2B13C]/20 border border-[#E2B13C]/40 text-[#E2B13C] text-xs font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#E2B13C]" />
            <span>FEATURED 2026 FLAGSHIP INITIATIVE</span>
          </div>
        </div>

        {/* Section Headline */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            PLAN AHEAD. SAVE GRADUALLY. <br className="hidden sm:inline" />
            <span className="text-[#E2B13C]">CELEBRATE BETTER.</span>
          </h2>

          <p className="text-sm sm:text-lg text-[#D4E4DC] leading-relaxed">
            The PGFV Christmas Foodstuff Savings Plan helps individuals and families plan ahead and save gradually towards their Christmas foodstuff needs.
          </p>

          <p className="text-xs sm:text-sm text-[#A8C4B7] leading-relaxed max-w-2xl mx-auto">
            Instead of waiting until December to handle heavy Christmas food expenses at once, participants can start early, save consistently and receive a foodstuff package based on their total savings.
          </p>

          <div className="pt-2">
            <div className="inline-block px-5 py-2.5 rounded-2xl bg-[#143628] border border-[#2A5743] shadow-inner text-xs sm:text-sm font-bold tracking-wider text-[#E2B13C]">
              SMALL SAVINGS • CONSISTENT PLANNING • A MORE PREPARED CHRISTMAS
            </div>
          </div>
        </div>

        {/* Highlight Banner Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto mb-10">
          <div className="bg-[#143527]/90 backdrop-blur-sm p-6 rounded-2xl border border-[#285541]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#E2B13C] block mb-1">
              Start Early
            </span>
            <h3 className="font-heading font-bold text-lg text-white mb-2">
              September 1, 2026
            </h3>
            <p className="text-xs text-[#B2CEC2] leading-relaxed">
              Commence contributions early so weekly amounts remain low, affordable, and stress-free.
            </p>
          </div>

          <div className="bg-[#143527]/90 backdrop-blur-sm p-6 rounded-2xl border border-[#285541]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#E2B13C] block mb-1">
              Final Reconciliation
            </span>
            <h3 className="font-heading font-bold text-lg text-white mb-2">
              December 15, 2026
            </h3>
            <p className="text-xs text-[#B2CEC2] leading-relaxed">
              Final payment and catch-up deadline. All records reconciled with transparency.
            </p>
          </div>

          <div className="bg-[#143527]/90 backdrop-blur-sm p-6 rounded-2xl border border-[#285541]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#E2B13C] block mb-1">
              Nationwide Delivery
            </span>
            <h3 className="font-heading font-bold text-lg text-white mb-2">
              December 21, 2026
            </h3>
            <p className="text-xs text-[#B2CEC2] leading-relaxed">
              Hygienic sorting and doorstep deliveries commence in good time for Christmas festivities.
            </p>
          </div>
        </div>

        {/* Action Button Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onStartSaving}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#E2B13C] hover:bg-[#C68A1B] text-[#122A20] font-extrabold text-sm uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2"
            id="christmas-start-saving-btn"
          >
            <Calendar className="w-4 h-4 text-[#122A20]" />
            <span>JOIN THE SAVINGS PLAN</span>
          </button>

          <button
            onClick={onScrollToOptions}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all flex items-center justify-center gap-2"
          >
            <span>View 5 Weekly Options</span>
            <ArrowRight className="w-4 h-4 text-[#E2B13C]" />
          </button>
        </div>

      </div>
    </section>
  );
}
