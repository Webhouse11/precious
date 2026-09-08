import { Lightbulb, CheckCircle2, ShieldCheck, HeartHandshake, Users, Sparkles } from 'lucide-react';

export function ImpactSection() {
  const learningAreas = [
    { title: 'Food Production', desc: 'Understanding raw materials sourcing, dry sorting, milling, and preservation.' },
    { title: 'Food Hygiene', desc: 'Sanitary safety protocols, clean handling, storage standards, and quality control.' },
    { title: 'Modern Packaging', desc: 'Heat-sealing, moisture barriers, eco-conscious wrapping, and presentation aesthetics.' },
    { title: 'Branding & Identity', desc: 'Label design, consumer messaging, regulatory awareness, and market appeal.' },
    { title: 'Entrepreneurship', desc: 'Costing, unit economics, retail distribution channels, and micro-business management.' },
    { title: 'Business Development', desc: 'Customer service, record-keeping, client relationship building, and sustainability.' }
  ];

  return (
    <section id="impact-section" className="py-16 sm:py-24 bg-[#FDFBF7] border-b border-[#E8E2D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1B4332]/10 text-[#1B4332] text-xs font-bold uppercase tracking-wider mb-2">
            <HeartHandshake className="w-3.5 h-3.5 text-[#C68A1B]" />
            <span>COMMUNITY & SKILLS EMPOWERMENT</span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-[#143527]">
            BUSINESS THAT CREATES VALUE BEYOND PROFIT
          </h2>
          <p className="text-sm sm:text-base text-[#56655D] mt-3 leading-relaxed">
            Through partnerships, training initiatives, food-related outreach, and youth empowerment programmes, PGFV seeks to contribute positively to schools, individuals, and communities.
          </p>
        </div>

        {/* 6 Skill Focus Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {learningAreas.map((area, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-[#E4DDD1] shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 rounded-xl bg-[#1B4332] text-[#E2B13C] flex items-center justify-center font-bold text-xs mb-4">
                  0{idx + 1}
                </div>
                <h3 className="font-heading font-bold text-base text-[#143527] mb-2">
                  {area.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#55635C] leading-relaxed">
                  {area.desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#F2EDE3] text-[11px] font-semibold text-[#8C7D6F] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1B4332]" />
                <span>Hands-on Practical Training</span>
              </div>
            </div>
          ))}
        </div>

        {/* Visual Story / Community Banner */}
        <div className="bg-[#FAF5EC] rounded-3xl p-6 sm:p-10 border border-[#E5DDD0] flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/3 rounded-2xl overflow-hidden shadow-md">
            <img
              src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80"
              alt="Community food distribution and welfare support"
              className="w-full h-56 object-cover"
            />
          </div>
          <div className="w-full md:w-2/3 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C68A1B] block">
              COLLABORATIVE SOCIAL PURPOSE
            </span>
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#143527]">
              Empowering Students & Local Producers in Osun State
            </h3>
            <p className="text-xs sm:text-sm text-[#54625A] leading-relaxed">
              We believe a sustainable food enterprise must lift up the community it serves. By bridging local agricultural producers with cleanly processed consumer packaging, and mentoring students into micro-food ventures, Precious Gem Foods Ventures builds lasting social value beyond the plate.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
