export interface EventUseCase {
  id: string;
  name: string;
  description: string;
  iconName: string;
  badge: string;
}

export interface SnackOptionItem {
  id: string;
  name: string;
  category: 'chops' | 'pastries' | 'crunch' | 'drinks' | 'custom';
  description: string;
  isPopular?: boolean;
  availabilityNote: string; // e.g. "Where available - freshly prepared to order"
}

export interface SnackPackageTier {
  id: string;
  name: string;
  level: 'Mini' | 'Standard' | 'Premium' | 'Professional' | 'Custom Package';
  tagline: string;
  recommendedFor: string;
  typicalItems: string[];
  drinksIncluded: string;
  packagingStyle: string;
  popular?: boolean;
  startingBudgetDisplay: string;
  suggestedHeadcount: string;
}

export const EVENT_USE_CASES: EventUseCase[] = [
  {
    id: 'student-hangouts',
    name: 'Student Hangouts',
    description: 'Casual, budget-friendly snack packs for hostel get-togethers, study nights, and hall celebrations.',
    iconName: 'GraduationCap',
    badge: 'Campus Vibe'
  },
  {
    id: 'meetings',
    name: 'Meetings',
    description: 'Neatly packaged finger foods that keep board members, committee members, and executives refreshed.',
    iconName: 'Briefcase',
    badge: 'Executive & Compact'
  },
  {
    id: 'conferences',
    name: 'Conferences',
    description: 'Punctual, large-scale tea-break and intermission snack provisions with customized branding.',
    iconName: 'Building2',
    badge: 'High-Volume Capacity'
  },
  {
    id: 'seminars',
    name: 'Seminars & Workshops',
    description: 'Energizing mid-session snack boxes that keep seminar delegates engaged and well-nourished.',
    iconName: 'BookOpenCheck',
    badge: 'Training Refresher'
  },
  {
    id: 'church-programmes',
    name: 'Church Programmes',
    description: 'Mass fellowship packs, youth vigil treats, anniversary buffets, and department love feasts.',
    iconName: 'HeartHandshake',
    badge: 'Fellowship Ready'
  },
  {
    id: 'school-programmes',
    name: 'School Programmes',
    description: 'Wholesome snack packs for sports days, inter-house competitions, speech days, and graduation.',
    iconName: 'Award',
    badge: 'Youth & Academic'
  },
  {
    id: 'picnics',
    name: 'Picnics & Outdoor Trips',
    description: 'Portable, mess-free snack containers packed with chilled beverages for park days and excursions.',
    iconName: 'Sun',
    badge: 'Outdoor Friendly'
  },
  {
    id: 'birthdays',
    name: 'Birthdays & Celebrations',
    description: 'Colourful, party-ready snack boxes customized with the celebrant’s name and special birthday theme.',
    iconName: 'Cake',
    badge: 'Party Favourite'
  },
  {
    id: 'freshers-events',
    name: "Welcoming / Freshers' Events",
    description: 'High-energy welcome snack packs for incoming campus students, orientation weeks, and faculty galas.',
    iconName: 'PartyPopper',
    badge: 'Campus Welcome'
  },
  {
    id: 'corporate-events',
    name: 'Corporate Events',
    description: 'Polished corporate branding, bespoke ribbons, and executive snack assortments for end-of-year events.',
    iconName: 'Building',
    badge: 'Corporate Standard'
  },
  {
    id: 'private-gatherings',
    name: 'Private Gatherings',
    description: 'Intimate family reunions, bridal showers, housewarmings, and special dinners served with warmth.',
    iconName: 'Users',
    badge: 'Intimate & Warm'
  }
];

export const SNACK_OPTIONS: SnackOptionItem[] = [
  {
    id: 'small-chops',
    name: 'Small Chops Assortment',
    category: 'chops',
    description: 'Crispy samosa, crunchy spring rolls, golden puff puff, and succulent peppered gizzard/beef portions.',
    isPopular: true,
    availabilityNote: 'Where available — freshly fried on the morning of your event'
  },
  {
    id: 'puff-puff',
    name: 'Signature Puff Puff',
    category: 'pastries',
    description: 'Piping hot, aromatic, fluffy golden puff puff with natural hint of sweetness and nutmeg aroma.',
    isPopular: true,
    availabilityNote: 'Where available — prepared in large batches to order'
  },
  {
    id: 'doughnuts',
    name: 'Glazed & Sugar Doughnuts',
    category: 'pastries',
    description: 'Soft, melt-in-mouth yeast-raised doughnuts dusted with fine sugar or delicate glaze.',
    availabilityNote: 'Where available — limited daily batches'
  },
  {
    id: 'chin-chin',
    name: 'Crunchy Gourmet Chin Chin',
    category: 'crunch',
    description: 'Rich, buttery Nigerian chin chin with milky crunch that keeps guests nibbling happily.',
    isPopular: true,
    availabilityNote: 'Always available in stock'
  },
  {
    id: 'plantain-chips',
    name: 'Crispy Plantain Chips',
    category: 'crunch',
    description: 'Thinly sliced ripe or unripe plantain chips fried to a golden crunch with gentle sea salt.',
    availabilityNote: 'Where available — sourced fresh from farm batches'
  },
  {
    id: 'meat-pies',
    name: 'Flaky Meat / Chicken Pies',
    category: 'pastries',
    description: 'Golden, butter-crust pastry pockets filled with richly seasoned minced beef, potatoes, and carrots.',
    availabilityNote: 'Where available on advance pre-order'
  },
  {
    id: 'drinks-chapman',
    name: 'Signature Chapman / Mocktails',
    category: 'drinks',
    description: 'Refreshing iced Nigerian Chapman garnished with citrus and cucumber, or chilled fruit mocktails.',
    isPopular: true,
    availabilityNote: 'Where available — chilled transport in sealed cups or bottles'
  },
  {
    id: 'other-snacks',
    name: 'Custom Pastries & Finger Foods',
    category: 'custom',
    description: 'Sausage rolls, fish rolls, scotch eggs, grilled chicken skewers, and seasonal finger foods.',
    availabilityNote: 'Available on request for custom packages'
  }
];

