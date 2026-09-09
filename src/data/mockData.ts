import { Product, Service, SavingsPlan, FAQItem, CustomerReview } from '../types';

export const BUSINESS_INFO = {
  name: 'Precious Gem Foods Ventures (PGFV)',
  shortName: 'PGFV',
  tagline: 'Quality • Integrity • Impact',
  supportingStatement: 'Empowering Communities Through Food, Skills, and Services',
  logo: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1788894865/1000289570_fkiaoo.jpg',
  phone: '09167621558',
  phoneInternational: '+2349167621558',
  whatsapp: '2349167621558',
  whatsappFormatted: '234-9167621558',
  email: 'preciousgementerprise@gmail.com',
  website: 'https://preciousgemfoods.com.ng',
  domain: 'preciousgemfoods.com.ng',
  location: 'Ile-Ife, Osun State, Nigeria',
  address: 'Ile-Ife, Osun State, Nigeria (Nationwide Doorstep Delivery Available)',
  socials: {
    instagram: 'https://instagram.com/preciousgemfoodsventures',
    facebook: 'https://facebook.com/preciousgemfoodsventures',
    tiktok: 'https://tiktok.com/@preciousgemfoodsventures',
    handles: {
      instagram: '@preciousgemfoodsventures',
      facebook: '@preciousgemfoodsventures',
      tiktok: '@preciousgemfoodsventures'
    }
  },
  dates: {
    savingsStart: 'September 1, 2026',
    catchUpDeadline: 'December 15, 2026',
    deliveryBegins: 'December 21, 2026',
  },
  founder: {
    name: 'Oladipupo Precious O.',
    title: 'Founder & CEO',
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1788894884/1000289571_h0jgwv.jpg',
    bio: 'Precious is passionate about food, entrepreneurship, empowerment and creating practical solutions that positively affect individuals and communities. Through PGFV, she is building a brand that combines food solutions with opportunities for skills development, student empowerment, mentorship, community service and strategic partnerships.'
  }
};

