import { useState } from 'react';
import { PageView, Service, SavingsPlan } from './types';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { FloatingWhatsApp } from './components/layout/FloatingWhatsApp';
import { StickyMobileCTA } from './components/layout/StickyMobileCTA';

// Section Components
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { WhyPGFVSection } from './components/sections/WhyPGFVSection';
import { ServicesSection } from './components/sections/ServicesSection';
import { ChristmasSavingsSection } from './components/sections/ChristmasSavingsSection';
import { SavingsOptionsSection } from './components/sections/SavingsOptionsSection';
import { SavingsCalculatorSection } from './components/sections/SavingsCalculatorSection';
import { HowItWorksSection } from './components/sections/HowItWorksSection';
import { WhatYouReceiveSection } from './components/sections/WhatYouReceiveSection';
import { FoodPreferenceSection } from './components/sections/FoodPreferenceSection';
import { FounderSection } from './components/sections/FounderSection';
import { StudentFoodSection } from './components/sections/StudentFoodSection';
import { CorporatePackagesSection } from './components/sections/CorporatePackagesSection';
import { ImpactSection } from './components/sections/ImpactSection';
import { PartnershipsSection } from './components/sections/PartnershipsSection';
import { FAQSection } from './components/sections/FAQSection';
import { FinalCTASection } from './components/sections/FinalCTASection';
import { ContactSection } from './components/sections/ContactSection';

// Modals
import { RegistrationModal } from './components/modals/RegistrationModal';
import { EnquiryModal } from './components/modals/EnquiryModal';
import { ParticipantPortalModal } from './components/modals/ParticipantPortalModal';
import { TermsModal } from './components/modals/TermsModal';
import { PrivacyModal } from './components/modals/PrivacyModal';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');

  // Modals state
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string | undefined>(undefined);
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

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
    if (sectionId) {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
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
    setEnquiryConfig({
      isOpen: true,
      title: 'Enquire About Student Food Packages',
      category: 'Student Food Packages',
      itemName: 'Student Semester Food Package'
    });
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
        onOpenPortal={() => setIsPortalOpen(true)}
      />

      {/* Main Content Flow */}
      <main className="flex-1 pb-16 lg:pb-0">
        
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

        {/* 5. Services */}
        <ServicesSection
          onSelectService={handleSelectService}
        />

        {/* 6. Christmas Savings Plan Flagship */}
        <ChristmasSavingsSection
          onStartSaving={() => handleOpenRegister()}
          onScrollToOptions={() => handleNavigate('savings', 'savings-options')}
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
        />

        {/* 14. Corporate & Christmas Packages */}
        <CorporatePackagesSection
          onRequestQuotation={handleOpenCorporateQuotation}
        />

        {/* 15. Impact */}
        <ImpactSection />

        {/* 16. Partnerships */}
        <PartnershipsSection />

        {/* 17. FAQ */}
        <FAQSection />

        {/* 18. Final CTA */}
        <FinalCTASection
          onStartSaving={() => handleOpenRegister()}
        />

        {/* 19. Contact */}
        <ContactSection />
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
        onStartSaving={() => handleOpenRegister()}
        onViewPlans={() => handleNavigate('savings', 'savings-options')}
      />

      {/* Interactive Modals */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        preselectedPlanId={selectedPlanId}
        onOpenTerms={() => setIsTermsOpen(true)}
      />

      <EnquiryModal
        isOpen={enquiryConfig.isOpen}
        onClose={() => setEnquiryConfig((prev) => ({ ...prev, isOpen: false }))}
        title={enquiryConfig.title}
        defaultCategory={enquiryConfig.category}
        itemName={enquiryConfig.itemName}
      />

      <ParticipantPortalModal
        isOpen={isPortalOpen}
        onClose={() => setIsPortalOpen(false)}
        onOpenRegister={() => handleOpenRegister()}
      />

      <TermsModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
        onAcceptAndRegister={() => handleOpenRegister()}
      />

      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />

    </div>
  );
}
