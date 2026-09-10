import React, { useState } from 'react';
import { 
  X, 
  Check, 
  CreditCard, 
  Sparkles, 
  Send, 
  ArrowRight, 
  Copy, 
  CheckCheck,
  MessageSquare,
  ShieldCheck
} from 'lucide-react';
import { SAVINGS_PLANS, BUSINESS_INFO } from '../../data/mockData';
import { 
  formatNaira, 
  saveRegistrationLocally, 
  createWhatsAppUrl, 
  PGFV_WHATSAPP_PHONE, 
  PGFV_WHATSAPP_DISPLAY,
  optimizeCloudinary 
} from '../../utils/helpers';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedPlanId?: string;
  onOpenTerms: () => void;
}

export function RegistrationModal({
  isOpen,
  onClose,
  preselectedPlanId,
  onOpenTerms
}: RegistrationModalProps) {
  const [selectedPlanId, setSelectedPlanId] = useState(preselectedPlanId || 'plan-5000');
  const [frequency, setFrequency] = useState<'weekly' | 'monthly'>('weekly');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [assignedId, setAssignedId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState<string>('');

  if (!isOpen) return null;

  const currentPlan = SAVINGS_PLANS.find((p) => p.id === selectedPlanId) || SAVINGS_PLANS[2];
  const calculatedAmount = frequency === 'weekly' ? currentPlan.weeklyAmount : currentPlan.weeklyAmount * 4;

  const buildWhatsAppMessage = (participantId: string) => {
    return [
      `🎄 *PGFV CHRISTMAS FOODSTUFF SAVINGS REGISTRATION* 🎄`,
      `=========================================`,
      `🆔 *Participant ID:* ${participantId}`,
      `👤 *Full Name:* ${fullName}`,
      `📞 *Phone / WhatsApp:* ${phone}`,
      `📧 *Email:* ${email || 'Not provided'}`,
      `📍 *Delivery Address:* ${address || 'Not specified'}`,
      ``,
      `📦 *SAVINGS PLAN DETAILS:*`,
      `• *Selected Plan:* ${currentPlan.label}`,
      `• *Contribution Frequency:* ${frequency.toUpperCase()}`,
      `• *Contribution Amount:* ${formatNaira(calculatedAmount)} (${frequency === 'weekly' ? 'weekly deposit' : 'monthly upfront'})`,
      `• *Savings Start Date:* ${BUSINESS_INFO.dates.savingsStart}`,
      `• *Catch-up Deadline:* ${BUSINESS_INFO.dates.catchUpDeadline}`,
      `• *Festive Delivery:* ${BUSINESS_INFO.dates.deliveryBegins}`,
      ``,
      `✅ *Terms & Conditions:* Read & Accepted`,
      `=========================================`,
      `Hello Precious Gem Foods Ventures (PGFV), I have completed my official Christmas Foodstuff Savings registration form!`,
      ``,
      `Kindly verify my registration details and provide the designated PGFV payment channel / bank account details for my initial deposit to activate my official savings card. Thank you!`
    ].join('\n');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !agreedToTerms) return;

    // 1. Save locally for participant verification portal
    const id = saveRegistrationLocally({
      fullName,
      phone,
      email,
      address,
      planId: currentPlan.id,
      planLabel: currentPlan.label,
      weeklyAmount: currentPlan.weeklyAmount,
      frequency,
      calculatedAmount
    });

    setAssignedId(id);

    // 2. Build the complete message for WhatsApp submission to 234-9167621558
    const message = buildWhatsAppMessage(id);
    setSubmittedMessage(message);

    // 3. Immediately submit/open WhatsApp targeting 234-9167621558
    const whatsappUrl = createWhatsAppUrl(message, PGFV_WHATSAPP_PHONE);
    window.open(whatsappUrl, '_blank');
  };

  const handleManualWhatsAppOpen = () => {
    if (!assignedId) return;
    const message = submittedMessage || buildWhatsAppMessage(assignedId);
    const whatsappUrl = createWhatsAppUrl(message, PGFV_WHATSAPP_PHONE);
    window.open(whatsappUrl, '_blank');
  };

  const handleCopySummary = () => {
    if (!assignedId) return;
    const message = submittedMessage || buildWhatsAppMessage(assignedId);
    navigator.clipboard.writeText(message).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-[#E8E2D5] my-auto">
        
        {/* Modal Header */}
        <div className="bg-[#1B4332] text-white p-5 sm:p-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-white p-1 text-[#122A20] flex items-center justify-center font-bold shadow-xs border border-[#E2B13C]/60 shrink-0 overflow-hidden">
              <img
                src={optimizeCloudinary(BUSINESS_INFO.logo, 120)}
                alt="PGFV Official Logo"
                className="w-full h-full object-contain rounded-lg"
                width={44}
                height={44}
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-base sm:text-lg text-white">
                Christmas Foodstuff Savings Registration
              </h3>
              <p className="text-xs text-[#C8DBD2] flex items-center gap-1.5 mt-0.5">
                <span>PGFV Official Desk:</span>
                <span className="font-mono font-bold text-[#E2B13C]">{PGFV_WHATSAPP_DISPLAY}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {assignedId ? (
            /* Registration Success & WhatsApp Submission Preview */
            <div className="space-y-6 text-center py-1">
              
              <div className="w-16 h-16 rounded-full bg-[#1B4332]/10 text-[#1B4332] flex items-center justify-center mx-auto ring-8 ring-[#1B4332]/5">
                <Check className="w-9 h-9" />
              </div>

              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#25D366]/15 text-[#0F6832] text-xs font-extrabold uppercase tracking-wide mb-2">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Submitted to WhatsApp ({PGFV_WHATSAPP_DISPLAY})</span>
                </span>
                <h4 className="font-heading font-extrabold text-2xl text-[#143527]">
                  Registration Form Submitted!
                </h4>
                <p className="text-xs sm:text-sm text-[#54625A] mt-1 max-w-md mx-auto">
                  Your Christmas Foodstuff Savings registration has been compiled and dispatched directly to the PGFV WhatsApp verification desk at <strong className="text-[#143527] font-mono">{PGFV_WHATSAPP_DISPLAY}</strong>.
                </p>
              </div>

              {/* Digital Savings Card Representation */}
              <div className="bg-gradient-to-br from-[#1B4332] to-[#0F281D] text-white p-6 rounded-2xl shadow-xl text-left border border-[#E2B13C]/40 relative overflow-hidden">
                <div className="flex items-center justify-between mb-4 border-b border-[#2C5743] pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white p-1 border border-[#E2B13C] shadow-xs flex items-center justify-center shrink-0 overflow-hidden">
                      <img
                        src={optimizeCloudinary(BUSINESS_INFO.logo, 100)}
                        alt="PGFV Official Logo"
                        className="w-full h-full object-contain rounded-lg"
                        width={40}
                        height={40}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#E2B13C]">
                        PGFV OFFICIAL SAVINGS CARD
                      </span>
                      <h5 className="font-heading font-extrabold text-base text-white">
                        Precious Gem Foods Ventures
                      </h5>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold bg-[#E2B13C] text-[#122A20] px-2.5 py-1 rounded-md shadow-xs">
                    {assignedId}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                  <div>
                    <span className="text-[#A2C2B3] block text-[10px] uppercase">Participant</span>
                    <strong className="text-sm text-white block truncate">{fullName}</strong>
                  </div>
                  <div>
                    <span className="text-[#A2C2B3] block text-[10px] uppercase">Phone</span>
                    <strong className="text-white block truncate">{phone}</strong>
                  </div>
                  <div>
                    <span className="text-[#A2C2B3] block text-[10px] uppercase">Plan</span>
                    <strong className="text-[#E2B13C] block truncate">{currentPlan.label} ({frequency})</strong>
                  </div>
                  <div>
                    <span className="text-[#A2C2B3] block text-[10px] uppercase">Status</span>
                    <strong className="text-white flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                      Pending Verification
                    </strong>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#2C5743] text-[10px] text-[#A2C2B3] flex justify-between items-center">
                  <span>Start: {BUSINESS_INFO.dates.savingsStart}</span>
                  <span>Delivery: {BUSINESS_INFO.dates.deliveryBegins}</span>
                </div>
              </div>

              {/* Next steps notice */}
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D5] text-xs text-left space-y-2">
                <div className="flex items-center gap-2 text-[#1B4332] font-bold">
                  <CreditCard className="w-4 h-4 text-[#C68A1B]" />
                  <span>Activation & Deposit Channel:</span>
                </div>
                <p className="text-[#55635C] leading-relaxed">
                  Our verification officer on WhatsApp (<strong>{PGFV_WHATSAPP_DISPLAY}</strong>) will review your registration and send you the official PGFV bank details for your initial deposit of <strong>{formatNaira(calculatedAmount)}</strong> ({frequency === 'weekly' ? '1 week' : '4 weeks upfront'}). Once verified, your digital savings card is permanently activated!
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-1">
                <button
                  onClick={handleManualWhatsAppOpen}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-sm font-bold flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all cursor-pointer"
                  id="modal-open-whatsapp-btn"
                >
                  <Send className="w-4 h-4" />
                  <span>Open WhatsApp with Details ({PGFV_WHATSAPP_DISPLAY})</span>
                </button>

                <div className="flex flex-col sm:flex-row items-center gap-2.5">
                  <button
                    onClick={handleCopySummary}
                    className="w-full sm:w-1/2 py-2.5 px-3 rounded-xl border border-[#D5CCBE] text-[#37443E] hover:bg-[#FAF7F2] text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    id="modal-copy-summary-btn"
                  >
                    {copied ? (
                      <>
                        <CheckCheck className="w-4 h-4 text-[#1B4332]" />
                        <span className="text-[#1B4332] font-bold">Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-[#68766F]" />
                        <span>Copy Registration Summary</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={onClose}
                    className="w-full sm:w-1/2 py-2.5 px-3 rounded-xl border border-[#D5CCBE] text-[#1B4332] text-xs font-semibold hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                    id="modal-close-view-site-btn"
                  >
                    Done & Return to Website
                  </button>
                </div>
              </div>

            </div>
          ) : (
            /* Registration Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Plan selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#697A72] mb-2">
                  1. Select Your Savings Plan
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {SAVINGS_PLANS.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedPlanId(p.id)}
                      className={`p-3 rounded-xl text-left border transition-all flex items-center justify-between cursor-pointer ${
                        selectedPlanId === p.id
                          ? 'border-[#1B4332] bg-[#F2EDE3] ring-1 ring-[#1B4332]'
                          : 'border-[#E3DCD0] bg-white hover:bg-[#FAF7F2]'
                      }`}
                    >
                      <div>
                        <span className="font-heading font-bold text-sm text-[#143527] block">
                          {p.label}
                        </span>
                        <span className="text-[11px] text-[#616F67] line-clamp-1">
                          {p.tagline}
                        </span>
                      </div>
                      {selectedPlanId === p.id && (
                        <div className="w-5 h-5 rounded-full bg-[#1B4332] text-white flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Frequency */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#697A72] mb-2">
                  2. Contribution Frequency
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFrequency('weekly')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      frequency === 'weekly'
                        ? 'bg-[#1B4332] text-white border-[#1B4332] shadow-2xs'
                        : 'bg-[#FAF7F2] text-[#37443E] border-[#E0D8CB] hover:bg-white'
                    }`}
                  >
                    Weekly ({formatNaira(currentPlan.weeklyAmount)})
                  </button>

                  <button
                    type="button"
                    onClick={() => setFrequency('monthly')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      frequency === 'monthly'
                        ? 'bg-[#1B4332] text-white border-[#1B4332] shadow-2xs'
                        : 'bg-[#FAF7F2] text-[#37443E] border-[#E0D8CB] hover:bg-white'
                    }`}
                  >
                    Monthly Upfront ({formatNaira(currentPlan.weeklyAmount * 4)})
                  </button>
                </div>
              </div>

              {/* Personal Information */}
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#697A72]">
                  3. Participant Information
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Full Name *"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#D5CCBE] text-xs sm:text-sm focus:outline-none focus:border-[#1B4332] bg-[#FAF8F5]"
                      id="registration-fullname-input"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      required
                      placeholder="WhatsApp Phone Number *"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#D5CCBE] text-xs sm:text-sm focus:outline-none focus:border-[#1B4332] bg-[#FAF8F5]"
                      id="registration-phone-input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="email"
                      placeholder="Email Address (Optional)"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#D5CCBE] text-xs sm:text-sm focus:outline-none focus:border-[#1B4332] bg-[#FAF8F5]"
                      id="registration-email-input"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Delivery Town / Address (e.g. Ile-Ife)"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#D5CCBE] text-xs sm:text-sm focus:outline-none focus:border-[#1B4332] bg-[#FAF8F5]"
                      id="registration-address-input"
                    />
                  </div>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer select-none text-xs text-[#4C5A52] leading-relaxed">
                  <input
                    type="checkbox"
                    required
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded border-[#C4B7A5] text-[#1B4332] focus:ring-[#1B4332] shrink-0 cursor-pointer"
                    id="mandatory-terms-checkbox"
                  />
                  <span>
                    I have read and understood the{' '}
                    <button
                      type="button"
                      onClick={onOpenTerms}
                      className="font-bold text-[#1B4332] underline hover:text-[#0F281D] cursor-pointer"
                    >
                      PGFV Christmas Foodstuff Savings Plan terms and conditions
                    </button>
                    .
                  </span>
                </label>
              </div>

              {/* WhatsApp Submission Transparency Banner */}
              <div className="p-3 rounded-xl bg-[#E8F8EE] border border-[#BDE8CC] text-xs text-[#136338] flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-[#25D366] shrink-0" />
                <span className="leading-snug">
                  On clicking Complete Registration, your filled form and Participant ID will be submitted directly to WhatsApp number <strong>{PGFV_WHATSAPP_DISPLAY}</strong>.
                </span>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={!agreedToTerms}
                className="w-full py-3.5 px-4 rounded-xl bg-[#1B4332] hover:bg-[#143527] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                id="modal-submit-registration-btn"
              >
                <span>COMPLETE REGISTRATION & SUBMIT TO WHATSAPP</span>
                <ArrowRight className="w-4 h-4 text-[#E2B13C]" />
              </button>

            </form>
          )}

        </div>

      </div>
    </div>
  );
}