export const PRODUCTS: Product[] = [
  {
    id: 'prod-beans-flour',
    name: 'Beans Flour',
    category: 'FLOUR & MIXES',
    description: '100% pure, stoneless, peeled beans flour prepared hygienically. Perfect for instant smooth akara, moi-moi, and gbegiri.',
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1788937284/1000290174_bppwgo.jpg',
    tag: 'Hygienically Processed'
  },
  {
    id: 'prod-puff-puff-mix',
    name: 'Puff Puff Mix',
    category: 'FLOUR & MIXES',
    description: 'Convenient, pre-measured puff puff flour blend with gentle aromatic sweetness for fluffy, golden pastries in minutes.',
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1788937286/1000290185_fvcxhq.jpg',
    tag: 'Quick Preparation'
  },
  {
    id: 'prod-custard-powder',
    name: 'Custard Powder',
    category: 'FLOUR & MIXES',
    description: 'Smooth, creamy, and fortified custard powder for family breakfasts, rich desserts, and student morning fuel.',
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1788937284/1000290176_j1a30q.jpg',
    tag: 'Family Favourite'
  },
  {
    id: 'prod-plantain-flour',
    name: 'Plantain Flour',
    category: 'FLOUR & MIXES',
    description: 'Naturally dried unripe plantain flour, rich in dietary fiber and essential minerals. Excellent healthy swallow alternative.',
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1788937285/1000290178_fu4s2m.jpg',
    tag: 'Healthy Choice'
  },
  {
    id: 'prod-yam-flour',
    name: 'Yam Flour (Elubo)',
    category: 'FLOUR & MIXES',
    description: 'Authentic traditional brown yam flour for delicious, smooth amala. Thoroughly cleaned, dried, and fine-milled.',
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1788937286/1000290188_licuvk.jpg',
    tag: 'Traditional Quality'
  },
  {
    id: 'prod-catfish',
    name: 'Oven-Dried Catfish',
    category: 'PROTEINS',
    description: 'Neatly cleaned, gutted, and hygienically smoked oven-dried catfish. Sand-free, aromatic, and rich in natural flavour.',
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1788937284/1000290174_bppwgo.jpg',
    tag: 'Sand-Free'
  },
  {
    id: 'prod-ponmo-ijebu',
    name: 'Neat Dried Ponmo Ijebu',
    category: 'PROTEINS',
    description: 'Carefully scrubbed, hygienically sun-dried Ponmo Ijebu. Expands beautifully during cooking with tender, chewy texture.',
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1788937286/1000290185_fvcxhq.jpg',
    tag: 'Clean & Safe'
  },
  {
    id: 'prod-chin-chin',
    name: 'Chin Chin',
    category: 'SNACKS',
    description: 'Crunchy, rich, buttery Nigerian chin chin with hints of nutmeg and milk. Ideal for quick bites, gifts, and souvenirs.',
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1788937284/1000290176_j1a30q.jpg',
    tag: 'Crispy & Rich'
  },
  {
    id: 'prod-garri',
    name: 'Garri (White & Yellow)',
    category: 'GRAINS & FOODSTUFF',
    description: 'Well-fermented, finely sifted, crispy garri with delicious sourness. Free from grit or impurities; great for soaking or eba.',
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1788937286/1000290188_licuvk.jpg',
    tag: 'Grit-Free'
  },
  {
    id: 'prod-rice',
    name: 'Premium Rice',
    category: 'GRAINS & FOODSTUFF',
    description: 'Stoneless, cleanly bagged long-grain parboiled rice. Cooks firm and non-sticky for classic jollof and fried rice.',
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1788937287/1000290187_vwyuyg.jpg',
    tag: 'Stoneless Rice'
  },
  {
    id: 'prod-honey-beans',
    name: 'Neatly Picked Honey Beans (Oloyin)',
    category: 'GRAINS & FOODSTUFF',
    description: 'Cleanly sorted, naturally sweet brown honey beans (Oloyin). Free from weevils and dirt, ready for boiling.',
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1788937284/1000290177_yo7qcp.jpg',
    tag: 'Pest-Free'
  },
  {
    id: 'prod-wheat-flour',
    name: 'Wheat Flour',
    category: 'FLOUR & MIXES',
    description: 'Whole grain and all-purpose wheat flours for pastries, breads, and healthy homemade swallow doughs.',
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1788937285/1000290178_fu4s2m.jpg',
    tag: 'High Grade'
  },
  {
    id: 'prod-buns-mix',
    name: 'Buns Mix',
    category: 'FLOUR & MIXES',
    description: 'Balanced flour formulation for soft-centered Nigerian buns with a crisp golden exterior. Simple just-add-water ease.',
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1788937286/1000290185_fvcxhq.jpg',
    tag: 'Easy Bake'
  },
  {
    id: 'prod-cooking-oils',
    name: 'Cooking Oils (Vegetable & Pure Palm Oil)',
    category: 'GRAINS & FOODSTUFF',
    description: 'Unadulterated red palm oil with rich earthy aroma, and cholesterol-free double-refined vegetable cooking oil.',
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1788937284/1000290174_bppwgo.jpg',
    tag: 'Pure & Fresh'
  },
  {
    id: 'prod-yam',
    name: 'Select Food Yams',
    category: 'GRAINS & FOODSTUFF',
    description: 'Dry, mature yam tubers carefully chosen for pounding and boiling with high starch density and pure white flesh.',
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1788937286/1000290188_licuvk.jpg',
    tag: 'Farm Select'
  },
  {
    id: 'prod-chicken-beef',
    name: 'Chicken / Beef Portions',
    category: 'PROTEINS',
    description: 'Hygienically handled and frozen/preserved protein cuts prepared to order for festive packages and family cooking.',
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1788937285/1000290178_fu4s2m.jpg',
    tag: 'Hygienic Sourcing'
  },
  {
    id: 'prod-drinks',
    name: 'Packaged Drinks & Beverages',
    category: 'DRINKS',
    description: 'Quality fruit juices, malt drinks, and wholesome beverages supplied for events, hampers, and family celebration packages.',
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1788937286/1000290184_fj91xb.jpg',
    tag: 'Festive Ready'
  },
  {
    id: 'prod-snacks-other',
    name: 'Assorted Gourmet Snacks & Other Food Items',
    category: 'OTHER',
    description: 'Groundnuts, plantain chips, packaged local condiments, and seasonal foodstuffs available upon special request.',
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1788937284/1000290176_j1a30q.jpg',
    tag: 'Seasonal Stock'
  }
];

