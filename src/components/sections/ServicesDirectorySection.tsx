import React, { useState } from 'react';
import { 
  Calendar, 
  Package, 
  GraduationCap, 
  Gift, 
  Building2, 
  CalendarHeart, 
  Tag, 
  HeartHandshake, 
  Megaphone, 
  BookOpenCheck, 
  Sparkles, 
  Award,
  ArrowRight,
  MessageCircle,
  Check,
  Search,
  Filter
} from 'lucide-react';
import { ALL_PGFV_SERVICES, PGFVService } from '../../data/servicesData';
import { optimizeCloudinary, createWhatsAppUrl, PGFV_WHATSAPP_PHONE, PGFV_WHATSAPP_DISPLAY } from '../../utils/helpers';

interface ServicesDirectorySectionProps {
  onOpenEnquiry?: (serviceTitle: string, category: string) => void;
  onNavigateToSavings?: () => void;
  onNavigateToStudents?: () => void;
  onNavigateToEvents?: () => void;
  onNavigateToCatalogue?: () => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Calendar,
  Package,
  GraduationCap,
  Gift,
  Building2,
  CalendarHeart,
  Tag,
  HeartHandshake,
  Megaphone,
  BookOpenCheck,
  Sparkles,
  Award
};

export function ServicesDirectorySection({
  onOpenEnquiry,
  onNavigateToSavings,
  onNavigateToStudents,
  onNavigateToEvents,
  onNavigateToCatalogue
}: ServicesDirectorySectionProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filterTabs = [
    { id: 'all', label: 'All Services (12)' },
    { id: 'packages', label: 'Food & Savings' },
    { id: 'corporate', label: 'Corporate & Events' },
    { id: 'contract', label: 'Branding & Packaging' },
    { id: 'training', label: 'Training & Impact' }
  ];

  const filteredServices = ALL_PGFV_SERVICES.filter((serv) => {
    // Filter tab
    if (activeFilter === 'packages') {
      if (!['christmas-food-saving', 'food-packages', 'student-food-packages', 'seasonal-packages'].includes(serv.slug)) {
        return false;
      }
    } else if (activeFilter === 'corporate') {
      if (!['corporate-packages', 'event-souvenirs', 'campaign-packages', 'custom-food-sourcing-hampers'].includes(serv.slug)) {
        return false;
      }
    } else if (activeFilter === 'contract') {
      if (!['private-labelling', 'custom-food-sourcing-hampers'].includes(serv.slug)) {
        return false;
      }
    } else if (activeFilter === 'training') {
      if (!['food-entrepreneurship-training', 'empowerment-initiatives', 'charity-community-distribution'].includes(serv.slug)) {
        return false;
      }
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        serv.title.toLowerCase().includes(q) ||
        serv.shortDescription.toLowerCase().includes(q) ||
        serv.purpose.toLowerCase().includes(q) ||
        serv.targetAudience.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleEnquiry = (service: PGFVService) => {
    if (onOpenEnquiry) {
      onOpenEnquiry(service.title, service.tag);
    } else {
      window.open(createWhatsAppUrl(service.enquiryMessage, PGFV_WHATSAPP_PHONE), '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section 
      id="services-section" 
      className="py-16 sm:py-24 bg-[#FAF7F2] border-b border-[#E8E2D5] scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B4332]/10 border border-[#1B4332]/20 text-[#1B4332] text-xs font-extrabold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#C68A1B]" />
            <span>SPECIALIZED SERVICES DIRECTORY</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#143527] tracking-tight">
            Our Specialized Services
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-[#52635B] leading-relaxed max-w-2xl mx-auto">
            From structured Christmas food savings and student semester packages to corporate welfare hampers, private label packaging, and vocational empowerment masterclasses.
          </p>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full md:w-auto pb-1">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-[#1B4332] text-white shadow-xs'
                    : 'bg-white text-[#52635B] hover:text-[#1B4332] border border-[#E3DCD0] hover:bg-[#F3EFE6]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#8C9B93] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-[#E0D7C9] text-xs text-[#143527] placeholder-[#8C9B93] focus:outline-none focus:ring-2 focus:ring-[#1B4332]/30 transition-all"
            />
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredServices.map((serv) => {
            const Icon = ICON_MAP[serv.iconName] || Package;

            return (
              <div
                key={serv.id}
                id={`service-${serv.slug}`}
                className="bg-white rounded-3xl overflow-hidden border border-[#E3DCD0] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group scroll-mt-28"
              >
                <div>
                  {/* Top Image + Icon Overlay */}
                  <div className="relative h-48 sm:h-52 overflow-hidden bg-[#1B4332]/10">
                    <img
                      src={optimizeCloudinary(serv.image, 500)}
                      alt={serv.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Tag badge */}
                    <div className="absolute top-3.5 left-3.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-black/60 text-[#E2B13C] backdrop-blur-xs border border-white/20">
                        {serv.tag}
                      </span>
                    </div>

                    {/* Floating icon */}
                    <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-xl bg-white/90 text-[#1B4332] flex items-center justify-center shadow-md">
                      <Icon className="w-4 h-4 text-[#1B4332]" />
                    </div>

                    {/* Card Title on Image */}
                    <div className="absolute bottom-3 left-3.5 right-3.5">
                      <h3 className="font-heading font-extrabold text-lg sm:text-xl text-white leading-tight drop-shadow-sm">
                        {serv.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 space-y-3.5">
                    {/* Short Description */}
                    <p className="text-xs sm:text-sm text-[#4E5E56] leading-relaxed">
                      {serv.shortDescription}
                    </p>

                    {/* Specific Purpose Box */}
                    <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EAE3D6] space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#C68A1B] block">
                        CLEAR PURPOSE & VALUE
                      </span>
                      <p className="text-xs text-[#2E3C34] leading-relaxed font-medium">
                        {serv.purpose}
                      </p>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-1.5 pt-1">
                      {serv.highlights.map((h, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-2 text-xs text-[#52635A]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E2B13C] shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="p-5 sm:p-6 pt-0 space-y-2 border-t border-[#F2ECE1] mt-3">
                  <div className="flex items-center justify-between text-[11px] font-medium text-[#7D8F85] pt-2">
                    <span className="truncate max-w-[210px]">{serv.targetAudience}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
                    {/* Special Portal Actions */}
                    {serv.slug === 'student-food-packages' && onNavigateToStudents && (
                      <button
                        onClick={onNavigateToStudents}
                        className="w-full sm:w-auto flex-1 py-2.5 px-3 rounded-xl bg-[#FAF7F2] hover:bg-[#EFE9DF] text-[#1B4332] border border-[#D5CCBE] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <GraduationCap className="w-3.5 h-3.5 text-[#C68A1B]" />
                        <span>Student Portal</span>
                      </button>
                    )}

                    {serv.slug === 'christmas-food-saving' && onNavigateToSavings && (
                      <button
                        onClick={onNavigateToSavings}
                        className="w-full sm:w-auto flex-1 py-2.5 px-3 rounded-xl bg-[#FAF7F2] hover:bg-[#EFE9DF] text-[#1B4332] border border-[#D5CCBE] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Calendar className="w-3.5 h-3.5 text-[#C68A1B]" />
                        <span>View Plans</span>
                      </button>
                    )}

                    {(serv.slug === 'event-souvenirs' || serv.slug === 'event-snack-packages') && onNavigateToEvents && (
                      <button
                        onClick={onNavigateToEvents}
                        className="w-full sm:w-auto flex-1 py-2.5 px-3 rounded-xl bg-[#FAF7F2] hover:bg-[#EFE9DF] text-[#1B4332] border border-[#D5CCBE] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Gift className="w-3.5 h-3.5 text-[#C68A1B]" />
                        <span>Snack Packages</span>
                      </button>
                    )}

                    {serv.slug === 'food-packages' && onNavigateToCatalogue && (
                      <button
                        onClick={onNavigateToCatalogue}
                        className="w-full sm:w-auto flex-1 py-2.5 px-3 rounded-xl bg-[#FAF7F2] hover:bg-[#EFE9DF] text-[#1B4332] border border-[#D5CCBE] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Package className="w-3.5 h-3.5 text-[#C68A1B]" />
                        <span>Catalogue</span>
                      </button>
                    )}

                    {/* Make an Enquiry Button */}
                    <button
                      onClick={() => handleEnquiry(serv)}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#1B4332] hover:bg-[#143527] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs hover:shadow transition-all cursor-pointer group/btn"
                      title={`Make an enquiry about ${serv.title}`}
                    >
                      <span>Make an Enquiry</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#E2B13C] group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state when search yields no result */}
        {filteredServices.length === 0 && (
          <div className="text-center py-12 bg-white rounded-3xl border border-[#E3DCD0] p-8 max-w-md mx-auto space-y-3">
            <Search className="w-8 h-8 text-[#C68A1B] mx-auto" />
            <h4 className="font-heading font-bold text-base text-[#143527]">No matching services found</h4>
            <p className="text-xs text-[#52635B]">
              Try searching with another keyword or reset the filter tab.
            </p>
            <button
              onClick={() => {
                setActiveFilter('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-[#1B4332] text-white text-xs font-bold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
