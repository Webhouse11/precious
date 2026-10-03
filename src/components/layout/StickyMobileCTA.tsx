import { Calendar, Calculator, Package, MessageCircle } from 'lucide-react';
import { PageView } from '../../types';
import { PGFV_WHATSAPP_PHONE, createWhatsAppUrl } from '../../utils/helpers';

interface StickyMobileCTAProps {
  currentPage?: PageView;
  onStartSaving: () => void;
  onViewPlans: () => void;
  onOrderStudentPackage?: () => void;
}

export function StickyMobileCTA({ 
  currentPage = 'home', 
  onStartSaving, 
  onViewPlans,
  onOrderStudentPackage 
}: StickyMobileCTAProps) {
  if (currentPage === 'students') {
    return (
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#122A20]/95 backdrop-blur-md border-t border-[#1E3F31] px-4 py-2.5 shadow-lg">
        <div className="flex items-center gap-2 max-w-md mx-auto">
          <button
            onClick={() => {
              const el = document.getElementById('student-packages-options');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex-1 py-2.5 px-3 rounded-xl border border-white/20 text-white font-semibold text-xs flex items-center justify-center gap-1.5 active:bg-white/10 transition-colors cursor-pointer"
          >
            <Package className="w-3.5 h-3.5 text-[#E2B13C]" />
            <span>SEE PACKAGES</span>
          </button>

          <button
            onClick={() => {
              if (onOrderStudentPackage) {
                onOrderStudentPackage();
              } else {
                const el = document.getElementById('student-order-form-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="flex-1 py-2.5 px-3 rounded-xl bg-[#25D366] text-[#0A1E14] font-bold text-xs flex items-center justify-center gap-1.5 shadow active:bg-[#20bd5a] transition-colors cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            <span>ENQUIRE (WhatsApp)</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#FDFBF7]/95 backdrop-blur-md border-t border-[#E8E2D5] px-4 py-2.5 shadow-lg">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        <button
          onClick={onViewPlans}
          className="flex-1 py-2.5 px-3 rounded-xl border border-[#1B4332] text-[#1B4332] font-semibold text-xs flex items-center justify-center gap-1.5 active:bg-[#EFE9DF] transition-colors cursor-pointer"
          id="mobile-sticky-view-plans-btn"
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>VIEW PLANS</span>
        </button>

        <button
          onClick={onStartSaving}
          className="flex-1 py-2.5 px-3 rounded-xl bg-[#1B4332] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow active:bg-[#143527] transition-colors cursor-pointer"
          id="mobile-sticky-saving-btn"
        >
          <Calendar className="w-3.5 h-3.5 text-[#E2B13C]" />
          <span>START SAVING</span>
        </button>
      </div>
    </div>
  );
}
