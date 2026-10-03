import React, { useState } from 'react';
import { X, PackagePlus, MessageCircle, CheckCircle2, Plus, Check } from 'lucide-react';
import { createWhatsAppUrl, PGFV_WHATSAPP_PHONE } from '../../utils/helpers';
import { CustomPackageFormState } from '../../types/catalogue';

interface CustomPackageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AVAILABLE_STAPLES = [
  'PGFV Pure Peeled Beans Flour',
  'PGFV Custard Powder',
  'Parboiled Long-Grain Rice',
  'Clean White Garri',
  'Crispy Yellow Garri',
  'Oven-Dried Catfish',
  'Dried Ponmo Ijebu',
  'Honey Beans (Oloyin)',
  'Yam Flour (Elubo Amala)',
  'Plantain Flour',
  'Pure Red Palm Oil',
  'Refined Vegetable Oil',
  'Crunchy Chin Chin',
  'Puff Puff Mix',
  'Pasta / Macaroni',
  'Seasoning & Salt'
];

export const CustomPackageModal: React.FC<CustomPackageModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<CustomPackageFormState>({
    fullName: '',
    phone: '',
    email: '',
    packageType: 'Family Box',
    numberOfPackages: 1,
    targetBudgetPerPackage: '',
    selectedStaples: ['PGFV Pure Peeled Beans Flour', 'Parboiled Long-Grain Rice', 'Refined Vegetable Oil'],
    preferredDeliveryDate: '',
    deliveryLocation: '',
    customBrandingRequired: false,
    notes: ''
  });
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const toggleStaple = (staple: string) => {
    if (formData.selectedStaples.includes(staple)) {
      setFormData({
        ...formData,
        selectedStaples: formData.selectedStaples.filter(s => s !== staple)
      });
    } else {
      setFormData({
        ...formData,
        selectedStaples: [...formData.selectedStaples, staple]
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let message = `Hello Precious Gem Foods Ventures (PGFV),\n\n`;
    message += `I would like to request a *CUSTOM FOOD PACKAGE*.\n\n`;
    message += `Customer Name: ${formData.fullName}\n`;
    message += `Phone / WhatsApp: ${formData.phone}\n`;
    message += `Package Purpose: ${formData.packageType}\n`;
    message += `Number of Packages: ${formData.numberOfPackages}\n`;
    if (formData.targetBudgetPerPackage) message += `Budget Per Package: ${formData.targetBudgetPerPackage}\n`;
    message += `Delivery Town / Location: ${formData.deliveryLocation}\n`;
    if (formData.preferredDeliveryDate) message += `Target Date: ${formData.preferredDeliveryDate}\n`;
    message += `Branded Packaging Needed: ${formData.customBrandingRequired ? 'Yes (Custom sticker/tags)' : 'Standard packaging'}\n`;
    
    message += `\n*Selected Desired Staples:*\n`;
    formData.selectedStaples.forEach((s, idx) => {
      message += `- ${s}\n`;
    });

    if (formData.notes) {
      message += `\n*Additional Instructions:*\n${formData.notes}\n`;
    }

    message += `\nPlease calculate packaging combination and advise on delivery schedule. Thank you!`;

    window.open(createWhatsAppUrl(message, PGFV_WHATSAPP_PHONE), '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-[#E8E2D5] overflow-hidden">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#FAF7F2] border-b border-[#E8E1D5] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#1B4332] text-[#E2B13C] flex items-center justify-center">
              <PackagePlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-lg text-[#143527]">
                Custom Package Request
              </h3>
              <p className="text-xs text-[#67776F]">
                Design food packages tailored to your budget & household preferences
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-[#EFEAE0] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-heading font-extrabold text-xl text-[#143527]">
              Custom Request Generated!
            </h4>
            <p className="text-xs text-[#52635B] leading-relaxed max-w-sm mx-auto">
              Your custom package composition has been generated and forwarded to our packaging team. We will review items and revert with exact package quantities.
            </p>
            <button
              type="button"
              onClick={() => { setSubmitted(false); onClose(); }}
              className="px-6 py-2.5 rounded-xl bg-[#1B4332] text-white font-bold text-xs"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-3.5 max-h-[75vh] overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#143527] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Samuel Olaniyi"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#D5CCBE] bg-[#FDFBF7] text-[#143527] focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#143527] mb-1">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. 09012345678"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#D5CCBE] bg-[#FDFBF7] text-[#143527] focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#143527] mb-1">
                  Package Purpose *
                </label>
                <select
                  value={formData.packageType}
                  onChange={(e) => setFormData({ ...formData, packageType: e.target.value as any })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#D5CCBE] bg-[#FDFBF7] text-[#143527] focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
                >
                  <option value="Family Box">Family Box</option>
                  <option value="Student Package">Student Package</option>
                  <option value="Corporate Welfare">Corporate Welfare</option>
                  <option value="Event Souvenir">Event Souvenir</option>
                  <option value="Community Outreach">Community Outreach</option>
                  <option value="Custom">Other Custom Purpose</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#143527] mb-1">
                  Number of Packages *
                </label>
                <input
                  type="number"
                  min={1}
                  required
                  value={formData.numberOfPackages}
                  onChange={(e) => setFormData({ ...formData, numberOfPackages: parseInt(e.target.value) || 1 })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#D5CCBE] bg-[#FDFBF7] text-[#143527] focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#143527] mb-1">
                  Budget / Package (₦)
                </label>
                <input
                  type="text"
                  value={formData.targetBudgetPerPackage}
                  onChange={(e) => setFormData({ ...formData, targetBudgetPerPackage: e.target.value })}
                  placeholder="e.g. ₦12,500 or ₦25k"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#D5CCBE] bg-[#FDFBF7] text-[#143527] focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
                />
              </div>
            </div>

            {/* Multi-select staples */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-[#143527]">
                  Select Preferred Food Staples:
                </label>
                <span className="text-[10px] text-[#7A8A81]">
                  {formData.selectedStaples.length} selected
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 p-3 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5] max-h-40 overflow-y-auto custom-scrollbar">
                {AVAILABLE_STAPLES.map((staple) => {
                  const isSelected = formData.selectedStaples.includes(staple);
                  return (
                    <button
                      key={staple}
                      type="button"
                      onClick={() => toggleStaple(staple)}
                      className={`text-[11px] p-2 rounded-lg border text-left flex items-start gap-1.5 transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#1B4332] text-white border-[#1B4332]'
                          : 'bg-white text-[#33443B] border-[#DDD5C7] hover:bg-[#F2ECE1]'
                      }`}
                    >
                      <span className={`w-3.5 h-3.5 rounded mt-0.5 flex items-center justify-center shrink-0 border ${
                        isSelected ? 'bg-[#E2B13C] border-[#E2B13C] text-[#1B4332]' : 'border-stone-300 bg-white'
                      }`}>
                        {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </span>
                      <span className="line-clamp-2 leading-tight">{staple}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#143527] mb-1">
                  Delivery Destination / Town *
                </label>
                <input
                  type="text"
                  required
                  value={formData.deliveryLocation}
                  onChange={(e) => setFormData({ ...formData, deliveryLocation: e.target.value })}
                  placeholder="e.g. Ile-Ife / Osun State"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#D5CCBE] bg-[#FDFBF7] text-[#143527] focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#143527] mb-1">
                  Target Delivery Date
                </label>
                <input
                  type="date"
                  value={formData.preferredDeliveryDate}
                  onChange={(e) => setFormData({ ...formData, preferredDeliveryDate: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#D5CCBE] bg-[#FDFBF7] text-[#143527] focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
                />
              </div>
            </div>

            {/* Custom Branding Checkbox */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="brandingReq"
                checked={formData.customBrandingRequired}
                onChange={(e) => setFormData({ ...formData, customBrandingRequired: e.target.checked })}
                className="w-4 h-4 rounded text-[#1B4332] accent-[#1B4332]"
              />
              <label htmlFor="brandingReq" className="text-xs text-[#2A3B32] font-medium cursor-pointer">
                I need custom branded labels, ribbons, or celebrant stickers on the packages
              </label>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#143527] mb-1">
                Additional Notes & Instructions
              </label>
              <textarea
                rows={2}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Mention any specific items to prioritize or exclude..."
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#D5CCBE] bg-[#FDFBF7] text-[#143527] focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-[#0A1E14] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Send Custom Package Request to WhatsApp</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
