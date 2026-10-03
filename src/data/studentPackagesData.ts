export interface StudentPackageItem {
  name: string;
  quantity: string;
  measurementType?: 'kg' | 'congo' | 'pack' | 'litre' | 'unit';
  availableMeasurements?: string[];
  description?: string;
}

export interface StudentPackage {
  id: string;
  name: string;
  price: number; // 0 for custom
  priceDisplay: string;
  badge: string;
  description: string;
  targetAudience: string;
  image: string;
  items: StudentPackageItem[];
  customisable: boolean;
  availability: 'Available to Order' | 'In Stock' | 'Pre-Order';
  popular?: boolean;
  notes?: string[];
}

export interface SchoolOption {
  id: string;
  name: string;
  shortName?: string;
  location: string;
}

export const STUDENT_PACKAGES: StudentPackage[] = [
  {
    id: 'pkg-6000',
    name: '₦6,000 Campus Starter Pack',
    price: 6000,
    priceDisplay: '₦6,000',
    badge: 'Budget Friendly',
    description: 'Practical hostel food essentials portioned for students who want hygienic, quick-cooking staples on a tight budget.',
    targetAudience: 'Individual students, freshers, and quick hostel cooking needs.',
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1791028668/1000335112_pyj1we.jpg',
    availability: 'Available to Order',
    customisable: true,
    items: [
      {
        name: 'PGFV Pure Peeled Beans Flour (Instant Akara / Moi-Moi)',
        quantity: '1 Pack (500g)',
        measurementType: 'pack',
        availableMeasurements: ['500g Pack', '1kg Pack'],
        description: 'Stoneless, smooth, and ready in minutes without grinding stress.'
      },
      {
        name: 'Clean White / Yellow Drinking & Eba Garri',
        quantity: '1 Congo',
        measurementType: 'congo',
        availableMeasurements: ['1 Congo', '2 Congos', '1kg'],
        description: 'Crisp, sand-free, and well-sieved for quick hostel soaking.'
      },
      {
        name: 'Clean Long-Grain Parboiled Rice',
        quantity: '1 Congo',
        measurementType: 'congo',
        availableMeasurements: ['1 Congo', '2 Congos', '1kg'],
        description: 'Stoneless, fast cooking, and expands nicely.'
      },
      {
        name: 'Quick-Cooking Pasta / Noodles',
        quantity: '2 Packs',
        measurementType: 'pack',
        availableMeasurements: ['2 Packs', '4 Packs'],
        description: 'Emergency study fuel for late-night classes and exams.'
      },
      {
        name: 'Pure Refined Vegetable Cooking Oil',
        quantity: '500ml Bottle',
        measurementType: 'litre',
        availableMeasurements: ['500ml Bottle', '1 Litre Bottle'],
        description: 'Clean, cholesterol-free cooking oil.'
      },
      {
        name: 'Assorted Seasoning & Pure Table Salt',
        quantity: '1 Starter Unit',
        measurementType: 'unit',
        availableMeasurements: ['1 Unit', '2 Units'],
        description: 'Essential condiments for daily meal prep.'
      }
    ],
    notes: [
      'Packaged in hygienic, dust-proof bags suitable for hostel storage.',
      'Items can be customized or swapped based on your dietary preference.'
    ]
  },
  {
    id: 'pkg-10000',
    name: '₦10,000 Semester Sustenance Pack',
    price: 10000,
    priceDisplay: '₦10,000',
    badge: 'Most Popular',
    popular: true,
    description: 'Our most sought-after student package, providing a balanced combination of grains, protein, breakfast staples, and cooking oils.',
    targetAudience: 'Students wanting a solid monthly foundation with protein & variety.',
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1791028665/1000335098_vaje9l.jpg',
    availability: 'Available to Order',
    customisable: true,
    items: [
      {
        name: 'PGFV Pure Stoneless Beans Flour',
        quantity: '1kg Pack',
        measurementType: 'kg',
        availableMeasurements: ['1kg', '1.5kg'],
        description: 'Makes multiple batches of fluffy akara or steamed moi-moi.'
      },
      {
        name: 'Fortified Creamy Custard Powder',
        quantity: '500g Pack',
        measurementType: 'pack',
        availableMeasurements: ['500g Pack', '1kg Pack'],
        description: 'Rich, smooth breakfast fuel for early morning lecture dashes.'
      },
      {
        name: 'Selected Clean Parboiled Rice',
        quantity: '2 Congos',
        measurementType: 'congo',
        availableMeasurements: ['2 Congos', '3 Congos', '2kg'],
        description: 'Thoroughly destoned and dry for great taste.'
      },
      {
        name: 'Clean Crisp Garri (Drinking / Eba)',
        quantity: '2 Congos',
        measurementType: 'congo',
        availableMeasurements: ['2 Congos', '3 Congos', '2kg'],
        description: 'Sand-free, sour or sweet taste profile.'
      },
      {
        name: 'Neat Oven-Dried Catfish Portion',
        quantity: '1 Sealed Pack',
        measurementType: 'pack',
        availableMeasurements: ['1 Pack', '2 Packs'],
        description: 'Gutted, sand-free, and smoked oven-dried catfish for rich soups.'
      },
      {
        name: 'Double-Refined Cooking Vegetable Oil',
        quantity: '1 Litre Bottle',
        measurementType: 'litre',
        availableMeasurements: ['1 Litre', '1.5 Litres'],
        description: 'Pure, odorless, high smoke-point cooking oil.'
      },
      {
        name: 'Quick Spaghetti / Instant Noodles',
        quantity: '3 Packs',
        measurementType: 'pack',
        availableMeasurements: ['3 Packs', '5 Packs'],
        description: 'Quick-prep hostel staples.'
      },
      {
        name: 'Hostel Seasoning & Spice Combo Pack',
        quantity: '1 Complete Pack',
        measurementType: 'unit',
        availableMeasurements: ['1 Pack'],
        description: 'Maggi cubes, curry, thyme, and iodized table salt.'
      }
    ],
    notes: [
      'Delivered neatly bagged with protective packaging.',
      'Saves you significant market trips during test and exam weeks.'
    ]
  },
  {
    id: 'pkg-15000',
    name: '₦15,000 Mega Campus Value Pack',
    price: 15000,
    priceDisplay: '₦15,000',
    badge: 'Maximum Value',
    description: 'Comprehensive high-yield food supply with dual proteins, extra grains, breakfast items, and cooking oils to comfortably cover multiple weeks.',
    targetAudience: 'Roommates sharing costs, students who cook daily, or full semester coverage.',
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1791028665/1000335096_z0acdh.jpg',
    availability: 'Available to Order',
    customisable: true,
    items: [
      {
        name: 'PGFV Premium Beans Flour (100% Peeled)',
        quantity: '1.5kg Pack',
        measurementType: 'kg',
        availableMeasurements: ['1.5kg', '2kg', '3kg'],
        description: 'Instant akara, moi-moi, or gbegiri soup.'
      },
      {
        name: 'Fortified Custard Powder (Vanilla / Milk Flavour)',
        quantity: '1kg Family Size Pack',
        measurementType: 'kg',
        availableMeasurements: ['1kg', '2kg'],
        description: 'Nutritious breakfast staple that lasts.'
      },
      {
        name: 'Clean Long-Grain Parboiled Rice',
        quantity: '3 Congos',
        measurementType: 'congo',
        availableMeasurements: ['3 Congos', '4 Congos', '3kg'],
        description: 'Stone-free, high yield.'
      },
      {
        name: 'Clean White / Yellow Ijebu Garri',
        quantity: '3 Congos',
        measurementType: 'congo',
        availableMeasurements: ['3 Congos', '4 Congos', '3kg'],
        description: 'Crisp, sandless, and refreshing.'
      },
      {
        name: 'Oven-Dried Catfish Portion (Gutted & Cleaned)',
        quantity: '2 Sealed Packs',
        measurementType: 'pack',
        availableMeasurements: ['2 Packs', '3 Packs'],
        description: 'Rich, sand-free smoked catfish for delicious stews.'
      },
      {
        name: 'Neat Sun-Dried Ponmo Ijebu',
        quantity: '1 Clean Pack',
        measurementType: 'pack',
        availableMeasurements: ['1 Pack', '2 Packs'],
        description: 'Hygienically prepared, swells tenderly during cooking.'
      },
      {
        name: 'Pure Cooking Oil (Vegetable Oil & Red Palm Oil)',
        quantity: '1.5 Litres Combined',
        measurementType: 'litre',
        availableMeasurements: ['1.5 Litres', '2 Litres'],
        description: 'Both clear vegetable oil and traditional unadulterated red oil.'
      },
      {
        name: 'Quick Pasta / Noodles Bundle',
        quantity: '5 Assorted Packs',
        measurementType: 'pack',
        availableMeasurements: ['5 Packs', '8 Packs'],
        description: 'Great for busy schedules and fast group meals.'
      },
      {
        name: 'Premium Seasoning, Spices & Table Salt Pack',
        quantity: '1 Full Set',
        measurementType: 'unit',
        availableMeasurements: ['1 Set'],
        description: 'All basic meal seasonings included.'
      }
    ],
    notes: [
      'Ideal for individual students or 2 roommates splitting expenses.',
      'Saves up to 15% compared to purchasing items individually in campus kiosks.'
    ]
  },
  {
    id: 'pkg-custom',
    name: 'Custom Budget Student Package',
    price: 0,
    priceDisplay: 'Custom Budget',
    badge: 'Build Your Own',
    description: 'Have a specific budget like ₦8,500, ₦12,000, ₦20,000 or unique food preferences? Tell us your exact budget and preferred items, and we will build it for you.',
    targetAudience: 'Any student with specific budgets, dietary requirements, or special item requests.',
    image: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1791028643/1000335093_cavnkr.jpg',
    availability: 'Available to Order',
    customisable: true,
    items: [
      {
        name: 'Any Combination of PGFV Flours & Mixes',
        quantity: 'Per your budget',
        description: 'Beans flour, custard, plantain flour, yam flour, puff puff mix.'
      },
      {
        name: 'Any Choice of Grains & Staples',
        quantity: 'In Kg or Congos',
        description: 'Parboiled rice, white/yellow garri, noodles, spaghetti, yam.'
      },
      {
        name: 'Proteins of Choice',
        quantity: 'Per your budget',
        description: 'Oven-dried catfish, dried ponmo ijebu, or egg trays where available.'
      },
      {
        name: 'Oils & Cooking Condiments',
        quantity: 'Custom sizes',
        description: 'Vegetable oil, red palm oil, seasonings, and salt.'
      }
    ],
    notes: [
      'No minimum or fixed limit — we advise you on the best combination for your budget.',
      'PGFV team will review your custom enquiry and provide a transparent item breakdown.'
    ]
  }
];

