import React, { useState } from 'react';
import { X, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { saveEnquiryLocally, createWhatsAppUrl, PGFV_WHATSAPP_PHONE, PGFV_WHATSAPP_DISPLAY } from '../../utils/helpers';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  defaultCategory?: string;
  itemName?: string;
}

export function EnquiryModal({
  isOpen,
  onClose,
  title,
  defaultCategory = 'Product Enquiry',
  itemName = ''
}: EnquiryModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(
    itemName ? `I am inquiring about availability and pricing for ${itemName}.` : ''
  );
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const buildWhatsAppText = () => {
    return [
      `📩 *PGFV ENQUIRY / BOOKING REQUEST*`,
      `=========================================`,
      `📌 *Category:* ${defaultCategory}`,
      itemName ? `📦 *Item / Service:* ${itemName}` : '',
      `👤 *Name:* ${name}`,
      `📞 *Phone / WhatsApp:* ${phone}`,
      email ? `📧 *Email:* ${email}` : '',
      `📝 *Message / Requirements:*`,
      `${message || 'Please provide information and availability.'}`,
      `=========================================`,
      `Hello Precious Gem Foods Ventures, please attend to my enquiry.`
    ].filter(Boolean).join('\n');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    saveEnquiryLocally({
      type: defaultCategory,
      itemName,
      name,
      phone,
      email,
      message
    });

    setSubmitted(true);

    const text = buildWhatsAppText();
    window.open(createWhatsAppUrl(text, PGFV_WHATSAPP_PHONE), '_blank');
  };

  const handleSendToWhatsApp = () => {
    const text = buildWhatsAppText();
    window.open(createWhatsAppUrl(text, PGFV_WHATSAPP_PHONE), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#E8E2D5]">
        
        {/* Modal Header */}
        <div className="bg-[#1B4332] text-white p-5 flex items-center justify-between">
          <div>
            <h3 className="font-heading font-bold text-base sm:text-lg text-white">
              {title}
            </h3>
            <span className="text-[11px] text-[#BED5C9]">
              Precious Gem Foods Ventures (PGFV)
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 text-white/80 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#1B4332]/10 text-[#1B4332] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-heading font-bold text-lg text-[#143527]">
                Enquiry Received!
              </h4>
              <p className="text-xs text-[#526058] max-w-sm mx-auto">
                Thank you, {name}. Our desk will reply as soon as possible.
              </p>
              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={handleSendToWhatsApp}
                  className="py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Open WhatsApp ({PGFV_WHATSAPP_DISPLAY})</span>
                </button>
                <button
                  onClick={onClose}
                  className="text-xs text-[#1B4332] font-semibold underline cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {itemName && (
                <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EBE4D8] text-xs text-[#143527]">
                  <strong>Selected Item / Service:</strong> {itemName}
                </div>
              )}

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#697A72] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#D5CCBE] text-xs sm:text-sm focus:outline-none focus:border-[#1B4332]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#697A72] mb-1">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 09167621558"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#D5CCBE] text-xs sm:text-sm focus:outline-none focus:border-[#1B4332]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#697A72] mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="yourname@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#D5CCBE] text-xs sm:text-sm focus:outline-none focus:border-[#1B4332]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#697A72] mb-1">
                  Message / Details *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Quantity, location, delivery timeline, or any questions..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#D5CCBE] text-xs sm:text-sm focus:outline-none focus:border-[#1B4332]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-[#5A6860] hover:text-[#1B4332]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#1B4332] hover:bg-[#143527] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow"
                >
                  <Send className="w-3.5 h-3.5 text-[#E2B13C]" />
                  <span>Send Enquiry</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
