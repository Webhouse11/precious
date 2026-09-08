import { 
  Package, 
  AlertCircle, 
  Sparkles, 
  Check, 
  TrendingUp, 
  Layers 
} from 'lucide-react';

export function WhatYouReceiveSection() {
  const items = [
    { name: 'Rice', desc: 'Clean, stoneless parboiled long-grain rice' },
    { name: 'Beans', desc: 'Neatly sorted, pest-free honey brown beans (Oloyin)' },
    { name: 'Garri', desc: 'Crispy, grit-free white or yellow cassava flakes' },
    { name: 'Cooking Oils', desc: 'Pure palm oil and cholesterol-free vegetable oil' },
    { name: 'Pasta', desc: 'Quality spaghetti and macaroni essentials' },
    { name: 'Yam', desc: 'Dry, mature yam tubers selected for pounding or boiling' },
    { name: 'Chicken / Beef', desc: 'Hygienically sourced festive protein portions' },
    { name: 'Drinks', desc: 'Wholesome packaged fruit juices and beverages' },
    { name: 'Spices & Seasonings', desc: 'Curry, thyme, seasoning cubes & local aromatics' },
    { name: 'Flour-Based Products', desc: 'Puff puff mix, buns mix, custard or plantain flour' },
    { name: 'Other Household Essentials', desc: 'Salt, tomato paste, condiments and dry provisions' }
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#F5EFE6] border-b border-[#E8E2D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C68A1B] block mb-2">
            PACKAGE ALLOCATION
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-[#143527]">
            WHAT WILL I RECEIVE?
          </h2>
          <p className="text-sm sm:text-base text-[#56655D] mt-3">
            At the end of the savings period, participants receive a foodstuff package corresponding to their total savings, subject to prevailing market prices and product availability.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          {items.map((it, idx) => (
            <div
              key={idx}
              className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E3DCD0] shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="w-8 h-8 rounded-lg bg-[#1B4332]/10 text-[#1B4332] flex items-center justify-center font-bold text-xs mb-3">
                  <Check className="w-4 h-4" />
                </div>
                <h4 className="font-heading font-bold text-sm sm:text-base text-[#143527] mb-1">
                  {it.name}
                </h4>
                <p className="text-xs text-[#63726A] leading-relaxed">
                  {it.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* High-Visibility Transparent Market Disclaimer Card */}
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#E2B13C]/40 shadow-sm relative overflow-hidden">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-[#E2B13C]/20 text-[#8C620E] flex items-center justify-center shrink-0 mt-0.5">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div className="space-y-3">
              <h3 className="font-heading font-bold text-base sm:text-lg text-[#143527]">
                IMPORTANT: PACKAGE CONTENTS & QUANTITIES ARE NOT FIXED IN ADVANCE
              </h3>
              <p className="text-xs sm:text-sm text-[#54625B] leading-relaxed">
                Because agricultural and commodity prices in Nigeria fluctuate over time, the exact items and volume in each delivery depend on:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#EAE3D6] text-xs">
                  <span className="font-bold text-[#1B4332] block">1. Total Amount Saved</span>
                  <span className="text-[#6D7D74]">Your verified total contribution</span>
                </div>
                <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#EAE3D6] text-xs">
                  <span className="font-bold text-[#1B4332] block">2. Market Wholesale Prices</span>
                  <span className="text-[#6D7D74]">Prevailing December rates</span>
                </div>
                <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#EAE3D6] text-xs">
                  <span className="font-bold text-[#1B4332] block">3. Product Availability</span>
                  <span className="text-[#6D7D74]">Seasonal supply harvests</span>
                </div>
              </div>
              <p className="text-xs text-[#7B6E60] italic">
                PGFV uses its bulk-procurement network to maximize every participant’s purchasing power, ensuring you get the greatest possible value for your total savings.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
