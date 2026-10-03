export interface PGFVService {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  purpose: string;
  iconName: string;
  image: string;
  tag: string;
  targetAudience: string;
  highlights: string[];
  primaryActionLabel?: string;
  primaryActionRoute?: string;
  enquiryMessage: string;
}

export const ALL_PGFV_SERVICES: PGFVService[] = [
  {
    id: 'christmas-food-saving',
    slug: 'christmas-food-saving',
    title: 'Christmas Food Saving',
    shortDescription: 'Structured weekly or monthly community food savings scheme designed to beat festive market inflation and secure complete holiday food baskets stress-free.',
    purpose: 'Helps families, workers, and individuals save gradually starting from ₦2,000/week (or monthly upfront) to receive premium rice, beans flour, cooking oils, proteins, and pantry staples before Christmas.',
    iconName: 'Calendar',
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1791028643/1000335094_cndfrx.jpg',
    tag: 'Flagship Savings Programme',
    targetAudience: 'Households, salary earners, artisans & community groups',
    highlights: ['5 Flexible Weekly Tiers (₦2k–₦15k)', 'Digital Savings Card & ID', 'Guaranteed December Delivery'],
    primaryActionLabel: 'Explore 5 Savings Tiers',
    primaryActionRoute: 'savings-options',
    enquiryMessage: 'Hello PGFV, I would like to enquire about registering for the Christmas Food Saving Plan.'
  },
  {
    id: 'food-packages',
    slug: 'food-packages',
    title: 'Food Packages',
    shortDescription: 'Carefully curated and customized staple food baskets assembled for everyday household cooking, dietary preferences, and diverse family needs.',
    purpose: 'Eliminates repetitive market trips by providing clean, stone-free parboiled rice, peeled beans flour, creamy custard, sifted garri, refined oils, and dried catfish portioned to family sizes.',
    iconName: 'Package',
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1791028665/1000335096_z0acdh.jpg',
    tag: 'Household & Pantry Staples',
    targetAudience: 'Individuals, busy professionals, couples & large families',
    highlights: ['100% Stone-Free Grains', 'Customized Food Combinations', 'Direct Doorstep Delivery'],
    enquiryMessage: 'Hello PGFV, I would like to order or customize a Food Package for my household.'
  },
  {
    id: 'student-food-packages',
    slug: 'student-food-packages',
    title: 'Student Food Packages',
    shortDescription: 'Nutritious, fast-cooking, and budget-friendly foodstuff bundles specially portioned for campus scholars and hostel living throughout the semester.',
    purpose: 'Provides undergraduates and polytechnic students with easy-to-prepare meal staples (starter pack ₦6,000, semester sustenance ₦10,000, mega pack ₦15,000, or custom budget) delivered directly to campus hostels.',
    iconName: 'GraduationCap',
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1791028665/1000335098_vaje9l.jpg',
    tag: 'Campus & Hostel Solutions',
    targetAudience: 'Undergraduates, polytechnic scholars, hostel roommates',
    highlights: ['Packages from ₦6,000 & Custom', 'Direct Campus Hostel Delivery', 'Kg & Congo Measurements'],
    primaryActionLabel: 'Visit Student Packages Page',
    primaryActionRoute: 'students-page',
    enquiryMessage: 'Hello PGFV, I would like to enquire about Student Food Packages for my hostel/school.'
  },
  {
    id: 'event-souvenirs',
    slug: 'event-souvenirs',
    title: 'Event Souvenirs',
    shortDescription: 'Tasteful, high-utility food-based gift souvenirs for weddings, birthdays, anniversaries, and family celebrations that guests genuinely appreciate and cook with.',
    purpose: 'Replaces disposable plastics with memorable, beautifully branded packs of beans flour, packaged grains, gourmet chin-chin, or oven-dried proteins adorned with custom celebrant tags.',
    iconName: 'Gift',
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1791028643/1000335093_cavnkr.jpg',
    tag: 'Celebrations & Ceremonies',
    targetAudience: 'Couples, event planners, birthday & memorial celebrants',
    highlights: ['Usable Home Food Gifts', 'Custom Celebrant Stickers', 'Aesthetic Gift Bagging'],
    enquiryMessage: 'Hello PGFV, I would like to request a quotation for Event Food Souvenirs for my upcoming celebration.'
  },
  {
    id: 'corporate-packages',
    slug: 'corporate-packages',
    title: 'Corporate Packages',
    shortDescription: 'Dedicated employee welfare food provisions, staff end-of-year bonus boxes, and executive appreciation packages with corporate procurement invoicing.',
    purpose: 'Enables employers, HR managers, and corporate organizations to reward and motivate their workforce with substantial, high-grade foodstuffs delivered directly to company premises.',
    iconName: 'Building2',
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1791028668/1000335113_qb1p3o.jpg',
    tag: 'Staff Welfare & HR Procurement',
    targetAudience: 'Corporate firms, SMEs, schools, banks, hospitals & ministries',
    highlights: ['Corporate Invoicing & Receipts', 'Custom Branded Packaging', 'Bulk Premises Dispatch'],
    enquiryMessage: 'Hello PGFV, I would like to request a corporate quotation for employee food packages.'
  },
  {
    id: 'seasonal-packages',
    slug: 'seasonal-packages',
    title: 'Seasonal Packages',
    shortDescription: 'Curated holiday food baskets and festive celebration packages prepared for Easter, Ramadan, Eid-el-Kabir, and New Year festivities.',
    purpose: 'Ensures families and faith communities celebrate special religious and calendar milestones with wholesome, abundant foodstuffs tailored to specific seasonal culinary traditions.',
    iconName: 'CalendarHeart',
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1791028667/1000335104_b8g1hi.jpg',
    tag: 'Festivals & Special Seasons',
    targetAudience: 'Households, religious organizations, family reunions',
    highlights: ['Festival-Specific Ingredients', 'Flexible Family Sizes', 'Punctual Pre-Holiday Dispatch'],
    enquiryMessage: 'Hello PGFV, I would like to enquire about Seasonal Food Packages for the upcoming festive period.'
  },
  {
    id: 'private-labelling',
    slug: 'private-labelling',
    title: 'Private Labelling',
    shortDescription: 'Turnkey contract processing, precision weighing, sorting, and airtight packaging of staple flours and grains under your own brand identity.',
    purpose: 'Empowers supermarkets, food resellers, diaspora exporters, and agricultural brands to retail premium beans flour, plantain flour, and grains without building their own factory facilities.',
    iconName: 'Tag',
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1791028606/1000335097_n3upfq.jpg',
    tag: 'Contract Packaging & Branding',
    targetAudience: 'Retail stores, supermarkets, food brands, export vendors',
    highlights: ['Tamper-Proof Pouch Sealing', 'Custom Logo Integration', 'Low Minimum Order Quantities'],
    enquiryMessage: 'Hello PGFV, I am interested in your Private Labelling and Contract Packaging services for my brand.'
  },
  {
    id: 'charity-community-distribution',
    slug: 'charity-community-distribution',
    title: 'Charity / Community Distribution',
    shortDescription: 'Transparent procurement, sorting, and logistical distribution partnerships for humanitarian food drives and community welfare outreach.',
    purpose: 'Assists non-profits, philanthropic donors, religious bodies, and alumni associations in delivering verifiable, nutritious food bundles directly to vulnerable families and orphanages.',
    iconName: 'HeartHandshake',
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1791028666/1000335108_l0zgu7.jpg',
    tag: 'Humanitarian & Welfare Outreach',
    targetAudience: 'NGOs, philanthropists, churches, mosques, alumni associations',
    highlights: ['Full Batch Accountability', 'High-Impact Staple Selection', 'Coordinated Field Logistics'],
    enquiryMessage: 'Hello PGFV, I would like to partner on Charity and Community Food Distribution.'
  },
  {
    id: 'campaign-packages',
    slug: 'campaign-packages',
    title: 'Campaign Packages',
    shortDescription: 'High-volume, standardized welfare food bundles assembled for advocacy groups, public health initiatives, and community mobilization campaigns.',
    purpose: 'Provides reliable, high-yield food packages with tailored messaging stickers and durable packaging designed for rapid, organized distribution across target constituencies.',
    iconName: 'Megaphone',
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1791028667/1000335107_bt5vjb.jpg',
    tag: 'Advocacy & Public Mobilization',
    targetAudience: 'Campaign committees, health drives, community development associations',
    highlights: ['Rapid High-Volume Assembly', 'Customized Campaign Branding', 'Dependable Statewide Logistics'],
    enquiryMessage: 'Hello PGFV, I would like to enquire about bulk Campaign Food Packages.'
  },
  {
    id: 'food-entrepreneurship-training',
    slug: 'food-entrepreneurship-training',
    title: 'Food / Entrepreneurship Training',
    shortDescription: 'Practical, hands-on masterclasses teaching hygienic food processing, flour production, pouch sealing, and agribusiness management.',
    purpose: 'Equips aspiring entrepreneurs, youths, and cooperatives with real-world skills to process stone-free flours, navigate regulatory standards, price products, and run profitable food ventures.',
    iconName: 'BookOpenCheck',
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1791028605/1000335110_ck3nac.jpg',
    tag: 'Vocational Masterclasses',
    targetAudience: 'Aspiring food entrepreneurs, students, women groups',
    highlights: ['Practical Hands-On Demos', 'Packaging Standards Training', 'Certificate of Completion'],
    enquiryMessage: 'Hello PGFV, I would like to register or enquire about Food and Entrepreneurship Training.'
  },
  {
    id: 'empowerment-initiatives',
    slug: 'empowerment-initiatives',
    title: 'Empowerment Initiatives',
    shortDescription: 'Strategic youth and women mentorship programmes, campus vendor incubation, and community empowerment through food value addition.',
    purpose: 'Fosters economic independence and job creation by guiding participants through micro-distribution networks, student campus sales, and sustainable agribusiness partnerships.',
    iconName: 'Sparkles',
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1791028668/1000335112_pyj1we.jpg',
    tag: 'Economic Self-Reliance & Mentorship',
    targetAudience: 'Youth groups, student campus reps, women cooperatives',
    highlights: ['Micro-Distributor Incubation', 'Direct Founder Mentorship', 'Community Value Creation'],
    enquiryMessage: 'Hello PGFV, I would like to learn more about joining PGFV Empowerment Initiatives.'
  },
  {
    id: 'custom-food-sourcing-hampers',
    slug: 'custom-food-sourcing-hampers',
    title: 'Custom Food Sourcing & Hampers',
    shortDescription: 'Specialized procurement of authentic regional foodstuffs, premium oven-dried proteins, and bespoke celebration hampers.',
    purpose: 'Handles unique culinary requests—from mature poundable food yams and unadulterated palm oil to luxury wooden hamper crates curated for VIP partners and family milestones.',
    iconName: 'Award',
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1791028667/1000335105_pclfl3.jpg',
    tag: 'Bespoke Sourcing & VIP Hampers',
    targetAudience: 'Families, executives, event hosts seeking rare or premium staples',
    highlights: ['Direct Farm Sourcing', 'Pest-Free Storage Guarantee', 'Luxury Presentation Baskets'],
    enquiryMessage: 'Hello PGFV, I would like to enquire about Custom Food Sourcing and Bespoke Hampers.'
  }
];
