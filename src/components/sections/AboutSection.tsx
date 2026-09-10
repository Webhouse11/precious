import { ArrowRight, Sparkles, Check, Heart, Shield, Users } from 'lucide-react';
import { BUSINESS_INFO } from '../../data/mockData';
import { optimizeCloudinary } from '../../utils/helpers';

interface AboutSectionProps {
  onLearnMore: () => void;
  onExplorePlans: () => void;
}

export function AboutSection({ onLearnMore, onExplorePlans }: AboutSectionProps) {
  const highlights = [
    'Hygienically processed, stone-free and grit-free staple food products',
    'Structured weekly & monthly Christmas foodstuff savings plans',
    'Custom food packages for students, families, workers, and events',
    'Private labelling, custom branding, and corporate hampers',
    'Charity food distribution and community welfare partnerships',
    'Hands-on youth entrepreneurship, hygiene, and packaging training'
  ];

  return (
    <section id="about-pgfv" className="py-16 sm:py-24 bg-[#FDFBF7] border-b border-[#E8E2D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Visual Column */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative">
              {/* Official Brand Badge */}
              <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white p-1.5 shadow-xl border-2 border-[#E2B13C] flex items-center justify-center">
                <img
                  src={optimizeCloudinary(BUSINESS_INFO.logo, 160)}
                  alt="Precious Gem Foods Ventures Seal"
                  className="w-full h-full object-contain rounded-xl"
                  width={80}
                  height={80}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-white">
                <img 
                  src={optimizeCloudinary("https://res.cloudinary.com/dhzouslh1/image/upload/v1788937285/1000290178_fu4s2m.jpg", 700)} 
                  alt="Quality food preparation and hygienic packaging at Precious Gem Foods Ventures"
                  className="w-full h-80 sm:h-96 object-cover"
                  width={600}
                  height={400}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Floating Quote Card */}
              <div className="mt-4 sm:-mt-8 sm:ml-6 relative z-10 bg-[#1B4332] text-white p-5 rounded-2xl shadow-lg border border-[#2D5A46]">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-[#E2B13C]" />
                  <span className="text-xs uppercase tracking-wider font-bold text-[#E2B13C]">The PGFV Difference</span>
                </div>
                <p className="text-xs sm:text-sm text-[#E2ECE7] leading-relaxed italic mb-3">
                  “We combine hygienic food sourcing with genuine empowerment — making daily nutrition easier to prepare and holiday food expenses stress-free.”
                </p>
                <div className="flex items-center gap-3 pt-2.5 border-t border-[#2C5743]">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#E2B13C] shrink-0 bg-white shadow-xs">
                    <img
                      src={optimizeCloudinary(BUSINESS_INFO.founder.image, 120)}
                      alt={BUSINESS_INFO.founder.name}
                      className="w-full h-full object-cover object-top"
                      width={40}
                      height={40}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block leading-tight">
                      {BUSINESS_INFO.founder.name}
                    </span>
                    <span className="text-[10px] text-[#E2B13C] font-semibold uppercase tracking-wider">
                      {BUSINESS_INFO.founder.title} • PGFV
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text Column */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E2B13C]/15 border border-[#E2B13C]/30 text-[#1B4332] text-xs font-semibold">
              <span>ABOUT PRECIOUS GEM FOODS VENTURES</span>
            </div>

            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-[#143527] leading-tight">
              FOOD THAT CREATES VALUE BEYOND THE PLATE
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#46534C] leading-relaxed">
              <p>
                <strong>Precious Gem Foods Ventures (PGFV)</strong> is a food-focused enterprise committed to making quality food sourcing, preparation, packaging and access easier, more convenient and valuable for individuals, families, students, vendors, organisations and communities.
              </p>
              <p>
                Headquartered in Ile-Ife, Osun State, Nigeria, PGFV recognizes that sourcing, cleaning, and preparing food can be stressful, time-consuming, and unpredictable. We take off that burden through neatly processed foodstuffs, practical student solutions, reliable corporate packages, and transparent savings plans.
              </p>
            </div>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#38433E]">
                  <div className="w-4 h-4 rounded-full bg-[#1B4332]/10 text-[#1B4332] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Action CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={onLearnMore}
                className="px-6 py-3 rounded-xl bg-[#1B4332] hover:bg-[#143527] text-white font-semibold text-sm shadow transition-all flex items-center gap-2"
                id="about-learn-more-btn"
              >
                <span>LEARN MORE ABOUT PGFV</span>
                <ArrowRight className="w-4 h-4 text-[#E2B13C]" />
              </button>

              <button
                onClick={onExplorePlans}
                className="px-6 py-3 rounded-xl border border-[#D5CCBE] hover:bg-[#F3EFE6] text-[#1B4332] font-semibold text-sm transition-all"
                id="about-explore-plans-btn"
              >
                Explore Savings Plans
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
