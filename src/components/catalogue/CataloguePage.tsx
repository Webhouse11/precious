import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ShoppingBag, 
  Building2, 
  PackagePlus, 
  Sparkles, 
  ArrowRight, 
  MessageCircle, 
  Phone, 
  ShieldCheck, 
  Check, 
  Tag,
  ChevronRight,
  Info
} from 'lucide-react';
import { CATALOGUE_CATEGORIES, CATALOGUE_PRODUCTS } from '../../data/catalogueData';
import { CatalogueProduct, ProductCategory, ProductSizeOption, CartItem } from '../../types/catalogue';
import { ProductCard } from './ProductCard';
import { CatalogueOrderDrawer } from './CatalogueOrderDrawer';
import { BulkOrderModal } from './BulkOrderModal';
import { CustomPackageModal } from './CustomPackageModal';
import { createWhatsAppUrl, PGFV_WHATSAPP_PHONE, PGFV_WHATSAPP_DISPLAY } from '../../utils/helpers';
import { BUSINESS_INFO } from '../../data/mockData';

interface CataloguePageProps {
  onNavigateHome?: () => void;
  onNavigateToServices?: () => void;
  onNavigateToEvents?: () => void;
}

export const CataloguePage: React.FC<CataloguePageProps> = ({
  onNavigateHome,
  onNavigateToServices,
  onNavigateToEvents
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState<boolean>(false);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState<boolean>(false);

  // Filter products
  const filteredProducts = useMemo(() => {
    return CATALOGUE_PRODUCTS.filter((product) => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = searchQuery.trim() === '' || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Handle adding product to cart
  const handleAddToCart = (product: CatalogueProduct, selectedSize: ProductSizeOption, quantity: number) => {
    const cartItemId = `${product.id}-${selectedSize.id}`;
    
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          subtotal: typeof selectedSize.price === 'number' ? selectedSize.price * newQty : undefined
        };
        return updated;
      } else {
        const newItem: CartItem = {
          id: cartItemId,
          productId: product.id,
          name: product.name,
          image: product.image,
          category: product.categoryLabel,
          selectedSize: selectedSize,
          quantity: quantity,
          subtotal: typeof selectedSize.price === 'number' ? selectedSize.price * quantity : undefined,
          priceDisplay: selectedSize.priceDisplay || (typeof selectedSize.price === 'number' ? `₦${selectedSize.price.toLocaleString()}` : 'Request Price')
        };
        return [...prevItems, newItem];
      }
    });

    setIsDrawerOpen(true);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    setCartItems((prev) => 
      prev.map((item) => {
        if (item.id === cartItemId) {
          return {
            ...item,
            quantity: newQty,
            subtotal: typeof item.selectedSize.price === 'number' ? item.selectedSize.price * newQty : undefined
          };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleDirectEnquire = (product: CatalogueProduct, selectedSize: ProductSizeOption) => {
    let msg = `Hello Precious Gem Foods Ventures,\n\n`;
    msg += `I would like to enquire about: *${product.name}*\n`;
    msg += `Selected Size: ${selectedSize.label}\n`;
    if (selectedSize.priceDisplay) {
      msg += `Pricing Noted: ${selectedSize.priceDisplay}\n`;
    } else if (typeof selectedSize.price === 'number') {
      msg += `Price: ₦${selectedSize.price.toLocaleString()}\n`;
    } else {
      msg += `Pricing Request: Please provide current wholesale/retail price quote.\n`;
    }
    msg += `\nPlease confirm availability and delivery timeframe. Thank you!`;

    window.open(createWhatsAppUrl(msg, PGFV_WHATSAPP_PHONE), '_blank', 'noopener,noreferrer');
  };

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1E2320]">
      
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-b from-[#FAF5EC] to-[#FDFBF7] border-b border-[#E8E2D5] pt-12 pb-14 sm:pt-16 sm:pb-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-[#7A8A81] mb-6">
            <button 
              onClick={onNavigateHome}
              className="hover:text-[#1B4332] transition-colors"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#143527] font-semibold">Product & Package Catalogue</span>
          </div>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B4332]/10 border border-[#1B4332]/20 text-[#1B4332] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#C68A1B]" />
              <span>OFFICIAL PRODUCT CATALOGUE • SEPARATE ENQUIRY & ORDER SYSTEM</span>
            </div>

            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#143527] tracking-tight">
              Foodstuff & Package Catalogue
            </h1>

            <p className="text-sm sm:text-base text-[#52635B] leading-relaxed">
              Explore our hygienically processed foodstuffs, staple flours, carefully assembled food boxes, event packages, and gourmet snacks. Select options to build your customized enquiry or order directly with full transparency.
            </p>

            {/* Official Price List Notice */}
            <div className="p-4 rounded-2xl bg-white border border-[#E3DCD0] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-[#1B4332]">
                <Tag className="w-4 h-4 text-[#C68A1B] shrink-0" />
                <span className="font-bold">
                  Fixed Price Transparency: Beans Flour (₦2,300/500g, ₦4,500/1kg, ₦8,500/2kg) • Puff Puff Mix (₦2,000/500g, ₦4,000/1kg, ₦7,500/2kg) • Custard (₦1,300/250g, ₦2,000/400g) • Catfish (From ₦3,000 upward).
                </span>
              </div>
              <span className="text-[11px] text-[#786450] italic shrink-0">
                * Unpriced staples quoted on current market rates.
              </span>
            </div>

            {/* Two Action Buttons: Bulk Order Enquiry & Custom Package Request */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsBulkModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-[#1B4332] hover:bg-[#143527] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs transition-all cursor-pointer"
              >
                <Building2 className="w-4 h-4 text-[#E2B13C]" />
                <span>Bulk Order Enquiry</span>
              </button>

              <button
                type="button"
                onClick={() => setIsCustomModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-[#FAF5EC] hover:bg-[#EFE9DF] text-[#1B4332] border border-[#D5CCBE] text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer"
              >
                <PackagePlus className="w-4 h-4 text-[#C68A1B]" />
                <span>Custom Package Request</span>
              </button>

              {onNavigateToEvents && (
                <button
                  type="button"
                  onClick={onNavigateToEvents}
                  className="px-5 py-2.5 rounded-xl bg-white hover:bg-[#FAF7F2] text-[#143527] border border-[#E3DCD0] text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Event & Snack Packages</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C68A1B]" />
                </button>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* 2. Main Catalogue Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        
        {/* Search & Filter Toolbar */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#7A8A81] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search foodstuffs, packages, mixes or snacks..."
                className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#D5CCBE] bg-white text-[#143527] placeholder-[#8A9A91] focus:outline-none focus:ring-2 focus:ring-[#1B4332]/30 shadow-2xs"
              />
            </div>

            {/* Quick Status / Basket Trigger */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsDrawerOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-[#1B4332] text-white text-xs font-bold flex items-center gap-2 shadow-xs hover:bg-[#143527] transition-all cursor-pointer relative"
              >
                <ShoppingBag className="w-4 h-4 text-[#E2B13C]" />
                <span>Enquiry Basket</span>
                {totalCartCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-[#E2B13C] text-[#143527] text-[10px] font-extrabold flex items-center justify-center">
                    {totalCartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Category Tabs Scroll */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar border-b border-[#EAE3D6] pt-1">
            {CATALOGUE_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#1B4332] text-white shadow-xs'
                      : 'bg-white text-[#4A5A51] border border-[#DDD5C8] hover:bg-[#F2ECE1] hover:text-[#1B4332]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-[#6B7B73] mb-6">
          <span>
            Showing <strong>{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'product' : 'products'}
          </span>
          <span className="text-[11px] text-[#8A9A91]">
            Ile-Ife Doorstep Delivery & Nationwide Logistics
          </span>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-3xl border border-[#E8E2D5] p-8 max-w-md mx-auto space-y-3">
            <Search className="w-10 h-10 text-[#C68A1B] mx-auto" />
            <h3 className="font-heading font-bold text-base text-[#143527]">
              No products found
            </h3>
            <p className="text-xs text-[#52635B]">
              We couldn't find anything matching "{searchQuery}". Try selecting another category tab.
            </p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="px-4 py-2 rounded-xl bg-[#1B4332] text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onDirectEnquire={handleDirectEnquire}
              />
            ))}
          </div>
        )}

        {/* Bottom Banner: Custom Sourcing & Corporate Needs */}
        <div className="mt-16 p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-[#1B4332] to-[#122A20] text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl text-center lg:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E2B13C] block">
              CAN'T FIND AN ITEM OR NEED A CUSTOM BUNDLE?
            </span>
            <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
              We Source & Package Exactly What You Need
            </h3>
            <p className="text-xs sm:text-sm text-[#D3E0D9] leading-relaxed">
              From specialty foodstuffs, bulk yam tubers, unadulterated red oils, to custom event souvenir packs and employee welfare baskets—chat with our procurement team.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full lg:w-auto">
            <button
              type="button"
              onClick={() => setIsCustomModalOpen(true)}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#E2B13C] hover:bg-[#d8a42e] text-[#143527] font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              Custom Package Request
            </button>

            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all text-center"
            >
              Call: {BUSINESS_INFO.phone}
            </a>
          </div>
        </div>

      </div>

      {/* Floating Sticky Cart Trigger (Mobile & Desktop) */}
      {totalCartCount > 0 && (
        <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 animate-in zoom-in-95 duration-200">
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#1B4332] hover:bg-[#143527] text-white font-bold text-xs sm:text-sm shadow-2xl border-2 border-[#E2B13C] cursor-pointer"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-[#E2B13C]" />
              <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#E2B13C] text-[#143527] text-[9px] font-black flex items-center justify-center">
                {totalCartCount}
              </span>
            </div>
            <span>View Enquiry Basket ({totalCartCount})</span>
          </button>
        </div>
      )}

      {/* Modals & Drawers */}
      <CatalogueOrderDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      <BulkOrderModal
        isOpen={isBulkModalOpen}
        onClose={() => setIsBulkModalOpen(false)}
      />

      <CustomPackageModal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
      />

    </div>
  );
};
