import { Building2, Gift, Users, Check, ArrowRight, HeartHandshake } from 'lucide-react';

interface CorporatePackagesSectionProps {
  onRequestQuotation: () => void;
}

export function CorporatePackagesSection({ onRequestQuotation }: CorporatePackagesSectionProps) {
  const offerings = [
    {
      title: 'Christmas Hampers',
      desc: 'Deluxe festive gift hampers packaged in elegant baskets or branded boxes with gourmet treats and high-grade staples.',
      badge: 'Festive Bestseller'
    },
    {
      title: 'Employee Christmas Gifts',
      desc: 'Tailored staff appreciation food boxes containing festive essentials that reward employees and reduce household expenses.',
      badge: 'Corporate HR'
    },
    {
      title: 'Corporate Food Packages',
      desc: 'Bulk food distributions for corporate welfare drives, board gifts, partner tokens, and end-of-year bonuses.',
      badge: 'Bespoke Invoicing'
    },
    {
      title: 'Community & Church Distribution',
      desc: 'Carefully measured staple food packages for NGO outreaches, church welfare ministries, and charity endowments.',
      badge: 'Outreach & NGO'
    }
  ];

  const targetList = ['Businesses', 'Organisations', 'Churches', 'NGOs', 'Foundations', 'Employers', 'Individuals'];

  return (
    <section className="py-16 sm:py-24 bg-[#F5EFE6] border-b border-[#E8E2D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C68A1B] block mb-2">
            INSTITUTIONAL & BULK SOLUTIONS
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-[#143527]">
            CHRISTMAS HAMPERS & CORPORATE PACKAGES
          </h2>
          <p className="text-sm sm:text-base text-[#56655D] mt-3">
            Reward your staff, show appreciation to valued partners, and share seasonal goodwill with customised food packages.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            {targetList.map((t, idx) => (
              <span key={idx} className="text-[11px] font-semibold bg-white px-2.5 py-1 rounded-lg border border-[#E0D8CB] text-[#3D4B43]">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {offerings.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-[#E3DCD0] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider bg-[#1B4332]/10 text-[#1B4332] px-2.5 py-0.5 rounded-full mb-3">
                  {item.badge}
                </span>
                <h3 className="font-heading font-bold text-base sm:text-lg text-[#143527] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5B6B62] leading-relaxed mb-4">
                  {item.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F2EDE3]">
                <span className="text-[11px] text-[#8C7D6F] block">
                  Custom branding & batch dispatch available
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Quotation CTA Banner */}
        <div className="bg-[#1B4332] text-white rounded-3xl p-6 sm:p-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 border border-[#2B5743]">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
              NEED A TAILORED QUOTATION FOR YOUR TEAM?
            </h3>
            <p className="text-xs sm:text-sm text-[#C8DCD1] max-w-xl">
              Tell us your organization size, budget per package, and delivery destinations. We deliver transparent invoices and punctual fulfillment.
            </p>
          </div>

          <button
            onClick={onRequestQuotation}
            className="px-8 py-3.5 rounded-xl bg-[#E2B13C] hover:bg-[#C68A1B] text-[#122A20] font-extrabold text-xs uppercase tracking-wider shadow transition-all flex items-center gap-2 shrink-0"
            id="corporate-quotation-btn"
          >
            <span>REQUEST A QUOTATION</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
