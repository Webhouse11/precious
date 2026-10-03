import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, MessageCircle, Send, Plus, Minus, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { CartItem } from '../../types/catalogue';
import { createWhatsAppUrl, PGFV_WHATSAPP_PHONE, PGFV_WHATSAPP_DISPLAY, optimizeCloudinary } from '../../utils/helpers';
import { BUSINESS_INFO } from '../../data/mockData';

interface CatalogueOrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
}

export const CatalogueOrderDrawer: React.FC<CatalogueOrderDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [deliveryLocation, setDeliveryLocation] = useState<string>('');
  const [additionalNotes, setAdditionalNotes] = useState<string>('');

  if (!isOpen) return null;

  // Calculate priced items total
  const calculatedTotal = items.reduce((acc, item) => {
    if (typeof item.subtotal === 'number') {
      return acc + item.subtotal;
    }
    return acc;
  }, 0);

  const hasPricedItems = items.some(i => typeof i.subtotal === 'number');
  const hasUnpricedItems = items.some(i => typeof i.subtotal !== 'number');

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;

    let message = `Hello Precious Gem Foods Ventures (PGFV),\n\n`;
    message += `I would like to place an order / price enquiry from your Product Catalogue.\n\n`;

    if (customerName) message += `Customer Name: ${customerName}\n`;
    if (customerPhone) message += `Phone / WhatsApp: ${customerPhone}\n`;
    if (deliveryLocation) message += `Delivery Location / Town: ${deliveryLocation}\n`;
    message += `\n*SELECTED PRODUCTS & PACKAGES:*\n`;

    items.forEach((item, idx) => {
      const pricePart = typeof item.subtotal === 'number' 
        ? `— ₦${item.subtotal.toLocaleString()} (₦${item.selectedSize.price?.toLocaleString()} each)` 
        : `— [Request Price]`;
      message += `${idx + 1}. ${item.name} (${item.selectedSize.label}) x ${item.quantity} ${pricePart}\n`;
    });

    if (calculatedTotal > 0) {
      message += `\n*Known Items Subtotal:* ₦${calculatedTotal.toLocaleString()}\n`;
    }
    if (hasUnpricedItems) {
      message += `*Note:* Items marked [Request Price] will be quoted based on current batch weight & market rates.\n`;
    }

    if (additionalNotes) {
      message += `\nAdditional Notes / Instructions:\n${additionalNotes}\n`;
    }

    message += `\nPlease confirm total pricing, availability, and delivery timeline. Thank you!`;

    window.open(createWhatsAppUrl(message, PGFV_WHATSAPP_PHONE), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-lg bg-[#FDFBF7] h-full shadow-2xl flex flex-col justify-between border-l border-[#E2DDD3] z-10">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 bg-white border-b border-[#E8E2D5] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#1B4332] text-[#E2B13C] flex items-center justify-center font-bold">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-base sm:text-lg text-[#143527]">
                Enquiry & Order Basket
              </h3>
              <p className="text-xs text-[#6B7B73]">
                {items.length} {items.length === 1 ? 'item' : 'items'} selected
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                type="button"
                onClick={onClearCart}
                className="text-[11px] font-bold text-red-600 hover:text-red-700 hover:underline px-2 py-1"
                title="Clear all items"
              >
                Clear All
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-[#52635B] hover:bg-[#F3EFE6] transition-colors"
              aria-label="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 custom-scrollbar">
          {items.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#FAF5EC] border border-[#E8E1D5] flex items-center justify-center mx-auto text-[#C68A1B]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-heading font-bold text-base text-[#143527]">
                Your enquiry basket is empty
              </h4>
              <p className="text-xs text-[#62736A] max-w-xs mx-auto leading-relaxed">
                Browse our product catalogue and click <strong>"Add to Enquiry / Order"</strong> on any foodstuff, package, or snack to assemble your list.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-2 px-5 py-2.5 rounded-xl bg-[#1B4332] text-white text-xs font-bold shadow-xs hover:bg-[#143527] transition-colors"
              >
                Browse Catalogue
              </button>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C68A1B] block">
                  SELECTED PRODUCTS ({items.length})
                </span>

                {items.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-white rounded-xl border border-[#E5DDD0] shadow-2xs flex items-center gap-3"
                  >
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#F3EFE6] shrink-0 border border-[#E8E2D5]">
                      <img
                        src={optimizeCloudinary(item.image, 120)}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-heading font-bold text-xs sm:text-sm text-[#143527] truncate">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-[#697A72]">
                        Option: <strong className="text-[#143527]">{item.selectedSize.label}</strong>
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs font-extrabold text-[#1B4332]">
                          {typeof item.subtotal === 'number' 
                            ? `₦${item.subtotal.toLocaleString()}` 
                            : 'Request Price'}
                        </span>

                        {/* Quantity Buttons */}
                        <div className="flex items-center border border-[#D5CCBE] rounded-md overflow-hidden bg-[#FAF7F2]">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="px-2 py-0.5 text-xs font-bold text-[#143527] hover:bg-[#EFE9DF]"
                          >
                            <Minus className="w-2.5 h-2.5" />
                          </button>
                          <span className="px-2 text-xs font-mono font-bold text-[#143527]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-0.5 text-xs font-bold text-[#143527] hover:bg-[#EFE9DF]"
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.id)}
                      className="p-1.5 text-stone-400 hover:text-red-600 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Order Form Details */}
              <div className="mt-4 p-4 rounded-2xl bg-white border border-[#E5DDD0] space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1B4332] block">
                  YOUR DELIVERY & CONTACT INFO
                </span>

                <div className="space-y-2.5">
                  <div>
                    <label className="block text-[11px] font-bold text-[#4B5A52] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Mrs. Adeola / Segun"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5CCBE] bg-[#FDFBF7] text-[#143527] focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-[#4B5A52] mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="e.g. 08012345678"
                        className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5CCBE] bg-[#FDFBF7] text-[#143527] focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-[#4B5A52] mb-1">
                        Delivery Town / Location *
                      </label>
                      <input
                        type="text"
                        value={deliveryLocation}
                        onChange={(e) => setDeliveryLocation(e.target.value)}
                        placeholder="e.g. Ile-Ife, Osogbo, Ibadan..."
                        className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5CCBE] bg-[#FDFBF7] text-[#143527] focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#4B5A52] mb-1">
                      Additional Notes / Custom Sizing (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                      placeholder="Any specific requests, delivery date or packaging instructions..."
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5CCBE] bg-[#FDFBF7] text-[#143527] focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer / Submit Action */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 bg-white border-t border-[#E8E2D5] space-y-3">
            {calculatedTotal > 0 && (
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="font-medium text-[#62736A]">Known Fixed Subtotal:</span>
                <span className="font-heading font-extrabold text-[#143527] text-base">
                  ₦{calculatedTotal.toLocaleString()}
                </span>
              </div>
            )}

            {hasUnpricedItems && (
              <div className="p-2.5 rounded-lg bg-[#FAF5EC] border border-[#E8E1D5] text-[11px] text-[#786450] leading-tight">
                * Note: Unpriced items will be quoted accurately on WhatsApp based on batch weight & current wholesale rates.
              </div>
            )}

            <button
              type="button"
              onClick={handleWhatsAppCheckout}
              className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-[#0A1E14] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Send Order to WhatsApp ({PGFV_WHATSAPP_DISPLAY})</span>
            </button>
            <p className="text-[10px] text-center text-[#7F8F87]">
              Pre-populated instant enquiry • Fast response directly from PGFV Ile-Ife
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
