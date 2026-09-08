import { useState } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { createWhatsAppUrl } from '../../utils/helpers';
import { BUSINESS_INFO } from '../../data/mockData';

export function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);

  const quickMessages = [
    {
      title: 'Christmas Savings Plan',
      text: 'Hello PGFV, I would like to register for the Christmas Foodstuff Savings Plan.'
    },
    {
      title: 'Food Products Enquiry',
      text: 'Hello PGFV, I would like to enquire about your food products and availability.'
    },
    {
      title: 'Corporate / Hamper Packages',
      text: 'Hello PGFV, I am interested in a corporate food package / Christmas hampers quotation.'
    },
    {
      title: 'Student Food Packages',
      text: 'Hello PGFV, I would like to enquire about your student food packages and savings.'
    }
  ];

  const handleSend = (text: string) => {
    window.open(createWhatsAppUrl(text), '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end">
      {/* Quick Prompt Popover */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-88 bg-white rounded-2xl shadow-2xl border border-[#E8E2D5] overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          <div className="bg-[#1B4332] p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#E2B13C] text-[#1B4332] flex items-center justify-center font-bold text-sm">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm">PGFV Support Desk</h4>
                <p className="text-[11px] text-[#C1D6CC]">Online & Ready to Assist • {BUSINESS_INFO.phone}</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-white/10 text-white/80 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3 bg-[#FAF8F5] text-xs text-[#525B55] border-b border-[#EFEBE3]">
            How can Precious Gem Foods Ventures assist you today? Select an option or chat directly:
          </div>

          <div className="p-3 space-y-2 max-h-64 overflow-y-auto">
            {quickMessages.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(item.text)}
                className="w-full text-left p-2.5 rounded-xl border border-[#E6E0D4] hover:border-[#1B4332] hover:bg-[#F3EFE6] text-xs transition-all flex items-center justify-between group"
              >
                <div>
                  <span className="font-semibold text-[#1B4332] block">{item.title}</span>
                  <span className="text-[#647169] text-[11px] line-clamp-1">{item.text}</span>
                </div>
                <Send className="w-3.5 h-3.5 text-[#1B4332] opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
              </button>
            ))}
          </div>

          <div className="p-3 bg-white border-t border-[#E8E2D5]">
            <button
              onClick={() => handleSend('Hello Precious Gem Foods Ventures, I have an enquiry.')}
              className="w-full py-2 px-3 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Open Custom WhatsApp Chat</span>
            </button>
          </div>
        </div>
      )}

      {/* WhatsApp Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all group scale-100 hover:scale-105 active:scale-95"
        id="floating-whatsapp-btn"
        aria-label="Chat with PGFV on WhatsApp"
      >
        <div className="relative">
          <MessageSquare className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#E2B13C] rounded-full border-2 border-[#25D366]"></span>
        </div>
        <span className="font-semibold text-xs tracking-wide hidden sm:inline">
          Chat with PGFV
        </span>
      </button>
    </div>
  );
}
