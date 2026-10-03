import { useState, useRef, useEffect } from 'react';
import { 
  Phone, 
  Menu, 
  X, 
  Sparkles, 
  ShoppingBag, 
  Calendar, 
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Package,
  ArrowRight
} from 'lucide-react';
import { BUSINESS_INFO } from '../../data/mockData';
import { ALL_PGFV_SERVICES } from '../../data/servicesData';
import { PageView } from '../../types';
import { optimizeCloudinary } from '../../utils/helpers';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView, sectionId?: string) => void;
  onOpenRegister: (planId?: string) => void;
  onOpenAnnouncement?: () => void;
}

export function Navbar({ currentPage, onNavigate, onOpenRegister, onOpenAnnouncement }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesExpanded, setMobileServicesExpanded] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };
    if (servicesDropdownOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [servicesDropdownOpen]);

  const handleNavClick = (page: PageView, sectionId?: string) => {
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);
    onNavigate(page, sectionId);
  };

  const handleSelectService = (slug: string) => {
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);
    if (slug === 'student-food-packages') {
      onNavigate('students');
      return;
    }
    if (slug === 'event-souvenirs' || slug === 'event-snack-packages') {
      onNavigate('events-snacks');
      return;
    }
    if (slug === 'food-packages') {
      onNavigate('catalogue');
      return;
    }
    onNavigate('services', `service-${slug}`);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#EBE4D8] transition-all">
      {/* Top Announcement Strip */}
      <div className="bg-[#1B4332] text-[#F4EBD9] text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button 
              onClick={onOpenAnnouncement}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#E2B13C] text-[#1B4332] hover:bg-[#edd888] transition-colors cursor-pointer"
              title="Click to view special announcement flyer"
            >
              <Sparkles className="w-2.5 h-2.5" />
              <span>SPECIAL NOTICE</span>
            </button>
            <span className="hidden sm:inline">
              Quality • Integrity • Impact — “A global priority to making cooking easier.”
            </span>
            <span className="sm:hidden">
              PGFV Food Solutions & Foodstuffs
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            {onOpenAnnouncement && (
              <button
                onClick={onOpenAnnouncement}
                className="text-[#E2B13C] hover:underline flex items-center gap-1 font-medium cursor-pointer"
              >
                <span>Special Notice</span>
              </button>
            )}
            <span className="text-[#A2B6AC] hidden md:inline">•</span>
            <a 
              href={`tel:${BUSINESS_INFO.phone}`} 
              className="hover:text-white flex items-center gap-1 transition-colors"
              title="Call PGFV"
            >
              <Phone className="w-3 h-3 text-[#E2B13C]" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>
            <span className="text-[#A2B6AC] hidden md:inline">•</span>
            <span className="text-[#D3E0D9] hidden md:inline">Ile-Ife, Osun State</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Identity */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 sm:gap-3 text-left group focus:outline-none cursor-pointer py-1 shrink-0"
            id="brand-logo-btn"
            aria-label="Precious Gem Foods Ventures Home"
          >
            <div className="relative w-11 h-11 sm:w-13 sm:h-13 xl:w-14 xl:h-14 rounded-2xl bg-white p-1 shadow-sm border-2 border-[#E2B13C]/40 group-hover:border-[#E2B13C] group-hover:scale-105 transition-all flex items-center justify-center shrink-0 overflow-hidden">
              <img
                src={optimizeCloudinary(BUSINESS_INFO.logo, 160)}
                alt="Precious Gem Foods Ventures Official Logo"
                className="w-full h-full object-contain rounded-xl"
                width={56}
                height={56}
                fetchPriority="high"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-base sm:text-lg xl:text-xl text-[#1B4332] tracking-tight group-hover:text-[#122A20] transition-colors leading-tight whitespace-nowrap">
                  PRECIOUS GEM FOODS
                </span>
                <span className="font-heading font-bold text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded bg-[#E2B13C]/25 text-[#1B4332] border border-[#E2B13C]/40 tracking-wider shrink-0">
                  VENTURES
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] tracking-wider text-[#736357] font-semibold uppercase leading-tight mt-0.5 whitespace-nowrap">
                Food Solutions & Foodstuffs • Ile-Ife
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3 py-2 rounded-lg text-[13px] xl:text-sm font-medium transition-colors whitespace-nowrap ${
                currentPage === 'home' 
                  ? 'text-[#1B4332] bg-[#EFE9DF] font-semibold' 
                  : 'text-[#3E4540] hover:text-[#1B4332] hover:bg-[#F4EFE6]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('about', 'about-pgfv')}
              className={`px-3 py-2 rounded-lg text-[13px] xl:text-sm font-medium transition-colors whitespace-nowrap ${
                currentPage === 'about' 
                  ? 'text-[#1B4332] bg-[#EFE9DF] font-semibold' 
                  : 'text-[#3E4540] hover:text-[#1B4332] hover:bg-[#F4EFE6]'
              }`}
            >
              About Us
            </button>

            {/* Professional Product / Package Catalogue */}
            <button
              onClick={() => handleNavClick('catalogue')}
              className={`px-3 py-2 rounded-lg text-[13px] xl:text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                currentPage === 'catalogue' 
                  ? 'text-[#1B4332] bg-[#EFE9DF] font-bold shadow-2xs' 
                  : 'text-[#3E4540] hover:text-[#1B4332] hover:bg-[#F4EFE6]'
              }`}
            >
              <span>Catalogue</span>
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#E2B13C]/20 text-[#1B4332] border border-[#E2B13C]/40">
                New
              </span>
            </button>

            {/* Consolidated Services Menu with Dropdown (Contains All Services & Solutions) */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className={`px-3 py-2 rounded-lg text-[13px] xl:text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  servicesDropdownOpen || currentPage === 'services'
                    ? 'text-[#1B4332] bg-[#EFE9DF] font-bold shadow-2xs'
                    : 'text-[#3E4540] hover:text-[#1B4332] hover:bg-[#F4EFE6]'
                }`}
                id="services-menu-dropdown-btn"
                aria-expanded={servicesDropdownOpen}
                aria-haspopup="true"
              >
                <span>Our Services</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-[#1B4332]' : 'text-[#7D8F85]'}`} />
              </button>

              {/* Dropdown Menu Window */}
              {servicesDropdownOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-[#E3DCD0] py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                  role="menu"
                  aria-orientation="vertical"
                >
                  <div className="px-4 py-2.5 bg-[#FAF7F2] border-b border-[#F0EAE0] rounded-t-2xl flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#C68A1B] block">
                        PGFV Specialized Services
                      </span>
                      <span className="text-xs font-heading font-extrabold text-[#143527]">
                        Choose from 12 Offerings
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setServicesDropdownOpen(false);
                        onNavigate('services', 'services-section');
                      }}
                      className="text-[11px] font-bold text-[#1B4332] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>View All Services</span>
                      <ArrowRight className="w-3 h-3 text-[#E2B13C]" />
                    </button>
                  </div>

                  <div className="max-h-[65vh] overflow-y-auto py-1 divide-y divide-[#F7F3EC] custom-scrollbar">
                    {ALL_PGFV_SERVICES.map((serv, idx) => (
                      <button
                        key={serv.id}
                        onClick={() => handleSelectService(serv.slug)}
                        className="w-full px-4 py-2.5 text-left hover:bg-[#FAF7F2] transition-colors flex items-start gap-3 group cursor-pointer"
                        role="menuitem"
                      >
                        <div className="relative w-9 h-9 rounded-lg overflow-hidden bg-[#FAF5EC] border border-[#E8E1D5] shrink-0 mt-0.5 group-hover:border-[#1B4332] transition-colors shadow-2xs">
                          <img
                            src={optimizeCloudinary(serv.image, 100)}
                            alt={serv.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            loading="lazy"
                          />
                          <span className="absolute bottom-0 right-0 px-1 text-[8px] font-mono font-bold bg-[#1B4332]/85 text-[#E2B13C] rounded-tl">
                            {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-xs font-bold text-[#143527] group-hover:text-[#1B4332] block truncate">
                            {serv.title}
                          </span>
                          <span className="text-[11px] text-[#55665D] line-clamp-1">
                            {serv.shortDescription}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="px-4 py-2.5 bg-[#FAF7F2] border-t border-[#F0EAE0] rounded-b-2xl flex items-center justify-between text-[11px]">
                    <span className="text-[#687B72]">Quick WhatsApp Help</span>
                    <a
                      href={`tel:${BUSINESS_INFO.phone}`}
                      className="font-bold text-[#1B4332] hover:underline"
                    >
                      {BUSINESS_INFO.phone}
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Dedicated Event & Snack Packages Link */}
            <button
              onClick={() => handleNavClick('events-snacks')}
              className={`px-3 py-2 rounded-lg text-[13px] xl:text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                currentPage === 'events-snacks' 
                  ? 'text-[#1B4332] bg-[#EFE9DF] font-bold shadow-2xs' 
                  : 'text-[#3E4540] hover:text-[#1B4332] hover:bg-[#F4EFE6]'
              }`}
            >
              <span>Event & Snacks</span>
            </button>

            <button
              onClick={() => handleNavClick('reviews', 'reviews-section')}
              className={`px-3 py-2 rounded-lg text-[13px] xl:text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                currentPage === 'reviews' 
                  ? 'text-[#1B4332] bg-[#EFE9DF] font-bold' 
                  : 'text-[#3E4540] hover:text-[#1B4332] hover:bg-[#F4EFE6]'
              }`}
            >
              <span>Reviews</span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#1B4332] text-[#E2B13C]">
                5★
              </span>
            </button>
            <button
              onClick={() => handleNavClick('partnerships', 'partnerships-section')}
              className={`px-3 py-2 rounded-lg text-[13px] xl:text-sm font-medium transition-colors whitespace-nowrap ${
                currentPage === 'partnerships' 
                  ? 'text-[#1B4332] bg-[#EFE9DF] font-semibold' 
                  : 'text-[#3E4540] hover:text-[#1B4332] hover:bg-[#F4EFE6]'
              }`}
            >
              Partnerships
            </button>
            <button
              onClick={() => handleNavClick('faq', 'faq-section')}
              className={`px-3 py-2 rounded-lg text-[13px] xl:text-sm font-medium transition-colors whitespace-nowrap ${
                currentPage === 'faq' 
                  ? 'text-[#1B4332] bg-[#EFE9DF] font-semibold' 
                  : 'text-[#3E4540] hover:text-[#1B4332] hover:bg-[#F4EFE6]'
              }`}
            >
              FAQs
            </button>
            <button
              onClick={() => handleNavClick('contact', 'contact-section')}
              className={`px-3 py-2 rounded-lg text-[13px] xl:text-sm font-medium transition-colors whitespace-nowrap ${
                currentPage === 'contact' 
                  ? 'text-[#1B4332] bg-[#EFE9DF] font-semibold' 
                  : 'text-[#3E4540] hover:text-[#1B4332] hover:bg-[#F4EFE6]'
              }`}
            >
              Contact Us
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => onOpenRegister()}
              className="bg-[#1B4332] hover:bg-[#143527] text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm hover:shadow transition-all flex items-center gap-2 group cursor-pointer"
              id="header-start-saving-btn"
            >
              <span>START SAVING</span>
              <ChevronRight className="w-4 h-4 text-[#E2B13C] group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => onOpenRegister()}
              className="bg-[#1B4332] text-white text-xs px-3 py-2 rounded-lg font-semibold flex items-center gap-1"
            >
              <span>START SAVING</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#1B4332] hover:bg-[#EBE4D8] transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FDFBF7] border-b border-[#E8E2D5] px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in fade-in duration-200">
          <div className="flex items-center gap-3 pb-3 border-b border-[#EBE4D8]">
            <div className="w-11 h-11 rounded-xl bg-white p-1 border border-[#E2B13C]/50 shadow-xs flex items-center justify-center shrink-0 overflow-hidden">
              <img
                src={optimizeCloudinary(BUSINESS_INFO.logo, 120)}
                alt="PGFV Official Logo"
                className="w-full h-full object-contain rounded-lg"
                width={44}
                height={44}
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-sm sm:text-base text-[#1B4332] block leading-tight">
                  PRECIOUS GEM FOODS
                </span>
                <span className="font-heading font-bold text-[9px] px-1.5 py-0.5 rounded bg-[#E2B13C]/20 text-[#1B4332] border border-[#E2B13C]/40">
                  VENTURES
                </span>
              </div>
              <span className="text-[10px] text-[#736357] font-semibold uppercase tracking-wider block mt-0.5">
                Quality • Integrity • Impact • Ile-Ife
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[#EBE4D8]">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left px-3 py-2 text-sm font-medium text-[#1B4332] hover:bg-[#EFE9DF] rounded-lg"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('about', 'about-pgfv')}
              className="text-left px-3 py-2 text-sm font-medium text-[#3E4540] hover:bg-[#EFE9DF] rounded-lg"
            >
              About Us
            </button>

            {/* Catalogue button in mobile */}
            <button
              onClick={() => handleNavClick('catalogue')}
              className="col-span-2 text-left px-3.5 py-2.5 text-sm font-bold text-[#143527] bg-[#E2B13C]/20 border border-[#E2B13C]/40 hover:bg-[#E2B13C]/30 rounded-xl flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#C68A1B]" />
                <span>Product & Package Catalogue</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#1B4332] text-white">
                New
              </span>
            </button>

            {/* Event & Snacks button in mobile */}
            <button
              onClick={() => handleNavClick('events-snacks')}
              className="col-span-2 text-left px-3.5 py-2.5 text-sm font-semibold text-[#143527] bg-[#FAF5EC] border border-[#E8E1D5] hover:bg-[#EFE9DF] rounded-xl flex items-center justify-between"
            >
              <span>Event & Snack Packages (Small Chops & Drinks)</span>
              <span className="text-xs font-bold text-[#C68A1B]">Order</span>
            </button>

            {/* Consolidated Services Button */}
            <button
              onClick={() => setMobileServicesExpanded(!mobileServicesExpanded)}
              className="col-span-2 text-left px-3.5 py-2.5 text-sm font-semibold text-[#1B4332] bg-[#FAF5EC] border border-[#E8E1D5] hover:bg-[#EFE9DF] rounded-xl flex items-center justify-between shadow-2xs"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#E2B13C]"></span>
                <span>Our Services (All 12 Offerings & Solutions)</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-[#1B4332] transition-transform ${mobileServicesExpanded ? 'rotate-180' : ''}`} />
            </button>

            <button
              onClick={() => handleNavClick('reviews', 'reviews-section')}
              className="text-left px-3 py-2 text-sm font-semibold text-[#1B4332] bg-[#E2B13C]/15 rounded-lg flex items-center justify-between"
            >
              <span>Customer Reviews</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1B4332] text-[#E2B13C]">
                5.0 ★
              </span>
            </button>
            <button
              onClick={() => handleNavClick('about', 'founder-section')}
              className="text-left px-3 py-2 text-sm font-medium text-[#3E4540] hover:bg-[#EFE9DF] rounded-lg"
            >
              Founder & CEO
            </button>
            <button
              onClick={() => handleNavClick('partnerships', 'partnerships-section')}
              className="text-left px-3 py-2 text-sm font-medium text-[#3E4540] hover:bg-[#EFE9DF] rounded-lg"
            >
              Partnerships
            </button>
            <button
              onClick={() => handleNavClick('faq', 'faq-section')}
              className="text-left px-3 py-2 text-sm font-medium text-[#3E4540] hover:bg-[#EFE9DF] rounded-lg"
            >
              FAQs & Guides
            </button>
            <button
              onClick={() => handleNavClick('contact', 'contact-section')}
              className="col-span-2 text-left px-3 py-2 text-sm font-medium text-[#3E4540] hover:bg-[#EFE9DF] rounded-lg"
            >
              Contact Us
            </button>
          </div>

          {/* Expanded Mobile Services Accordion */}
          {mobileServicesExpanded && (
            <div className="bg-[#FAF7F2] p-3 rounded-2xl border border-[#E8E1D5] space-y-1.5 animate-in fade-in duration-150">
              <div className="flex items-center justify-between pb-1.5 border-b border-[#E0D7C9]">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#C68A1B]">
                  PGFV Specialized Services
                </span>
                <span className="text-[10px] text-[#627269]">
                  Select service to view
                </span>
              </div>
              <div className="max-h-60 overflow-y-auto divide-y divide-[#EFEAE0]">
                {ALL_PGFV_SERVICES.map((serv, sIdx) => (
                  <button
                    key={serv.id}
                    onClick={() => handleSelectService(serv.slug)}
                    className="w-full py-2 px-2 text-left hover:bg-white rounded-lg flex items-center gap-2.5 text-xs font-semibold text-[#143527] transition-colors"
                  >
                    <div className="w-7 h-7 rounded-md overflow-hidden bg-[#EFEAE0] shrink-0 border border-[#E5DDD0]">
                      <img
                        src={optimizeCloudinary(serv.image, 80)}
                        alt={serv.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <span className="truncate flex-1">{serv.title}</span>
                    <span className="text-[10px] font-mono text-[#8C9B93] shrink-0">
                      {sIdx + 1 < 10 ? `0${sIdx + 1}` : sIdx + 1}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRegister();
              }}
              className="w-full py-3 px-4 rounded-xl bg-[#1B4332] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow"
            >
              <ShoppingBag className="w-4 h-4 text-[#E2B13C]" />
              <span>START CHRISTMAS SAVINGS</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
