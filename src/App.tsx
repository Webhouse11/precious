import { useState, useEffect, lazy, Suspense } from 'react';
import { PageView, Service, SavingsPlan } from './types';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { FloatingWhatsApp } from './components/layout/FloatingWhatsApp';
import { StickyMobileCTA } from './components/layout/StickyMobileCTA';
import { AnnouncementPopupModal } from './components/modals/AnnouncementPopupModal';

// Immediate Above-The-Fold / Critical Sections
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { WhyPGFVSection } from './components/sections/WhyPGFVSection';
import { ServicesSection } from './components/sections/ServicesSection';
import { ServicesDirectorySection } from './components/sections/ServicesDirectorySection';
import { ChristmasSavingsSection } from './components/sections/ChristmasSavingsSection';

// Lazy Loaded Below-The-Fold Sections for maximum initial load performance
const ProductsSection = lazy(() => import('./components/sections/ProductsSection').then(m => ({ default: m.ProductsSection })));
const SavingsOptionsSection = lazy(() => import('./components/sections/SavingsOptionsSection').then(m => ({ default: m.SavingsOptionsSection })));
const SavingsCalculatorSection = lazy(() => import('./components/sections/SavingsCalculatorSection').then(m => ({ default: m.SavingsCalculatorSection })));
const HowItWorksSection = lazy(() => import('./components/sections/HowItWorksSection').then(m => ({ default: m.HowItWorksSection })));
const WhatYouReceiveSection = lazy(() => import('./components/sections/WhatYouReceiveSection').then(m => ({ default: m.WhatYouReceiveSection })));
const FoodPreferenceSection = lazy(() => import('./components/sections/FoodPreferenceSection').then(m => ({ default: m.FoodPreferenceSection })));
const FounderSection = lazy(() => import('./components/sections/FounderSection').then(m => ({ default: m.FounderSection })));
const StudentFoodSection = lazy(() => import('./components/sections/StudentFoodSection').then(m => ({ default: m.StudentFoodSection })));
const ReviewsSection = lazy(() => import('./components/sections/ReviewsSection').then(m => ({ default: m.ReviewsSection })));
const CorporatePackagesSection = lazy(() => import('./components/sections/CorporatePackagesSection').then(m => ({ default: m.CorporatePackagesSection })));
const ImpactSection = lazy(() => import('./components/sections/ImpactSection').then(m => ({ default: m.ImpactSection })));
const PartnershipsSection = lazy(() => import('./components/sections/PartnershipsSection').then(m => ({ default: m.PartnershipsSection })));
const FAQSection = lazy(() => import('./components/sections/FAQSection').then(m => ({ default: m.FAQSection })));
const FinalCTASection = lazy(() => import('./components/sections/FinalCTASection').then(m => ({ default: m.FinalCTASection })));
const ContactSection = lazy(() => import('./components/sections/ContactSection').then(m => ({ default: m.ContactSection })));
const StudentFoodPackagesPage = lazy(() => import('./components/students/StudentFoodPackagesPage').then(m => ({ default: m.StudentFoodPackagesPage })));
const CataloguePage = lazy(() => import('./components/catalogue/CataloguePage').then(m => ({ default: m.CataloguePage })));
const EventSnackPackagesPage = lazy(() => import('./components/events/EventSnackPackagesPage').then(m => ({ default: m.EventSnackPackagesPage })));

// Lazy Loaded Modals (only loaded when user triggers them)
const RegistrationModal = lazy(() => import('./components/modals/RegistrationModal').then(m => ({ default: m.RegistrationModal })));
const EnquiryModal = lazy(() => import('./components/modals/EnquiryModal').then(m => ({ default: m.EnquiryModal })));
const TermsModal = lazy(() => import('./components/modals/TermsModal').then(m => ({ default: m.TermsModal })));
const PrivacyModal = lazy(() => import('./components/modals/PrivacyModal').then(m => ({ default: m.PrivacyModal })));

