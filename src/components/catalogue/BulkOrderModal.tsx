import React, { useState } from 'react';
import { X, Building2, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import { createWhatsAppUrl, PGFV_WHATSAPP_PHONE } from '../../utils/helpers';
import { BulkOrderFormState } from '../../types/catalogue';

interface BulkOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BulkOrderModal: React.FC<BulkOrderModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<BulkOrderFormState>({
    fullName: '',
    phone: '',
    email: '',
    organization: '',
    productsRequired: '',
    estimatedVolume: '',
    targetDeliveryDate: '',
    deliveryTown: '',
    budgetEstimate: '',
    notes: ''
  });
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let message = `Hello Precious Gem Foods Ventures (PGFV),\n\n`;
    message += `I would like to submit a *BULK ORDER ENQUIRY*.\n\n`;
    message += `Contact Name: ${formData.fullName}\n`;
    message += `Phone / WhatsApp: ${formData.phone}\n`;
    if (formData.organization) message += `Organization / Business: ${formData.organization}\n`;
    if (formData.email) message += `Email: ${formData.email}\n`;
    message += `\n*Bulk Products Required:* ${formData.productsRequired}\n`;
    message += `*Estimated Volume / Quantity:* ${formData.estimatedVolume}\n`;
    if (formData.targetDeliveryDate) message += `*Target Date:* ${formData.targetDeliveryDate}\n`;
    message += `*Delivery Location:* ${formData.deliveryTown}\n`;
    if (formData.budgetEstimate) message += `*Estimated Budget:* ${formData.budgetEstimate}\n`;
    if (formData.notes) message += `*Special Requirements:* ${formData.notes}\n`;
    message += `\nPlease provide wholesale quotation and processing schedule. Thank you!`;

    window.open(createWhatsAppUrl(message, PGFV_WHATSAPP_PHONE), '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#E8E2D5] overflow-hidden">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#FAF7F2] border-b border-[#E8E1D5] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#1B4332] text-[#E2B13C] flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-lg text-[#143527]">
                Bulk Order Enquiry
              </h3>
              <p className="text-xs text-[#67776F]">
                Wholesale supplies for schools, supermarkets, hotels & caterers
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
              Enquiry Transmitted!
            </h4>
            <p className="text-xs text-[#52635B] leading-relaxed max-w-sm mx-auto">
              Your bulk order request has been directed to our wholesale procurement desk. We will respond promptly with wholesale rates and dispatch schedules.
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
            <div>
              <label className="block text-xs font-bold text-[#143527] mb-1">
                Full Name / Contact Person *
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Alh. Ibrahim / Pastor Dayo"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#D5CCBE] bg-[#FDFBF7] text-[#143527] focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#143527] mb-1">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. 08012345678"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#D5CCBE] bg-[#FDFBF7] text-[#143527] focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#143527] mb-1">
                  Organization / School / Business
                </label>
                <input
                  type="text"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  placeholder="e.g. Great Heights School"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#D5CCBE] bg-[#FDFBF7] text-[#143527] focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#143527] mb-1">
                Products Required *
              </label>
              <input
                type="text"
                required
                value={formData.productsRequired}
                onChange={(e) => setFormData({ ...formData, productsRequired: e.target.value })}
                placeholder="e.g. Beans Flour (100kg), Parboiled Rice (10 bags), Catfish"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#D5CCBE] bg-[#FDFBF7] text-[#143527] focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#143527] mb-1">
                  Estimated Volume / Sacks *
                </label>
                <input
                  type="text"
                  required
                  value={formData.estimatedVolume}
                  onChange={(e) => setFormData({ ...formData, estimatedVolume: e.target.value })}
                  placeholder="e.g. 50 Cartons / 20 Bags"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#D5CCBE] bg-[#FDFBF7] text-[#143527] focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#143527] mb-1">
                  Delivery Destination *
                </label>
                <input
                  type="text"
                  required
                  value={formData.deliveryTown}
                  onChange={(e) => setFormData({ ...formData, deliveryTown: e.target.value })}
                  placeholder="e.g. Ile-Ife, Ibadan, Lagos..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#D5CCBE] bg-[#FDFBF7] text-[#143527] focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#143527] mb-1">
                  Target Delivery Date
                </label>
                <input
                  type="date"
                  value={formData.targetDeliveryDate}
                  onChange={(e) => setFormData({ ...formData, targetDeliveryDate: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#D5CCBE] bg-[#FDFBF7] text-[#143527] focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#143527] mb-1">
                  Estimated Budget (₦)
                </label>
                <input
                  type="text"
                  value={formData.budgetEstimate}
                  onChange={(e) => setFormData({ ...formData, budgetEstimate: e.target.value })}
                  placeholder="e.g. ₦350,000"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#D5CCBE] bg-[#FDFBF7] text-[#143527] focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#143527] mb-1">
                Additional Instructions / Packaging Notes
              </label>
              <textarea
                rows={2}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Custom bag sizes, corporate invoicing or recurring monthly schedule..."
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#D5CCBE] bg-[#FDFBF7] text-[#143527] focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-[#0A1E14] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Submit Bulk Enquiry on WhatsApp</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