export const CAMPUS_SCHOOLS_LIST: SchoolOption[] = [
  {
    id: 'school-oau',
    name: 'Obafemi Awolowo University (OAU), Ile-Ife',
    shortName: 'OAU Ile-Ife',
    location: 'Ile-Ife, Osun State'
  },
  {
    id: 'school-uniosun',
    name: 'Osun State University (UNIOSUN)',
    shortName: 'UNIOSUN',
    location: 'Osogbo / Ife / Ipetu Campuses'
  },
  {
    id: 'school-fedpoly-ede',
    name: 'Federal Polytechnic, Ede',
    shortName: 'FedPoly Ede',
    location: 'Ede, Osun State'
  },
  {
    id: 'school-oui',
    name: 'Oduduwa University, Ipetumodu (OUI)',
    shortName: 'OUI Ipetumodu',
    location: 'Ipetumodu / Ile-Ife'
  },
  {
    id: 'school-adeleke',
    name: 'Adeleke University, Ede',
    shortName: 'Adeleke University',
    location: 'Ede, Osun State'
  },
  {
    id: 'school-bowen',
    name: 'Bowen University, Iwo',
    shortName: 'Bowen Iwo',
    location: 'Iwo, Osun State'
  },
  {
    id: 'school-osun-coed',
    name: 'Osun State College of Education, Ilesa / Ila-Orangun',
    shortName: 'OSCOED',
    location: 'Ilesa / Ila-Orangun'
  },
  {
    id: 'school-poly-ibadan',
    name: 'The Polytechnic, Ibadan',
    shortName: 'Poly Ibadan',
    location: 'Ibadan, Oyo State'
  },
  {
    id: 'school-ui',
    name: 'University of Ibadan (UI)',
    shortName: 'UI Ibadan',
    location: 'Ibadan, Oyo State'
  },
  {
    id: 'school-futa',
    name: 'Federal University of Technology Akure (FUTA)',
    shortName: 'FUTA',
    location: 'Akure, Ondo State'
  },
  {
    id: 'school-other',
    name: 'Other / My institution is not listed',
    shortName: 'Other Institution',
    location: 'Nigeria'
  }
];

