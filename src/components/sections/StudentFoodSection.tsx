import { GraduationCap, BookOpen, Utensils, PiggyBank, ArrowRight, Lightbulb } from 'lucide-react';

interface StudentFoodSectionProps {
  onEnquireStudents: () => void;
  onOpenRegister: () => void;
}

export function StudentFoodSection({ onEnquireStudents, onOpenRegister }: StudentFoodSectionProps) {
  const benefits = [
    {
      title: 'Practical Food Packages',
      desc: 'Carefully portioned packs of quick-cook beans flour, custard, garri, rice, noodles, and clean dried catfish suited for hostel life.',
      icon: Utensils
    },
    {
      title: 'Flexible Savings Arrangements',
      desc: 'Students can discuss gradual savings arrangements with PGFV to plan their semester food supplies without sudden financial pressure.',
      icon: PiggyBank
    },
    {
      title: 'Student Upskill & Empowerment',
      desc: 'Practical vocational sessions in food hygiene, product packaging, branding, and micro-entrepreneurship on campus.',
      icon: Lightbulb
    }
  ];

  return (
    <section id="student-solutions" className="py-16 sm:py-24 bg-[#FDFBF7] border-b border-[#E8E2D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gradient-to-br from-[#FAF7F2] to-[#F1ECE2] rounded-3xl p-6 sm:p-12 border border-[#E3DCD0] shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B4332]/10 text-[#1B4332] text-xs font-bold uppercase tracking-wider">
                <GraduationCap className="w-4 h-4 text-[#C68A1B]" />
                <span>YOUTH & CAMPUS EMPOWERMENT</span>
              </div>

              <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-[#143527] leading-tight">
                FOOD SOLUTIONS FOR STUDENTS
              </h2>

              <p className="text-sm sm:text-base text-[#4F5E56] leading-relaxed">
                Precious Gem Foods Ventures provides practical food packages designed with students in mind. These packages provide useful food items that can help students plan their food needs conveniently.
              </p>

              <p className="text-xs sm:text-sm text-[#5B6B62] leading-relaxed">
                Students can also discuss available savings arrangements with PGFV if they prefer to save gradually towards a selected package across their academic semester.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {benefits.map((b, idx) => {
                  const Icon = b.icon;
                  return (
                    <div key={idx} className="bg-white p-4 rounded-2xl border border-[#E5DDD0] shadow-2xs">
                      <div className="w-8 h-8 rounded-lg bg-[#1B4332]/10 text-[#1B4332] flex items-center justify-center mb-2.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="font-heading font-bold text-xs sm:text-sm text-[#143527] mb-1">
                        {b.title}
                      </h4>
                      <p className="text-[11px] text-[#67776F] leading-snug">
                        {b.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-3">
                <button
                  onClick={onEnquireStudents}
                  className="px-6 py-3 rounded-xl bg-[#1B4332] hover:bg-[#143527] text-white font-bold text-xs uppercase tracking-wider shadow transition-all flex items-center gap-2"
                  id="enquire-student-packages-btn"
                >
                  <span>ENQUIRE ABOUT STUDENT PACKAGES</span>
                  <ArrowRight className="w-4 h-4 text-[#E2B13C]" />
                </button>

                <button
                  onClick={onOpenRegister}
                  className="px-6 py-3 rounded-xl bg-white hover:bg-[#FAF7F2] text-[#1B4332] border border-[#D5CCBE] font-bold text-xs uppercase tracking-wider transition-all"
                >
                  Join ₦2,000 Weekly Plan
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-white">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
                  alt="Students and youth food packaging empowerment at PGFV"
                  className="w-full h-80 object-cover"
                />
                <div className="p-4 bg-[#1B4332] text-white text-center">
                  <span className="font-heading font-bold text-sm block">
                    Campus Nutrition & Enterprise Skills
                  </span>
                  <p className="text-xs text-[#D1E0D8]">
                    Hygienic staples made pocket-friendly for students in Ile-Ife and beyond.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