export const SERVICES: Service[] = [
  {
    id: 'serv-private-labelling',
    title: 'Private Labelling',
    description: 'Food products can be packaged and branded according to suitable customer or organisational requirements.',
    iconName: 'Tag',
    targetAudience: 'Vendors, supermarkets, and corporate gifting brands',
    features: ['Custom packaging & sealing', 'Logo & brand sticker integration', 'Hygienic batch packaging']
  },
  {
    id: 'serv-event-souvenirs',
    title: 'Event Souvenirs',
    description: 'Food-based souvenirs and gift packages for events, weddings, birthdays, and special occasions that guests truly appreciate.',
    iconName: 'Gift',
    targetAudience: 'Event planners, couples, celebrants',
    features: ['Curated dry food bags', 'Aesthetic souvenir packaging', 'Personalised greeting tags']
  },
  {
    id: 'serv-seasonal-packages',
    title: 'Seasonal Food Packages',
    description: 'Curated food packages for festive seasons, Easter, Ramadan, Eid, and special calendar periods tailored for families.',
    iconName: 'CalendarHeart',
    targetAudience: 'Households and community groups',
    features: ['Festive essential bundles', 'Flexible pricing options', 'Safe door-to-door delivery']
  },
  {
    id: 'serv-campaign-packages',
    title: 'Campaign Packages',
    description: 'Customised food packages for political campaigns, corporate outreach activities, health drives, and community engagements.',
    iconName: 'Megaphone',
    targetAudience: 'Campaign committees & organizers',
    features: ['High-volume fulfilment', 'Customized messaging prints', 'Punctual batch dispatch']
  },
  {
    id: 'serv-charity-distribution',
    title: 'Charity Food Distribution',
    description: 'Food support and distribution initiatives through partnerships, churches, and organised welfare outreach programmes.',
    iconName: 'HeartHandshake',
    targetAudience: 'NGOs, philanthropists, religious bodies',
    features: ['Direct distribution support', 'Transparent batch accountability', 'Nutritious staple selection']
  },
  {
    id: 'serv-student-packages',
    title: 'Student Food Packages',
    description: 'Affordable and practical food packages designed around student nutritional needs, semester rhythms, and campus budgets.',
    iconName: 'GraduationCap',
    targetAudience: 'University & polytechnic students',
    features: ['Easy-to-cook staples', 'Budget-friendly sizes', 'Optional progressive payment']
  },
  {
    id: 'serv-student-upskill',
    title: 'Student Upskill & Food Empowerment',
    description: 'Hands-on practical training focused on food processing, hygiene protocols, packaging, branding, and micro-entrepreneurship.',
    iconName: 'Lightbulb',
    targetAudience: 'Youths, undergraduates, aspiring vendors',
    features: ['Practical production classes', 'Packaging & branding basics', 'Safety & hygiene standards']
  },
  {
    id: 'serv-mentorship-training',
    title: 'Mentorship & Training',
    description: 'Practical mentorship and business coaching around food retailing, supply chain management, branding, and enterprise leadership.',
    iconName: 'Award',
    targetAudience: 'Food startups and community leaders',
    features: ['One-on-one founder insights', 'Market positioning strategies', 'Sustainable retail systems']
  },
  {
    id: 'serv-corporate-packages',
    title: 'Employee / Corporate Food Packages',
    description: 'Food packages that organisations and employers can provide as end-of-year bonuses, festive appreciation, or welfare packages.',
    iconName: 'Building2',
    targetAudience: 'HR executives, corporate firms, SMEs',
    features: ['Bulk invoice facilitation', 'Staff customized boxes', 'Scheduled office delivery']
  },
  {
    id: 'serv-christmas-hampers',
    title: 'Christmas Hampers',
    description: 'Bespoke Christmas hampers and festive gift baskets for individuals, organisations, churches, and executive partners.',
    iconName: 'PackageCheck',
    targetAudience: 'Businesses, families, and executives',
    features: ['Premium woven basket / box packaging', 'Deluxe gourmet food combination', 'Customized greeting ribbons']
  }
];