export const STUDENT_FAQS = [
  {
    q: 'Who can order a Student Food Package?',
    a: 'Our student packages are designed specifically for university, polytechnic, and college students living in hostels or off-campus residences, but any student or young earner within our delivery network can order.'
  },
  {
    q: 'Can I choose my own budget instead of the fixed packages?',
    a: 'Yes, absolutely! While our ₦6,000, ₦10,000, and ₦15,000 packages offer great preset value, you can use the "Build Your Own" option to specify ANY amount (for example, ₦8,500 or ₦20,000) and we will tailor package contents to fit your budget.'
  },
  {
    q: 'Can I customise a package to swap or remove certain items?',
    a: 'Yes. If you prefer more beans flour and less garri, or want extra catfish, simply select "Yes" on the customisation toggle and state your preferences. All custom requests are subject to product availability and confirmed with you on WhatsApp.'
  },
  {
    q: 'Can I choose measurements in kilograms (Kg) or congos?',
    a: 'Yes! For relevant items such as rice and garri, we support both Congos and Kilograms where applicable. You can indicate your preferred measurement during enquiry.'
  },
  {
    q: 'Can I order more than one package or order for my roommates?',
    a: 'Yes. You can order multiple quantities (e.g., 2, 3, or 5 packages) for you and your roommates to share delivery costs and stock up for the semester.'
  },
  {
    q: 'Can PGFV deliver directly to my hostel or hall of residence?',
    a: 'Yes! When placing your enquiry, specify your school, hall of residence (e.g. Mozambique Hall, Fajuyi, Anglomoz, PG Hall, or off-campus street address) and nearest landmark. The PGFV team will confirm exact delivery arrangements and dispatch to your location.'
  },
  {
    q: 'Can I order if my school is outside Ile-Ife?',
    a: 'Yes. PGFV delivers actively within Ile-Ife, across Osun State, and to other student campuses in Nigeria subject to logistics. Delivery arrangements and fees will be communicated transparently on WhatsApp.'
  },
  {
    q: 'How will I know if my order is confirmed?',
    a: 'After you submit the enquiry and continue to WhatsApp, our PGFV support team will confirm availability, item details, payment instructions, and the delivery timeline directly with you.'
  },
  {
    q: 'Can I request food items that are not in the standard packages?',
    a: 'Yes. Simply use the Custom Package option or mention in the "Custom Request" box what items you would like (e.g. yam tubers, plantain flour, eggs, seasonings). We will review and advise on available options.'
  }
];