export const SNACK_PACKAGE_TIERS: SnackPackageTier[] = [
  {
    id: 'tier-mini',
    name: 'Mini Package',
    level: 'Mini',
    tagline: 'Light, convenient snack boxes for intimate meetings & student study groups.',
    recommendedFor: '5 to 20 people (Hangouts, department meetings, thesis defenses)',
    typicalItems: [
      'Puff puff (4 pcs)',
      'Crunchy Chin Chin snack pouch',
      'Plantain chips or doughnut (where available)',
      'Bottled water or soft drink'
    ],
    drinksIncluded: 'Bottled water or chilled soft drink',
    packagingStyle: 'Clean branded snack pouch or mini box',
    startingBudgetDisplay: 'Flexible custom budget per person',
    suggestedHeadcount: '5 – 25 People'
  },
  {
    id: 'tier-standard',
    name: 'Standard Package',
    level: 'Standard',
    tagline: 'The most popular package for church fellowships, birthdays & school gatherings.',
    recommendedFor: '20 to 80 people (Church programs, birthdays, student seminars)',
    typicalItems: [
      'Small chops (Samosa + Spring roll + 3 Puff puff)',
      'Gourmet Chin Chin or meat pie slice',
      'Plantain chips (where available)',
      'Fruit juice or carbonated malt drink'
    ],
    drinksIncluded: 'Quality fruit juice pack or malt drink',
    packagingStyle: 'Neat party snack box with event label sticker',
    popular: true,
    startingBudgetDisplay: 'From ₦1,200 – ₦2,000 per person',
    suggestedHeadcount: '25 – 100 People'
  },
  {
    id: 'tier-premium',
    name: 'Premium Package',
    level: 'Premium',
    tagline: 'Deluxe small chops and craft drinks for corporate events & welcoming galas.',
    recommendedFor: '50 to 200 people (Conferences, freshers welcome, corporate retreats)',
    typicalItems: [
      'Deluxe Small Chops (Samosa, Spring Roll, Peppered Gizzard/Beef, 4 Puff puff)',
      'Flaky buttery meat pie or sausage roll',
      'Gourmet chin chin gift pack',
      'Iced Chapman or Signature Mocktail (where available)'
    ],
    drinksIncluded: 'Signature Chapman / Cocktail (where available) + Bottled water',
    packagingStyle: 'Sturdy transparent window box with custom event ribbon',
    startingBudgetDisplay: 'From ₦2,500 – ₦3,500 per person',
    suggestedHeadcount: '50 – 250 People'
  },
  {
    id: 'tier-professional',
    name: 'Professional Package',
    level: 'Professional',
    tagline: 'Comprehensive banquet catering & branded packaging for AGMs & conventions.',
    recommendedFor: '100+ people (Corporate summits, conventions, VIP celebrations)',
    typicalItems: [
      'Full Gourmet Finger Food Platter (Chicken skewer, samosa, spring roll, fish bite, puff puff)',
      'Deluxe pastry trio & branded chin chin tub',
      'Chilled Chapman in branded event cup with straw',
      'Personalized napkins & custom print sleeves'
    ],
    drinksIncluded: 'Premium Chapman/Cocktail + Fresh juice + Table water',
    packagingStyle: 'Customized full-colour branded boxes and cups',
    startingBudgetDisplay: 'Corporate quotation based on volume',
    suggestedHeadcount: '100 – 1,000+ People'
  },
  {
    id: 'tier-custom',
    name: 'Custom Package',
    level: 'Custom Package',
    tagline: 'You set the budget, pick exact snacks, and choose the headcount.',
    recommendedFor: 'Any headcount & any specific budget per person',
    typicalItems: [
      'Select any combination of puff puff, small chops, doughnuts, chin chin, and drinks',
      'Adjust portions to match your exact budget per person',
      'Configurable delivery time, venue logistics, and branding'
    ],
    drinksIncluded: 'Configurable (Chapman, Cocktail, Juice, Malt, or none)',
    packagingStyle: 'Customizable to preference',
    startingBudgetDisplay: 'Your exact specified budget',
    suggestedHeadcount: 'Any Group Size'
  }
];
