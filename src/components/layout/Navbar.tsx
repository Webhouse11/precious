import { useState } from 'react';
import { 
  Phone, 
  Menu, 
  X, 
  Sparkles, 
  ShoppingBag, 
  Calendar, 
  ChevronRight
} from 'lucide-react';
import { BUSINESS_INFO } from '../../data/mockData';
import { PageView } from '../../types';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView, sectionId?: string) => void;
  onOpenRegister: (planId?: string) => void;
}

export function Navbar({ currentPage, onNavigate, onOpenRegister }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: PageView, sectionId?: string) => {
    onNavigate(page, sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#EBE4D8] transition-all">
      {/* Top Announcement Strip */}
      <div className="bg-[#1B4332] text-[#F4EBD9] text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#E2B13C] text-[#1B4332]">
              2026 SAVINGS ACTIVE
            </span>
            <span className="hidden sm:inline">
              PGFV Christmas Foodstuff Savings Plan: Start early, save gradually, celebrate better.
            </span>
            <span className="sm:hidden">
              PGFV Christmas Savings Plan Open
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
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
                src={BUSINESS_INFO.logo}
                alt="Precious Gem Foods Ventures Official Logo"
                className="w-full h-full object-contain rounded-xl"
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
                Quality Food Solutions • Ile-Ife
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-2.5 xl:px-3 py-2 rounded-lg text-[13px] xl:text-sm font-medium transition-colors whitespace-nowrap ${
                currentPage === 'home' 
                  ? 'text-[#1B4332] bg-[#EFE9DF] font-semibold' 
                  : 'text-[#3E4540] hover:text-[#1B4332] hover:bg-[#F4EFE6]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('about', 'about-pgfv')}
              className={`px-2.5 xl:px-3 py-2 rounded-lg text-[13px] xl:text-sm font-medium transition-colors whitespace-nowrap ${
                currentPage === 'about' 
                  ? 'text-[#1B4332] bg-[#EFE9DF] font-semibold' 
                  : 'text-[#3E4540] hover:text-[#1B4332] hover:bg-[#F4EFE6]'
              }`}
            >
              About Us
            </button>
            <button
              onClick={() => handleNavClick('services', 'services-section')}
              className={`px-2.5 xl:px-3 py-2 rounded-lg text-[13px] xl:text-sm font-medium transition-colors whitespace-nowrap ${
                currentPage === 'services' 
                  ? 'text-[#1B4332] bg-[#EFE9DF] font-semibold' 
                  : 'text-[#3E4540] hover:text-[#1B4332] hover:bg-[#F4EFE6]'
              }`}
            >
              Products & Services
            </button>
            
            {/* Christmas Savings Plan (Highlighted) */}
            <button
              onClick={() => handleNavClick('savings', 'savings-section')}
              className={`px-2.5 xl:px-3 py-2 rounded-lg text-[13px] xl:text-sm font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                currentPage === 'savings' 
                  ? 'text-[#1B4332] bg-[#E2B13C]/25 border border-[#E2B13C]/50 font-bold' 
                  : 'text-[#1B4332] bg-[#E2B13C]/10 border border-[#E2B13C]/30 hover:bg-[#E2B13C]/20 font-semibold'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-[#C68A1B]" />
              <span>Christmas Savings</span>
              <span className="w-2 h-2 rounded-full bg-[#E2B13C] animate-pulse"></span>
            </button>

            <button
              onClick={() => handleNavClick('students', 'student-solutions')}
              className={`px-2.5 xl:px-3 py-2 rounded-lg text-[13px] xl:text-sm font-medium transition-colors whitespace-nowrap ${
                currentPage === 'students' 
                  ? 'text-[#1B4332] bg-[#EFE9DF] font-semibold' 
                  : 'text-[#3E4540] hover:text-[#1B4332] hover:bg-[#F4EFE6]'
              }`}
            >
              Student Packages
            </button>
            <button
              onClick={() => handleNavClick('impact', 'impact-section')}
              className={`px-2.5 xl:px-3 py-2 rounded-lg text-[13px] xl:text-sm font-medium transition-colors whitespace-nowrap ${
                currentPage === 'impact' 
                  ? 'text-[#1B4332] bg-[#EFE9DF] font-semibold' 
                  : 'text-[#3E4540] hover:text-[#1B4332] hover:bg-[#F4EFE6]'
              }`}
            >
              Community Impact
            </button>
            <button
              onClick={() => handleNavClick('faq', 'faq-section')}
              className={`px-2.5 xl:px-3 py-2 rounded-lg text-[13px] xl:text-sm font-medium transition-colors whitespace-nowrap ${
                currentPage === 'faq' 
                  ? 'text-[#1B4332] bg-[#EFE9DF] font-semibold' 
                  : 'text-[#3E4540] hover:text-[#1B4332] hover:bg-[#F4EFE6]'
              }`}
            >
              FAQs
            </button>
            <button
              onClick={() => handleNavClick('contact', 'contact-section')}
              className={`px-2.5 xl:px-3 py-2 rounded-lg text-[13px] xl:text-sm font-medium transition-colors whitespace-nowrap ${
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
                src={BUSINESS_INFO.logo}
                alt="PGFV Official Logo"
                className="w-full h-full object-contain rounded-lg"
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
            <button
              onClick={() => handleNavClick('services', 'services-section')}
              className="text-left px-3 py-2 text-sm font-medium text-[#3E4540] hover:bg-[#EFE9DF] rounded-lg"
            >
              Products & Services
            </button>
            <button
              onClick={() => handleNavClick('savings', 'savings-section')}
              className="text-left px-3 py-2 text-sm font-semibold text-[#1B4332] bg-[#E2B13C]/20 rounded-lg flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-[#C68A1B]" />
              <span>Christmas Savings</span>
            </button>
            <button
              onClick={() => handleNavClick('students', 'student-solutions')}
              className="text-left px-3 py-2 text-sm font-medium text-[#3E4540] hover:bg-[#EFE9DF] rounded-lg"
            >
              Student Packages
            </button>
            <button
              onClick={() => handleNavClick('impact', 'impact-section')}
              className="text-left px-3 py-2 text-sm font-medium text-[#3E4540] hover:bg-[#EFE9DF] rounded-lg"
            >
              Community Impact
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
              className="text-left px-3 py-2 text-sm font-medium text-[#3E4540] hover:bg-[#EFE9DF] rounded-lg"
            >
              Contact Us
            </button>
          </div>

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
