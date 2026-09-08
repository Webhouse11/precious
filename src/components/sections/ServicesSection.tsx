import { 
  Tag, 
  Gift, 
  CalendarHeart, 
  Megaphone, 
  HeartHandshake, 
  GraduationCap, 
  Lightbulb, 
  Award, 
  Building2, 
  PackageCheck,
  ArrowRight
} from 'lucide-react';
import { SERVICES } from '../../data/mockData';
import { Service } from '../../types';

interface ServicesSectionProps {
  onSelectService: (service: Service) => void;
}

const ICON_MAP: Record<string, typeof Tag> = {
  Tag,
  Gift,
  CalendarHeart,
  Megaphone,
  HeartHandshake,
  GraduationCap,
  Lightbulb,
  Award,
  Building2,
  PackageCheck
};

export function ServicesSection({ onSelectService }: ServicesSectionProps) {
  return (
    <section id="services-section" className="py-16 sm:py-24 bg-[#F5EFE6] border-b border-[#E8E2D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C68A1B] block mb-2">
            TAILORED FOOD SOLUTIONS
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-[#143527]">
            OUR SPECIALIZED SERVICES
          </h2>
          <p className="text-sm sm:text-base text-[#56655D] mt-3">
            From private label packaging and bespoke souvenirs to student packages, mentorship, and corporate welfare solutions.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((serv) => {
            const IconComponent = ICON_MAP[serv.iconName] || Tag;
            return (
              <div
                key={serv.id}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E3DCD0] shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#1B4332]/10 group-hover:bg-[#1B4332] text-[#1B4332] group-hover:text-[#E2B13C] flex items-center justify-center mb-5 transition-colors shadow-xs">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <h3 className="font-heading font-bold text-lg text-[#143527] mb-2.5">
                    {serv.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#54625A] leading-relaxed mb-4">
                    {serv.description}
                  </p>

                  {serv.features && (
                    <ul className="space-y-1.5 mb-5 text-xs text-[#627068]">
                      {serv.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E2B13C]"></span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="pt-4 border-t border-[#F0EBE0] flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-[#8C7D6F] truncate max-w-[170px]">
                    {serv.targetAudience}
                  </span>
                  <button
                    onClick={() => onSelectService(serv)}
                    className="text-xs font-bold text-[#1B4332] group-hover:text-[#0F2B20] flex items-center gap-1 hover:underline"
                  >
                    <span>Enquire</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
