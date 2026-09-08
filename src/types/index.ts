export interface Product {
  id: string;
  name: string;
  category: 'FLOUR & MIXES' | 'GRAINS & FOODSTUFF' | 'PROTEINS' | 'SNACKS' | 'DRINKS' | 'OTHER';
  description: string;
  image: string;
  packagingDetails?: string;
  tag?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  targetAudience?: string;
  features?: string[];
}

export interface SavingsPlan {
  id: string;
  weeklyAmount: number;
  label: string;
  tagline: string;
  recommendedFor: string;
  popular?: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'SAVINGS PLAN' | 'PAYMENTS & VERIFICATION' | 'DELIVERY & PACKAGES' | 'GENERAL & PRODUCTS';
}

export interface ParticipantRecord {
  participantId: string;
  fullName: string;
  planName: string;
  weeklyAmount: number;
  weeksContributed: number;
  totalSaved: number;
  registrationDate: string;
  status: 'Active' | 'Completed' | 'Pending Verification';
  lastPaymentDate: string;
  paymentReference: string;
}

export type PageView = 
  | 'home'
  | 'about'
  | 'products'
  | 'services'
  | 'savings'
  | 'students'
  | 'impact'
  | 'partnerships'
  | 'faq'
  | 'contact'
  | 'terms'
  | 'privacy';
