import { useEffect, useState } from 'react';
import { X, MessageCircle, ArrowUpRight, Sparkles } from 'lucide-react';
import { createWhatsAppUrl, PGFV_WHATSAPP_DISPLAY } from '../../utils/helpers';

interface AnnouncementPopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWhatsApp?: () => void;
}

const POPUP_IMAGE_URL = 'https://res.cloudinary.com/dhzouslh1/image/upload/v1790700352/1000328461_ars8ht.jpg';

export function AnnouncementPopupModal({
  isOpen,
  onClose,
  onOpenWhatsApp
}: AnnouncementPopupModalProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Close on ESC key and prevent body background scrolling while open
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleWhatsAppClick = () => {
    const defaultMsg = 'Hello Precious Gem Foods Ventures! I saw your special announcement flyer on your website and would like to make an enquiry / place an order.';
    const waUrl = createWhatsAppUrl(defaultMsg);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    if (onOpenWhatsApp) {
      onOpenWhatsApp();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md transition-all duration-300 animate-in fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="announcement-title"
    >
      <div 
        className="relative w-full max-w-md sm:max-w-lg bg-[#142920] border border-[#E2B13C]/40 rounded-3xl shadow-2xl overflow-hidden text-white flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle decorative glowing corner accent */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#E2B13C]/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-[#25D366]/20 rounded-full blur-2xl pointer-events-none" />

        {/* Modal Header */}
        <div className="relative z-10 px-4 sm:px-5 py-3.5 bg-[#0F2119]/90 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E2B13C] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E2B13C]"></span>
            </span>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#E2B13C]" />
              <h3 id="announcement-title" className="font-heading font-bold text-sm tracking-wide text-[#F3E8D2]">
                Special Announcement
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs font-medium text-white/70 hover:text-white bg-white/10 hover:bg-white/20 active:scale-95 px-2.5 py-1.5 rounded-full transition-all duration-150 border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#E2B13C]"
            aria-label="Close announcement modal"
          >
            <span>Close</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Interactive Flyer Container: Clicking directly connects to WhatsApp */}
        <div 
          onClick={handleWhatsAppClick}
          className="relative group cursor-pointer overflow-hidden bg-black/40 flex items-center justify-center flex-1 max-h-[58vh] sm:max-h-[62vh]"
          title="Click to chat directly on WhatsApp"
        >
          {/* Skeleton placeholder while image is downloading */}
          {!imageLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#11241C] text-white/50">
              <div className="w-8 h-8 border-3 border-[#E2B13C]/30 border-t-[#E2B13C] rounded-full animate-spin" />
              <span className="text-xs">Loading announcement flyer...</span>
            </div>
          )}

          <img
            src={POPUP_IMAGE_URL}
            alt="Precious Gem Foods Ventures Special Announcement"
            className={`w-full h-auto max-h-[58vh] sm:max-h-[62vh] object-contain transition-transform duration-300 group-hover:scale-[1.02] ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />

          {/* Hover Overlay Badge */}
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
            <div className="bg-[#25D366] text-[#0A1A12] font-semibold text-xs sm:text-sm px-4 py-2 rounded-full shadow-xl flex items-center gap-2 transform -translate-y-1 group-hover:translate-y-0 transition-transform duration-200">
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Click to Chat on WhatsApp</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Modal Footer with Direct WhatsApp Actions */}
        <div className="relative z-10 p-3.5 sm:p-4 bg-[#0F2119] border-t border-white/10 flex flex-col gap-2">
          {/* Main Action Button */}
          <button
            onClick={handleWhatsAppClick}
            className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-[#0A1E14] font-bold py-3 px-4 rounded-xl shadow-lg shadow-[#25D366]/20 transition-all transform active:scale-[0.99] flex items-center justify-center gap-2.5 text-sm sm:text-base group"
          >
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <MessageCircle className="w-4 h-4 fill-current text-[#0A1E14]" />
            </div>
            <span>Chat on WhatsApp Now ({PGFV_WHATSAPP_DISPLAY})</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          {/* Secondary Close / Browse option */}
          <div className="flex items-center justify-between pt-1 px-1 text-xs text-white/60">
            <span className="truncate">Instant response from PGFV Support</span>
            <button
              onClick={onClose}
              className="hover:text-white underline underline-offset-2 transition-colors cursor-pointer shrink-0 ml-2"
            >
              Continue to Website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