function SectionLoader() {
  return (
    <div className="py-12 flex items-center justify-center">
      <div className="w-7 h-7 border-3 border-[#1B4332]/20 border-t-[#1B4332] rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/student-food-packages' || hash === '#student-food-packages' || hash === '#student-solutions') {
        return 'students';
      }
      if (path === '/catalogue' || hash === '#catalogue' || hash === '#products') {
        return 'catalogue';
      }
      if (path === '/event-snack-packages' || hash === '#event-snack-packages' || hash === '#event-packages' || hash === '#snacks') {
        return 'events-snacks';
      }
    }
    return 'home';
  });

  // Dynamic SEO Title & Meta sync
  useEffect(() => {
    if (currentPage === 'students') {
      document.title = 'Student Food Packages in Ile-Ife | Precious Gem Foods Ventures';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          'Affordable and convenient student food packages from Precious Gem Foods Ventures. Choose a package, customise your budget and enquire about delivery to your school, hostel or location.'
        );
      }
    } else if (currentPage === 'catalogue') {
      document.title = 'Product & Package Catalogue | Precious Gem Foods Ventures';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          'Browse PGFV Product & Package Catalogue: pure peeled beans flour, puff puff mix, custard powder, oven-dried catfish, staple grains, and food boxes with transparent pricing in Ile-Ife.'
        );
      }
    } else if (currentPage === 'events-snacks') {
      document.title = 'Event & Snack Packages | Small Chops & Pastries | PGFV Ile-Ife';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          'Freshly prepared event snack packages, small chops, puff puff, chin chin, and Chapman for student hangouts, meetings, church programs, birthdays, and conferences in Ile-Ife.'
        );
      }
    } else {
      document.title = 'Precious Gem Foods Ventures | Food Solutions & Quality Foodstuffs';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          'Precious Gem Foods Ventures (PGFV) is a food solutions and foodstuff enterprise: Quality • Integrity • Impact — “A global priority to making cooking easier.” Providing practical food solutions for individuals, families, students, schools, businesses, organisations, events, and communities.'
        );
      }
    }
  }, [currentPage]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      if (typeof window !== 'undefined') {
        const path = window.location.pathname;
        const hash = window.location.hash;
        if (path === '/student-food-packages' || hash === '#student-food-packages') {
          setCurrentPage('students');
        } else if (path === '/catalogue' || hash === '#catalogue') {
          setCurrentPage('catalogue');
        } else if (path === '/event-snack-packages' || hash === '#event-snack-packages') {
          setCurrentPage('events-snacks');
        } else {
          setCurrentPage('home');
        }
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Modals state
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string | undefined>(undefined);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isAnnouncementOpen, setIsAnnouncementOpen] = useState(false);

  // Trigger popup when visitor lands on the website
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnnouncementOpen(true);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Enquiry modal state
  const [enquiryConfig, setEnquiryConfig] = useState<{
    isOpen: boolean;
    title: string;
    category?: string;
    itemName?: string;
  }>({
    isOpen: false,
    title: 'General Enquiry'
  });

  const handleNavigate = (page: PageView, sectionId?: string) => {
    setCurrentPage(page);
    if (typeof window !== 'undefined') {
      if (page === 'students') {
        if (window.location.pathname !== '/student-food-packages') {
          window.history.pushState(null, '', '/student-food-packages');
        }
      } else if (page === 'catalogue') {
        if (window.location.pathname !== '/catalogue') {
          window.history.pushState(null, '', '/catalogue');
        }
      } else if (page === 'events-snacks') {
        if (window.location.pathname !== '/event-snack-packages') {
          window.history.pushState(null, '', '/event-snack-packages');
        }
      } else {
        if (window.location.pathname !== '/') {
          window.history.pushState(null, '', '/');
        }
      }
    }
    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }, 70);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenRegister = (planId?: string) => {
    setSelectedPlanId(planId);
    setIsRegisterOpen(true);
  };

  const handleSelectPlan = (plan: SavingsPlan) => {
    handleOpenRegister(plan.id);
  };

  const handleSelectService = (service: Service) => {
    if (service.id === 'serv-student-packages') {
      handleNavigate('students');
      return;
    }
    setEnquiryConfig({
      isOpen: true,
      title: `Enquire About ${service.title}`,
      category: 'Service Enquiry',
      itemName: service.title
    });
  };

  const handleOpenCorporateQuotation = () => {
    setEnquiryConfig({
      isOpen: true,
      title: 'Request Corporate / Hamper Quotation',
      category: 'Corporate Food Packages & Hampers',
      itemName: 'Corporate Christmas Package'
    });
  };

  const handleOpenStudentEnquiry = () => {
    handleNavigate('students');
  };

  const handleStartWithCalculatedAmount = (weeklyAmount: number) => {
    const matchedPlan = `plan-${weeklyAmount}`;
    handleOpenRegister(matchedPlan);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#1E2320] font-sans antialiased">
      
      {/* 1. Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenRegister={() => handleOpenRegister()}
        onOpenAnnouncement={() => setIsAnnouncementOpen(true)}
      />

      {/* Main Content Flow */}
      <main className="flex-1 pb-16 lg:pb-0">
        {currentPage === 'students' ? (
          <Suspense fallback={<SectionLoader />}>
            <StudentFoodPackagesPage
              onNavigate={handleNavigate}
              onOpenSavingsRegister={() => handleOpenRegister('plan-2000')}
            />
          </Suspense>
        ) : currentPage === 'catalogue' ? (
          <Suspense fallback={<SectionLoader />}>
            <CataloguePage
              onNavigateHome={() => handleNavigate('home')}
              onNavigateToServices={() => handleNavigate('services', 'services-section')}
              onNavigateToEvents={() => handleNavigate('events-snacks')}
            />
          </Suspense>
        ) : currentPage === 'events-snacks' ? (
          <Suspense fallback={<SectionLoader />}>
            <EventSnackPackagesPage
              onNavigateHome={() => handleNavigate('home')}
              onNavigateToCatalogue={() => handleNavigate('catalogue')}
              onNavigateToServices={() => handleNavigate('services', 'services-section')}
            />
          </Suspense>
        ) : (
          <>
            {/* 2. Hero 5-Service Slider: PLAN AHEAD. SAVE GRADUALLY. CELEBRATE BETTER. */}
            <HeroSection
              onStartSaving={(planId) => handleOpenRegister(planId)}
              onExplorePlans={() => handleNavigate('savings', 'savings-options')}
              onOpenCalculator={() => handleNavigate('savings', 'savings-calculator-section')}
              onOpenPreferences={() => handleNavigate('savings', 'food-preference')}
              onOpenCorporate={handleOpenCorporateQuotation}
              onOpenStudent={handleOpenStudentEnquiry}
              onOpenServiceEnquiry={(serviceTitle, category) => {
                setEnquiryConfig({
                  isOpen: true,
                  title: `Enquire About ${serviceTitle}`,
                  category: category,
                  itemName: serviceTitle
                });
              }}
              onOpenPartnership={() => handleNavigate('partnerships', 'partnerships-section')}
            />

            {/* 3. About PGFV */}
            <AboutSection
              onLearnMore={() => handleNavigate('about', 'founder-section')}
              onExplorePlans={() => handleNavigate('savings', 'savings-options')}
            />

            {/* 4. Why PGFV */}
            <WhyPGFVSection />

            {/* 5. Food Solutions (7 Core Categories) */}
            <ServicesSection
              onSelectService={(serviceTitle, category) => {
                setEnquiryConfig({
                  isOpen: true,
                  title: `Enquire About ${serviceTitle}`,
                  category: category,
                  itemName: serviceTitle
                });
              }}
              onNavigateToStudents={() => handleNavigate('students')}
              onNavigateToSavings={() => handleNavigate('savings', 'savings-options')}
              onNavigateToEvents={() => handleNavigate('events-snacks')}
              onNavigateToCatalogue={() => handleNavigate('catalogue')}
            />

            {/* 6. Specialized Services Directory (12 Services with Distinct Purpose) */}
            <ServicesDirectorySection
              onOpenEnquiry={(serviceTitle, category) => {
                setEnquiryConfig({
                  isOpen: true,
                  title: `Enquire About ${serviceTitle}`,
                  category: category,
                  itemName: serviceTitle
                });
              }}
              onNavigateToSavings={() => handleNavigate('savings', 'savings-options')}
              onNavigateToStudents={() => handleNavigate('students')}
              onNavigateToEvents={() => handleNavigate('events-snacks')}
              onNavigateToCatalogue={() => handleNavigate('catalogue')}
            />

            {/* 7. Christmas Savings Plan Flagship */}
            <ChristmasSavingsSection
              onStartSaving={() => handleOpenRegister()}
              onScrollToOptions={() => handleNavigate('savings', 'savings-options')}
            />

            <Suspense fallback={<SectionLoader />}>
              {/* Featured Food Products Showcase (Flours, Grains, Dried Fish, Mixes) */}
              <ProductsSection
                onEnquireProduct={(product) => {
                  setEnquiryConfig({
                    isOpen: true,
                    title: `Enquire About ${product.name}`,
                    category: product.category,
                    itemName: product.name
                  });
                }}
                onNavigateToCatalogue={() => handleNavigate('catalogue')}
              />

              {/* 7. Savings Options */}
              <SavingsOptionsSection
                onSelectPlan={handleSelectPlan}
                onAskMonthly={() => {
                  setEnquiryConfig({
                    isOpen: true,
                    title: 'Monthly Savings Plan Enquiry',
                    category: 'Christmas Savings Plan (Monthly Option)',
                    itemName: 'Monthly Upfront Payment Option'
                  });
                }}
              />

              {/* 8. Savings Calculator */}
              <SavingsCalculatorSection
                onStartWithAmount={handleStartWithCalculatedAmount}
              />

              {/* 9. How It Works (Timeline, 7 Steps, Late Joining, Accountability) */}
              <HowItWorksSection
                onStartSaving={() => handleOpenRegister()}
                onContactAssistance={() => handleNavigate('contact', 'contact-section')}
              />

              {/* 10. What You Receive */}
              <WhatYouReceiveSection />

              {/* 11. Food Preference */}
              <FoodPreferenceSection />

              {/* 12. Founder */}
              <FounderSection />

              {/* 13. Student Food Solutions */}
              <StudentFoodSection
                onEnquireStudents={handleOpenStudentEnquiry}
                onOpenRegister={() => handleOpenRegister('plan-2000')}
                onExploreAllPackages={() => handleNavigate('students')}
              />

              {/* 14. Customer Reviews Showcase (Tagged REVIEWS with smooth scrolling marquee) */}
              <ReviewsSection 
                onStartSaving={() => handleOpenRegister()}
              />

              {/* 15. Corporate & Christmas Packages */}
              <CorporatePackagesSection
                onRequestQuotation={handleOpenCorporateQuotation}
              />

              {/* 16. Impact */}
              <ImpactSection />

              {/* 17. Partnerships */}
              <PartnershipsSection />

              {/* 18. FAQ */}
              <FAQSection />

              {/* 19. Final CTA */}
              <FinalCTASection
                onStartSaving={() => handleOpenRegister()}
              />

              {/* 20. Contact */}
              <ContactSection />
            </Suspense>
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenRegister={() => handleOpenRegister()}
        onOpenTerms={() => setIsTermsOpen(true)}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
      />

      {/* Persistent Action Utilities */}
      <FloatingWhatsApp />
      
      <StickyMobileCTA
        currentPage={currentPage}
        onStartSaving={() => handleOpenRegister()}
        onViewPlans={() => handleNavigate('savings', 'savings-options')}
        onOrderStudentPackage={() => {
          const el = document.getElementById('student-order-form-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Special Announcement Popup Modal on Page Landing */}
      <AnnouncementPopupModal
        isOpen={isAnnouncementOpen}
        onClose={() => setIsAnnouncementOpen(false)}
      />

      {/* Interactive Modals loaded on-demand */}
      <Suspense fallback={null}>
        {isRegisterOpen && (
          <RegistrationModal
            isOpen={isRegisterOpen}
            onClose={() => setIsRegisterOpen(false)}
            preselectedPlanId={selectedPlanId}
            onOpenTerms={() => setIsTermsOpen(true)}
          />
        )}

        {enquiryConfig.isOpen && (
          <EnquiryModal
            isOpen={enquiryConfig.isOpen}
            onClose={() => setEnquiryConfig((prev) => ({ ...prev, isOpen: false }))}
            title={enquiryConfig.title}
            defaultCategory={enquiryConfig.category}
            itemName={enquiryConfig.itemName}
          />
        )}

        {isTermsOpen && (
          <TermsModal
            isOpen={isTermsOpen}
            onClose={() => setIsTermsOpen(false)}
            onAcceptAndRegister={() => handleOpenRegister()}
          />
        )}

        {isPrivacyOpen && (
          <PrivacyModal
            isOpen={isPrivacyOpen}
            onClose={() => setIsPrivacyOpen(false)}
          />
        )}
      </Suspense>

    </div>
  );
}
