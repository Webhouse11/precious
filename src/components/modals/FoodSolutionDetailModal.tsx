import { useEffect } from 'react';
import { X, Check, MessageCircle, ArrowRight, Sparkles, Users, PackageCheck } from 'lucide-react';
import { FoodSolutionCategory } from '../../data/foodSolutionsData';
import { optimizeCloudinary, createWhatsAppUrl, PGFV_WHATSAPP_PHONE, PGFV_WHATSAPP_DISPLAY } from '../../utils/helpers';

interface FoodSolutionDetailModalProps {
  solution: FoodSolutionCategory | null;
  isOpen: boolean;
  onClose: () => void;
  onEnquire: (solution: FoodSolutionCategory) => void;
  onNavigateToStudents?: () => void;
}

export function FoodSolutionDetailModal({
  solution,
  isOpen,
  onClose,
  onEnquire,
  onNavigateToStudents
}: FoodSolutionDetailModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = origOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen || !solution) return null;

  const handleWhatsAppEnquiry = () => {
    const msg = `Hello Precious Gem Foods Ventures, I am inquiring about your "${solution.title}" food solution. Please provide more details on packages, pricing, and availability.`;
    window.open(createWhatsAppUrl(msg, PGFV_WHATSAPP_PHONE), '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/80 backdrop-blur-sm transition-opacity duration-200 animate-in fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="food-solution-modal-title"
    >
      <div
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#E3DCD0] flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative bg-[#1B4332] text-white px-5 sm:px-7 py-4.5 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#E2B13C] text-[#1B4332] flex items-center justify-center font-heading font-extrabold text-xs shadow-sm">
              {solution.number}
            </span>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#E2B13C] block">
                {solution.badge}
              </span>
              <h3 id="food-solution-modal-title" className="font-heading font-bold text-lg sm:text-xl text-white leading-tight">
                {solution.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-5 sm:p-7 space-y-6 flex-1 text-[#222B26]">
          {/* Hero Banner inside modal */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center bg-[#FAF7F2] p-4.5 rounded-2xl border border-[#EBE4D8]">
            <div className="sm:col-span-5 h-48 rounded-xl overflow-hidden shadow-sm border border-white">
              <img
                src={optimizeCloudinary(solution.image, 600)}
                alt={solution.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="sm:col-span-7 space-y-2.5">
              <span className="text-xs font-bold text-[#C68A1B] uppercase tracking-wider block">
                Food Solutions Overview
              </span>
              <h4 className="font-heading font-extrabold text-base sm:text-lg text-[#143527] leading-snug">
                {solution.shortDescription}
              </h4>
              <p className="text-xs sm:text-sm text-[#4E5C54] leading-relaxed">
                {solution.detailedDescription}
              </p>
            </div>
          </div>

          {/* Target Audience */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-[#143527] uppercase tracking-wider">
              <Users className="w-4 h-4 text-[#C68A1B]" />
              <span>Recommended & Ideal For:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {solution.targetAudience.map((aud, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-white border border-[#E0D7C9] text-xs font-semibold text-[#1B4332] shadow-2xs"
                >
                  {aud}
                </span>
              ))}
            </div>
          </div>

          {/* Key Benefits */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm sm:text-base text-[#143527] flex items-center gap-2 border-b border-[#EAE3D6] pb-2">
              <Sparkles className="w-4 h-4 text-[#C68A1B]" />
              <span>Key Advantages & Features</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {solution.keyBenefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8E1D5] flex items-start gap-2.5 text-xs text-[#3E4F46]"
                >
                  <div className="w-4 h-4 rounded-full bg-[#1B4332]/10 text-[#1B4332] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="leading-relaxed">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* What is Typically Included */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm sm:text-base text-[#143527] flex items-center gap-2 border-b border-[#EAE3D6] pb-2">
              <PackageCheck className="w-4 h-4 text-[#C68A1B]" />
              <span>What Is Typically Included / Offered:</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#4E5C54]">
              {solution.typicalInclusions.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#E2B13C] shrink-0 mt-1.5"></span>
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="bg-[#FAF7F2] px-5 sm:px-7 py-4 border-t border-[#E8E1D5] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-[#607168] text-center sm:text-left">
            <span>Direct support via WhatsApp at </span>
            <strong className="text-[#143527]">{PGFV_WHATSAPP_DISPLAY}</strong>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            {solution.id === 'student-packages' && onNavigateToStudents && (
              <button
                onClick={() => {
                  onClose();
                  onNavigateToStudents();
                }}
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-[#1B4332] text-[#1B4332] hover:bg-[#1B4332] hover:text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>View Student Packages Page</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              onClick={() => {
                onClose();
                onEnquire(solution);
              }}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-[#1B4332] hover:bg-[#143527] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <span>Make an Enquiry</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#E2B13C]" />
            </button>

            <button
              onClick={handleWhatsAppEnquiry}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-[#0A1E14] text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
              title="Chat directly on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span className="hidden sm:inline">WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
