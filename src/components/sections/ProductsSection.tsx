import { useState } from 'react';
import { Search, ShoppingBag, MessageSquare, Info, ArrowRight, Tag } from 'lucide-react';
import { PRODUCTS } from '../../data/mockData';
import { Product } from '../../types';
import { createWhatsAppUrl, optimizeCloudinary } from '../../utils/helpers';

interface ProductsSectionProps {
  onEnquireProduct: (product: Product) => void;
  onNavigateToCatalogue?: () => void;
}

export function ProductsSection({ onEnquireProduct, onNavigateToCatalogue }: ProductsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'ALL',
    'FLOUR & MIXES',
    'GRAINS & FOODSTUFF',
    'PROTEINS',
    'SNACKS',
    'DRINKS',
    'OTHER'
  ];

  const filteredProducts = PRODUCTS.filter((item) => {
    const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleQuickWhatsApp = (productName: string, priceDisplay?: string) => {
    const priceText = priceDisplay ? ` (Price: ${priceDisplay})` : '';
    const text = `Hello Precious Gem Foods Ventures, I would like to enquire about the price and availability of ${productName}${priceText}.`;
    window.open(createWhatsAppUrl(text), '_blank');
  };

  return (
    <section id="products-section" className="py-16 sm:py-24 bg-[#FDFBF7] border-b border-[#E8E2D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C68A1B] block mb-2">
              HYGIENICALLY PROCESSED & PACKAGED
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-[#143527]">
              OUR FEATURED FOOD PRODUCTS
            </h2>
            <p className="text-sm sm:text-base text-[#56655D] mt-2">
              Cleanly sorted staples, ready-to-use flour mixes, dried proteins, and wholesome foodstuffs prepared with strict hygiene.
            </p>
          </div>

          {/* Search bar & Catalogue Link */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {onNavigateToCatalogue && (
              <button
                type="button"
                onClick={onNavigateToCatalogue}
                className="px-4 py-2.5 rounded-xl bg-[#1B4332] hover:bg-[#143527] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-all whitespace-nowrap cursor-pointer"
              >
                <span>Full Product Catalogue</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#E2B13C]" />
              </button>
            )}

            <div className="w-full sm:w-64 relative">
              <Search className="w-4 h-4 text-[#7B8B82] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#D5CCBE] bg-white text-xs sm:text-sm text-[#143527] focus:outline-none focus:border-[#1B4332] shadow-xs"
              />
            </div>
          </div>
        </div>

        {/* Price List Spotlight Banner */}
        <div className="mb-8 p-4 rounded-2xl bg-[#FAF5EC] border border-[#E2DDD3] flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-[#143527]">
          <div className="flex items-start sm:items-center gap-2">
            <Tag className="w-4 h-4 text-[#C68A1B] shrink-0 mt-0.5 sm:mt-0" />
            <span className="font-medium">
              <strong>Official Price List:</strong> Beans Flour (₦2,300/500g, ₦4,500/1kg, ₦8,500/2kg) • Puff Puff Mix (₦2,000/500g, ₦4,000/1kg, ₦7,500/2kg) • Custard Powder (₦1,300/250g, ₦2,000/400g) • Oven-Dried Catfish (From ₦3,000 upward). Unpriced items quoted on market rates.
            </span>
          </div>
          {onNavigateToCatalogue && (
            <button
              onClick={onNavigateToCatalogue}
              className="text-xs font-bold text-[#1B4332] hover:underline flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <span>Explore Catalogue</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#E2B13C]" />
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#1B4332] text-white shadow-xs'
                  : 'bg-white text-[#4A554F] border border-[#E0D8CB] hover:bg-[#F3EFE6]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-[#E8E2D5] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Image Frame */}
                <div className="relative h-48 sm:h-52 bg-[#F3EFE6] overflow-hidden">
                  <img
                    src={optimizeCloudinary(product.image, 500)}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    width={380}
                    height={208}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#1B4332]/90 text-white backdrop-blur-xs">
                      {product.category}
                    </span>
                  </div>
                  {product.tag && (
                    <div className="absolute bottom-3 right-3">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-[#E2B13C] text-[#122A20] shadow-xs">
                        {product.tag}
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Content */}
                <div className="p-5">
                  <h3 className="font-heading font-bold text-base sm:text-lg text-[#143527] mb-1">
                    {product.name}
                  </h3>

                  {/* Price display badge */}
                  <div className="mb-2">
                    <span className="text-xs font-bold text-[#1B4332] bg-[#FAF5EC] px-2 py-0.5 rounded-md border border-[#E2DDD3] inline-block">
                      {product.priceDisplay || 'Request Price'}
                    </span>
                  </div>

                  <p className="text-xs text-[#5C6A63] leading-relaxed line-clamp-2 mb-3">
                    {product.description}
                  </p>

                  {product.sizesDisplay && (
                    <div className="text-[11px] text-[#697A71] mb-2">
                      <span className="font-semibold text-[#143527]">Options:</span> {product.sizesDisplay}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                <button
                  onClick={() => onEnquireProduct(product)}
                  className="w-full py-2 px-3 rounded-xl bg-[#1B4332] hover:bg-[#143527] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-[#E2B13C]" />
                  <span>{product.priceDisplay && !product.priceDisplay.includes('Request') ? 'Enquire / Order' : 'Make an Enquiry'}</span>
                </button>

                <button
                  onClick={() => handleQuickWhatsApp(product.name, product.priceDisplay)}
                  className="w-full py-2 px-2.5 rounded-xl border border-[#25D366] text-[#14833c] hover:bg-[#25D366]/10 text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                  title="Enquire on WhatsApp"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="p-12 text-center bg-white rounded-2xl border border-[#E8E2D5]">
            <p className="text-sm text-[#66756D]">No products found matching your search.</p>
            <button
              onClick={() => { setSelectedCategory('ALL'); setSearchQuery(''); }}
              className="mt-3 text-xs font-bold text-[#1B4332] underline"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
