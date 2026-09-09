import React, { useState } from 'react';
import { HeartHandshake, CheckCircle2, Send, MessageSquare, Copy, Check, RotateCcw } from 'lucide-react';
import { saveEnquiryLocally, createWhatsAppUrl, PGFV_WHATSAPP_PHONE, PGFV_WHATSAPP_DISPLAY } from '../../utils/helpers';

export function PartnershipsSection() {
  const [partnerType, setPartnerType] = useState('School / Educational Institution');
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [proposal, setProposal] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const partners = [
    'Schools & Higher Institutions',
    'Corporate Businesses & SMEs',
    'NGOs & Humanitarian Bodies',
    'Charitable Foundations',
    'Churches & Faith-Based Ministries',
    'Community Associations',
    'Employers & Cooperatives',
    'Government & Stakeholders',
    'Individual Philanthropists',
    'Other Mission-Aligned Bodies'
  ];

  const buildWhatsAppProposalText = () => {
    return [
      `*PRECIOUS GEM FOODS VENTURES (PGFV)*`,
      `*PARTNERSHIP & COLLABORATION PROPOSAL*`,
      `=========================================`,
      `*Entity Type:* ${partnerType}`,
      `*Contact Person:* ${name}`,
      `*Organization:* ${organization || 'Individual / Not specified'}`,
      `*Phone / WhatsApp:* ${phone}`,
      `*Email:* ${email || 'Not provided'}`,
      `=========================================`,
      `*Proposal / Initiative Focus:*`,
      `${proposal || 'We are interested in exploring partnership & collaboration opportunities with PGFV.'}`,
      `=========================================`,
      `Hello PGFV Management, I just submitted this partnership proposal on your website and would like to discuss next steps directly.`
    ].join('\n');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    saveEnquiryLocally({
      type: 'Partnership',
      partnerType,
      name,
      organization,
      phone,
      email,
      proposal
    });

    setSubmitted(true);

    // Automatically submit and open WhatsApp to +234 916 762 1558
    const text = buildWhatsAppProposalText();
    window.open(createWhatsAppUrl(text, PGFV_WHATSAPP_PHONE), '_blank');
  };

  const handleSendWhatsApp = () => {
    const text = buildWhatsAppProposalText();
    window.open(createWhatsAppUrl(text, PGFV_WHATSAPP_PHONE), '_blank');
  };

  const handleCopy = () => {
    const text = buildWhatsAppProposalText();
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const handleReset = () => {
    setName('');
    setOrganization('');
    setPhone('');
    setEmail('');
    setProposal('');
    setSubmitted(false);
  };

  return (
    <section id="partnerships-section" className="py-16 sm:py-24 bg-[#F5EFE6] border-b border-[#E8E2D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Mission Alignment */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B4332]/10 text-[#1B4332] text-xs font-bold uppercase tracking-wider">
              <HeartHandshake className="w-3.5 h-3.5 text-[#C68A1B]" />
              <span>COLLABORATION & ALLIANCE</span>
            </div>

            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-[#143527] leading-tight">
              LET'S CREATE IMPACT TOGETHER
            </h2>

            <p className="text-sm sm:text-base text-[#4E5D55] leading-relaxed">
              PGFV is open to partnerships that align with its values and create meaningful impact through food, skills, entrepreneurship and empowerment.
            </p>

            <p className="text-xs sm:text-sm text-[#5D6D64] leading-relaxed">
              Whether you are organizing a community food drive, introducing vocational training in student halls, setting up employee end-of-year provisions, or seeking private label supply, we welcome your collaboration.
            </p>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#7A6A5C] block mb-3">
                Open to collaboration with:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {partners.map((p, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-[#33423A]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C68A1B] shrink-0"></span>
                    <span className="font-medium">{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Partnership Enquiry Form */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E3DCD0] shadow-md">
              <h3 className="font-heading font-bold text-xl text-[#143527] mb-1">
                Partnership Enquiry Form
              </h3>
              <p className="text-xs text-[#63726A] mb-5">
                Share details of your proposed collaboration with the PGFV leadership team.
              </p>

              {submitted ? (
                <div className="text-center py-6 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#1B4332]/10 text-[#1B4332] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h4 className="font-heading font-bold text-lg text-[#143527]">
                    Proposal Submitted & WhatsApp Opened!
                  </h4>
                  <p className="text-xs text-[#526058] max-w-sm mx-auto leading-relaxed">
                    Your proposal has been logged and linked directly to our official WhatsApp desk (<strong className="text-[#143527]">+{PGFV_WHATSAPP_PHONE}</strong>). If WhatsApp did not open automatically, click the button below:
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
                    <button
                      onClick={handleSendWhatsApp}
                      className="w-full sm:w-auto py-3 px-5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Open WhatsApp Chat ({PGFV_WHATSAPP_DISPLAY})</span>
                    </button>

                    <button
                      onClick={handleCopy}
                      className="w-full sm:w-auto py-3 px-4 rounded-xl bg-[#FAF7F2] hover:bg-[#F2ECE1] text-[#1B4332] border border-[#D8CFC2] text-xs font-bold transition-all flex items-center justify-center gap-2"
                    >
                      {copied ? <Check className="w-4 h-4 text-[#1B4332]" /> : <Copy className="w-4 h-4 text-[#7B8B82]" />}
                      <span>{copied ? 'Copied to Clipboard!' : 'Copy Proposal Text'}</span>
                    </button>
                  </div>

                  <div className="pt-3 border-t border-[#EFEBE3]">
                    <button
                      onClick={handleReset}
                      className="text-xs text-[#6B7B73] hover:text-[#1B4332] font-semibold flex items-center justify-center gap-1.5 mx-auto transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Submit another proposal</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#697A72] mb-1">
                      Organization / Entity Type *
                    </label>
                    <select
                      value={partnerType}
                      onChange={(e) => setPartnerType(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#D5CCBE] text-xs bg-white focus:outline-none focus:border-[#1B4332]"
                    >
                      {partners.map((p, idx) => (
                        <option key={idx} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#697A72] mb-1">
                        Contact Person Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-[#D5CCBE] text-xs focus:outline-none focus:border-[#1B4332]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#697A72] mb-1">
                        Organization Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Hope Foundation / OAU Club"
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-[#D5CCBE] text-xs focus:outline-none focus:border-[#1B4332]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#697A72] mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="09167621558"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-[#D5CCBE] text-xs focus:outline-none focus:border-[#1B4332]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#697A72] mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="partner@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-[#D5CCBE] text-xs focus:outline-none focus:border-[#1B4332]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#697A72] mb-1">
                      Brief Partnership Proposal or Focus Area
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell us about the initiative you would like us to collaborate on..."
                      value={proposal}
                      onChange={(e) => setProposal(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#D5CCBE] text-xs focus:outline-none focus:border-[#1B4332]"
                    />
                  </div>

                  <div className="pt-1">
                    <button
                      type="submit"
                      className="w-full py-3.5 px-4 rounded-xl bg-[#1B4332] hover:bg-[#143527] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2 group"
                      id="submit-partner-btn"
                    >
                      <MessageSquare className="w-4 h-4 text-[#25D366] group-hover:scale-110 transition-transform" />
                      <span>SUBMIT & LINK TO WHATSAPP</span>
                      <Send className="w-3.5 h-3.5 text-[#E2B13C]" />
                    </button>
                    <p className="text-[11px] text-[#7A8B83] text-center mt-2">
                      Submits proposal and opens WhatsApp chat directly with <span className="font-semibold text-[#143527]">+{PGFV_WHATSAPP_PHONE}</span>
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
