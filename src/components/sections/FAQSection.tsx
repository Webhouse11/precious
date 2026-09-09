import { useState } from 'react';
import { ChevronDown, Search, HelpCircle, MessageSquare } from 'lucide-react';
import { FAQ_LIST, BUSINESS_INFO } from '../../data/mockData';
import { createWhatsAppUrl, PGFV_WHATSAPP_PHONE } from '../../utils/helpers';

export function FAQSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [openId, setOpenId] = useState<string | null>(FAQ_LIST[0].id);

  const categories = [
    'ALL',
    'SAVINGS PLAN',
    'PAYMENTS & VERIFICATION',
    'DELIVERY & PACKAGES',
    'GENERAL & PRODUCTS'
  ];

  const filteredFaqs = FAQ_LIST.filter((item) => {
    const matchesCat = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const handleAskQuestion = () => {
    const text = searchQuery.trim()
      ? `Hello Precious Gem Foods Ventures, I have a question regarding: "${searchQuery.trim()}". Could you please assist me?`
      : `Hello Precious Gem Foods Ventures, I have a question regarding your Christmas Savings Plan / Food Products.`;
    window.open(createWhatsAppUrl(text, PGFV_WHATSAPP_PHONE), '_blank');
  };

  return (
    <section id="faq-section" className="py-16 sm:py-24 bg-[#FDFBF7] border-b border-[#E8E2D5]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C68A1B] block mb-2">
            CLEAR ANSWERS & GUIDANCE
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-[#143527]">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="text-sm sm:text-base text-[#56655D] mt-2">
            Transparent information regarding the Christmas Foodstuff Savings Plan, payments, deliveries, and packaging.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="space-y-4 mb-10">
          <div className="relative max-w-lg mx-auto">
            <Search className="w-4 h-4 text-[#7B8B82] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search frequently asked questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-2xl border border-[#D5CCBE] bg-white text-sm text-[#143527] focus:outline-none focus:border-[#1B4332] shadow-xs"
            />
          </div>

          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#1B4332] text-white shadow-xs'
                    : 'bg-white text-[#4A554F] border border-[#E0D8CB] hover:bg-[#F3EFE6]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-[#E4DCD0] overflow-hidden transition-all shadow-2xs hover:border-[#C8BEAD]"
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full py-4 px-5 sm:px-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-[#FAF5EC] text-[#C68A1B] flex items-center justify-center shrink-0 font-bold text-xs">
                      Q
                    </span>
                    <span className="font-heading font-bold text-sm sm:text-base text-[#143527]">
                      {faq.question}
                    </span>
                  </div>

                  <div className={`p-1 rounded-full bg-[#FAF7F2] text-[#1B4332] transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-[#4E5B54] leading-relaxed border-t border-[#F2ECE1] bg-[#FCFAF7] animate-in fade-in duration-150">
                    <p>{faq.answer}</p>
                    <div className="mt-3 pt-2 flex items-center justify-between text-[11px] text-[#8C7D6F]">
                      <span className="uppercase font-semibold tracking-wider">
                        Category: {faq.category}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Can't find question box */}
        <div className="mt-12 text-center p-6 bg-[#FAF5EC] rounded-2xl border border-[#E6DDCF]">
          <h4 className="font-heading font-bold text-base text-[#143527] mb-1">
            Have a question that is not listed here?
          </h4>
          <p className="text-xs sm:text-sm text-[#5C6B63] mb-4">
            Our customer service desk is available to assist you via WhatsApp or direct phone call.
          </p>
          <button
            onClick={handleAskQuestion}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1B4332] hover:bg-[#143527] text-white font-bold text-xs uppercase tracking-wider shadow transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#E2B13C]" />
            <span>Ask PGFV Directly</span>
          </button>
        </div>

      </div>
    </section>
  );
}
