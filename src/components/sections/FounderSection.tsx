import { Sparkles, Heart, Award, Users, Compass, Target, CheckCircle2 } from 'lucide-react';
import { BUSINESS_INFO } from '../../data/mockData';

export function FounderSection() {
  const passions = [
    'Providing quality and hygienically processed food',
    'Making food sourcing more convenient for families',
    'Supporting students and young people on campus',
    'Entrepreneurship and practical skills development',
    'Empowering individuals and vulnerable communities',
    'Creating meaningful partnerships with schools and NGOs',
    'Providing practical food solutions that save money',
    'Using food as a channel for positive social impact'
  ];

  return (
    <section id="founder-section" className="py-16 sm:py-24 bg-[#F5EFE6] border-b border-[#E8E2D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Founder Profile Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-[#E4DCCF] shadow-sm mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Founder Portrait Frame */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md group">
                {/* Decorative border / backdrop glow */}
                <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#1B4332] via-[#E2B13C] to-[#1B4332] rounded-3xl opacity-25 blur-xs group-hover:opacity-40 transition duration-300"></div>

                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#FAF7F2]">
                  {/* Top Brand Tag */}
                  <div className="absolute top-3 left-3 z-20 flex items-center gap-2 bg-[#1B4332]/90 backdrop-blur-md text-white px-3 py-1 rounded-full shadow-md border border-[#E2B13C]/40 text-[11px] font-semibold">
                    <Sparkles className="w-3 h-3 text-[#E2B13C]" />
                    <span>Executive Leadership</span>
                  </div>

                  {/* Corner Brand Logo Badge */}
                  <div className="absolute top-3 right-3 z-20 w-11 h-11 rounded-xl bg-white p-1 shadow-md border border-[#E2B13C]/50 flex items-center justify-center">
                    <img
                      src={BUSINESS_INFO.logo}
                      alt="PGFV Official Logo"
                      className="w-full h-full object-contain rounded-lg"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Founder Image with optimal positioning */}
                  <div className="relative w-full aspect-[4/5] sm:h-[460px] overflow-hidden bg-[#ECE6DA]">
                    <img
                      src={BUSINESS_INFO.founder.image}
                      alt={`${BUSINESS_INFO.founder.name} - ${BUSINESS_INFO.founder.title}`}
                      className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Nameplate */}
                  <div className="p-4 sm:p-5 bg-gradient-to-r from-[#1B4332] to-[#122A20] text-white text-center border-t border-[#E2B13C]/30">
                    <span className="font-heading font-extrabold text-lg sm:text-xl block tracking-tight text-white">
                      {BUSINESS_INFO.founder.name}
                    </span>
                    <span className="text-xs text-[#E2B13C] font-bold uppercase tracking-widest mt-0.5 block">
                      {BUSINESS_INFO.founder.title} • Precious Gem Foods Ventures
                    </span>
                  </div>
                </div>

                {/* Floating Badge */}
                <div className="absolute -bottom-3 -right-2 sm:-right-3 bg-[#E2B13C] text-[#122A20] text-xs font-bold px-3.5 py-2 rounded-xl shadow-lg border-2 border-white flex items-center gap-1.5 z-20">
                  <Award className="w-4 h-4 text-[#122A20]" />
                  <span>Enterprise Visionary</span>
                </div>
              </div>
            </div>

            {/* Founder Bio & Narrative */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B4332]/10 text-[#1B4332] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#C68A1B]" />
                <span>LEADERSHIP & VISION</span>
              </div>

              <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-[#143527] leading-tight">
                MEET OUR FOUNDER
              </h2>

              <p className="text-base sm:text-lg text-[#323D37] font-medium leading-relaxed">
                “{BUSINESS_INFO.founder.bio}”
              </p>

              <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D6] space-y-2 text-xs sm:text-sm text-[#54625A] leading-relaxed">
                <h4 className="font-heading font-bold text-sm text-[#143527]">
                  WHAT BROUGHT ABOUT PGFV?
                </h4>
                <p>
                  PGFV was born from a desire to provide practical solutions around food while building a business that creates value beyond simply selling products. The business recognised that sourcing, processing and packaging food can sometimes be stressful, time-consuming and inconvenient.
                </p>
                <p>
                  This inspired the creation of a brand that helps people access useful food products and packages more conveniently while maintaining uncompromising quality and hygiene. That vision naturally grew into student empowerment, youth vocational training, food savings, and meaningful community partnerships.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-3xl border border-[#E4DCCF] shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#1B4332] text-[#E2B13C] flex items-center justify-center mb-5 shadow-xs">
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#C68A1B] block mb-1">
                OUR DIRECTION
              </span>
              <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-[#143527] mb-3">
                VISION STATEMENT
              </h3>
              <p className="text-sm sm:text-base text-[#4C5B53] leading-relaxed italic">
                “To build a trusted and impactful food enterprise that makes quality food solutions accessible and convenient while empowering individuals and communities through food, skills and entrepreneurship.”
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#F2ECE1] text-xs font-semibold text-[#8C7E72]">
              PGFV Strategic Horizon
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-[#E4DCCF] shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#E2B13C] text-[#122A20] flex items-center justify-center mb-5 shadow-xs">
                <Target className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#1B4332] block mb-1">
                OUR COMMITMENT
              </span>
              <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-[#143527] mb-3">
                MISSION STATEMENT
              </h3>
              <p className="text-sm sm:text-base text-[#4C5B53] leading-relaxed italic">
                “To provide quality food products and practical food solutions while creating opportunities for empowerment, entrepreneurship, skills development and meaningful community impact.”
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#F2ECE1] text-xs font-semibold text-[#8C7E72]">
              Everyday Operations Mandate
            </div>
          </div>
        </div>

        {/* Section 22: What We Are Passionate About */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C68A1B] block mb-1">
              HEART & PURPOSE
            </span>
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#143527]">
              WHAT WE ARE PASSIONATE ABOUT
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {passions.map((passion, idx) => (
              <div
                key={idx}
                className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E5DDD0] shadow-2xs flex items-start gap-3"
              >
                <div className="w-7 h-7 rounded-lg bg-[#1B4332]/10 text-[#1B4332] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  ✓
                </div>
                <span className="text-xs sm:text-sm text-[#3E4D45] font-medium leading-snug">
                  {passion}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
