import { ShieldCheck, Clock, Calendar, Lightbulb, HeartHandshake } from 'lucide-react';

export function WhyPGFVSection() {
  const pillars = [
    {
      title: 'QUALITY',
      desc: 'Quality food products and hygienically processed solutions. Stoneless grains, sifted flours, and clean dried proteins.',
      icon: ShieldCheck,
      color: 'bg-[#1B4332] text-white',
      accent: 'border-[#1B4332]'
    },
    {
      title: 'CONVENIENCE',
      desc: 'Making food sourcing and preparation easier. Ready-to-cook mixes and packaged foodstuffs delivered straight to your door.',
      icon: Clock,
      color: 'bg-[#FAF5EC] text-[#C68A1B]',
      accent: 'border-[#E2B13C]/40'
    },
    {
      title: 'PLANNING',
      desc: 'Helping families and individuals prepare ahead through structured food savings so Christmas is joyful, not stressful.',
      icon: Calendar,
      color: 'bg-[#1B4332] text-white',
      accent: 'border-[#1B4332]'
    },
    {
      title: 'EMPOWERMENT',
      desc: 'Creating opportunities through food production, packaging, hygiene protocols, branding and student entrepreneurship.',
      icon: Lightbulb,
      color: 'bg-[#FAF5EC] text-[#C68A1B]',
      accent: 'border-[#E2B13C]/40'
    },
    {
      title: 'IMPACT',
      desc: 'Using food and strategic partnerships as channels for positive community impact, school outreach, and charity support.',
      icon: HeartHandshake,
      color: 'bg-[#1B4332] text-white',
      accent: 'border-[#1B4332]'
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#F5EFE6] border-b border-[#E8E2D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#726354] block mb-2">
            THE FIVE CORE PILLARS
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-[#143527]">
            WHY CHOOSE PGFV?
          </h2>
          <p className="text-sm sm:text-base text-[#56655D] mt-3">
            More than a food vendor — we provide dependable solutions that make everyday nourishment and festive planning simpler for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-[#E4DCCF] shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-xs`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-base text-[#143527] mb-2 tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#55635C] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#F2ECE1] text-[11px] font-semibold text-[#8B7D6F] flex items-center gap-1">
                  <span>PGFV Principle</span>
                  <span>•</span>
                  <span>0{idx + 1}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
