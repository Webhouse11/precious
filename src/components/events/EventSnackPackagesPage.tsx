import React, { useState } from 'react';
import { 
  Sparkles, 
  PartyPopper, 
  Users, 
  Calendar, 
  MapPin, 
  Check, 
  Info, 
  MessageCircle, 
  ArrowRight, 
  Send, 
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Phone,
  Gift
} from 'lucide-react';
import { EVENT_USE_CASES, SNACK_OPTIONS, SNACK_PACKAGE_TIERS } from '../../data/eventSnacksData';
import { createWhatsAppUrl, PGFV_WHATSAPP_PHONE, PGFV_WHATSAPP_DISPLAY, optimizeCloudinary } from '../../utils/helpers';
import { BUSINESS_INFO } from '../../data/mockData';

interface EventSnackPackagesPageProps {
  onNavigateHome?: () => void;
  onNavigateToCatalogue?: () => void;
  onNavigateToServices?: () => void;
}

export const EventSnackPackagesPage: React.FC<EventSnackPackagesPageProps> = ({
  onNavigateHome,
  onNavigateToCatalogue,
  onNavigateToServices
}) => {
  // Enquiry Form State
  const [numberOfPeople, setNumberOfPeople] = useState<string>('50');
  const [selectedSnacks, setSelectedSnacks] = useState<string[]>([
    'Small Chops Assortment',
    'Signature Puff Puff',
    'Crunchy Gourmet Chin Chin'
  ]);
  const [budgetPerPerson, setBudgetPerPerson] = useState<string>('');
  const [eventType, setEventType] = useState<string>('Student Event');
  const [customEventType, setCustomEventType] = useState<string>('');
  const [eventDate, setEventDate] = useState<string>('');
  const [deliveryLocation, setDeliveryLocation] = useState<string>('Ile-Ife');
  const [brandedPackaging, setBrandedPackaging] = useState<string>('Yes, branded stickers/cups');
  const [drinkOption, setDrinkOption] = useState<string>('Chapman / Cocktails (where available)');
  const [additionalRequest, setAdditionalRequest] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const toggleSnack = (snackName: string) => {
    if (selectedSnacks.includes(snackName)) {
      setSelectedSnacks(selectedSnacks.filter(s => s !== snackName));
    } else {
      setSelectedSnacks([...selectedSnacks, snackName]);
    }
  };

  const handleSelectTier = (tierName: string) => {
    setAdditionalRequest(`Selected Starting Level: ${tierName}`);
    // Scroll to form smoothly
    const formEl = document.getElementById('event-enquiry-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGenerateWhatsAppEnquiry = (e: React.FormEvent) => {
    e.preventDefault();

    const effectiveEventType = eventType === 'Other' && customEventType ? customEventType : eventType;
    const snacksList = selectedSnacks.length > 0 ? selectedSnacks.join(', ') : 'PGFV Chef Selection';

    let message = `Hello PGFV, I need a snack package for ${numberOfPeople || '50'} people for a ${effectiveEventType || 'student'} event.\n\n`;
    message += `Event Date: ${eventDate || '______'}\n`;
    message += `Event Type: ${effectiveEventType || '______'}\n`;
    message += `Number of People: ${numberOfPeople || '50'}\n`;
    message += `Budget Per Person: ${budgetPerPerson ? `₦${budgetPerPerson}` : '₦____'}\n`;
    message += `Preferred Snacks: ${snacksList || '______'}\n`;
    message += `Delivery Location: ${deliveryLocation || '______'}\n`;
    if (drinkOption) {
      message += `Drink Options: ${drinkOption}\n`;
    }
    if (brandedPackaging) {
      message += `Branded Packaging/Cups: ${brandedPackaging}\n`;
    }
    if (additionalRequest) {
      message += `Additional Request: ${additionalRequest}\n`;
    }

    message += `\nPlease confirm availability and provide quotation. Thank you!`;

    window.open(createWhatsAppUrl(message, PGFV_WHATSAPP_PHONE), '_blank', 'noopener,noreferrer');
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1E2320]">
      
      {/* 1. Hero Section */}
      <section className="bg-gradient-to-b from-[#FAF5EC] to-[#FDFBF7] border-b border-[#E8E2D5] pt-12 pb-16 sm:pt-16 sm:pb-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-[#7A8A81] mb-6">
            <button 
              onClick={onNavigateHome}
              className="hover:text-[#1B4332] transition-colors"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <button 
              onClick={onNavigateToServices}
              className="hover:text-[#1B4332] transition-colors"
            >
              Our Services
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#143527] font-semibold">Event & Snack Packages</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B4332]/10 border border-[#1B4332]/20 text-[#1B4332] text-xs font-bold uppercase tracking-wider">
                <PartyPopper className="w-3.5 h-3.5 text-[#C68A1B]" />
                <span>PGFV SPECIALIZED EVENT CATERING • FRESH & HYGIENIC PACKAGES</span>
              </div>

              <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#143527] tracking-tight">
                Event & Snack Packages
              </h1>

              <p className="text-base sm:text-lg text-[#1B4332] font-semibold italic">
                “Tasteful, hygienic, and punctual food packages that make every gathering memorable.”
              </p>

              <p className="text-xs sm:text-sm text-[#52635B] leading-relaxed max-w-2xl">
                Whether you are hosting a student hangout of 15 friends, a church anniversary of 150 members, or a corporate conference of 500 delegates—PGFV creates customized snack boxes, small chops, and craft drinks packed with strict hygiene and punctuality.
              </p>

              {/* Availability Notice */}
              <div className="p-3.5 rounded-xl bg-white border border-[#E3DCD0] text-xs text-[#6B5744] flex items-center gap-2 shadow-2xs">
                <Info className="w-4 h-4 text-[#C68A1B] shrink-0" />
                <span>
                  <strong>Availability Notice:</strong> All snacks are freshly prepared to order. Specific snack options and craft drinks like Chapman/cocktails are supplied <em>where available</em> based on event date and volume.
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#event-enquiry-form"
                  className="px-6 py-3 rounded-xl bg-[#1B4332] hover:bg-[#143527] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#E2B13C]" />
                  <span>Build Event Enquiry</span>
                </a>

                {onNavigateToCatalogue && (
                  <button
                    onClick={onNavigateToCatalogue}
                    className="px-5 py-3 rounded-xl bg-white hover:bg-[#FAF7F2] text-[#143527] border border-[#DDD5C8] text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <span>View Product Catalogue</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C68A1B]" />
                  </button>
                )}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-stone-100">
                <img
                  src={optimizeCloudinary('https://res.cloudinary.com/dhzouslh1/image/upload/v1791028664/1000335095_rmxsk4.jpg', 700)}
                  alt="PGFV Event & Snack Packages"
                  className="w-full h-80 sm:h-96 object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#E2B13C] text-[#143527] mb-2 inline-block">
                    Event Ready
                  </span>
                  <h3 className="font-heading font-extrabold text-lg text-white">
                    Freshly Packed Finger Foods & Drinks
                  </h3>
                  <p className="text-xs text-[#E1EDE7]">
                    Cleanly portioned for instant distribution to attendees
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Target Use Cases (11 Categories) */}
      <section className="py-14 sm:py-20 border-b border-[#E8E2D5] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C68A1B] block">
              DESIGNED FOR EVERY OCCASION
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#143527]">
              11 Target Use Cases We Support
            </h2>
            <p className="text-xs sm:text-sm text-[#52635B]">
              From intimate student gatherings on campus to large academic conventions and corporate galas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {EVENT_USE_CASES.map((uc, idx) => (
              <div
                key={uc.id}
                className="p-5 rounded-2xl bg-[#FDFBF7] border border-[#E8E2D5] hover:border-[#1B4332]/50 hover:shadow-md transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-xl bg-[#FAF5EC] text-[#1B4332] font-mono font-bold text-xs flex items-center justify-center border border-[#E8E1D5] group-hover:bg-[#1B4332] group-hover:text-[#E2B13C] transition-colors">
                    {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#FAF5EC] text-[#867057] border border-[#E8E1D5]">
                    {uc.badge}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-base text-[#143527] group-hover:text-[#1B4332] transition-colors">
                  {uc.name}
                </h3>

                <p className="text-xs text-[#56675E] leading-relaxed">
                  {uc.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. Available Snack Options ("Where Available") */}
      <section className="py-14 sm:py-20 bg-[#FAF7F2] border-b border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C68A1B] block">
              FRESH & AROMATIC SNACK OPTIONS
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#143527]">
              Snack Selections (Where Available)
            </h2>
            <p className="text-xs sm:text-sm text-[#52635B]">
              Prepared using high hygiene standards, premium flours, and pure cooking oils.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SNACK_OPTIONS.map((snk) => (
              <div
                key={snk.id}
                className="bg-white p-5 rounded-2xl border border-[#E5DDD0] shadow-2xs space-y-2.5 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C68A1B]">
                      {snk.category}
                    </span>
                    {snk.isPopular && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#1B4332] text-[#E2B13C]">
                        Crowd Favourite
                      </span>
                    )}
                  </div>

                  <h3 className="font-heading font-bold text-base text-[#143527]">
                    {snk.name}
                  </h3>

                  <p className="text-xs text-[#5A6B62] leading-relaxed">
                    {snk.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#F2ECE1]">
                  <span className="text-[10px] text-[#867057] font-medium flex items-center gap-1">
                    <Info className="w-3 h-3 text-[#C68A1B] shrink-0" />
                    <span>{snk.availabilityNote}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Package Levels (Mini, Standard, Premium, Professional, Custom) */}
      <section className="py-14 sm:py-20 bg-white border-b border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C68A1B] block">
              FIVE PACKAGE LEVELS
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#143527]">
              Choose Your Package Level
            </h2>
            <p className="text-xs sm:text-sm text-[#52635B]">
              Each level is tailored to scale smoothly from informal student hangouts to grand executive banquets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {SNACK_PACKAGE_TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`p-5 rounded-2xl border flex flex-col justify-between transition-all ${
                  tier.popular
                    ? 'bg-[#FAF5EC] border-[#1B4332] shadow-md ring-1 ring-[#1B4332]/20'
                    : 'bg-[#FDFBF7] border-[#E8E2D5] hover:border-[#1B4332]/40'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-extrabold text-xs uppercase tracking-wider text-[#1B4332]">
                      {tier.level}
                    </span>
                    {tier.popular && (
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#1B4332] text-[#E2B13C]">
                        Most Popular
                      </span>
                    )}
                  </div>

                  <h3 className="font-heading font-extrabold text-lg text-[#143527]">
                    {tier.name}
                  </h3>

                  <p className="text-xs text-[#5C6D64] leading-relaxed">
                    {tier.tagline}
                  </p>

                  <div className="p-2.5 rounded-xl bg-white border border-[#E8E1D5] text-[11px] text-[#143527]">
                    <strong>Suggested:</strong> {tier.suggestedHeadcount}
                  </div>

                  {/* Typical items */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A8A81] block">
                      Typical Inclusions:
                    </span>
                    {tier.typicalItems.map((item, iIdx) => (
                      <div key={iIdx} className="flex items-start gap-1.5 text-xs text-[#3E4F46]">
                        <Check className="w-3.5 h-3.5 text-[#C68A1B] shrink-0 mt-0.5" />
                        <span className="leading-tight">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#EAE3D6] mt-4 space-y-2">
                  <span className="text-[11px] font-bold text-[#143527] block">
                    {tier.startingBudgetDisplay}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleSelectTier(tier.name)}
                    className="w-full py-2 px-3 rounded-xl bg-[#1B4332] hover:bg-[#143527] text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    Select {tier.level}
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Interactive Event & Snack WhatsApp Enquiry Form */}
      <section id="event-enquiry-form" className="py-16 sm:py-24 bg-[#F5EFE6] border-b border-[#E8E2D5] scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C68A1B] block">
              INSTANT QUOTATION BUILDER
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#143527]">
              Build Your Event Snack Enquiry
            </h2>
            <p className="text-xs sm:text-sm text-[#52635B]">
              Fill in your event details below to generate an organized WhatsApp order message directly to the PGFV team.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E0D7C9] shadow-xl">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-heading font-extrabold text-2xl text-[#143527]">
                  WhatsApp Enquiry Formatted!
                </h3>
                <p className="text-xs sm:text-sm text-[#52635B] max-w-md mx-auto leading-relaxed">
                  Your event snack package details have been formatted and directed to WhatsApp. You can review and submit with one tap.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-[#1B4332] text-white text-xs font-bold"
                >
                  Create Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleGenerateWhatsAppEnquiry} className="space-y-6">
                
                {/* Event Type & Number of People */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#143527] mb-1.5">
                      Event Type *
                    </label>
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#D5CCBE] bg-[#FDFBF7] text-[#143527] focus:outline-none focus:ring-2 focus:ring-[#1B4332]/30"
                    >
                      <option value="Student Event">Student Hangout / Fellowship</option>
                      <option value="Meeting">Executive / Board Meeting</option>
                      <option value="Conference">Academic / Corporate Conference</option>
                      <option value="Seminar">Seminar / Workshop</option>
                      <option value="Church Programme">Church Programme / Vigil</option>
                      <option value="School Programme">School / Sports Programme</option>
                      <option value="Picnic">Picnic / Outdoor Trip</option>
                      <option value="Birthday">Birthday Party</option>
                      <option value="Freshers Welcome">Welcoming / Freshers' Event</option>
                      <option value="Corporate Event">Corporate End of Year / Gala</option>
                      <option value="Private Gathering">Private Family Gathering</option>
                      <option value="Other">Other Custom Event</option>
                    </select>

                    {eventType === 'Other' && (
                      <input
                        type="text"
                        placeholder="Specify event type..."
                        value={customEventType}
                        onChange={(e) => setCustomEventType(e.target.value)}
                        className="mt-2 w-full px-3 py-2 text-xs rounded-xl border border-[#D5CCBE] bg-white text-[#143527]"
                      />
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#143527] mb-1.5">
                      Number of People (Headcount) *
                    </label>
                    <input
                      type="number"
                      required
                      min={5}
                      value={numberOfPeople}
                      onChange={(e) => setNumberOfPeople(e.target.value)}
                      placeholder="e.g. 50"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#D5CCBE] bg-[#FDFBF7] text-[#143527] focus:outline-none focus:ring-2 focus:ring-[#1B4332]/30"
                    />
                  </div>
                </div>

                {/* Event Date & Budget Per Person */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#143527] mb-1.5">
                      Event Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#D5CCBE] bg-[#FDFBF7] text-[#143527] focus:outline-none focus:ring-2 focus:ring-[#1B4332]/30"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#143527] mb-1.5">
                      Budget Per Person (₦)
                    </label>
                    <input
                      type="text"
                      value={budgetPerPerson}
                      onChange={(e) => setBudgetPerPerson(e.target.value)}
                      placeholder="e.g. 1500 or 2500"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#D5CCBE] bg-[#FDFBF7] text-[#143527] focus:outline-none focus:ring-2 focus:ring-[#1B4332]/30"
                    />
                  </div>
                </div>

                {/* Preferred Snacks (Multi-Select) */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold text-[#143527]">
                      Preferred Snacks Selection (Where Available):
                    </label>
                    <span className="text-[11px] text-[#7A8A81]">
                      {selectedSnacks.length} selected
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E5DDD0]">
                    {SNACK_OPTIONS.map((snk) => {
                      const isChecked = selectedSnacks.includes(snk.name);
                      return (
                        <button
                          key={snk.id}
                          type="button"
                          onClick={() => toggleSnack(snk.name)}
                          className={`p-2.5 rounded-xl border text-left text-xs font-semibold flex items-start gap-2 transition-colors cursor-pointer ${
                            isChecked
                              ? 'bg-[#1B4332] text-white border-[#1B4332]'
                              : 'bg-white text-[#33423A] border-[#DDD5C7] hover:bg-[#F2ECE1]'
                          }`}
                        >
                          <span className={`w-3.5 h-3.5 rounded mt-0.5 flex items-center justify-center shrink-0 border ${
                            isChecked ? 'bg-[#E2B13C] border-[#E2B13C] text-[#1B4332]' : 'border-stone-300 bg-white'
                          }`}>
                            {isChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                          </span>
                          <span className="leading-snug">{snk.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Drink Options & Branded Packaging */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#143527] mb-1.5">
                      Drink Options (Where Available)
                    </label>
                    <select
                      value={drinkOption}
                      onChange={(e) => setDrinkOption(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#D5CCBE] bg-[#FDFBF7] text-[#143527] focus:outline-none focus:ring-2 focus:ring-[#1B4332]/30"
                    >
                      <option value="Chapman / Cocktails (where available)">Chapman / Mocktails (where available)</option>
                      <option value="Quality Fruit Juice Pack">Quality Fruit Juice Pack</option>
                      <option value="Carbonated Malt Drink">Chilled Malt Drink</option>
                      <option value="Bottled Table Water">Bottled Table Water</option>
                      <option value="Chapman + Bottled Water Combo">Chapman + Table Water Combo</option>
                      <option value="None / Own Drinks">None / We Have Our Own Drinks</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#143527] mb-1.5">
                      Branded Packaging / Cups
                    </label>
                    <select
                      value={brandedPackaging}
                      onChange={(e) => setBrandedPackaging(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#D5CCBE] bg-[#FDFBF7] text-[#143527] focus:outline-none focus:ring-2 focus:ring-[#1B4332]/30"
                    >
                      <option value="Yes, custom stickers & branded cups">Yes, custom stickers & branded cups</option>
                      <option value="Stickers only on snack boxes">Stickers only on snack boxes</option>
                      <option value="Standard clean PGFV packaging is fine">Standard clean PGFV packaging is fine</option>
                    </select>
                  </div>
                </div>

                {/* Delivery Location */}
                <div>
                  <label className="block text-xs font-bold text-[#143527] mb-1.5">
                    Delivery Location / Event Venue *
                  </label>
                  <input
                    type="text"
                    required
                    value={deliveryLocation}
                    onChange={(e) => setDeliveryLocation(e.target.value)}
                    placeholder="e.g. OAU Campus Hall / Obafemi Awolowo University, Ile-Ife"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#D5CCBE] bg-[#FDFBF7] text-[#143527] focus:outline-none focus:ring-2 focus:ring-[#1B4332]/30"
                  />
                </div>

                {/* Additional Instructions */}
                <div>
                  <label className="block text-xs font-bold text-[#143527] mb-1.5">
                    Additional Instructions / Delivery Time
                  </label>
                  <textarea
                    rows={3}
                    value={additionalRequest}
                    onChange={(e) => setAdditionalRequest(e.target.value)}
                    placeholder="e.g. Please deliver by 11:30 AM warm and ready for the tea break..."
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#D5CCBE] bg-[#FDFBF7] text-[#143527] focus:outline-none focus:ring-2 focus:ring-[#1B4332]/30"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-3 border-t border-[#F0EAE0]">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-5 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-[#0A1E14] font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-md transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5 fill-current" />
                    <span>Generate WhatsApp Enquiry for PGFV</span>
                  </button>

                  <p className="text-[11px] text-center text-[#73837A] mt-2">
                    Directly formats your headcount, snacks, budget, date, and venue into an organized WhatsApp message.
                  </p>
                </div>

              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
};
