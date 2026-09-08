import { Calendar, Calculator } from 'lucide-react';

interface StickyMobileCTAProps {
  onStartSaving: () => void;
  onViewPlans: () => void;
}

export function StickyMobileCTA({ onStartSaving, onViewPlans }: StickyMobileCTAProps) {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#FDFBF7]/95 backdrop-blur-md border-t border-[#E8E2D5] px-4 py-2.5 shadow-lg">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        <button
          onClick={onViewPlans}
          className="flex-1 py-2.5 px-3 rounded-xl border border-[#1B4332] text-[#1B4332] font-semibold text-xs flex items-center justify-center gap-1.5 active:bg-[#EFE9DF] transition-colors"
          id="mobile-sticky-view-plans-btn"
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>VIEW PLANS</span>
        </button>

        <button
          onClick={onStartSaving}
          className="flex-1 py-2.5 px-3 rounded-xl bg-[#1B4332] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow active:bg-[#143527] transition-colors"
          id="mobile-sticky-saving-btn"
        >
          <Calendar className="w-3.5 h-3.5 text-[#E2B13C]" />
          <span>START SAVING</span>
        </button>
      </div>
    </div>
  );
}
