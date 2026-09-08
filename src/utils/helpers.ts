import { BUSINESS_INFO } from '../data/mockData';

export const PGFV_WHATSAPP_PHONE = '2349167621558';
export const PGFV_WHATSAPP_DISPLAY = '234-9167621558';

export function formatNaira(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0
  }).format(amount).replace('NGN', '₦');
}

export function createWhatsAppUrl(message: string, phone: string = PGFV_WHATSAPP_PHONE): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export const STORAGE_KEYS = {
  REGISTRATIONS: 'pgfv_registrations_v1',
  FOOD_PREFERENCES: 'pgfv_food_preferences_v1',
  ENQUIRIES: 'pgfv_enquiries_v1'
};

export function saveRegistrationLocally(data: Record<string, unknown>): string {
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEYS.REGISTRATIONS) || '[]');
    const id = `PGFV-2026-${String(existing.length + 101).padStart(4, '0')}`;
    const entry = {
      ...data,
      participantId: id,
      submittedAt: new Date().toISOString(),
      status: 'Pending Verification'
    };
    existing.push(entry);
    localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(existing));
    return id;
  } catch {
    return 'PGFV-2026-0999';
  }
}

export function saveFoodPreferenceLocally(data: Record<string, unknown>): boolean {
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEYS.FOOD_PREFERENCES) || '[]');
    existing.push({
      ...data,
      submittedAt: new Date().toISOString()
    });
    localStorage.setItem(STORAGE_KEYS.FOOD_PREFERENCES, JSON.stringify(existing));
    return true;
  } catch {
    return true;
  }
}

export function saveEnquiryLocally(data: Record<string, unknown>): boolean {
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEYS.ENQUIRIES) || '[]');
    existing.push({
      ...data,
      submittedAt: new Date().toISOString()
    });
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(existing));
    return true;
  } catch {
    return true;
  }
}
