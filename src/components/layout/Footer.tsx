import { 
  Phone, 
  Mail, 
  MapPin, 
  Sparkles, 
  ExternalLink,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { BUSINESS_INFO } from '../../data/mockData';
import { PageView } from '../../types';

interface FooterProps {
  onNavigate: (page: PageView, sectionId?: string) => void;
  onOpenRegister: () => void;
  onOpenTerms: () => void;
  onOpenPrivacy: () => void;
}

export function Footer({ onNavigate, onOpenRegister, onOpenTerms, onOpenPrivacy }: FooterProps) {
  return (
    <footer className="bg-[#122A20] text-[#E4EDE7] border-t border-[#1E3F31] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#244A3A]">
          {/* Col 1: Brand & Tagline */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-white p-1 border-2 border-[#E2B13C]/60 shadow-lg flex items-center justify-center shrink-0 overflow-hidden">
                <img
                  src={BUSINESS_INFO.logo}
                  alt="Precious Gem Foods Ventures Official Logo"
                  className="w-full h-full object-contain rounded-xl"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-lg tracking-tight text-white leading-tight">
                  PRECIOUS GEM FOODS VENTURES
                </h3>
                <span className="text-xs font-bold tracking-wider text-[#E2B13C] uppercase block mt-0.5">
                  (PGFV) • ILE-IFE, OSUN STATE
                </span>
              </div>
            </div>

            <div className="inline-block px-3 py-1 rounded bg-[#1B4332] text-xs font-semibold tracking-widest text-[#E2B13C] border border-[#E2B13C]/30">
              {BUSINESS_INFO.tagline}
            </div>

            <p className="text-sm text-[#A8BEB4] leading-relaxed max-w-sm">
              “{BUSINESS_INFO.supportingStatement}”
            </p>

            <p className="text-xs text-[#87A094] leading-relaxed">
              A modern Nigerian food solutions and empowerment enterprise making quality foodstuffs accessible, hygienically packaged, and convenient to plan for.
            </p>

            {/* Social Icons */}
            <div className="pt-2">
              <span className="text-xs text-[#A8BEB4] block mb-2 font-medium">Connect With PGFV:</span>
              <div className="flex items-center gap-3">
                <a 
                  href={BUSINESS_INFO.socials.instagram} 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#1B4332] hover:bg-[#E2B13C] hover:text-[#122A20] text-xs font-medium transition-colors flex items-center gap-1.5 border border-[#2D5A46]"
                  title="Follow PGFV on Instagram"
                >
                  <span>Instagram</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a 
                  href={BUSINESS_INFO.socials.facebook} 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#1B4332] hover:bg-[#E2B13C] hover:text-[#122A20] text-xs font-medium transition-colors flex items-center gap-1.5 border border-[#2D5A46]"
                  title="Follow PGFV on Facebook"
                >
                  <span>Facebook</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a 
                  href={BUSINESS_INFO.socials.tiktok} 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#1B4332] hover:bg-[#E2B13C] hover:text-[#122A20] text-xs font-medium transition-colors flex items-center gap-1.5 border border-[#2D5A46]"
                  title="Follow PGFV on TikTok"
                >
                  <span>TikTok</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Company Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-[#E2B13C]">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-[#B4C9BF]">
              <li>
                <button 
                  onClick={() => onNavigate('about', 'about-pgfv')}
                  className="hover:text-white transition-colors text-left"
                >
                  About PGFV
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('about', 'why-pgfv')}
                  className="hover:text-white transition-colors text-left"
                >
                  Why Choose PGFV
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('services', 'services-section')}
                  className="hover:text-white transition-colors text-left"
                >
                  All Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('impact', 'impact-section')}
                  className="hover:text-white transition-colors text-left"
                >
                  Our Impact
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('partnerships', 'partnerships-section')}
                  className="hover:text-white transition-colors text-left"
                >
                  Partnerships
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('about', 'founder-section')}
                  className="hover:text-white transition-colors text-left"
                >
                  Founder & Leadership
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Savings Navigation */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-[#E2B13C]">
              Savings & Solutions
            </h4>
            <ul className="space-y-2 text-sm text-[#B4C9BF]">
              <li>
                <button 
                  onClick={() => onNavigate('savings', 'savings-section')}
                  className="hover:text-white transition-colors text-left font-medium text-white flex items-center gap-1.5"
                >
                  <span>Christmas Savings Plan</span>
                  <span className="text-[10px] bg-[#E2B13C] text-[#122A20] px-1.5 py-0.2 rounded font-bold">2026</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('savings', 'savings-options')}
                  className="hover:text-white transition-colors text-left"
                >
                  Weekly Savings Options
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('savings', 'savings-calculator')}
                  className="hover:text-white transition-colors text-left"
                >
                  Savings Calculator
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('savings', 'how-it-works')}
                  className="hover:text-white transition-colors text-left"
                >
                  How It Works (7 Steps)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('students', 'student-solutions')}
                  className="hover:text-white transition-colors text-left"
                >
                  Student Food Packages
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('faq', 'faq-section')}
                  className="hover:text-white transition-colors text-left"
                >
                  Savings & Delivery FAQs
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenTerms}
                  className="hover:text-[#E2B13C] transition-colors text-left flex items-center gap-1 text-xs text-[#E2B13C]/90"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Savings Terms & Conditions</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Location */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-[#E2B13C]">
              Contact PGFV
            </h4>
            <div className="space-y-2.5 text-sm text-[#B4C9BF]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E2B13C] shrink-0 mt-0.5" />
                <span>{BUSINESS_INFO.location}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#E2B13C] shrink-0" />
                <a 
                  href={`tel:${BUSINESS_INFO.phone}`} 
                  className="hover:text-white font-medium transition-colors"
                >
                  {BUSINESS_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#E2B13C] shrink-0" />
                <a 
                  href={`mailto:${BUSINESS_INFO.email}`} 
                  className="hover:text-white transition-colors break-all"
                >
                  {BUSINESS_INFO.email}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenRegister}
                className="w-full py-2.5 px-4 rounded-xl bg-[#E2B13C] hover:bg-[#C68A1B] text-[#122A20] font-bold text-xs uppercase tracking-wider shadow transition-colors text-center"
              >
                Join Savings Plan
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#87A094]">
          <p>
            © 2026 {BUSINESS_INFO.name}. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <button 
              onClick={onOpenTerms}
              className="hover:text-white transition-colors"
            >
              Terms & Conditions
            </button>
            <span>•</span>
            <button 
              onClick={onOpenPrivacy}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <span className="text-[#A2B6AC]">
              Quality Food • Structured Savings • Community Empowerment
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
