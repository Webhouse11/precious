import React, { useState } from 'react';
import { ShoppingBag, Check, Info, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import { CatalogueProduct, ProductSizeOption } from '../../types/catalogue';
import { optimizeCloudinary } from '../../utils/helpers';

interface ProductCardProps {
  product: CatalogueProduct;
  onAddToCart: (product: CatalogueProduct, selectedSize: ProductSizeOption, quantity: number) => void;
  onDirectEnquire?: (product: CatalogueProduct, selectedSize: ProductSizeOption) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onDirectEnquire
}) => {
  const [selectedSizeIndex, setSelectedSizeIndex] = useState<number>(product.defaultSizeIndex ?? 0);
  const [quantity, setQuantity] = useState<number>(1);
  const [addedAnimation, setAddedAnimation] = useState<boolean>(false);

  const currentSize = product.sizes[selectedSizeIndex] || product.sizes[0];
  const hasFixedPrice = typeof currentSize.price === 'number';

  const handleAdd = () => {
    onAddToCart(product, currentSize, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1400);
  };

  const getAvailabilityBadge = () => {
    switch (product.availability) {
      case 'in-stock':
        return {
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          dot: 'bg-emerald-500',
          text: 'In Stock'
        };
      case 'available-to-order':
        return {
          bg: 'bg-blue-50 text-blue-800 border-blue-200',
          dot: 'bg-blue-500',
          text: 'Available to Order'
        };
      case 'where-available':
        return {
          bg: 'bg-amber-50 text-amber-900 border-amber-200',
          dot: 'bg-amber-500',
          text: 'Where Available'
        };
      case 'seasonal':
        return {
          bg: 'bg-purple-50 text-purple-800 border-purple-200',
          dot: 'bg-purple-500',
          text: 'Seasonal'
        };
      default:
        return {
          bg: 'bg-stone-50 text-stone-800 border-stone-200',
          dot: 'bg-stone-400',
          text: product.availabilityLabel || 'Available on Request'
        };
    }
  };

  const avail = getAvailabilityBadge();

  return (
    <div className="bg-white rounded-2xl border border-[#E5DFD5] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
      <div>
        {/* Image Frame */}
        <div className="relative h-52 sm:h-56 bg-[#F5EFE6] overflow-hidden">
          <img
            src={optimizeCloudinary(product.image, 500)}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

          {/* Top Left: Category Tag */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#1B4332]/90 text-white backdrop-blur-xs shadow-xs">
              {product.categoryLabel}
            </span>
            {product.tag && (
              <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#E2B13C] text-[#143527] shadow-xs">
                {product.tag}
              </span>
            )}
          </div>

          {/* Top Right: Availability Badge */}
          <div className="absolute top-3 right-3">
            <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full border shadow-2xs backdrop-blur-md bg-white/90 ${avail.bg}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${avail.dot}`} />
              <span>{avail.text}</span>
            </span>
          </div>

          {/* Image Bottom Bar: Pricing Highlight */}
          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white">
            <span className="text-xs font-semibold drop-shadow-sm truncate">
              {currentSize.label}
            </span>
            <span className="text-xs sm:text-sm font-extrabold px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[#E2B13C] border border-[#E2B13C]/40">
              {currentSize.priceDisplay || (hasFixedPrice ? `₦${currentSize.price?.toLocaleString()}` : 'Request Price')}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-3">
          <h3 className="font-heading font-extrabold text-base sm:text-lg text-[#143527] leading-snug line-clamp-1 group-hover:text-[#1B4332] transition-colors">
            {product.name}
          </h3>

          <p className="text-xs text-[#52635B] leading-relaxed line-clamp-2">
            {product.description}
          </p>

          {/* Size / Quantity Selector */}
          <div className="pt-2">
            <label className="block text-[11px] font-bold text-[#6D7D74] uppercase tracking-wider mb-1.5">
              Select Size / Option:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {product.sizes.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelectedSizeIndex(idx)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border font-semibold transition-all cursor-pointer ${
                    selectedSizeIndex === idx
                      ? 'bg-[#1B4332] text-white border-[#1B4332] shadow-2xs'
                      : 'bg-[#FAF7F2] text-[#33423A] border-[#E2DDD3] hover:border-[#1B4332]/40 hover:bg-white'
                  }`}
                >
                  <span>{s.label}</span>
                </button>
              ))}
            </div>
            {currentSize.note && (
              <p className="text-[10px] text-[#C68A1B] font-medium mt-1.5 flex items-center gap-1">
                <Info className="w-3 h-3 shrink-0" />
                <span>{currentSize.note}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-5 pt-0 space-y-2 border-t border-[#F0EAE0] mt-2">
        {/* Price & Quantity Bar */}
        <div className="flex items-center justify-between pt-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#798880] block">
              Unit Pricing:
            </span>
            <span className="font-heading font-extrabold text-sm sm:text-base text-[#143527]">
              {currentSize.priceDisplay || (hasFixedPrice ? `₦${currentSize.price?.toLocaleString()}` : 'Request Price')}
            </span>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center border border-[#DDD6C9] rounded-lg overflow-hidden bg-[#FAF7F2]">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-2 py-1 text-xs font-bold text-[#143527] hover:bg-[#EFE9DF] transition-colors"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="px-2.5 py-1 text-xs font-bold font-mono text-[#143527]">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="px-2 py-1 text-xs font-bold text-[#143527] hover:bg-[#EFE9DF] transition-colors"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>

        {/* Primary Action Button */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={handleAdd}
            className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs ${
              addedAnimation
                ? 'bg-emerald-600 text-white'
                : 'bg-[#1B4332] hover:bg-[#143527] text-white hover:shadow'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added to Enquiry</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-[#E2B13C]" />
                <span>Add to Enquiry / Order</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => onDirectEnquire && onDirectEnquire(product, currentSize)}
            className="w-full py-2.5 px-3 rounded-xl border border-[#D5CCBE] hover:bg-[#FAF7F2] text-[#143527] text-xs font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer"
          >
            <span>{hasFixedPrice ? 'Make an Enquiry' : 'Request Price'}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C68A1B]" />
          </button>
        </div>
      </div>
    </div>
  );
};
