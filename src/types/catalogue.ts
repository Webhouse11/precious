export type ProductCategory = 
  | 'all'
  | 'foodstuff'
  | 'foodstuff-boxes'
  | 'food-packages'
  | 'event-packages'
  | 'seasonal-packages'
  | 'snacks'
  | 'other';

export type ProductAvailability = 
  | 'in-stock'
  | 'available-to-order'
  | 'available-on-request'
  | 'where-available'
  | 'seasonal';

export interface ProductSizeOption {
  id: string;
  label: string; // e.g., '500g', '1kg', '2kg', '1 Congo', '5kg'
  price?: number; // Exact price in NGN if fixed (e.g. 2300, 4500, 8500)
  priceDisplay?: string; // e.g., '₦2,300', '₦3,000 upward' or undefined -> 'Request Price'
  note?: string; // e.g. 'More available on request', 'Depends on size & quantity'
}

export interface CatalogueProduct {
  id: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  description: string;
  detailedSpecs?: string[];
  image: string;
  sizes: ProductSizeOption[];
  defaultSizeIndex?: number;
  availability: ProductAvailability;
  availabilityLabel: string;
  tag?: string;
  minOrder?: string;
  pricingType: 'fixed' | 'starting-from' | 'request-price';
  featured?: boolean;
}

export interface CartItem {
  id: string; // unique cart entry id
  productId: string;
  name: string;
  image: string;
  category: string;
  selectedSize: ProductSizeOption;
  quantity: number;
  subtotal?: number; // if price is known
  priceDisplay: string;
}

export interface BulkOrderFormState {
  fullName: string;
  phone: string;
  email?: string;
  organization?: string;
  productsRequired: string;
  estimatedVolume: string;
  targetDeliveryDate: string;
  deliveryTown: string;
  budgetEstimate?: string;
  notes?: string;
}

export interface CustomPackageFormState {
  fullName: string;
  phone: string;
  email?: string;
  packageType: 'Family Box' | 'Student Package' | 'Corporate Welfare' | 'Event Souvenir' | 'Community Outreach' | 'Custom';
  numberOfPackages: number;
  targetBudgetPerPackage: string;
  selectedStaples: string[];
  preferredDeliveryDate: string;
  deliveryLocation: string;
  customBrandingRequired: boolean;
  notes?: string;
}
