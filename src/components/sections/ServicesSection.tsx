import { useState } from 'react';
import { 
  ArrowRight, 
  Eye, 
  MessageCircle, 
  Check, 
  Sparkles, 
  GraduationCap, 
  Gift, 
  Tag, 
  Building2, 
  PartyPopper, 
  ShoppingBag, 
  Lightbulb,
  Phone
} from 'lucide-react';
import { FOOD_SOLUTIONS_CATEGORIES, FoodSolutionCategory } from '../../data/foodSolutionsData';
import { FoodSolutionDetailModal } from '../modals/FoodSolutionDetailModal';
import { optimizeCloudinary, createWhatsAppUrl, PGFV_WHATSAPP_PHONE, PGFV_WHATSAPP_DISPLAY } from '../../utils/helpers';
import { BUSINESS_INFO } from '../../data/mockData';

interface ServicesSectionProps {
  onSelectService?: (serviceName: string, category: string) => void;
  onNavigateToStudents?: () => void;
  onNavigateToSavings?: () => void;
  onNavigateToEvents?: () => void;
  onNavigateToCatalogue?: () => void;
}

const CATEGORY_ICONS: Record<string, typeof ShoppingBag> = {
  'foodstuff-packages': ShoppingBag,
  'student-packages': GraduationCap,
  'event-snack-packages': PartyPopper,
  'corporate-seasonal-packages': Building2,
  'souvenirs-gift-packages': Gift,
  'private-label': Tag,
  'training-empowerment': Lightbulb
};

