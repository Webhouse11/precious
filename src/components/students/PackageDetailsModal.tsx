import { useEffect } from 'react';
import { X, Check, Package, Sparkles, MessageCircle, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { StudentPackage } from '../../data/studentPackagesData';
import { formatNaira, optimizeCloudinary } from '../../utils/helpers';

interface PackageDetailsModalProps {
  packageData: StudentPackage | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectPackage: (pkg: StudentPackage) => void;
}

export function PackageDetailsModal({
  packageData,
  isOpen,
  onClose,
  onSelectPackage
}: PackageDetailsModalProps) {
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

  if (!isOpen || !packageData) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/75 backdrop-blur-sm transition-opacity duration-200 animate-in fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="package-details-title"
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#E3DCD0] flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-[#1B4332] text-white px-5 sm:px-6 py-4 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#E2B13C] text-[#1B4332] flex items-center justify-center font-bold text-sm">
              <Package className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/15 text-[#E2B13C]">
                  {packageData.badge}
                </span>
                <span className="text-xs text-[#C6DACF] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]"></span>
                  {packageData.availability}
                </span>
              </div>
              <h3 id="package-details-title" className="font-heading font-bold text-lg sm:text-xl text-white">
                {packageData.name}
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

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6 flex-1 text-[#222B26]">
          {/* Image + Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center bg-[#FAF7F2] p-4 rounded-2xl border border-[#EBE4D8]">
            <div className="sm:col-span-5 h-44 rounded-xl overflow-hidden shadow-sm border border-white">
              <img
                src={optimizeCloudinary(packageData.image, 500)}
                alt={packageData.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="sm:col-span-7 space-y-2.5">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#1B4332]">
                  {packageData.price > 0 ? formatNaira(packageData.price) : 'Custom Budget'}
                </span>
                {packageData.price > 0 && (
                  <span className="text-xs text-[#6F7F77]">per package</span>
                )}
              </div>

              <p className="text-sm text-[#4E5C54] leading-relaxed">
                {packageData.description}
              </p>

              <div className="pt-1 flex items-center gap-2 text-xs text-[#1B4332] font-semibold">
                <Sparkles className="w-4 h-4 text-[#C68A1B]" />
                <span>Target: {packageData.targetAudience}</span>
              </div>
            </div>
          </div>

          {/* Included Items List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-[#EBE4D8] pb-2">
              <h4 className="font-heading font-bold text-base text-[#143527] flex items-center gap-2">
                <span>Included Food Items & Measurements</span>
                <span className="text-xs font-normal text-[#6F7F77]">
                  ({packageData.items.length} staples)
                </span>
              </h4>
              <span className="text-xs text-[#C68A1B] font-semibold bg-[#E2B13C]/10 px-2.5 py-0.5 rounded-full">
                Hygienically Packed
              </span>
            </div>

            <div className="space-y-2.5">
              {packageData.items.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-white border border-[#E8E1D5] hover:border-[#1B4332]/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#1B4332]/10 text-[#1B4332] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-[#1B4332]" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-[#1B4332]">
                        {item.name}
                      </p>
                      {item.description && (
                        <p className="text-xs text-[#6C7B73] mt-0.5">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 pl-7 sm:pl-0">
                    <span className="text-xs font-bold text-[#143527] bg-[#FAF7F2] px-2.5 py-1 rounded-lg border border-[#E2DBD0]">
                      {item.quantity}
                    </span>
                    {item.availableMeasurements && item.availableMeasurements.length > 1 && (
                      <span className="text-[11px] text-[#86958E]" title="Available options">
                        ({item.availableMeasurements.join(' / ')})
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery & Important Notes */}
          <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#EAE3D6] space-y-2 text-xs text-[#52635A]">
            <div className="flex items-center gap-2 font-bold text-[#1B4332]">
              <MapPin className="w-4 h-4 text-[#C68A1B]" />
              <span>Campus Hostel & Off-Campus Delivery</span>
            </div>
            <p>
              We deliver to student hostels, residences, and pickup points across Ile-Ife (OAU, UNIOSUN, etc.) and other campuses in Osun State. Preferred delivery dates and arrangements will be confirmed directly with you on WhatsApp.
            </p>
            {packageData.notes && packageData.notes.length > 0 && (
              <ul className="list-disc list-inside space-y-1 pt-1 text-[#607168]">
                {packageData.notes.map((note, idx) => (
                  <li key={idx}>{note}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="bg-[#F8F5EE] px-5 sm:px-6 py-4 border-t border-[#E8E1D5] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-[#607168] text-center sm:text-left">
            Need adjustments? You can customize items and quantities during order.
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-[#D5CDC0] text-xs font-bold text-[#4E5C54] hover:bg-white transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onSelectPackage(packageData);
                onClose();
              }}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-[#1B4332] hover:bg-[#143527] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <span>Choose This Package</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#E2B13C]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
