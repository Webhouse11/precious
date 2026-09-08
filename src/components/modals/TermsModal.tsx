import { X, ShieldCheck, Check } from 'lucide-react';
import { TERMS_CONDITIONS, BUSINESS_INFO } from '../../data/mockData';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAcceptAndRegister?: () => void;
}

export function TermsModal({ isOpen, onClose, onAcceptAndRegister }: TermsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-[#E8E2D5] my-auto">
        
        {/* Header */}
        <div className="bg-[#1B4332] text-white p-5 sm:p-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E2B13C] text-[#122A20] flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-base sm:text-lg text-white">
                Terms & Conditions
              </h3>
              <p className="text-xs text-[#BED5C9]">
                PGFV Christmas Foodstuff Savings Plan • Authoritative Rules
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-5 text-xs sm:text-sm text-[#47554E] leading-relaxed">
          <div className="p-3.5 bg-[#FAF7F2] rounded-2xl border border-[#EBE4D8] text-xs text-[#143527]">
            <strong>Official Agreement:</strong> Participation in the Precious Gem Foods Ventures (PGFV) Christmas Foodstuff Savings Plan is governed by the 15 standard provisions detailed below.
          </div>

          <ol className="space-y-3 list-decimal list-inside pl-1">
            {TERMS_CONDITIONS.map((rule, idx) => (
              <li key={idx} className="pl-1 text-[#33423A]">
                <span className="font-medium">{rule}</span>
              </li>
            ))}
          </ol>

          <div className="pt-3 border-t border-[#EAE3D6] text-xs text-[#718077]">
            <p>
              Programme Timeline: Savings start <strong>{BUSINESS_INFO.dates.savingsStart}</strong>; final catch-up deadline <strong>{BUSINESS_INFO.dates.catchUpDeadline}</strong>; doorstep delivery begins <strong>{BUSINESS_INFO.dates.deliveryBegins}</strong>.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 bg-[#FDFBF7] border-t border-[#E8E2D5] flex items-center justify-end gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-[#D5CCBE] text-[#1B4332] text-xs font-semibold hover:bg-[#FAF7F2]"
          >
            Close Window
          </button>

          {onAcceptAndRegister && (
            <button
              onClick={() => {
                onClose();
                onAcceptAndRegister();
              }}
              className="px-6 py-2.5 rounded-xl bg-[#1B4332] hover:bg-[#143527] text-white text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5"
            >
              <Check className="w-4 h-4 text-[#E2B13C]" />
              <span>I Understand & Agree</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
