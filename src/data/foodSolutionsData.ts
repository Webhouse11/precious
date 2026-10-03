export interface FoodSolutionCategory {
  id: string;
  number: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  image: string;
  badge: string;
  targetAudience: string[];
  keyBenefits: string[];
  typicalInclusions: string[];
  highlights: string[];
  callToActionText?: string;
  directRoute?: string;
}

export const FOOD_SOLUTIONS_CATEGORIES: FoodSolutionCategory[] = [
  {
    id: 'foodstuff-packages',
    number: '01',
    title: 'Foodstuff & Food Packages',
    shortDescription: 'Foodstuff and carefully assembled food packages for individuals, families and different needs.',
    detailedDescription: 'Precious Gem Foods Ventures (PGFV) provides clean, hygienically sorted, and stone-free staple foodstuffs. From pure peeled beans flour and creamy custard to select parboiled rice, sifted garri, dried proteins, and double-refined cooking oils, our pantry packages take the stress and dirt out of daily cooking.',
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1791028665/1000335096_z0acdh.jpg',
    badge: 'Pantry & Household Essentials',
    targetAudience: ['Individuals', 'Families', 'Schools', 'Hostels', 'Community Groups'],
    keyBenefits: [
      '100% stone-free, dust-free and grit-free staple grains',
      'Hygienically milled flours ready for immediate cooking without grinding stress',
      'Flexible pack sizes tailored for individual, couple, or family budgets',
      'Convenient doorstep delivery in Ile-Ife and coordinated transport across Nigeria'
    ],
    typicalInclusions: [
      'PGFV Pure Peeled Beans Flour (for Akara, Moi-Moi & Gbegiri)',
      'Fortified Custard Powder (Vanilla & Milk Flavour)',
      'Selected Parboiled Long-Grain Rice (Clean & Sand-Free)',
      'Crisp White & Yellow Garri (Drinking & Eba)',
      'Pure Unadulterated Red Palm Oil & Refined Vegetable Oil',
      'Plantain Flour & Traditional Brown Yam Flour (Elubo Amala)',
      'Oven-Dried Catfish Portions & Sun-Dried Ponmo Ijebu'
    ],
    highlights: ['Stone-Free Grains', 'Hygienic Flours', 'Doorstep Delivery']
  },
  {
    id: 'student-packages',
    number: '02',
    title: 'Student Food Packages',
    shortDescription: 'Affordable and convenient food packages designed to support students throughout the semester.',
    detailedDescription: 'Campus life is demanding, and cooking shouldn’t be stressful. PGFV crafts budget-friendly, quick-prep foodstuff bundles specially portioned for university, polytechnic, and college students living in halls of residence or off-campus apartments.',
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1791028665/1000335098_vaje9l.jpg',
    badge: 'Campus & Hostel Solutions',
    targetAudience: ['University Undergraduates', 'Polytechnic Students', 'Colleges of Education', 'Hostel Roommates'],
    keyBenefits: [
      'Preset budget tiers from ₦6,000, ₦10,000, and ₦15,000, plus custom budget flexibility',
      'Kg and Congo measurement options for rice, garri, and flours',
      'Direct delivery to campus halls, hostels, and off-campus residences',
      'Easy WhatsApp ordering and transparent confirmation'
    ],
    typicalInclusions: [
      'Peeled Beans Flour (instant akara & moi-moi without hostel grinding hassle)',
      'Creamy Custard Powder (quick morning lecture fuel)',
      'Clean Parboiled Rice & Sifted Ijebu Garri (in Congos or Kg)',
      'Fast-cooking pasta / noodles bundle',
      'Refined cooking oil & seasoning spice packs',
      'Neatly cleaned, sand-free oven-dried catfish & ponmo'
    ],
    highlights: ['Hostel Delivery', 'Custom Budgets (₦6k+)', 'Kg & Congo Options'],
    callToActionText: 'Explore Dedicated Student Page',
    directRoute: '/student-food-packages'
  },
  {
    id: 'event-snack-packages',
    number: '03',
    title: 'Event & Snack Packages',
    shortDescription: 'Snack and food packages for events, programmes, gatherings and special occasions.',
    detailedDescription: 'Make your celebrations, conferences, seminars, church programmes, and youth gatherings memorable with tasteful, hygienic snack and food bundles curated by Precious Gem Foods Ventures.',
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1791028664/1000335095_rmxsk4.jpg',
    badge: 'Events & Gatherings',
    targetAudience: ['Event Planners', 'Churches & Mosques', 'Conference Organisers', 'Celebrants', 'School Programmes'],
    keyBenefits: [
      'Hygienic batch packaging with sealed, airtight freshness',
      'Aesthetic presentation ready to hand out directly to guests',
      'Scalable order quantities from small intimate meetings to large conventions',
      'Punctual delivery schedule aligned with your event timeline'
    ],
    typicalInclusions: [
      'Crunchy Golden Chin Chin (hygienically prepared & sealed)',
      'Puff Puff Mix (convenient pre-measured blends for on-site caterers)',
      'Packaged Pastries & Gourmet Dry Snacks',
      'Quality Packaged Fruit Juices, Malt & Wholesome Beverages',
      'Customized party snack boxes with themed stickers'
    ],
    highlights: ['Fresh Batch Sealing', 'Custom Branding', 'On-Time Event Dispatch']
  },
  {
    id: 'corporate-seasonal-packages',
    number: '04',
    title: 'Corporate & Seasonal Packages',
    shortDescription: 'Food packages created for organisations, corporate welfare programmes, festive seasons and special occasions.',
    detailedDescription: 'Show tangible appreciation to your staff, executives, partners, and community members. PGFV develops customized bulk food welfare boxes and seasonal celebration baskets that every Nigerian household genuinely values.',
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1791028643/1000335094_cndfrx.jpg',
    badge: 'Corporate Welfare & Festive Hampers',
    targetAudience: ['Corporate HR Departments', 'SMEs & Employers', 'Religious Bodies', 'Alumni Associations', 'NGOs'],
    keyBenefits: [
      'Substantial foodstuff combinations that relieve employee festive budget pressures',
      'Dedicated procurement invoicing and corporate payment receipts',
      'Custom brand ribbons, greeting cards, and organization logo tags',
      'Coordinated bulk delivery directly to company premises or branch offices'
    ],
    typicalInclusions: [
      'Premium parboiled rice (bags, congos, or half-bags)',
      'Stoneless beans flour & family custard buckets',
      'Clean vegetable cooking oil & premium red palm oil',
      'Deluxe oven-dried catfish & assorted protein portions',
      'Festive seasoning sets, pasta, and pantry staples',
      'Woven hamper baskets or branded heavy-duty boxes'
    ],
    highlights: ['Procurement Invoicing', 'Branded Greeting Tags', 'Bulk Office Delivery']
  },
  {
    id: 'souvenirs-gift-packages',
    number: '05',
    title: 'Souvenirs & Gift Packages',
    shortDescription: 'Thoughtfully packaged food souvenirs and gifts for celebrations, programmes, events and special occasions.',
    detailedDescription: 'Move away from plastic souvenirs that get tossed aside. PGFV provides elegant, food-based gift packs that guests take home and enjoy with their families, leaving a lasting and heartfelt memory of your special day.',
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1791028643/1000335093_cavnkr.jpg',
    badge: 'Thoughtful Food Gifting',
    targetAudience: ['Couples (Weddings)', 'Birthday Celebrants', 'Funeral Memorials', 'Anniversary Committees', 'Club Galas'],
    keyBenefits: [
      'High-utility gifts that every guest and household genuinely appreciates',
      'Aesthetic packaging including jute bags, clear gift pouches, and ribbons',
      'Personalised event labels with names of celebrants, dates, and greetings',
      'Cost-effective options that match your souvenir budget per guest'
    ],
    typicalInclusions: [
      'Artisanal mini-packs of PGFV Beans Flour with signature recipe cards',
      'Neatly packaged dried catfish portions in decorative gift bags',
      'Festive dry food duos (Rice + Beans Flour + Pure Cooking Oil)',
      'Gourmet snack pouches with custom wedding stickers',
      'Heritage food gift boxes with celebratory ribbons'
    ],
    highlights: ['High-Utility Gifts', 'Custom Celebrant Tags', 'Memorable Presentation']
  },
  {
    id: 'private-label',
    number: '06',
    title: 'Private Label',
    shortDescription: 'Custom-branded food products and packages created for businesses, organisations and special projects.',
    detailedDescription: 'Launch or scale your own food brand effortlessly. PGFV handles the sorting, destoning, processing, precision weighing, and tamper-proof sealing of flours, grains, and dry foodstuffs under YOUR business name and branding.',
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1791028606/1000335097_n3upfq.jpg',
    badge: 'Contract Packaging & Branding',
    targetAudience: ['Supermarkets & Retail Stores', 'Food Resellers & Vendors', 'Diaspora Food Exporters', 'Agri-Brands'],
    keyBenefits: [
      'Leverage PGFV’s hygienic processing infrastructure without capital overhead',
      'Airtight, tamper-proof pouches and seal integrity meeting market standards',
      'Precision weight calibration (500g, 1kg, 2kg, 5kg, 10kg, etc.)',
      'Low minimum order quantities (MOQs) tailored for growing enterprises'
    ],
    typicalInclusions: [
      'Private labelled peeled beans flour pouches with your custom brand sticker',
      'Contract packaged unripe plantain flour & brown yam flour',
      'Branded clean parboiled rice & sifted garri retail bags',
      'Hygienically sealed dried catfish with branded vacuum packs',
      'Custom packaging specifications for export or local retail display'
    ],
    highlights: ['Your Brand On Pack', 'Low MOQs', 'Strict Hygiene Protocols']
  },
  {
    id: 'training-empowerment',
    number: '07',
    title: 'Training & Empowerment',
    shortDescription: 'Practical food, entrepreneurship and skills-development training programmes.',
    detailedDescription: 'Empowering youths, students, women, and aspiring agri-food entrepreneurs. PGFV conducts hands-on vocational workshops in hygienic food processing, packaging standards, product branding, retail supply, and micro-business management.',
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1791028605/1000335110_ck3nac.jpg',
    badge: 'Skills & Vocational Training',
    targetAudience: ['Students & Campus Youths', 'Women Cooperatives', 'Aspiring Food Vendors', 'NGOs & Faith-Based Ministries'],
    keyBenefits: [
      'Hands-on practical classes — not just classroom theory',
      'Learn hygiene protocols, food storage, destoning, and milling techniques',
      'Packaging design, brand labeling, and product pricing masterclasses',
      'Mentorship from PGFV founder and experienced food industry practitioners'
    ],
    typicalInclusions: [
      'Food processing and flour production workshops',
      'Packaging, pouch sealing, and labeling masterclasses',
      'Food safety, sanitation, and regulatory alignment guidance',
      'Micro-enterprise financial planning and customer acquisition',
      'Certificate of participation and mentorship support'
    ],
    highlights: ['Hands-On Vocational Skills', 'Packaging Masterclass', 'Founder Mentorship']
  }
];
