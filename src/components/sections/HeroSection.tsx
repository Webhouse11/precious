import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  HeartHandshake, 
  ChevronLeft, 
  ChevronRight,
  GraduationCap,
  Gift,
  Tag,
  Users,
  Pause,
  Play
} from 'lucide-react';
import { createWhatsAppUrl } from '../../utils/helpers';

interface HeroSectionProps {
  onStartSaving: (planId?: string) => void;
  onExplorePlans: () => void;
  onOpenCalculator?: () => void;
  onOpenPreferences?: () => void;
  onOpenCorporate?: () => void;
  onOpenStudent?: () => void;
  onOpenServiceEnquiry?: (serviceName: string, category: string) => void;
  onOpenPartnership?: () => void;
}

export function HeroSection({
  onStartSaving,
  onExplorePlans,
  onOpenCorporate,
  onOpenStudent,
  onOpenServiceEnquiry,
  onOpenPartnership
}: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const SLIDE_DURATION = 6500; // ms

  // 5 Specialized Service Slides for PGFV
  const slides = [
    // Slide 1: Christmas Foodstuff Savings Plan
    {
      id: 'service-christmas-savings',
      tabLabel: '01. Christmas Savings',
      serviceTag: 'SERVICE 01 • CHRISTMAS FOODSTUFF SAVINGS PLAN',
      headlinePrefix: 'PLAN AHEAD.',
      headlineAccent: 'SAVE GRADUALLY.',
      headlineSuffix: 'CELEBRATE BETTER.',
      subtitle:
        'Beat the December price rush with Nigeria\'s most transparent Christmas Foodstuff Savings initiative. Save weekly (₦2,000–₦15,000) or upfront monthly from September 1st, 2026, and secure your household festive food package stress-free.',
      primaryBtnText: 'START SAVING NOW',
      primaryAction: () => onStartSaving(),
      primaryIcon: Calendar,
      secondaryBtnText: 'EXPLORE 5 TIERS',
      secondaryAction: () => onExplorePlans(),
      image:
        'https://res.cloudinary.com/dhzouslh1/image/upload/v1788937287/1000290187_vwyuyg.jpg',
      imageBadge: 'Flagship Food Savings',
      badgeHighlight: 'From ₦2,000 / Week',
      cardTitle: '2026 SAVINGS MILESTONES',
      cardItems: [
        { label: 'Savings Launch', val: 'Sept 1, 2026', color: 'text-[#1B4332]' },
        { label: 'Catch-up Deadline', val: 'Dec 15, 2026', color: 'text-[#C68A1B]' },
        { label: 'Delivery Begins', val: 'Dec 21, 2026', color: 'text-[#1B4332]' }
      ],
      features: [
        '5 flexible weekly tiers + monthly advance option',
        'Verifiable Digital Savings Card with unique Participant ID',
        'Reliable doorstep delivery or coordinated pickup'
      ]
    },

    // Slide 2: Student Food Packages & Campus Solutions
    {
      id: 'service-student-packages',
      tabLabel: '02. Student Packages',
      serviceTag: 'SERVICE 02 • STUDENT FOOD PACKAGES & CAMPUS SOLUTIONS',
      headlinePrefix: 'PLAN AHEAD.',
      headlineAccent: 'SAVE GRADUALLY.',
      headlineSuffix: 'CELEBRATE BETTER.',
      subtitle:
        'Nutritious, easy-to-cook food packs tailored for campus undergraduates, polytechnic scholars, and busy student hostels. Flexible semester installments let you eat well and stay energized for exams.',
      primaryBtnText: 'ENQUIRE STUDENT PACKS',
      primaryAction: () => (onOpenStudent ? onOpenStudent() : onStartSaving('plan-2000')),
      primaryIcon: GraduationCap,
      secondaryBtnText: 'JOIN ₦2,000 / WK PLAN',
      secondaryAction: () => onStartSaving('plan-2000'),
      image:
        'https://res.cloudinary.com/dhzouslh1/image/upload/v1788937284/1000290174_bppwgo.jpg',
      imageBadge: 'Campus Welfare Solution',
      badgeHighlight: 'Hostel-Ready Portions',
      cardTitle: 'STUDENT CARE HIGHLIGHTS',
      cardItems: [
        { label: 'Stone-Free Grains', val: 'Clean Staples', color: 'text-[#1B4332]' },
        { label: 'Semester Budget', val: '₦2,000 / wk', color: 'text-[#C68A1B]' },
        { label: 'Campus Pickup', val: 'Ife & Beyond', color: 'text-[#1B4332]' }
      ],
      features: [
        'Pre-cleaned, stone-free beans, garri, rice & quick flours',
        'Pocket-friendly progressive payments across the semester',
        'Direct campus hostels & student union collection points'
      ]
    },

    // Slide 3: Employee / Corporate Packages & Christmas Hampers
    {
      id: 'service-corporate-hampers',
      tabLabel: '03. Corporate Hampers',
      serviceTag: 'SERVICE 03 • CORPORATE PACKAGES & CHRISTMAS HAMPERS',
      headlinePrefix: 'PLAN AHEAD.',
      headlineAccent: 'SAVE GRADUALLY.',
      headlineSuffix: 'CELEBRATE BETTER.',
      subtitle:
        'Premium food packages and luxury Christmas gift hampers for organizations, employers, churches, and executive partners. Reward your hardworking team with wholesome, hygienic foodstuffs that every family appreciates.',
      primaryBtnText: 'REQUEST QUOTATION',
      primaryAction: () => (onOpenCorporate ? onOpenCorporate() : onStartSaving()),
      primaryIcon: Gift,
      secondaryBtnText: 'CHAT ON WHATSAPP',
      secondaryAction: () => {
        window.open(createWhatsAppUrl('Hello PGFV, I would like to request a corporate quotation for staff food packages and Christmas hampers.'), '_blank');
      },
      image:
        'https://res.cloudinary.com/dhzouslh1/image/upload/v1788937286/1000290188_licuvk.jpg',
      imageBadge: 'Corporate & Staff Welfare',
      badgeHighlight: 'Custom Invoicing',
      cardTitle: 'CORPORATE ADVANTAGES',
      cardItems: [
        { label: 'Dedicated Invoicing', val: 'Tax Compliant', color: 'text-[#1B4332]' },
        { label: 'Greeting Ribbons', val: 'Custom Branded', color: 'text-[#C68A1B]' },
        { label: 'Premises Dispatch', val: 'Bulk Delivery', color: 'text-[#1B4332]' }
      ],
      features: [
        'Customizable hampers tailored to your corporate budget',
        'Dedicated procurement invoices and corporate receipts',
        'Coordinated bulk delivery directly to company premises'
      ]
    },

    // Slide 4: Private Labelling & Contract Packaging
    {
      id: 'service-private-labelling',
      tabLabel: '04. Private Labelling',
      serviceTag: 'SERVICE 04 • PRIVATE LABELLING & CONTRACT PACKAGING',
      headlinePrefix: 'PLAN AHEAD.',
      headlineAccent: 'SAVE GRADUALLY.',
      headlineSuffix: 'CELEBRATE BETTER.',
      subtitle:
        'Elevate your food brand with PGFV\'s professional contract packaging. We clean, process, weigh, and seal premium flours, grains, and dry proteins with your custom logo, brand labels, and retail packaging.',
      primaryBtnText: 'ENQUIRE PRIVATE LABELLING',
      primaryAction: () => {
        if (onOpenServiceEnquiry) {
          onOpenServiceEnquiry('Private Labelling & Contract Packaging', 'Private Labelling');
        } else {
          window.open(createWhatsAppUrl('Hello PGFV, I am interested in your Private Labelling and Contract Packaging services.'), '_blank');
        }
      },
      primaryIcon: Tag,
      secondaryBtnText: 'WHY CHOOSE PGFV',
      secondaryAction: () => {
        const el = document.getElementById('why-pgfv');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
      image:
        'https://res.cloudinary.com/dhzouslh1/image/upload/v1788937286/1000290185_fvcxhq.jpg',
      imageBadge: 'Supermarkets & Retailers',
      badgeHighlight: 'Your Brand On Pack',
      cardTitle: 'PACKAGING STANDARDS',
      cardItems: [
        { label: 'Airtight Pouch', val: 'Tamper-Proof', color: 'text-[#1B4332]' },
        { label: 'NAFDAC Aligned', val: 'Strict Hygiene', color: 'text-[#C68A1B]' },
        { label: 'Scalable Orders', val: 'Small & Large', color: 'text-[#1B4332]' }
      ],
      features: [
        'Hygienic sorting, destoning, and precision weight packaging',
        'Custom logo sticker & branded pouch integration',
        'Fast turnaround for retail stores, vendors & distributors'
      ]
    },

    // Slide 5: Event Souvenirs, Charity Distribution & Skills Empowerment
    {
      id: 'service-souvenirs-outreach',
      tabLabel: '05. Souvenirs & Outreach',
      serviceTag: 'SERVICE 05 • EVENT SOUVENIRS, OUTREACH & EMPOWERMENT',
      headlinePrefix: 'PLAN AHEAD.',
      headlineAccent: 'SAVE GRADUALLY.',
      headlineSuffix: 'CELEBRATE BETTER.',
      subtitle:
        'Delight wedding and celebration guests with useful food-based souvenirs, empower communities through transparent charity food drives, or enroll in practical food processing and micro-entrepreneurship training.',
      primaryBtnText: 'EVENT & OUTREACH ENQUIRY',
      primaryAction: () => {
        if (onOpenServiceEnquiry) {
          onOpenServiceEnquiry('Event Souvenirs & Charity Distribution', 'Event Souvenirs & Outreach');
        } else {
          window.open(createWhatsAppUrl('Hello PGFV, I would like to enquire about event food souvenirs and charity outreach.'), '_blank');
        }
      },
      primaryIcon: Users,
      secondaryBtnText: 'VIEW PARTNERSHIPS',
      secondaryAction: () => {
        if (onOpenPartnership) {
          onOpenPartnership();
        } else {
          const el = document.getElementById('partnerships-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      },
      image:
        'https://res.cloudinary.com/dhzouslh1/image/upload/v1788937284/1000290177_yo7qcp.jpg',
      imageBadge: 'Events & Community Welfare',
      badgeHighlight: 'Impact Beyond Plate',
      cardTitle: 'COMMUNITY IMPACT',
      cardItems: [
        { label: 'Weddings & Parties', val: 'Food Souvenirs', color: 'text-[#1B4332]' },
        { label: 'NGO / Church Welfare', val: 'Transparent Charity', color: 'text-[#C68A1B]' },
        { label: 'Vocational Classes', val: 'Skills Training', color: 'text-[#1B4332]' }
      ],
      features: [
        'Curated event gift packages that guests actually use at home',
        'Transparent logistical handling for charity & church welfare',
        'Hands-on vocational training in food hygiene & packaging'
      ]
    }
  ];

  // Auto-play timer
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const goToSlide = (idx: number) => {
    setDirection(idx > currentSlide ? 1 : -1);
    setCurrentSlide(idx);
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  const slide = slides[currentSlide];
  const PrimaryIcon = slide.primaryIcon;

  // Slide motion animation variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
      filter: 'blur(4px)'
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        x: { type: 'spring', stiffness: 260, damping: 28 },
        opacity: { duration: 0.4 },
        filter: { duration: 0.3 }
      }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -40 : 40,
      opacity: 0,
      filter: 'blur(4px)',
      transition: {
        x: { type: 'spring', stiffness: 260, damping: 28 },
        opacity: { duration: 0.3 },
        filter: { duration: 0.25 }
      }
    })
  };

  return (
    <section 
      className="relative overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#FDFBF7] to-[#F5EFE6] pt-4 pb-14 lg:pt-8 lg:pb-20 border-b border-[#E8E2D5]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      id="hero-slider"
    >
      {/* Animated glowing backdrop orbs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.08, 1],
          opacity: [0.3, 0.45, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-0 right-0 -mr-24 -mt-24 w-[34rem] h-[34rem] rounded-full bg-[#E2B13C]/12 blur-3xl pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.12, 1],
          opacity: [0.2, 0.35, 0.2]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-0 left-0 -ml-24 -mb-24 w-[34rem] h-[34rem] rounded-full bg-[#1B4332]/8 blur-3xl pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 5 Service Slider Navigation Tabs with animated layout indicator */}
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#EBE4D8] overflow-x-auto no-scrollbar gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {slides.map((s, idx) => {
              const isActive = idx === currentSlide;
              return (
                <button
                  key={s.id}
                  onClick={() => goToSlide(idx)}
                  className={`relative px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap flex items-center gap-2 ${
                    isActive
                      ? 'text-white'
                      : 'text-[#54625A] hover:text-[#1B4332] bg-white/80 border border-[#E3DCD0]'
                  }`}
                  aria-label={`Go to service slide ${idx + 1}`}
                >
                  {/* Fluid animated pill background */}
                  {isActive && (
                    <motion.div
                      layoutId="activeHeroTab"
                      className="absolute inset-0 bg-[#1B4332] rounded-xl shadow-xs"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  
                  <span className="relative z-10 flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full transition-colors ${isActive ? 'bg-[#E2B13C]' : 'bg-[#C5BCB0]'}`} />
                    <span>{s.tabLabel}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Slider Controls (Next / Prev arrows, Play/Pause & Index Counter) */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-1.5 rounded-lg bg-white/80 border border-[#D5CCBE] hover:bg-white text-[#54625A] hover:text-[#1B4332] transition-colors"
              title={isPaused ? 'Resume auto-play' : 'Pause auto-play'}
              aria-label={isPaused ? 'Resume auto-play' : 'Pause auto-play'}
            >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
            <span className="text-xs font-mono font-bold text-[#6D7D74] mx-1">
              0{currentSlide + 1} / 0{slides.length}
            </span>
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={handlePrev}
              className="p-2 rounded-xl bg-white border border-[#D5CCBE] hover:bg-[#FAF7F2] text-[#1B4332] transition-colors shadow-2xs cursor-pointer"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={handleNext}
              className="p-2 rounded-xl bg-white border border-[#D5CCBE] hover:bg-[#FAF7F2] text-[#1B4332] transition-colors shadow-2xs cursor-pointer"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Dynamic Animated Slider Content */}
        <div className="min-h-[440px] flex items-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={slide.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Left Column: Animated Text, Mantra & Core Action */}
              <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
                
                {/* Service Identification Badge */}
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.05 }}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B4332]/10 border border-[#1B4332]/20 text-[#1B4332] text-xs font-bold tracking-wide"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#C68A1B]" />
                  <span className="uppercase">{slide.serviceTag}</span>
                </motion.div>

                {/* Headline Mantra: PLAN AHEAD. SAVE GRADUALLY. CELEBRATE BETTER. */}
                <motion.h1 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#143527] leading-[1.12] tracking-tight"
                >
                  {slide.headlinePrefix} <br />
                  <span className="text-[#C68A1B]">{slide.headlineAccent}</span> <br />
                  {slide.headlineSuffix}
                </motion.h1>

                {/* Subtitle */}
                <motion.p 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.16 }}
                  className="text-base sm:text-lg text-[#3E4742] leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal"
                >
                  {slide.subtitle}
                </motion.p>

                {/* Slide Features Checklist */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.22 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-xl mx-auto lg:mx-0 text-left pt-1"
                >
                  {slide.features.map((feat, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.25 + idx * 0.06 }}
                      className="flex items-start gap-2 text-xs sm:text-sm text-[#46534C]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#1B4332] shrink-0 mt-0.5" />
                      <span className="leading-snug">{feat}</span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Action Buttons */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.32 }}
                  className="pt-3 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={slide.primaryAction}
                    className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#1B4332] hover:bg-[#143527] text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-colors flex items-center justify-center gap-2.5 group cursor-pointer"
                    id={`hero-slide-primary-${currentSlide}`}
                  >
                    <PrimaryIcon className="w-4 h-4 text-[#E2B13C]" />
                    <span>{slide.primaryBtnText}</span>
                    <ArrowRight className="w-4 h-4 text-[#E2B13C] group-hover:translate-x-1 transition-transform" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={slide.secondaryAction}
                    className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-[#F3EFE6] text-[#1B4332] border border-[#C5BBAA] font-bold text-sm shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    id={`hero-slide-secondary-${currentSlide}`}
                  >
                    <span>{slide.secondaryBtnText}</span>
                  </motion.button>
                </motion.div>

                {/* Auto-play Timer Progress Bar & Indicator Dots */}
                <div className="pt-3 flex items-center justify-center lg:justify-start gap-3">
                  <div className="flex items-center gap-2">
                    {slides.map((_, idx) => {
                      const isActive = idx === currentSlide;
                      return (
                        <button
                          key={idx}
                          onClick={() => goToSlide(idx)}
                          className="relative h-2 rounded-full overflow-hidden bg-[#D5CCBE] transition-all duration-300 cursor-pointer"
                          style={{ width: isActive ? '48px' : '10px' }}
                          aria-label={`Service slide dot ${idx + 1}`}
                        >
                          {isActive && (
                            <motion.div
                              key={`${slide.id}-${isPaused}`}
                              initial={{ width: '0%' }}
                              animate={{ width: isPaused ? '0%' : '100%' }}
                              transition={{ 
                                duration: SLIDE_DURATION / 1000, 
                                ease: 'linear'
                              }}
                              className="absolute top-0 left-0 bottom-0 bg-[#1B4332] rounded-full"
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                  {isPaused && (
                    <span className="text-[11px] text-[#78887F] font-medium tracking-wide">
                      (Paused)
                    </span>
                  )}
                </div>

              </div>

              {/* Right Column: Visual Showcase Frame with Animated Highlights */}
              <div className="lg:col-span-5">
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  
                  {/* Main Image Frame with smooth scale entrance */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.45 }}
                    className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white"
                  >
                    <div className="relative h-80 sm:h-96 overflow-hidden">
                      <motion.img
                        key={slide.image}
                        initial={{ scale: 1.08, opacity: 0.8 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        src={slide.image}
                        alt={slide.tabLabel}
                        className="w-full h-full object-cover"
                        loading="eager"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F2B20]/85 via-black/20 to-transparent" />
                      
                      {/* Floating Overlay Badge on Image */}
                      <motion.div 
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="absolute top-4 left-4"
                      >
                        <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/95 text-[#1B4332] shadow-sm backdrop-blur-xs">
                          {slide.imageBadge}
                        </span>
                      </motion.div>

                      {/* Highlight text inside Image */}
                      <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                        className="absolute bottom-4 left-4 right-4 text-white"
                      >
                        <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#E2B13C] text-[#122A20] mb-1">
                          {slide.badgeHighlight}
                        </span>
                        <h3 className="font-heading text-lg sm:text-xl font-bold text-white leading-tight">
                          PLAN AHEAD. SAVE GRADUALLY.
                        </h3>
                        <p className="text-xs text-[#E3EDE8] mt-0.5">
                          Quality food solutions crafted with integrity and impact.
                        </p>
                      </motion.div>
                    </div>

                    {/* Bottom Snapshot Card inside Frame */}
                    <div className="p-4 bg-[#FBF9F5] border-t border-[#EDE7DC]">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-[#77867E] mb-2">
                        {slide.cardTitle}
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        {slide.cardItems.map((item, idx) => (
                          <div 
                            key={idx} 
                            className={`${idx < 2 ? 'border-r border-[#E2DDD2]' : ''} px-1`}
                          >
                            <span className={`block font-heading font-extrabold text-sm ${item.color}`}>
                              {item.val}
                            </span>
                            <span className="text-[10px] text-[#6E7B74] block leading-tight">
                              {item.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Buoyant Floating Shield Badge with continuous gentle float animation */}
                  <motion.div 
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -top-3 -left-3 sm:-left-6 bg-white py-2 px-3.5 rounded-2xl shadow-xl border border-[#E6DFD3] flex items-center gap-2.5 z-20"
                  >
                    <div className="w-8 h-8 rounded-xl bg-[#1B4332] text-[#E2B13C] flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#726354] tracking-wider block">Service Guarantee</span>
                      <span className="text-xs font-extrabold text-[#1B4332]">PGFV Verified Standard</span>
                    </div>
                  </motion.div>

                  {/* Buoyant Floating Community Card */}
                  <motion.div 
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                    className="hidden sm:flex absolute -bottom-5 -right-3 bg-white py-2 px-3.5 rounded-2xl shadow-xl border border-[#E6DFD3] items-center gap-2.5 z-20"
                  >
                    <div className="w-8 h-8 rounded-xl bg-[#E2B13C] text-[#1B4332] flex items-center justify-center">
                      <HeartHandshake className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#1B4332] block">Quality • Integrity • Impact</span>
                      <span className="text-[10px] text-[#55635C]">Serving Across Nigeria</span>
                    </div>
                  </motion.div>

                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile slide switcher arrows */}
        <div className="flex sm:hidden items-center justify-between mt-6 pt-3 border-t border-[#E8E2D5]">
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={handlePrev}
            className="px-3.5 py-2 rounded-xl bg-white border border-[#D5CCBE] text-xs font-bold text-[#1B4332] flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Prev</span>
          </motion.button>
          <span className="text-xs font-mono font-bold text-[#6D7D74]">
            Service 0{currentSlide + 1} of 0{slides.length}
          </span>
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={handleNext}
            className="px-3.5 py-2 rounded-xl bg-white border border-[#D5CCBE] text-xs font-bold text-[#1B4332] flex items-center gap-1"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Brand Pillars Trust Strip directly below Slider */}
        <div className="mt-12 pt-8 border-t border-[#E8E2D5]">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-[#798880] mb-4">
            OUR CORE BRAND PILLARS
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <motion.div 
              whileHover={{ y: -2 }}
              className="bg-white p-4 rounded-2xl border border-[#E8E2D5] shadow-xs flex items-center gap-3.5 transition-shadow hover:shadow-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-[#1B4332]/10 text-[#1B4332] flex items-center justify-center font-heading font-extrabold text-sm">
                01
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-[#1B4332] tracking-wide">QUALITY</h4>
                <p className="text-xs text-[#5A6860] leading-snug">Hygienic processing, select grains, pure flours & pest-free staples.</p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -2 }}
              className="bg-white p-4 rounded-2xl border border-[#E8E2D5] shadow-xs flex items-center gap-3.5 transition-shadow hover:shadow-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-[#C68A1B]/15 text-[#C68A1B] flex items-center justify-center font-heading font-extrabold text-sm">
                02
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-[#1B4332] tracking-wide">INTEGRITY</h4>
                <p className="text-xs text-[#5A6860] leading-snug">Unique participant IDs, verified payment receipts & truthful records.</p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -2 }}
              className="bg-white p-4 rounded-2xl border border-[#E8E2D5] shadow-xs flex items-center gap-3.5 transition-shadow hover:shadow-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-[#1B4332]/10 text-[#1B4332] flex items-center justify-center font-heading font-extrabold text-sm">
                03
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-[#1B4332] tracking-wide">IMPACT</h4>
                <p className="text-xs text-[#5A6860] leading-snug">Student empowerment, practical entrepreneurship & food charity.</p>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