export const SAVINGS_PLANS: SavingsPlan[] = [
  {
    id: 'plan-2000',
    weeklyAmount: 2000,
    label: '₦2,000 Weekly',
    tagline: 'Start small and build gradually.',
    recommendedFor: 'Students, young earners, and individuals starting a consistent food cushion.'
  },
  {
    id: 'plan-3000',
    weeklyAmount: 3000,
    label: '₦3,000 Weekly',
    tagline: 'A flexible option for consistent saving.',
    recommendedFor: 'Singles and young families who want a steady festive food reserve.'
  },
  {
    id: 'plan-5000',
    weeklyAmount: 5000,
    label: '₦5,000 Weekly',
    tagline: 'For a more substantial foodstuff package.',
    recommendedFor: 'Medium-sized households seeking balanced staples and protein support.',
    popular: true
  },
  {
    id: 'plan-10000',
    weeklyAmount: 10000,
    label: '₦10,000 Weekly',
    tagline: 'For participants planning a larger Christmas food budget.',
    recommendedFor: 'Larger households and those hosting relatives during the holidays.'
  },
  {
    id: 'plan-15000',
    weeklyAmount: 15000,
    label: '₦15,000 Weekly',
    tagline: 'For participants looking to save more substantially.',
    recommendedFor: 'Big families, community hosts, and generous festive celebrants.'
  }
];

