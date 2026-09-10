import { useState, useRef } from 'react';
import { 
  Star, 
  Pause, 
  Play, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  X, 
  Sparkles, 
  MessageCircle, 
  ShieldCheck, 
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { CUSTOMER_REVIEWS, BUSINESS_INFO } from '../../data/mockData';
import { CustomerReview } from '../../types';
import { createWhatsAppUrl, optimizeCloudinary } from '../../utils/helpers';

interface ReviewsSectionProps {
  onStartSaving?: () => void;
}

export function ReviewsSection({ onStartSaving }: ReviewsSectionProps) {
  const [isPaused, setIsPaused] = useState(false);
  const [selectedReview, setSelectedReview] = useState<CustomerReview | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleManualScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleSelectReview = (review: CustomerReview) => {
    setSelectedReview(review);
  };

  const handleCloseModal = () => {
    setSelectedReview(null);
  };

  const handlePrevModal = () => {
    if (!selectedReview) return;
    const currentIndex = CUSTOMER_REVIEWS.findIndex((r) => r.id === selectedReview.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : CUSTOMER_REVIEWS.length - 1;
    setSelectedReview(CUSTOMER_REVIEWS[prevIndex]);
  };

  const handleNextModal = () => {
    if (!selectedReview) return;
    const currentIndex = CUSTOMER_REVIEWS.findIndex((r) => r.id === selectedReview.id);
    const nextIndex = currentIndex < CUSTOMER_REVIEWS.length - 1 ? currentIndex + 1 : 0;
    setSelectedReview(CUSTOMER_REVIEWS[nextIndex]);
  };

  // Duplicate list to achieve a seamless, continuous marquee loop
  const marqueeReviews = [...CUSTOMER_REVIEWS, ...CUSTOMER_REVIEWS];

  return (
    <section 
      id="reviews-section" 
      className="py-16 sm:py-24 bg-[#FAF7F0] border-b border-[#E8E2D5] relative overflow-hidden"
    >
      {/* Background Decorative Accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#E2B13C]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#1B4332]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with REVIEWS Tag */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B4332] text-[#E2B13C] text-xs font-bold uppercase tracking-widest mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#E2B13C]" />
            <span>REVIEWS</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E2B13C]"></span>
            <span className="text-white font-medium">Customer Testimonials</span>
          </div>

          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl lg:text-5xl text-[#143527] leading-tight tracking-tight">
            REAL PEOPLE. REAL CONVENIENCE. TRUSTED REVIEWS.
          </h2>

          <p className="mt-4 text-sm sm:text-base text-[#4C5B53] leading-relaxed">
            Read authentic, unedited feedback and screenshot reviews from our happy customers, 
            Christmas foodstuff savings plan participants, campus students, and households.
          </p>

          {/* Rating Snapshot */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-[#24332B] font-medium">
            <div className="flex items-center gap-1 text-[#E2B13C]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#E2B13C]" />
              ))}
            </div>
            <span className="font-bold text-[#143527]">5.0 / 5.0 Rated</span>
            <span className="text-[#C6BCAB]">•</span>
            <span className="text-[#56665E]">100% Genuine Experiences & WhatsApp Chats</span>
          </div>
        </div>

        {/* Speed & Pause Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-white/80 backdrop-blur-xs px-4 py-3 rounded-2xl border border-[#E8E1D3] shadow-xs">
          <div className="flex items-center gap-2 text-xs text-[#5D6D63]">
            <span className="w-2 h-2 rounded-full bg-[#27AE60] animate-pulse shrink-0"></span>
            <span className="hidden sm:inline">Gentle scrolling speed:</span>
            <span className="font-medium text-[#1B4332]">Hover or tap any review to pause and read.</span>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {/* Play/Pause Toggle */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isPaused 
                  ? 'bg-[#1B4332] text-white shadow-xs' 
                  : 'bg-[#EFE9DF] text-[#1B4332] hover:bg-[#E5DDCF]'
              }`}
              title={isPaused ? 'Resume auto-scrolling' : 'Pause scrolling to read'}
              id="toggle-reviews-scroll-btn"
            >
              {isPaused ? (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Resume Scroll</span>
                </>
              ) : (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Pause to Read</span>
                </>
              )}
            </button>

            {/* Manual Left/Right Controls */}
            <div className="flex items-center gap-1 border-l border-[#E2DBD0] pl-2">
              <button
                onClick={() => handleManualScroll('left')}
                className="w-8 h-8 rounded-lg bg-[#EFE9DF] hover:bg-[#1B4332] hover:text-white text-[#1B4332] flex items-center justify-center transition-all cursor-pointer"
                title="Scroll left"
                aria-label="Scroll reviews left"
                id="reviews-scroll-left-btn"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleManualScroll('right')}
                className="w-8 h-8 rounded-lg bg-[#EFE9DF] hover:bg-[#1B4332] hover:text-white text-[#1B4332] flex items-center justify-center transition-all cursor-pointer"
                title="Scroll right"
                aria-label="Scroll reviews right"
                id="reviews-scroll-right-btn"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Infinite Horizontal Scrolling Marquee Track */}
      <div 
        ref={scrollContainerRef}
        className="w-full overflow-x-auto no-scrollbar py-3 px-4 sm:px-6 relative select-none"
        style={{ scrollBehavior: 'smooth' }}
      >
        <div className={`reviews-marquee-track ${isPaused ? 'is-paused' : ''} flex gap-5 sm:gap-6 items-stretch`}>
          {marqueeReviews.map((review, idx) => (
            <div
              key={`${review.id}-${idx}`}
              onClick={() => handleSelectReview(review)}
              className="w-[280px] sm:w-[320px] shrink-0 bg-white rounded-2xl p-3 sm:p-3.5 border border-[#E3DBD0] shadow-sm hover:shadow-xl hover:border-[#E2B13C] transition-all duration-300 flex flex-col group cursor-pointer"
            >
              {/* Card Header with REVIEWS Tag and Category */}
              <div className="flex items-center justify-between gap-2 mb-2.5 pb-2 border-b border-[#F0EBE1]">
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded bg-[#1B4332] text-[#E2B13C] text-[10px] font-extrabold uppercase tracking-wider">
                    {review.tag}
                  </span>
                  <span className="text-[10px] text-[#73827A] font-semibold truncate max-w-[130px]">
                    {review.category}
                  </span>
                </div>
                <div className="flex items-center gap-0.5 text-[#E2B13C]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-[#E2B13C]" />
                  ))}
                </div>
              </div>

              {/* Review Screenshot Viewport */}
              <div className="relative w-full h-[320px] sm:h-[360px] bg-[#11241C] rounded-xl overflow-hidden border border-[#E6DFC9] flex items-center justify-center group/img">
                <img
                  src={optimizeCloudinary(review.image, 500)}
                  alt={`Precious Gem Foods Ventures Review - ${review.title}`}
                  className="w-full h-full object-contain p-1 group-hover/img:scale-[1.03] transition-transform duration-300"
                  loading="lazy"
                  width={320}
                  height={360}
                  referrerPolicy="no-referrer"
                />

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-[#122A20]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                  <span className="px-3 py-1.5 rounded-lg bg-white text-[#1B4332] text-xs font-bold shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <ZoomIn className="w-3.5 h-3.5 text-[#C68A1B]" />
                    <span>Click to Enlarge</span>
                  </span>
                </div>
              </div>

              {/* Card Bottom Highlights */}
              <div className="mt-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-bold text-xs sm:text-sm text-[#1B4332] line-clamp-1 group-hover:text-[#122A20]">
                    {review.title}
                  </h3>
                  {review.highlight && (
                    <p className="text-[11px] sm:text-xs text-[#526158] mt-1 line-clamp-2 leading-relaxed">
                      “{review.highlight}”
                    </p>
                  )}
                </div>

                <div className="mt-2.5 pt-2 border-t border-[#F5F0E6] flex items-center justify-between text-[10px] text-[#7E8D85]">
                  <span className="flex items-center gap-1 text-[#27AE60] font-semibold">
                    <CheckCircle className="w-3 h-3" />
                    Verified Customer
                  </span>
                  <span className="font-medium group-hover:text-[#1B4332] underline flex items-center gap-0.5">
                    View Full Review
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Trust Badges Footer Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 p-4 rounded-2xl bg-white border border-[#E6DFD2] shadow-xs text-center">
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-[#1B4332] font-semibold">
            <ShieldCheck className="w-4 h-4 text-[#C68A1B] shrink-0" />
            <span>100% Verifiable Reviews</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-[#1B4332] font-semibold">
            <Sparkles className="w-4 h-4 text-[#C68A1B] shrink-0" />
            <span>Stone-Free Staple Foods</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-[#1B4332] font-semibold">
            <CheckCircle className="w-4 h-4 text-[#C68A1B] shrink-0" />
            <span>Guaranteed Holiday Packages</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-[#1B4332] font-semibold">
            <MessageCircle className="w-4 h-4 text-[#C68A1B] shrink-0" />
            <span>Instant WhatsApp Support</span>
          </div>
        </div>

        {/* Call to Action Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-[#1B4332] text-white">
          <div>
            <h4 className="font-heading font-extrabold text-base sm:text-lg text-white">
              Ready to experience stress-free food sourcing?
            </h4>
            <p className="text-xs sm:text-sm text-[#E2ECE7] mt-0.5">
              Join dozens of satisfied families and students saving towards quality Christmas foodstuffs.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {onStartSaving && (
              <button
                onClick={onStartSaving}
                className="px-5 py-2.5 rounded-xl bg-[#E2B13C] hover:bg-[#F3C759] text-[#122A20] font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                id="reviews-cta-start-saving-btn"
              >
                Start Saving Today
              </button>
            )}
            <a
              href={createWhatsAppUrl("Hello PGFV! I saw the customer reviews on your website and would like to make an enquiry.")}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-[#2D5A46] hover:bg-[#386D55] text-white font-semibold text-xs sm:text-sm transition-all flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox / Zoom Dialog for Full Image Clarity */}
      {selectedReview && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
          onClick={handleCloseModal}
        >
          <div 
            className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-hidden shadow-2xl flex flex-col border-2 border-[#E2B13C]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-[#1B4332] text-white flex items-center justify-between border-b border-[#2D5A46]">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-[#E2B13C] text-[#122A20] text-xs font-extrabold uppercase tracking-wider">
                  {selectedReview.tag}
                </span>
                <span className="text-xs text-[#D1DFD8]">
                  {selectedReview.category}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevModal}
                  className="w-8 h-8 rounded-lg bg-[#2D5A46] hover:bg-[#3E775E] text-white flex items-center justify-center transition-colors"
                  title="Previous review"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextModal}
                  className="w-8 h-8 rounded-lg bg-[#2D5A46] hover:bg-[#3E775E] text-white flex items-center justify-center transition-colors"
                  title="Next review"
                  aria-label="Next review"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={handleCloseModal}
                  className="w-8 h-8 rounded-lg bg-[#2D5A46] hover:bg-[#E2B13C] hover:text-[#122A20] text-white flex items-center justify-center transition-colors ml-1"
                  title="Close"
                  aria-label="Close review modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* High-Resolution Screenshot Image Area */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-5 bg-[#0C1B14] flex items-center justify-center min-h-[360px] max-h-[62vh]">
              <img
                src={optimizeCloudinary(selectedReview.image, 900)}
                alt={selectedReview.title}
                className="max-h-full max-w-full object-contain rounded-xl shadow-lg"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Modal Footer with details & actions */}
            <div className="p-4 sm:p-5 bg-white border-t border-[#EAE3D6] space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-heading font-extrabold text-base sm:text-lg text-[#143527]">
                    {selectedReview.title}
                  </h3>
                  {selectedReview.highlight && (
                    <p className="text-xs sm:text-sm text-[#4E5E55] mt-1 leading-relaxed">
                      “{selectedReview.highlight}”
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-0.5 text-[#E2B13C] shrink-0 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#E2B13C]" />
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-[#F3EDE2] flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs text-[#718077] flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-[#27AE60]" />
                  Verified feedback from customer WhatsApp conversation
                </span>

                <a
                  href={createWhatsAppUrl(`Hello PGFV, I saw the review "${selectedReview.title}" on your website and would like to place an order or ask a question.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#1B4332] hover:bg-[#143527] text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#E2B13C]" />
                  <span>Enquire on WhatsApp</span>
                  <ExternalLink className="w-3 h-3 text-[#A8C7B9]" />
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
