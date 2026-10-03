import { useState } from 'react';
import { 
  GraduationCap, 
  ArrowRight, 
  Sparkles, 
  Package, 
  Check, 
  MapPin, 
  Phone, 
  HelpCircle, 
  ChevronDown, 
  PiggyBank, 
  Clock, 
  Sliders, 
  ArrowLeft,
  Truck,
  Eye,
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import { STUDENT_PACKAGES, STUDENT_FAQS, StudentPackage } from '../../data/studentPackagesData';
import { BUSINESS_INFO } from '../../data/mockData';
import { PackageDetailsModal } from './PackageDetailsModal';
import { StudentOrderForm } from './StudentOrderForm';
import { createWhatsAppUrl, formatNaira, optimizeCloudinary, PGFV_WHATSAPP_PHONE, PGFV_WHATSAPP_DISPLAY } from '../../utils/helpers';
import { PageView } from '../../types';

interface StudentFoodPackagesPageProps {
  onNavigate: (page: PageView, sectionId?: string) => void;
  onOpenSavingsRegister: () => void;
}

export function StudentFoodPackagesPage({
  onNavigate,
  onOpenSavingsRegister
}: StudentFoodPackagesPageProps) {
  // State
  const [selectedPackageForDetail, setSelectedPackageForDetail] = useState<StudentPackage | null>(null);
  const [activePackageIdForForm, setActivePackageIdForForm] = useState<string>('pkg-10000');
  const [filterBudget, setFilterBudget] = useState<string>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const scrollToForm = (packageId?: string) => {
    if (packageId) {
      setActivePackageIdForForm(packageId);
    }
    const formElement = document.getElementById('student-order-form-section');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPackages = () => {
    const pkgElement = document.getElementById('student-packages-options');
    if (pkgElement) {
      pkgElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGeneralWhatsApp = () => {
    const msg = 'Hello Precious Gem Foods Ventures, I would like to make an enquiry about Student Food Packages.';
    window.open(createWhatsAppUrl(msg, PGFV_WHATSAPP_PHONE), '_blank', 'noopener,noreferrer');
  };

  const filteredPackages = STUDENT_PACKAGES.filter(pkg => {
    if (filterBudget === 'all') return true;
    if (filterBudget === 'custom') return pkg.id === 'pkg-custom';
    if (filterBudget === '6000') return pkg.id === 'pkg-6000';
    if (filterBudget === '10000') return pkg.id === 'pkg-10000';
    if (filterBudget === '15000') return pkg.id === 'pkg-15000';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1E2320]">
      {/* 0. Breadcrumb Navigation Bar */}
      <div className="bg-[#FAF7F2] border-b border-[#E8E2D5] py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-xs font-semibold text-[#1B4332] hover:text-[#122A20] hover:underline transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to PGFV Home</span>
          </button>

          <div className="flex items-center gap-3 text-xs text-[#6F7F77]">
            <span className="hidden sm:inline">Precious Gem Foods Ventures</span>
            <span className="hidden sm:inline">•</span>
            <span className="font-semibold text-[#1B4332]">Student Food Packages</span>
          </div>
        </div>
      </div>

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#FDFBF7] to-[#FDFBF7] py-14 sm:py-20 border-b border-[#E8E2D5]">
        {/* Decorative background blurs */}
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-[#E2B13C]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-80 h-80 bg-[#1B4332]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B4332]/10 text-[#1B4332] text-xs font-bold uppercase tracking-wider">
                <GraduationCap className="w-4 h-4 text-[#C68A1B]" />
                <span>STUDENT FOOD SOLUTIONS • CAMPUS MEALS</span>
              </div>

              <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#143527] leading-[1.15] tracking-tight">
                Student Food Packages
              </h1>

              <p className="text-base sm:text-lg text-[#3E4F46] leading-relaxed max-w-2xl font-medium">
                Affordable and convenient food packages designed to support students throughout the semester.
              </p>

              <p className="text-sm text-[#5B6B62] leading-relaxed max-w-xl">
                Choose from our popular ₦6,000, ₦10,000, and ₦15,000 packages or build a custom bundle around your personal budget. Delivered directly to your campus hostel, hall of residence, or off-campus apartment.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <button
                  onClick={scrollToPackages}
                  className="px-6 py-3.5 rounded-xl bg-[#1B4332] hover:bg-[#143527] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                  id="hero-explore-packages-btn"
                >
                  <span>Explore Packages</span>
                  <ArrowRight className="w-4 h-4 text-[#E2B13C]" />
                </button>

                <button
                  onClick={() => scrollToForm('pkg-custom')}
                  className="px-6 py-3.5 rounded-xl bg-white hover:bg-[#FAF7F2] text-[#1B4332] border-2 border-[#1B4332]/30 font-bold text-xs uppercase tracking-wider shadow-2xs hover:shadow transition-all flex items-center gap-2 cursor-pointer"
                  id="hero-request-custom-btn"
                >
                  <Sliders className="w-4 h-4 text-[#C68A1B]" />
                  <span>Request a Custom Package</span>
                </button>
              </div>

              {/* Trust Pillars */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-[#EAE3D6] text-xs text-[#52635A]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#1B4332]"></div>
                  <span>Kg & Congo Options</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#1B4332]"></div>
                  <span>Hostel Delivery in Ile-Ife</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#1B4332]"></div>
                  <span>WhatsApp Fast Order</span>
                </div>
              </div>
            </div>

            {/* Right Image Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-white group">
                <img
                  src={optimizeCloudinary("https://res.cloudinary.com/dhzouslh1/image/upload/v1788937284/1000290176_j1a30q.jpg", 650)}
                  alt="Precious Gem Foods Ventures Student Food Packages and Youth Empowerment"
                  className="w-full h-80 sm:h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                  width={550}
                  height={380}
                  loading="eager"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#122A20] via-[#122A20]/90 to-transparent p-5 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#E2B13C] block mb-1">
                    Hygienic Campus Staples
                  </span>
                  <h4 className="font-heading font-bold text-base text-white">
                    Peeled Beans Flour, Parboiled Rice, Clean Garri & Proteins
                  </h4>
                  <p className="text-xs text-[#D1E0D8] mt-1">
                    Portioned cleanly to eliminate market hassles during lectures and exam preparation.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. INTRODUCTION / VALUE PROPOSITION */}
      <section className="py-14 sm:py-16 bg-white border-b border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#1B4332] bg-[#E2B13C]/20 px-3 py-1 rounded-full">
              PGFV CAMPUS SOLUTION
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#143527]">
              Food Solutions Designed for Students
            </h2>
            <p className="text-sm sm:text-base text-[#5B6B62] leading-relaxed">
              Students have different budgets, locations, and food needs. PGFV provides flexible foodstuff packages that can be selected according to available budget and customised where necessary.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Choose from Available Packages',
                desc: 'Pick pre-curated ₦6k, ₦10k, or ₦15k bundles assembled to cover key daily meals.',
                icon: Package
              },
              {
                title: 'Select According to Budget',
                desc: 'Enter any custom budget amount. We advise you on the best combination of staples.',
                icon: Sliders
              },
              {
                title: 'Kg & Congo Measurements',
                desc: 'Request different quantities in Congos or Kilograms depending on what suits you.',
                icon: Check
              },
              {
                title: 'Customise Your Package',
                desc: 'Add, swap, or prioritize specific staples such as extra beans flour or cooking oil.',
                icon: Sparkles
              },
              {
                title: 'Campus & Hostel Delivery',
                desc: 'Specify your school, hall of residence, or off-campus address for coordinated delivery.',
                icon: MapPin
              },
              {
                title: 'Direct WhatsApp Confirmation',
                desc: 'Enquiries go straight to the PGFV team at 09167621558 for transparent confirmation.',
                icon: MessageCircle
              }
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={idx} 
                  className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D6] hover:border-[#1B4332]/30 hover:shadow-sm transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#1B4332] text-[#E2B13C] flex items-center justify-center mb-3.5 shadow-2xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-sm sm:text-base text-[#143527] mb-1.5">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#67776F] leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. PACKAGE BUDGET OPTIONS (CATALOGUE) */}
      <section id="student-packages-options" className="py-16 sm:py-20 bg-[#FDFBF7] border-b border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#1B4332] bg-[#E2B13C]/20 px-3 py-1 rounded-full">
                SELECT YOUR BUDGET
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-[#143527]">
                Student Food Package Options
              </h2>
              <p className="text-xs sm:text-sm text-[#5B6B62] max-w-xl">
                Compare package budgets, see included food items, and click to view full details or send an enquiry.
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 bg-[#FAF7F2] p-1.5 rounded-2xl border border-[#E3DCD0]">
              {[
                { label: 'All Packages', val: 'all' },
                { label: '₦6,000', val: '6000' },
                { label: '₦10,000', val: '10000' },
                { label: '₦15,000', val: '15000' },
                { label: 'Custom', val: 'custom' }
              ].map((btn) => (
                <button
                  key={btn.val}
                  onClick={() => setFilterBudget(btn.val)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    filterBudget === btn.val
                      ? 'bg-[#1B4332] text-white shadow-2xs'
                      : 'text-[#4A5750] hover:bg-white hover:text-[#1B4332]'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPackages.map((pkg) => {
              const isPopular = pkg.popular;
              return (
                <div
                  key={pkg.id}
                  className={`rounded-3xl overflow-hidden bg-white border flex flex-col justify-between transition-all duration-300 hover:shadow-lg relative group ${
                    isPopular 
                      ? 'border-[#1B4332] ring-2 ring-[#1B4332]/20 shadow-md' 
                      : 'border-[#E3DCD0] shadow-sm'
                  }`}
                >
                  {/* Top Image + Badges */}
                  <div>
                    <div className="relative h-44 overflow-hidden bg-[#1B4332]/10">
                      <img
                        src={optimizeCloudinary(pkg.image, 450)}
                        alt={pkg.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm ${
                          isPopular ? 'bg-[#E2B13C] text-[#1B4332]' : 'bg-[#1B4332] text-white'
                        }`}>
                          {pkg.badge}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className="text-[10px] font-semibold bg-white/90 text-[#1B4332] px-2 py-0.5 rounded-full backdrop-blur-xs shadow-2xs">
                          {pkg.availability}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 space-y-4">
                      <div>
                        <div className="flex items-baseline justify-between gap-1 mb-1">
                          <h3 className="font-heading font-extrabold text-xl text-[#143527]">
                            {pkg.price > 0 ? formatNaira(pkg.price) : 'Custom Budget'}
                          </h3>
                          {pkg.price > 0 && (
                            <span className="text-[11px] text-[#7A8A82]">per pack</span>
                          )}
                        </div>
                        <h4 className="font-heading font-bold text-sm text-[#143527] line-clamp-1">
                          {pkg.name}
                        </h4>
                        <p className="text-xs text-[#5B6B62] line-clamp-2 mt-1">
                          {pkg.description}
                        </p>
                      </div>

                      {/* Items Preview */}
                      <div className="space-y-1.5 pt-2 border-t border-[#EFE9DF]">
                        <span className="text-[11px] font-bold text-[#143527] block">
                          Included Foodstuffs ({pkg.items.length} items):
                        </span>
                        <ul className="space-y-1 text-xs text-[#4F5E56]">
                          {pkg.items.slice(0, 4).map((item, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <Check className="w-3.5 h-3.5 text-[#1B4332] shrink-0 mt-0.5" />
                              <span className="line-clamp-1">
                                <strong>{item.quantity}:</strong> {item.name}
                              </span>
                            </li>
                          ))}
                          {pkg.items.length > 4 && (
                            <li className="text-[11px] text-[#C68A1B] font-semibold pl-5">
                              + {pkg.items.length - 4} more food items...
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="p-5 pt-0 space-y-2">
                    <button
                      onClick={() => setSelectedPackageForDetail(pkg)}
                      className="w-full py-2.5 px-3 rounded-xl border border-[#D5CDC0] hover:bg-[#FAF7F2] text-[#143527] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#C68A1B]" />
                      <span>View Package Details</span>
                    </button>

                    <button
                      onClick={() => scrollToForm(pkg.id)}
                      className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        isPopular
                          ? 'bg-[#1B4332] hover:bg-[#143527] text-white shadow-sm'
                          : 'bg-[#1B4332]/10 hover:bg-[#1B4332] text-[#1B4332] hover:text-white'
                      }`}
                    >
                      <span>Enquire Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. CUSTOM BUDGET PACKAGE FEATURE ("BUILD YOUR OWN") */}
      <section className="py-14 sm:py-16 bg-[#FAF7F2] border-b border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#1B4332] to-[#122A20] text-white rounded-3xl p-6 sm:p-12 shadow-xl border border-[#2D5A46] relative overflow-hidden">
            {/* Background sparkle blur */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#E2B13C]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#E2B13C] text-xs font-bold uppercase tracking-wider border border-white/15">
                  <Sliders className="w-4 h-4 text-[#E2B13C]" />
                  <span>FLEXIBLE BUDGET FREEDOM</span>
                </div>

                <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-white">
                  Build Your Own Student Food Package
                </h2>

                <p className="text-sm sm:text-base text-[#D1E0D8] leading-relaxed max-w-2xl">
                  You are never restricted to ₦6,000, ₦10,000, or ₦15,000. If your available budget is <strong>₦8,500</strong>, <strong>₦12,000</strong>, or <strong>₦25,000</strong> for you and your flatmates, enter your specific amount.
                </p>

                <p className="text-xs sm:text-sm text-[#A8BEB4] leading-relaxed">
                  Tell us what you need, your preferred hostel delivery date, and whether you prefer kilograms or congos. We will advise you on the optimal mix of foodstuffs.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => scrollToForm('pkg-custom')}
                    className="px-6 py-3.5 rounded-xl bg-[#E2B13C] hover:bg-[#d4a02c] text-[#1B4332] font-extrabold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                    id="cta-request-custom-package-btn"
                  >
                    <span>Request Custom Package</span>
                    <ArrowRight className="w-4 h-4 text-[#1B4332]" />
                  </button>

                  <button
                    onClick={handleGeneralWhatsApp}
                    className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer border border-white/20"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    <span>Ask Questions on WhatsApp</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-4 bg-white/5 border border-white/10 p-5 rounded-2xl space-y-3 backdrop-blur-xs text-xs text-[#D1E0D8]">
                <h4 className="font-heading font-bold text-sm text-[#E2B13C] flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>How Custom Budgets Work:</span>
                </h4>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Enter any exact budget amount you have.</li>
                  <li>List your preferred staples (e.g. more beans flour, less garri).</li>
                  <li>Specify delivery location (hostel / hall / off-campus).</li>
                  <li>PGFV confirms transparent breakdown before you pay.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ORDER / ENQUIRY FORM SECTION */}
      <section id="student-order-form-section" className="py-16 sm:py-20 bg-white border-b border-[#E8E2D5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <StudentOrderForm
            initialSelectedPackageId={activePackageIdForForm}
            onClearPackageSelection={() => {}}
          />
        </div>
      </section>

      {/* 7. DELIVERY INFORMATION */}
      <section className="py-14 sm:py-16 bg-[#FAF7F2] border-b border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#1B4332] bg-[#E2B13C]/20 px-3 py-1 rounded-full">
                CAMPUS LOGISTICS & DISPATCH
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#143527]">
                Student Delivery Information
              </h2>
              <p className="text-sm text-[#5B6B62] leading-relaxed">
                PGFV delivers within <strong>Ile-Ife</strong>, across <strong>Osun State</strong>, and to other student campuses in Nigeria subject to logistics.
              </p>

              <div className="space-y-3 text-xs sm:text-sm text-[#4E5C54]">
                <div className="p-3.5 rounded-xl bg-white border border-[#E3DCD0] flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#C68A1B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#143527] block">Delivery Location & Hostel Coverage</strong>
                    <span>Deliveries cover campus halls (e.g., Mozambique, Fajuyi, Anglomoz, PG Halls) and off-campus zones (Mayfair, Ede Road, Asherifa, Maintenance, etc.).</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-[#E3DCD0] flex items-start gap-3">
                  <Truck className="w-5 h-5 text-[#1B4332] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#143527] block">Transparent Delivery Fees</strong>
                    <span>Delivery fees and arrangements depend on your location, order/package size, and preferred delivery date. There are no surprise hidden costs.</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-[#E3DCD0] flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#143527] block">Delivery Confirmation Notice</strong>
                    <span>“Your preferred delivery date will be confirmed by the PGFV team based on availability and logistics.”</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-[#E3DCD0] shadow-sm space-y-4">
              <h3 className="font-heading font-bold text-base sm:text-lg text-[#143527]">
                Quick Tips for Smooth Hostel Delivery:
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#5B6B62]">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#1B4332] shrink-0 mt-0.5" />
                  <span>Provide an active WhatsApp phone number where you can be reached easily.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#1B4332] shrink-0 mt-0.5" />
                  <span>Include your specific room number or a notable gate/landmark.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#1B4332] shrink-0 mt-0.5" />
                  <span>If your hostel has restrictive gates or security protocols, mention it in the special instructions field.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#1B4332] shrink-0 mt-0.5" />
                  <span>Combine orders with your roommates or course mates to share delivery charges!</span>
                </li>
              </ul>

              <div className="pt-2">
                <button
                  onClick={scrollToPackages}
                  className="w-full py-3 rounded-xl bg-[#FAF7F2] hover:bg-[#F1ECE2] text-[#1B4332] font-bold text-xs uppercase tracking-wider border border-[#D5CCBE] transition-colors cursor-pointer text-center"
                >
                  Choose a Package & Schedule Delivery
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. STUDENT SAVINGS OPTION */}
      <section className="py-14 sm:py-16 bg-white border-b border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-10 border border-[#E3DCD0] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B4332]/10 text-[#1B4332] text-xs font-bold">
                <PiggyBank className="w-4 h-4 text-[#C68A1B]" />
                <span>WANT TO PLAN AHEAD?</span>
              </div>
              <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-[#143527]">
                Save Gradually Towards Your Foodstuff Supplies
              </h3>
              <p className="text-xs sm:text-sm text-[#5B6B62] leading-relaxed">
                If you prefer to plan your foodstuff purchases ahead, explore the PGFV Foodstuff Savings Plan (starting as low as ₦2,000 weekly) and learn how you can participate across the semester.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
              <button
                onClick={() => onNavigate('savings', 'savings-options')}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#1B4332] hover:bg-[#143527] text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Explore Foodstuff Savings Plan</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#E2B13C]" />
              </button>

              <button
                onClick={onOpenSavingsRegister}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white hover:bg-[#FAF7F2] text-[#1B4332] border border-[#D5CDC0] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                Join ₦2,000 Plan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ SECTION */}
      <section className="py-16 sm:py-20 bg-[#FDFBF7] border-b border-[#E8E2D5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#1B4332] bg-[#E2B13C]/20 px-3 py-1 rounded-full">
              GOT QUESTIONS?
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#143527]">
              Student Food Packages FAQ
            </h2>
            <p className="text-xs sm:text-sm text-[#5B6B62]">
              Everything you need to know about ordering, customising, and hostel deliveries.
            </p>
          </div>

          <div className="space-y-3">
            {STUDENT_FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-[#E3DCD0] bg-white overflow-hidden transition-all shadow-2xs"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-heading font-bold text-sm sm:text-base text-[#143527]">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#C68A1B] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-[#5B6B62] leading-relaxed border-t border-[#F1ECE2] pt-3 animate-in fade-in duration-150">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center pt-8 text-xs text-[#6F7F77]">
            <span>Still have questions about student packages? </span>
            <button
              onClick={handleGeneralWhatsApp}
              className="text-[#1B4332] font-bold underline hover:text-[#C68A1B] cursor-pointer"
            >
              Chat directly with our campus support desk on WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* 10. STRONG WHATSAPP CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-[#122A20] via-[#1B4332] to-[#122A20] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="w-14 h-14 rounded-full bg-[#E2B13C] text-[#1B4332] flex items-center justify-center mx-auto shadow-lg">
            <MessageCircle className="w-7 h-7 fill-current" />
          </div>

          <div className="space-y-2 max-w-2xl mx-auto">
            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-white">
              Ready to Order Your Student Food Package?
            </h2>
            <p className="text-sm sm:text-base text-[#D1E0D8] leading-relaxed">
              We are ready to deliver clean, stone-free food staples directly to your hostel or campus residence.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <button
              onClick={() => scrollToForm('pkg-10000')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#E2B13C] hover:bg-[#d4a02c] text-[#1B4332] font-extrabold text-sm uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Order / Enquire Online</span>
              <ArrowRight className="w-4 h-4 text-[#1B4332]" />
            </button>

            <button
              onClick={handleGeneralWhatsApp}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-[#0A1E14] font-extrabold text-sm shadow-lg shadow-[#25D366]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Chat with PGFV ({PGFV_WHATSAPP_DISPLAY})</span>
            </button>
          </div>

          <div className="pt-4 text-xs text-[#A8BEB4] flex flex-wrap items-center justify-center gap-4">
            <span>Official WhatsApp: {BUSINESS_INFO.phone}</span>
            <span>•</span>
            <span>Location: Ile-Ife, Osun State</span>
            <span>•</span>
            <span>Delivery Across Campuses</span>
          </div>
        </div>
      </section>

      {/* Package Details Modal */}
      <PackageDetailsModal
        packageData={selectedPackageForDetail}
        isOpen={Boolean(selectedPackageForDetail)}
        onClose={() => setSelectedPackageForDetail(null)}
        onSelectPackage={(pkg) => {
          scrollToForm(pkg.id);
        }}
      />
    </div>
  );
}
