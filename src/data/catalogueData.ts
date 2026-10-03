import { CatalogueProduct, ProductCategory } from '../types/catalogue';

export const CATALOGUE_CATEGORIES: { id: ProductCategory; label: string; count?: number }[] = [
  { id: 'all', label: 'All Food Catalogue' },
  { id: 'foodstuff', label: 'Foodstuff & Flours' },
  { id: 'foodstuff-boxes', label: 'Foodstuff Boxes' },
  { id: 'food-packages', label: 'Food Packages' },
  { id: 'event-packages', label: 'Event Packages' },
  { id: 'seasonal-packages', label: 'Seasonal Packages' },
  { id: 'snacks', label: 'Snacks & Mixes' },
];

export const CATALOGUE_PRODUCTS: CatalogueProduct[] = [
  // 1. BEANS FLOUR (Exact Official Price List & Genuine Food Image)
  {
    id: 'pgfv-beans-flour',
    name: 'PGFV Pure Peeled Beans Flour',
    category: 'foodstuff',
    categoryLabel: 'Flours & Mixes',
    description: '100% pure, stoneless, peeled brown beans milled hygienically. Eliminates soaking and grinding stress for instant silky-smooth akara, fluffy moi-moi, and gbegiri soup.',
    detailedSpecs: [
      '100% stone-free, grit-free pure peeled brown beans',
      'No chemical additives, preservatives, or artificial starch fillers',
      'Triple-sifted fine-mesh flour for effortless lump-free mixing',
      'Sealed in moisture-proof, tamper-evident food pouch'
    ],
    // Authentic photo of Beans Flour pouch labeled "Beans Flour"
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1791028667/1000335105_pclfl3.jpg',
    sizes: [
      { id: 'bf-500g', label: '500g Pack', price: 2300, priceDisplay: '₦2,300' },
      { id: 'bf-1kg', label: '1kg Pack', price: 4500, priceDisplay: '₦4,500' },
      { id: 'bf-2kg', label: '2kg Pack', price: 8500, priceDisplay: '₦8,500', note: 'More Available on request.' },
      { id: 'bf-bulk', label: 'Bulk Commercial Carton', priceDisplay: 'Request Price', note: 'Custom volume available on request' }
    ],
    defaultSizeIndex: 0,
    availability: 'in-stock',
    availabilityLabel: 'In Stock',
    tag: 'Official Price List',
    pricingType: 'fixed',
    featured: true
  },

  // 2. PUFF PUFF MIX (Exact Official Price List & Food Item Image)
  {
    id: 'pgfv-puff-puff-mix',
    name: 'PGFV Signature Puff Puff Mix',
    category: 'snacks',
    categoryLabel: 'Snacks & Mixes',
    description: 'Convenient, professionally pre-measured puff puff flour blend with gentle aromatic sweetness and balanced raising agents for golden, fluffy street-style pastries in minutes.',
    detailedSpecs: [
      'Just add warm water, rest, and fry to golden perfection',
      'Consistent golden crust and airy, soft interior every batch',
      'Ideal for home treats, student hangouts, caterers, and events',
      'Airtight protective inner packaging'
    ],
    // Authentic food packaging showing Puff Puff Mix & baking provisions
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1791028665/1000335100_jslgzj.jpg',
    sizes: [
      { id: 'ppm-500g', label: '500g Pack', price: 2000, priceDisplay: '₦2,000' },
      { id: 'ppm-1kg', label: '1kg Pack', price: 4000, priceDisplay: '₦4,000' },
      { id: 'ppm-2kg', label: '2kg Pack', price: 7500, priceDisplay: '₦7,500' },
      { id: 'ppm-bulk', label: 'Commercial Sack (10kg+)', priceDisplay: 'Request Price', note: 'For event caterers & pastry vendors' }
    ],
    defaultSizeIndex: 0,
    availability: 'in-stock',
    availabilityLabel: 'In Stock',
    tag: 'Official Price List',
    pricingType: 'fixed',
    featured: true
  },

  // 3. OVEN DRIED CATFISH (Exact Official Price List & Genuine Dried Catfish Photo)
  {
    id: 'pgfv-oven-dried-catfish',
    name: 'PGFV Oven-Dried Catfish',
    category: 'foodstuff',
    categoryLabel: 'Proteins & Seafood',
    description: 'Neatly cleaned, gutted, sand-free, and hygienically smoked oven-dried catfish. Aromatic, rich natural flavour that elevates native soups, stews, and pepper soups.',
    detailedSpecs: [
      'Sand-free, soot-free, and thoroughly gutted before slow drying',
      'Slow oven-dried to preserve natural sweetness and protein integrity',
      'Airtight, insect-proof vacuum food packaging',
      'Long room-temperature shelf life'
    ],
    // Authentic photo of packaged "Dried Cat fish" with whole catfish on plate
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1791028667/1000335106_xzmqgw.jpg',
    sizes: [
      { id: 'cat-std', label: 'Standard Pack', price: 3000, priceDisplay: 'From ₦3,000 upward', note: 'Depends on size and quantity.' },
      { id: 'cat-med', label: 'Medium Pack', price: 6000, priceDisplay: '₦6,000+', note: 'Depends on size and quantity.' },
      { id: 'cat-bulk', label: 'Wholesale / Event Carton', priceDisplay: 'Request Price', note: 'Quoted on batch count & weight' }
    ],
    defaultSizeIndex: 0,
    availability: 'in-stock',
    availabilityLabel: 'In Stock',
    tag: '#3000 upward',
    pricingType: 'starting-from',
    featured: true
  },

  // 4. CUSTARD POWDER (Exact Official Price List & Genuine Custard Photo)
  {
    id: 'pgfv-custard-powder',
    name: 'PGFV Vanilla Flavoured Custard Powder',
    category: 'foodstuff',
    categoryLabel: 'Flours & Breakfast',
    description: 'Smooth, creamy, and fortified rich custard powder for wholesome family breakfasts, decadent desserts, and energizing student morning meals.',
    detailedSpecs: [
      'Stand-up pouch of Precious Gem Vanilla flavoured custard powder (500g)',
      'Lump-free formulation that thickens smoothly in hot water',
      'Enriched with essential vitamins and appetizing aroma',
      'Airtight resealable food pouch'
    ],
    // Authentic photo of "Precious Gem Vanilla flavoured Custard powder" pouch & bowl of custard
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1791028666/1000335102_clf86h.jpg',
    sizes: [
      { id: 'cust-250g', label: '250g Pack', price: 1300, priceDisplay: '₦1,300' },
      { id: 'cust-400g', label: '400g Pack', price: 2000, priceDisplay: '₦2,000' },
      { id: 'cust-family', label: 'Family Bucket (1kg+)', priceDisplay: 'Request Price', note: 'Available on request' }
    ],
    defaultSizeIndex: 0,
    availability: 'in-stock',
    availabilityLabel: 'In Stock',
    tag: 'Official Price List',
    pricingType: 'fixed',
    featured: true
  },

  // 5. HYGIENIC FRESH DRY FISH (Genuine Seafood Food Photo)
  {
    id: 'pgfv-fresh-dry-fish',
    name: 'PGFV Hygienic Fresh Dry Fish',
    category: 'foodstuff',
    categoryLabel: 'Proteins & Seafood',
    description: 'Neatly cleaned, gutted, and hygienically sealed Fresh Dry Fish. Highly aromatic and sand-free, ready to drop straight into egusi, efo riro, or native stews.',
    detailedSpecs: [
      '100% clean and sand-free preparation',
      'Retains sweet natural fish oils and smoky aroma',
      'Vacuum-sealed to prevent pest infestation or mould',
      'Available in retail packs and catering bundles'
    ],
    // Authentic photo of packaged "Fresh Dry Fish"
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1791028668/1000335111_sl8bw2.jpg',
    sizes: [
      { id: 'fdf-std', label: 'Regular Pack', price: 3000, priceDisplay: 'From ₦3,000 upward', note: 'Depends on size and quantity' },
      { id: 'fdf-med', label: 'Family Pack', priceDisplay: 'Request Price', note: 'Depends on size and quantity' },
      { id: 'fdf-bulk', label: 'Wholesale Bundle', priceDisplay: 'Request Price' }
    ],
    defaultSizeIndex: 0,
    availability: 'in-stock',
    availabilityLabel: 'In Stock',
    tag: 'Fresh Dry Seafood',
    pricingType: 'starting-from',
    featured: true
  },

  // 6. PREMIUM PARBOILED RICE (Genuine PGFV Rice Food Photo)
  {
    id: 'pgfv-premium-rice',
    name: 'PGFV Premium Parboiled Rice',
    category: 'foodstuff',
    categoryLabel: 'Grains & Staple Food',
    description: 'Stoneless, cleanly bagged long-grain parboiled rice branded by Precious Gem Food Ventures. Cooks firm, non-sticky, and fluffy for classic Nigerian party jollof and fried rice.',
    detailedSpecs: [
      'Machine-destoned sorted long grains with minimal broken fraction',
      'Clean food-grade packaging from Precious Gem Food Ventures',
      'Cooks fluffy, non-soggy, and expands nicely in volume',
      'Available from single retail congo up to 50kg bags'
    ],
    // Authentic photo of Precious Gem Food Ventures Rice packaging
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1791028667/1000335104_b8g1hi.jpg',
    sizes: [
      { id: 'rice-congo', label: '1 Congo', priceDisplay: 'Request Price' },
      { id: 'rice-5kg', label: '5kg Bag', priceDisplay: 'Request Price' },
      { id: 'rice-10kg', label: '10kg Bag', priceDisplay: 'Request Price' },
      { id: 'rice-25kg', label: 'Half Bag (25kg)', priceDisplay: 'Request Price' },
      { id: 'rice-50kg', label: 'Full Bag (50kg)', priceDisplay: 'Request Price' }
    ],
    defaultSizeIndex: 0,
    availability: 'in-stock',
    availabilityLabel: 'In Stock',
    tag: '100% Stoneless Grains',
    pricingType: 'request-price',
    featured: true
  },

  // 7. CRISP DRINKING & EBA GARRI IJEBU (Genuine Garri Food Photo)
  {
    id: 'pgfv-garri-ijebu',
    name: 'Crisp Drinking & Eba Garri Ijebu',
    category: 'foodstuff',
    categoryLabel: 'Grains & Staple Food',
    description: 'Authentic Garri Ijebu (Cassava flakes) properly fermented, finely roasted, and free from sand or grit. Perfect for refreshing icy water drinking or making firm eba.',
    detailedSpecs: [
      'Packaged Garri Ijebu (Cassava flakes) with delicious pleasant tang',
      'Zero sand or residue at the bottom of your cup guarantee',
      'Dry, crispy texture that stays fresh and crunchy',
      'Clean food-grade heat-sealed bags'
    ],
    // Authentic photo of "Garri Ijebu (Cassava flakes)" package
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1791028667/1000335103_b3vmzj.jpg',
    sizes: [
      { id: 'garri-congo', label: '1 Congo', priceDisplay: 'Request Price' },
      { id: 'garri-rubber', label: 'Paint Rubber (approx 4kg)', priceDisplay: 'Request Price' },
      { id: 'garri-bag', label: '50kg Commercial Sack', priceDisplay: 'Request Price' }
    ],
    defaultSizeIndex: 0,
    availability: 'in-stock',
    availabilityLabel: 'In Stock',
    tag: 'Grit-Free & Extra Crispy',
    pricingType: 'request-price'
  },

  // 8. HOUSEHOLD FOODSTUFF ESSENTIAL BOX (Genuine Provisions Box Photo)
  {
    id: 'pgfv-household-box',
    name: 'PGFV Household Foodstuff Essential Box',
    category: 'foodstuff-boxes',
    categoryLabel: 'Foodstuff Boxes',
    description: 'A comprehensive provisions basket containing staple parboiled rice, Garri Ijebu, puff puff mix, Nasco cornflakes, King’s vegetable oil, Indomie noodles, and Three Crowns milk.',
    detailedSpecs: [
      'Full assortment of essential household cooking provisions in one package',
      'Eliminates market hassle, price surges, and multiple transportation trips',
      'Customizable to your family cooking preferences and dietary needs',
      'Neatly packaged in durable cartons or baskets for doorstep delivery'
    ],
    // Authentic photo of assorted household food provisions and groceries
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1791028665/1000335099_rbutlc.jpg',
    sizes: [
      { id: 'box-mini', label: 'Starter Family Box', priceDisplay: 'Request Price', note: 'For 1–2 individuals' },
      { id: 'box-std', label: 'Standard Household Box', priceDisplay: 'Request Price', note: 'For families of 3–5' },
      { id: 'box-mega', label: 'Mega Sustenance Box', priceDisplay: 'Request Price', note: 'For large households' }
    ],
    defaultSizeIndex: 0,
    availability: 'available-to-order',
    availabilityLabel: 'Available to Order',
    tag: 'Family Essential Basket',
    pricingType: 'request-price',
    featured: true
  },

  // 9. STUDENT SEMESTER FOOD PACKAGE (Genuine Student Care Pack Photo)
  {
    id: 'pgfv-student-package-box',
    name: 'Student Semester Food Package',
    category: 'food-packages',
    categoryLabel: 'Food Packages',
    description: 'Affordable, easy-cooking student food bundles containing Honey Beans, Three Crowns milk, Titus fish, Nasco cornflakes, flours, and staple foodstuffs for campus life.',
    detailedSpecs: [
      'Preset tiers: ₦6,000 Starter, ₦10,000 Sustenance, ₦15,000 Mega Care Pack',
      'Custom budget flexibility (e.g. ₦8,000, ₦12,500) adapted to allowance',
      'Doorstep delivery directly to hostels across Ile-Ife campuses (OAU and surroundings)',
      'Provides balanced carbohydrates, proteins, and breakfast fuel for test/exam periods'
    ],
    // Authentic photo of student food package with Honey Beans, milk, fish, cornflakes
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1791028665/1000335101_tqfagd.jpg',
    sizes: [
      { id: 'sp-6000', label: 'Campus Starter (₦6,000)', price: 6000, priceDisplay: '₦6,000' },
      { id: 'sp-10000', label: 'Semester Sustenance (₦10,000)', price: 10000, priceDisplay: '₦10,000' },
      { id: 'sp-15000', label: 'Mega Care Pack (₦15,000)', price: 15000, priceDisplay: '₦15,000' },
      { id: 'sp-custom', label: 'Custom Student Budget', priceDisplay: 'Make an Enquiry', note: 'Input your exact budget' }
    ],
    defaultSizeIndex: 0,
    availability: 'in-stock',
    availabilityLabel: 'In Stock',
    tag: 'Campus Hostel Delivery',
    pricingType: 'starting-from',
    featured: true
  },

  // 10. CELEBRATION FOOD SOUVENIR & GIFT PACKAGE (Genuine Food Souvenirs Photo)
  {
    id: 'pgfv-event-souvenir-pack',
    name: 'Celebration Food Souvenir & Gift Package',
    category: 'event-packages',
    categoryLabel: 'Event Packages',
    description: 'Aesthetic, high-utility food gift bags containing dry foodstuffs, signature flours, and gourmet treats tailored for weddings, birthdays, and celebrations.',
    detailedSpecs: [
      'Personalized greeting stickers and celebratory ribbon branding',
      'High-utility foodstuffs that guests eagerly cook and enjoy at home',
      'Available in neat jute bags, clear gift pouches, or boxes',
      'Tiered to match your exact per-guest souvenir budget'
    ],
    // Authentic photo of food gift souvenir packages containing assorted snacks
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1791028643/1000335093_cavnkr.jpg',
    sizes: [
      { id: 'ev-50', label: 'Batch of 50 Guests', priceDisplay: 'Request Price' },
      { id: 'ev-100', label: 'Batch of 100 Guests', priceDisplay: 'Request Price' },
      { id: 'ev-250', label: 'Batch of 250+ Guests', priceDisplay: 'Request Price' },
      { id: 'ev-custom', label: 'Custom Event Quantity', priceDisplay: 'Make an Enquiry' }
    ],
    defaultSizeIndex: 0,
    availability: 'available-to-order',
    availabilityLabel: 'Available to Order',
    tag: 'Useful Event Gifting',
    pricingType: 'request-price'
  },

  // 11. EVENT SMALL CHOPS & GOURMET SNACK PACKS (Genuine Small Chops Takeout Photo)
  {
    id: 'pgfv-party-snacks-pack',
    name: 'Event Small Chops & Gourmet Snack Packs',
    category: 'snacks',
    categoryLabel: 'Snacks & Mixes',
    description: 'Freshly prepared event snack boxes featuring hot golden puff puff, crunchy samosas, spring rolls, and peppered bites cleanly packed for meetings, hangouts, and parties.',
    detailedSpecs: [
      'Foil takeout containers packed with assorted finger foods and small chops',
      'Prepared fresh on the morning of your event for peak crispness',
      'Drink options available: Chapman, mocktails, fruit juice (where available)',
      'Timed punctual delivery directly to your venue in Ile-Ife'
    ],
    // Authentic photo of foil takeout containers packed with assorted finger foods and small chops
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1791028664/1000335095_rmxsk4.jpg',
    sizes: [
      { id: 'snk-mini', label: 'Mini Snack Box (per person)', priceDisplay: 'Request Price' },
      { id: 'snk-std', label: 'Standard Snack Pack (per person)', priceDisplay: 'Request Price' },
      { id: 'snk-prem', label: 'Premium Chops & Drinks Box', priceDisplay: 'Request Price' }
    ],
    defaultSizeIndex: 0,
    availability: 'where-available',
    availabilityLabel: 'Where Available',
    tag: 'Fresh To Order',
    pricingType: 'request-price'
  },

  // 12. EVENT & HANGOUT MEAL PACK (Genuine Takeaway Food Pack Photo)
  {
    id: 'pgfv-hangout-meal-pack',
    name: 'Event & Hangout Meal & Snack Packs',
    category: 'seasonal-packages',
    categoryLabel: 'Seasonal & Event Packs',
    description: 'Convenient, hygienically portioned event meal and snack boxes in sealed aluminum containers with custom branding labels for gatherings, seminars, and hangouts.',
    detailedSpecs: [
      'Aluminum takeaway food containers with custom event seal labels',
      'Hygienic, spill-proof packaging ready for immediate serving',
      'Suitable for campus picnics, youth fellowships, and corporate seminars',
      'Bulk batch discounts available'
    ],
    // Authentic photo of aluminum takeaway containers with "The Luminous Hangout" label
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1791028643/1000335094_cndfrx.jpg',
    sizes: [
      { id: 'hng-individual', label: 'Individual Takeaway Pack', priceDisplay: 'Request Price' },
      { id: 'hng-group', label: 'Group Batch (20–50 packs)', priceDisplay: 'Request Price' },
      { id: 'hng-large', label: 'Large Gathering (100+ packs)', priceDisplay: 'Request Price' }
    ],
    defaultSizeIndex: 0,
    availability: 'available-to-order',
    availabilityLabel: 'Available to Order',
    tag: 'Event Ready Packs',
    pricingType: 'request-price'
  },

  // 13. PGFV PURE PEELED BEANS FLOUR (Sealed Pouch Pack Edition)
  {
    id: 'pgfv-beans-flour-pouch',
    name: 'PGFV Pure Peeled Beans Flour (Pouch Pack)',
    category: 'foodstuff',
    categoryLabel: 'Flours & Mixes',
    description: '100% pure peeled beans flour sealed in airtight retail pouches. Eliminates soaking and peeling hassle for fluffy akara and smooth moi-moi in minutes.',
    detailedSpecs: [
      'Stone-free, pure washed brown beans milled under strict hygiene',
      'Fine-mesh flour formulation for quick hydration and smooth batter',
      'Ideal for hostel cooking, working professionals, and fast family meals',
      'Sealed in moisture-proof stand-up pouches'
    ],
    // Authentic photo of Beans Flour packaging
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1791028665/1000335098_vaje9l.jpg',
    sizes: [
      { id: 'bfp-500g', label: '500g Pack', price: 2300, priceDisplay: '₦2,300' },
      { id: 'bfp-1kg', label: '1kg Pack', price: 4500, priceDisplay: '₦4,500' },
      { id: 'bfp-2kg', label: '2kg Pack', price: 8500, priceDisplay: '₦8,500', note: 'More Available on request.' }
    ],
    defaultSizeIndex: 0,
    availability: 'in-stock',
    availabilityLabel: 'In Stock',
    tag: 'Official Price List',
    pricingType: 'fixed'
  }
];