export const FAQ_LIST: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Who can join the Christmas Foodstuff Savings Plan?',
    answer: 'The plan is open to anyone looking to plan ahead for the festive season — including individuals, parents, families, students, civil servants, small business owners, and community members. Anyone who wants to save small and avoid high December market pressures can join.',
    category: 'SAVINGS PLAN'
  },
  {
    id: 'faq-2',
    question: 'How much can I save weekly?',
    answer: 'You can choose between five clear options: ₦2,000, ₦3,000, ₦5,000, ₦10,000, or ₦15,000 weekly, depending on your festive food budget and capacity.',
    category: 'SAVINGS PLAN'
  },
  {
    id: 'faq-3',
    question: 'Can I pay monthly?',
    answer: 'Yes! Participants who prefer monthly payments can simply pay the equivalent of their selected weekly savings amount upfront for the applicable weeks. For example, a participant on the ₦5,000 weekly plan may pay ₦20,000 upfront for 4 weeks.',
    category: 'PAYMENTS & VERIFICATION'
  },
  {
    id: 'faq-4',
    question: 'Can I join after the plan has started?',
    answer: 'Yes. If you join after September 1, you will simply make up for the elapsed weeks upfront so that your total savings align smoothly with your chosen weekly plan.',
    category: 'SAVINGS PLAN'
  },
  {
    id: 'faq-5',
    question: 'What happens if I miss a payment?',
    answer: 'We understand that circumstances can happen. One missed payment may be allowed if settled before the final catch-up deadline on December 15, 2026.',
    category: 'PAYMENTS & VERIFICATION'
  },
  {
    id: 'faq-6',
    question: 'What if I miss payments consecutively?',
    answer: 'If you miss payments consecutively, PGFV will reach out to you directly to understand your situation, provide assistance, and help you reconcile your records before the final payment deadline.',
    category: 'PAYMENTS & VERIFICATION'
  },
  {
    id: 'faq-7',
    question: 'Is this a hamper contribution?',
    answer: 'No. The Christmas Foodstuff Savings Plan is not a hamper contribution, lottery, or gifting scheme. It is a structured savings plan towards an essential foodstuff package for your own household based on your verified total savings.',
    category: 'SAVINGS PLAN'
  },
  {
    id: 'faq-8',
    question: 'Will everyone receive the same food items?',
    answer: 'Not necessarily. Food packages correspond directly to your total savings tier, prevailing market prices, and seasonal food availability. We also offer a Food Preference Form so you can indicate items your family prefers.',
    category: 'DELIVERY & PACKAGES'
  },
  {
    id: 'faq-9',
    question: 'Are the package contents fixed?',
    answer: 'Package contents and exact quantities are not rigidly fixed in advance. They depend on total savings contributed, prevailing market prices in December, and product availability to ensure maximum value for your money.',
    category: 'DELIVERY & PACKAGES'
  },
  {
    id: 'faq-10',
    question: 'Can I indicate the food items I prefer?',
    answer: 'Yes! Registered participants can complete our Food Preference Form to indicate food items they would particularly like to receive. While we cannot guarantee every item due to market forces, preferences are carefully considered during package assembly.',
    category: 'DELIVERY & PACKAGES'
  },
  {
    id: 'faq-11',
    question: 'Will I receive proof of my payments?',
    answer: 'Yes. Every verified payment receives an official PGFV digital receipt and an updated savings record. Transparency and accountability are central to our brand.',
    category: 'PAYMENTS & VERIFICATION'
  },
  {
    id: 'faq-12',
    question: 'Will I receive a savings card?',
    answer: 'Yes! Once registered and verified, you will be issued an official PGFV Savings Card bearing your Unique Participant ID and savings profile.',
    category: 'PAYMENTS & VERIFICATION'
  },
  {
    id: 'faq-13',
    question: 'When does the savings period end?',
    answer: 'The final payment and catch-up deadline is December 15, 2026. All contributions and reconciliations must be finalized on or before this date.',
    category: 'SAVINGS PLAN'
  },
  {
    id: 'faq-14',
    question: 'When does delivery begin?',
    answer: 'Packaging and doorstep deliveries commence on December 21, 2026, well in time for your family’s Christmas celebrations.',
    category: 'DELIVERY & PACKAGES'
  },
  {
    id: 'faq-15',
    question: 'What happens if market prices change?',
    answer: 'Because food prices in Nigeria fluctuate, packages are assembled based on the prevailing wholesale market rates at the delivery period. PGFV leverages bulk buying advantages to provide the best possible value for your total savings.',
    category: 'DELIVERY & PACKAGES'
  },
  {
    id: 'faq-16',
    question: 'Can I choose exactly what I want in my package?',
    answer: 'You can submit your preferences using our Food Preference Form, which guides our assembly team. However, package items and quantities cannot be 100% customized or guaranteed in advance.',
    category: 'DELIVERY & PACKAGES'
  },
  {
    id: 'faq-17',
    question: 'How do I join?',
    answer: 'Joining takes 3 simple steps: 1) Click "Start Saving" to select your weekly plan, 2) Complete the short registration details, 3) Make your initial payment through PGFV’s verified channel to receive your Participant ID and Savings Card.',
    category: 'SAVINGS PLAN'
  },
  {
    id: 'faq-18',
    question: 'Can I ask questions before joining?',
    answer: 'Absolutely! You can chat with us on WhatsApp at 09167621558, call us directly, or send an email to preciousgementerprise@gmail.com. We are happy to guide you.',
    category: 'GENERAL & PRODUCTS'
  },
  {
    id: 'faq-19',
    question: 'Can you deliver to my location?',
    answer: 'PGFV delivers through trusted courier and dispatch services right to customers’ doorsteps. We are based in Ile-Ife, Osun State, and arrange deliveries across various accessible destinations.',
    category: 'DELIVERY & PACKAGES'
  }
];

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: 'review-1',
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1788936248/1000290173_qjwbso.jpg',
    tag: 'REVIEWS',
    title: 'Staple Food Quality & Prompt Delivery',
    category: 'Verified Customer Review',
    highlight: 'Commended the cleanliness of the foodstuffs, neat packaging, and dependable doorstep delivery.'
  },
  {
    id: 'review-2',
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1788936234/1000290170_p76hol.jpg',
    tag: 'REVIEWS',
    title: 'Hygienic Packaging & Freshness',
    category: 'WhatsApp Feedback',
    highlight: 'Appreciated the stone-free quality and airtight sealed food packaging.'
  },
  {
    id: 'review-3',
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1788936234/1000290172_prtbdv.jpg',
    tag: 'REVIEWS',
    title: 'Christmas Savings Plan Satisfaction',
    category: 'Savings Plan Participant',
    highlight: 'Expressed delight receiving complete food package smoothly without holiday stress or price hikes.'
  },
  {
    id: 'review-4',
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1788936234/1000290171_wvfm3k.jpg',
    tag: 'REVIEWS',
    title: 'Trustworthy & Courteous Service',
    category: 'Customer Experience',
    highlight: 'Highlighted honest communication, seamless WhatsApp coordination, and polite customer handling.'
  },
  {
    id: 'review-5',
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1788936217/1000290167_t8sr3l.jpg',
    tag: 'REVIEWS',
    title: 'Beans Flour & Easy Cooking Solution',
    category: 'Product Review',
    highlight: 'Puffed up wonderful akara and moi-moi with zero grit or stone, saving valuable preparation time.'
  },
  {
    id: 'review-6',
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1788936207/1000290165_r2fknc.jpg',
    tag: 'REVIEWS',
    title: 'Student Food Package Recommendation',
    category: 'Campus Student Solution',
    highlight: 'Budget-friendly, highly organized foodstuff packages that kept hostel cooking easy throughout the semester.'
  },
  {
    id: 'review-7',
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1788936206/1000290169_a200nl.jpg',
    tag: 'REVIEWS',
    title: 'Household Family Sourcing Made Easy',
    category: 'Family Food Basket',
    highlight: 'Relieved the burden of going to crowded local markets; fresh and neatly measured food delivered home.'
  },
  {
    id: 'review-8',
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1788936206/1000290168_wnxyel.jpg',
    tag: 'REVIEWS',
    title: 'Integrity in Weight & Measurements',
    category: 'Verified Buyer Feedback',
    highlight: 'Confirmed full measurements, clean grains, and value that exceeded open-market pricing.'
  },
  {
    id: 'review-9',
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1788936206/1000290166_llenof.jpg',
    tag: 'REVIEWS',
    title: 'Consistent Excellence & Repeat Patronage',
    category: 'Repeat Customer Testimony',
    highlight: 'Praised PGFV for keeping the same high hygiene and dependable standard on every single order.'
  }
];

export const TERMS_CONDITIONS = [
  'Participants are expected to make payments according to their selected savings option.',
  'One missed payment may be allowed if settled before the final payment/catch-up deadline (December 15, 2026).',
  'Consecutive missed payments may result in PGFV contacting the participant to review and reconcile participation.',
  'Participants who join after the start of the plan must make up for elapsed weeks according to their selected plan.',
  'Monthly participants must pay the applicable amount upfront for the agreed period.',
  'Final foodstuff package is based on total savings verified on or before the deadline.',
  'Package contents and quantities depend on prevailing market prices and product availability.',
  'Food preferences will be considered where possible but do not guarantee specific items or quantities.',
  'Christmas Foodstuff Savings Plan is not a hamper contribution or gifting scheme.',
  'Savings are intended towards a foodstuff package for the participant/household.',
  'Christmas hampers, employee packages and corporate gifting packages are available separately.',
  'Savings cards and payment receipts are issued after payment verification.',
  'Participants should retain payment records and savings details.',
  'Participants should provide accurate registration information.',
  'Participants should contact PGFV promptly with questions concerning their savings.'
];
