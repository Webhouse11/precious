import { X, Lock } from 'lucide-react';
import { BUSINESS_INFO } from '../../data/mockData';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-[#E8E2D5] my-auto">
        
        {/* Header */}
        <div className="bg-[#1B4332] text-white p-5 sm:p-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E2B13C] text-[#122A20] flex items-center justify-center font-bold">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-base sm:text-lg text-white">
                Privacy Policy
              </h3>
              <p className="text-xs text-[#BED5C9]">
                Precious Gem Foods Ventures (PGFV)
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
        <div className="p-6 sm:p-8 overflow-y-auto space-y-4 text-xs sm:text-sm text-[#47554E] leading-relaxed">
          <p>
            At <strong>Precious Gem Foods Ventures (PGFV)</strong>, we respect your privacy and are committed to protecting the personal information you share with us.
          </p>

          <h4 className="font-heading font-bold text-sm text-[#143527] pt-2">
            1. Information We Collect
          </h4>
          <p>
            We collect participant registration details including your full name, phone number (WhatsApp), email address, residential/delivery destination, and food preferences strictly for the purpose of managing your savings plan, verifying contributions, and arranging doorstep delivery.
          </p>

          <h4 className="font-heading font-bold text-sm text-[#143527] pt-2">
            2. How We Use Your Data
          </h4>
          <p>
            Your information is used exclusively to:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-1">
            <li>Generate your official Savings Card and Unique Participant ID.</li>
            <li>Send verified payment receipts and savings reconciliations.</li>
            <li>Coordinate packaging according to your submitted preferences and budget.</li>
            <li>Dispatch deliveries to your provided destination across Nigeria.</li>
          </ul>

          <h4 className="font-heading font-bold text-sm text-[#143527] pt-2">
            3. Data Confidentiality & Security
          </h4>
          <p>
            We do not sell, rent, or trade your personal details to third-party advertisers. All participant data is treated with professional integrity.
          </p>

          <h4 className="font-heading font-bold text-sm text-[#143527] pt-2">
            4. Contact Us
          </h4>
          <p>
            For any questions regarding your personal details or savings data, please reach out to our team at {BUSINESS_INFO.phone} or {BUSINESS_INFO.email}.
          </p>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 bg-[#FDFBF7] border-t border-[#E8E2D5] flex items-center justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#1B4332] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#143527]"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
