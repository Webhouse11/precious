import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Truck, 
  Send, 
  CheckCircle2, 
  ExternalLink,
  Clock
} from 'lucide-react';
import { BUSINESS_INFO } from '../../data/mockData';
import { saveEnquiryLocally, createWhatsAppUrl } from '../../utils/helpers';

export function ContactSection() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [enquiryType, setEnquiryType] = useState('General Enquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    saveEnquiryLocally({
      type: enquiryType,
      name,
      phone,
      email,
      message
    });

    setSubmitted(true);
  };

  const handleWhatsAppDirect = () => {
    const text = `Hello Precious Gem Foods Ventures, my name is ${name || 'Customer'}. I would like to make an enquiry: ${message || 'Please provide more details.'}`;
    window.open(createWhatsAppUrl(text), '_blank');
  };

  return (
    <section id="contact-section" className="py-16 sm:py-24 bg-[#F5EFE6] border-b border-[#E8E2D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C68A1B] block mb-2">
            REACH OUR TEAM
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-[#143527]">
            CONTACT PRECIOUS GEM FOODS VENTURES
          </h2>
          <p className="text-sm sm:text-base text-[#56655D] mt-2">
            Based in Ile-Ife, Osun State, serving individuals, students, households, and organizations nationwide.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14">
          
          {/* Left Column: Direct Info & Delivery Info */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Business Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E3DCD0] shadow-xs space-y-5">
              <h3 className="font-heading font-bold text-xl text-[#143527]">
                Office & Direct Enquiries
              </h3>

              <div className="space-y-4 text-sm text-[#4E5C54]">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#1B4332]/10 text-[#1B4332] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-xs uppercase text-[#887869] font-bold">Physical Base</strong>
                    <span className="text-sm font-semibold text-[#143527]">{BUSINESS_INFO.location}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#1B4332]/10 text-[#1B4332] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-xs uppercase text-[#887869] font-bold">WhatsApp / Phone</strong>
                    <a 
                      href={`tel:${BUSINESS_INFO.phone}`} 
                      className="text-sm font-bold text-[#1B4332] hover:underline"
                    >
                      {BUSINESS_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#1B4332]/10 text-[#1B4332] flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-xs uppercase text-[#887869] font-bold">Official Email</strong>
                    <a 
                      href={`mailto:${BUSINESS_INFO.email}`} 
                      className="text-sm font-medium text-[#1B4332] hover:underline break-all"
                    >
                      {BUSINESS_INFO.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <a
                  href={createWhatsAppUrl('Hello PGFV, I would like to chat with your support desk.')}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>CHAT ON WHATSAPP</span>
                </a>

                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="py-3 px-4 rounded-xl border border-[#D5CCBE] hover:bg-[#FAF7F2] text-[#1B4332] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>SEND AN EMAIL</span>
                </a>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-[#F2EDE3]">
                <span className="text-xs text-[#7A6B5E] font-medium block mb-2">
                  Official Social Handles:
                </span>
                <div className="flex flex-wrap gap-2 text-xs">
                  <a
                    href={BUSINESS_INFO.socials.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-[#F5EFE6] hover:bg-[#EBE2D3] text-[#1B4332] font-semibold flex items-center gap-1"
                  >
                    <span>Instagram {BUSINESS_INFO.socials.handles.instagram}</span>
                    <ExternalLink className="w-3 h-3 text-[#7B8B82]" />
                  </a>
                  <a
                    href={BUSINESS_INFO.socials.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-[#F5EFE6] hover:bg-[#EBE2D3] text-[#1B4332] font-semibold flex items-center gap-1"
                  >
                    <span>Facebook {BUSINESS_INFO.socials.handles.facebook}</span>
                    <ExternalLink className="w-3 h-3 text-[#7B8B82]" />
                  </a>
                  <a
                    href={BUSINESS_INFO.socials.tiktok}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-[#F5EFE6] hover:bg-[#EBE2D3] text-[#1B4332] font-semibold flex items-center gap-1"
                  >
                    <span>TikTok {BUSINESS_INFO.socials.handles.tiktok}</span>
                    <ExternalLink className="w-3 h-3 text-[#7B8B82]" />
                  </a>
                </div>
              </div>
            </div>

            {/* Section 32: Delivery Information Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E3DCD0] shadow-xs">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-[#E2B13C]/20 text-[#122A20] flex items-center justify-center font-bold">
                  <Truck className="w-5 h-5 text-[#C68A1B]" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base text-[#143527]">
                    Doorstep Delivery Services
                  </h4>
                  <span className="text-[11px] text-[#7A6A5C]">Reliable Dispatch Partners</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#54625A] leading-relaxed mb-3">
                Precious Gem Foods Ventures delivers through trusted courier and dispatch services right to customers' doorsteps.
              </p>

              <p className="text-xs text-[#7B6E61] leading-relaxed">
                For specific delivery rates, destination schedules, or questions concerning your location, please contact PGFV directly via WhatsApp or phone.
              </p>
            </div>

          </div>

          {/* Right Column: Reusable Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E3DCD0] shadow-sm">
              <h3 className="font-heading font-bold text-xl text-[#143527] mb-1">
                Send PGFV a Direct Message
              </h3>
              <p className="text-xs sm:text-sm text-[#66756D] mb-6">
                Fill out this quick form for products, savings questions, hampers, or campus outreach.
              </p>

              {submitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#1B4332]/10 text-[#1B4332] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-heading font-bold text-xl text-[#143527]">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-sm text-[#4E5C54] max-w-md mx-auto">
                    Thank you for contacting Precious Gem Foods Ventures. Our team will get back to you as soon as possible.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={handleWhatsAppDirect}
                      className="px-6 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold inline-flex items-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Continue on WhatsApp</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#697A72] mb-1">
                      Enquiry Category *
                    </label>
                    <select
                      value={enquiryType}
                      onChange={(e) => setEnquiryType(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#D5CCBE] text-sm bg-white focus:outline-none focus:border-[#1B4332]"
                    >
                      <option value="General Enquiry">General Enquiry</option>
                      <option value="Christmas Foodstuff Savings">Christmas Foodstuff Savings</option>
                      <option value="Product Availability & Pricing">Product Availability & Pricing</option>
                      <option value="Student Food Package">Student Food Package</option>
                      <option value="Corporate / Hamper Quotation">Corporate / Hamper Quotation</option>
                      <option value="Private Labelling">Private Labelling</option>
                      <option value="Partnership / Outreach">Partnership / Outreach</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#697A72] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#D5CCBE] text-sm focus:outline-none focus:border-[#1B4332]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#697A72] mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="09167621558"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#D5CCBE] text-sm focus:outline-none focus:border-[#1B4332]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#697A72] mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="yourname@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#D5CCBE] text-sm focus:outline-none focus:border-[#1B4332]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#697A72] mb-1">
                      Message / Specific Requirements *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Please let us know how we can assist you..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#D5CCBE] text-sm focus:outline-none focus:border-[#1B4332]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-[#1B4332] hover:bg-[#143527] text-white font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm"
                    id="submit-contact-btn"
                  >
                    <Send className="w-4 h-4 text-[#E2B13C]" />
                    <span>SEND MESSAGE</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
