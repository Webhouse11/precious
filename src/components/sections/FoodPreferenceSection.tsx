import React, { useState } from 'react';
import { Heart, Send, CheckCircle2, AlertCircle, MessageSquare } from 'lucide-react';
import { saveFoodPreferenceLocally, createWhatsAppUrl, PGFV_WHATSAPP_PHONE, PGFV_WHATSAPP_DISPLAY } from '../../utils/helpers';
import { SAVINGS_PLANS } from '../../data/mockData';

export function FoodPreferenceSection() {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('₦5,000 Weekly');
  const [preferredItems, setPreferredItems] = useState<string[]>([
    'Rice',
    'Cooking Oils'
  ]);
  const [customNotes, setCustomNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const availableOptions = [
    'Rice',
    'Beans (Oloyin)',
    'Garri (White/Yellow)',
    'Vegetable Cooking Oil',
    'Pure Palm Oil',
    'Pasta / Spaghetti',
    'Select Yam Tubers',
    'Oven-Dried Catfish',
    'Neat Ponmo Ijebu',
    'Puff Puff Mix',
    'Plantain Flour',
    'Custard Powder',
    'Chin Chin',
    'Drinks / Beverages'
  ];

  const toggleItem = (item: string) => {
    if (preferredItems.includes(item)) {
      setPreferredItems(preferredItems.filter((i) => i !== item));
    } else {
      setPreferredItems([...preferredItems, item]);
    }
  };

  const buildWhatsAppText = () => {
    return [
      `🎁 *PGFV CHRISTMAS FOOD PREFERENCE FORM* 🎁`,
      `=========================================`,
      `👤 *Participant Name:* ${fullName}`,
      `📞 *Phone / WhatsApp:* ${phone}`,
      `📧 *Email:* ${email || 'Not provided'}`,
      `📦 *Selected Savings Plan:* ${selectedPlan}`,
      `🥗 *Preferred Food Items:* ${preferredItems.join(', ') || 'General balanced mix'}`,
      `📝 *Special Notes / Household Needs:* ${customNotes || 'None'}`,
      `=========================================`,
      `Hello Precious Gem Foods Ventures, I have submitted my holiday foodstuff preferences for our household Christmas package.`
    ].join('\n');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    saveFoodPreferenceLocally({
      fullName,
      phone,
      email,
      selectedPlan,
      preferredItems,
      customNotes
    });

    setSubmitted(true);

    // Open WhatsApp directly with 234-9167621558
    const text = buildWhatsAppText();
    window.open(createWhatsAppUrl(text, PGFV_WHATSAPP_PHONE), '_blank');
  };

  const handleSendToWhatsApp = () => {
    const text = buildWhatsAppText();
    window.open(createWhatsAppUrl(text, PGFV_WHATSAPP_PHONE), '_blank');
  };

  return (
    <section id="food-preference" className="py-16 sm:py-24 bg-[#FDFBF7] border-b border-[#E8E2D5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B4332]/10 text-[#1B4332] text-xs font-bold uppercase tracking-wider mb-2">
            <Heart className="w-3.5 h-3.5 text-[#C68A1B]" />
            <span>CUSTOMISE YOUR HOLIDAY BASKET</span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-[#143527]">
            TELL US WHAT YOU PREFER
          </h2>
          <p className="text-sm sm:text-base text-[#56655D] mt-2 max-w-xl mx-auto">
            Participants can complete a short Food Preference Form to indicate the food items they would particularly like to receive in their package.
          </p>
        </div>

        {/* Preference Form Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E3DCD0] shadow-md">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#1B4332]/10 text-[#1B4332] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-heading font-bold text-2xl text-[#143527]">
                Preferences Recorded!
              </h3>
              <p className="text-sm text-[#54625A] max-w-md mx-auto">
                Thank you, <strong>{fullName}</strong>. Your food item preferences have been successfully recorded by Precious Gem Foods Ventures.
              </p>

              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8E2D5] text-xs text-left max-w-md mx-auto space-y-1">
                <div><strong>Selected Plan:</strong> {selectedPlan}</div>
                <div><strong>Preferred Items:</strong> {preferredItems.join(', ')}</div>
                {customNotes && <div><strong>Notes:</strong> {customNotes}</div>}
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleSendToWhatsApp}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Open WhatsApp ({PGFV_WHATSAPP_DISPLAY})</span>
                </button>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-[#1B4332] font-semibold underline"
                >
                  Edit or Submit Another
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#697A72] mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Oladipupo Precious"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D5CCBE] text-sm focus:outline-none focus:border-[#1B4332]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#697A72] mb-1.5">
                    Phone Number (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 09167621558"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D5CCBE] text-sm focus:outline-none focus:border-[#1B4332]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#697A72] mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. yourname@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D5CCBE] text-sm focus:outline-none focus:border-[#1B4332]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#697A72] mb-1.5">
                    Selected Savings Plan
                  </label>
                  <select
                    value={selectedPlan}
                    onChange={(e) => setSelectedPlan(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D5CCBE] text-sm bg-white focus:outline-none focus:border-[#1B4332]"
                  >
                    {SAVINGS_PLANS.map((p) => (
                      <option key={p.id} value={p.label}>
                        {p.label} ({p.tagline})
                      </option>
                    ))}
                    <option value="Undecided / Custom">Undecided / Enquiring</option>
                  </select>
                </div>
              </div>

              {/* Multi-select chips */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#697A72] mb-2">
                  Select Preferred Food Items (Tap to choose)
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableOptions.map((item) => {
                    const isSelected = preferredItems.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleItem(item)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-[#1B4332] text-white shadow-xs'
                            : 'bg-[#FAF7F2] text-[#4A554F] border border-[#E0D8CB] hover:bg-[#F2ECE1]'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Additional notes */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#697A72] mb-1.5">
                  Additional Notes or Household Preferences
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. We prefer white garri over yellow; prefer more beans than rice..."
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D5CCBE] text-sm focus:outline-none focus:border-[#1B4332]"
                />
              </div>

              {/* Mandatory Preference Notice */}
              <div className="p-3.5 rounded-xl bg-[#FFF9E6] border border-[#F0DFAC] text-[#634E1D] flex items-start gap-2.5 text-xs leading-relaxed">
                <AlertCircle className="w-4 h-4 shrink-0 text-[#C68A1B] mt-0.5" />
                <p>
                  <strong>Please Note:</strong> Submitting a preference does not guarantee that a particular item or quantity will be included in the final package. Final packages depend on total verified savings, prevailing December market rates, and seasonal harvests.
                </p>
              </div>

              {/* WhatsApp Submission Banner */}
              <div className="p-3 rounded-xl bg-[#E8F8EE] border border-[#BDE8CC] text-xs text-[#136338] flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-[#25D366] shrink-0" />
                <span className="leading-snug">
                  On clicking Submit, your food preferences will be dispatched directly to PGFV WhatsApp at <strong>{PGFV_WHATSAPP_DISPLAY}</strong>.
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-[#1B4332] hover:bg-[#143527] text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                id="submit-preference-btn"
              >
                <Send className="w-4 h-4 text-[#E2B13C]" />
                <span>SUBMIT PREFERENCES TO WHATSAPP ({PGFV_WHATSAPP_DISPLAY})</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