export function ServicesSection({
  onSelectService,
  onNavigateToStudents,
  onNavigateToSavings,
  onNavigateToEvents,
  onNavigateToCatalogue
}: ServicesSectionProps) {
  const [selectedSolutionForModal, setSelectedSolutionForModal] = useState<FoodSolutionCategory | null>(null);

  const handleMakeEnquiry = (solution: FoodSolutionCategory) => {
    if (solution.id === 'student-packages' && onNavigateToStudents) {
      onNavigateToStudents();
      return;
    }

    if (onSelectService) {
      onSelectService(solution.title, 'Food Solutions');
    } else {
      const msg = `Hello Precious Gem Foods Ventures, I would like to make an enquiry regarding your "${solution.title}" food solution.`;
      window.open(createWhatsAppUrl(msg, PGFV_WHATSAPP_PHONE), '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section 
      id="food-solutions" 
      className="py-16 sm:py-24 bg-[#F5EFE6] border-b border-[#E8E2D5] scroll-mt-20"
    >
      {/* Anchor for links to #food-solutions */}
      <span id="food-solutions-section" className="block relative -top-24 invisible" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B4332]/10 border border-[#1B4332]/20 text-[#1B4332] text-xs font-extrabold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#C68A1B]" />
            <span>PGFV CORE PORTFOLIO • SEVEN SPECIALIZED CATEGORIES</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#143527] tracking-tight">
            Food Solutions
          </h2>

          <p className="text-base sm:text-lg font-semibold text-[#1B4332] italic">
            “A global priority to making cooking easier.”
          </p>

          <p className="text-xs sm:text-sm text-[#52635B] leading-relaxed max-w-2xl mx-auto">
            Precious Gem Foods Ventures (PGFV) provides structured, stone-free foodstuffs, custom packages, private packaging, and community supply systems tailored for individuals, families, students, schools, businesses, organisations, events, and communities.
          </p>
        </div>

        {/* 7 Food Solutions Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {FOOD_SOLUTIONS_CATEGORIES.map((cat, idx) => {
            const Icon = CATEGORY_ICONS[cat.id] || ShoppingBag;
            const isHighlight = cat.id === 'student-packages' || cat.id === 'foodstuff-packages';

            return (
              <div
                key={cat.id}
                className={`bg-white rounded-3xl overflow-hidden border flex flex-col justify-between transition-all duration-300 hover:shadow-xl group relative ${
                  isHighlight 
                    ? 'border-[#1B4332]/40 shadow-sm ring-1 ring-[#1B4332]/10' 
                    : 'border-[#E3DCD0] shadow-2xs'
                }`}
              >
                {/* Top Image + Badges */}
                <div>
                  <div className="relative h-52 sm:h-56 overflow-hidden bg-[#1B4332]/10">
                    <img
                      src={optimizeCloudinary(cat.image, 550)}
                      alt={cat.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                    {/* Category Number Badge */}
                    <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-xl bg-[#1B4332] text-[#E2B13C] flex items-center justify-center font-heading font-extrabold text-xs shadow-md border border-[#E2B13C]/40">
                        {cat.number}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-black/60 text-white backdrop-blur-xs shadow-xs border border-white/20">
                        {cat.badge}
                      </span>
                    </div>

                    {/* Icon Accent */}
                    <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-xl bg-white/90 text-[#1B4332] flex items-center justify-center shadow-md backdrop-blur-xs">
                      <Icon className="w-4 h-4 text-[#1B4332]" />
                    </div>

                    {/* Image Footer Label */}
                    <div className="absolute bottom-3 left-3.5 right-3.5">
                      <h3 className="font-heading font-extrabold text-lg sm:text-xl text-white leading-snug drop-shadow-sm">
                        {cat.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 space-y-3.5">
                    <p className="text-xs sm:text-sm text-[#4E5E56] leading-relaxed font-medium">
                      {cat.shortDescription}
                    </p>

                    {/* Quick Highlights */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {cat.highlights.map((h, hIdx) => (
                        <span
                          key={hIdx}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#143527] bg-[#FAF7F2] px-2.5 py-1 rounded-lg border border-[#E5DDD0]"
                        >
                          <Check className="w-3 h-3 text-[#C68A1B]" />
                          <span>{h}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons (View Details + Make an Enquiry) */}
                <div className="p-5 sm:p-6 pt-0 space-y-2 border-t border-[#F2ECE1] mt-3">
                  <div className="grid grid-cols-2 gap-2 pt-3">
                    <button
                      onClick={() => setSelectedSolutionForModal(cat)}
                      className="w-full py-2.5 px-3 rounded-xl border border-[#D5CDC0] hover:bg-[#FAF7F2] text-[#143527] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      title={`View full details of ${cat.title}`}
                    >
                      <Eye className="w-3.5 h-3.5 text-[#C68A1B]" />
                      <span>View Details</span>
                    </button>

                    <button
                      onClick={() => handleMakeEnquiry(cat)}
                      className="w-full py-2.5 px-3 rounded-xl bg-[#1B4332] hover:bg-[#143527] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer group/btn"
                      title={`Make an enquiry about ${cat.title}`}
                    >
                      <span className="truncate">Make an Enquiry</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#E2B13C] group-hover/btn:translate-x-0.5 transition-transform shrink-0" />
                    </button>
                  </div>

                  {cat.id === 'student-packages' && onNavigateToStudents && (
                    <button
                      onClick={onNavigateToStudents}
                      className="w-full py-2 rounded-xl text-[11px] font-bold text-[#1B4332] bg-[#FAF7F2] hover:bg-[#EFE9DF] border border-[#E0D7C9] flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    >
                      <GraduationCap className="w-3.5 h-3.5 text-[#C68A1B]" />
                      <span>Open Dedicated Student Portal</span>
                    </button>
                  )}

                  {cat.id === 'event-snack-packages' && onNavigateToEvents && (
                    <button
                      onClick={onNavigateToEvents}
                      className="w-full py-2 rounded-xl text-[11px] font-bold text-[#1B4332] bg-[#FAF7F2] hover:bg-[#EFE9DF] border border-[#E0D7C9] flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    >
                      <PartyPopper className="w-3.5 h-3.5 text-[#C68A1B]" />
                      <span>Dedicated Event & Snack Page</span>
                    </button>
                  )}

                  {cat.id === 'foodstuff-packages' && onNavigateToCatalogue && (
                    <button
                      onClick={onNavigateToCatalogue}
                      className="w-full py-2 rounded-xl text-[11px] font-bold text-[#1B4332] bg-[#FAF7F2] hover:bg-[#EFE9DF] border border-[#E0D7C9] flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#C68A1B]" />
                      <span>Explore Product Catalogue</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Contact / Assistance Strip */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-white border border-[#E3DCD0] shadow-sm flex flex-col md:flex-row items-center justify-between gap-5 text-center md:text-left">
          <div className="space-y-1.5 max-w-xl">
            <span className="text-xs font-bold text-[#C68A1B] uppercase tracking-wider block">
              CUSTOM FOOD SOLUTION CONSULTATION
            </span>
            <h4 className="font-heading font-extrabold text-lg sm:text-xl text-[#143527]">
              Need a Bespoke Food Package or Supply System?
            </h4>
            <p className="text-xs sm:text-sm text-[#5B6B62]">
              Whether you need regular household deliveries, student food packages, private label retail packs, or corporate supplies, our team is ready to design a solution that fits your exact budget.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <a
              href={`tel:${PGFV_WHATSAPP_PHONE}`}
              className="w-full sm:w-auto px-5 py-3 rounded-xl border border-[#D5CDC0] text-xs font-bold text-[#143527] hover:bg-[#FAF7F2] transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#C68A1B]" />
              <span>Call: {BUSINESS_INFO.phone}</span>
            </a>

            <button
              onClick={() => {
                const msg = 'Hello Precious Gem Foods Ventures, I would like to discuss a custom food solution for my specific requirements.';
                window.open(createWhatsAppUrl(msg, PGFV_WHATSAPP_PHONE), '_blank', 'noopener,noreferrer');
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-[#0A1E14] text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Chat on WhatsApp ({PGFV_WHATSAPP_DISPLAY})</span>
            </button>
          </div>
        </div>

      </div>

      {/* Food Solution Details Modal */}
      <FoodSolutionDetailModal
        solution={selectedSolutionForModal}
        isOpen={Boolean(selectedSolutionForModal)}
        onClose={() => setSelectedSolutionForModal(null)}
        onEnquire={handleMakeEnquiry}
        onNavigateToStudents={onNavigateToStudents}
      />
    </section>
  );
}
