import { Campaign } from '../types/referral';

export const PGFV_OFFICIAL_BASE_URL = 'https://www.preciousgemfoods.com.ng';

export const DEFAULT_CHRISTMAS_CAMPAIGN: Campaign = {
  id: 'christmas-2026',
  name: 'PGFV Christmas Referral Ambassador Programme 2026',
  slug: 'christmas-ambassadors',
  description:
    'Share the goodness of Precious Gem Foods this Christmas. Invite new customers to shop with us and earn a special ₦8,000 PGFV Christmas Food Box when you successfully refer 10 qualifying new customers.',
  startDate: '2026-12-01',
  endDate: '2026-12-10',
  timezone: 'Africa/Lagos',
  referralTarget: 10,
  rewardDescription: 'One ₦8,000 PGFV Christmas Food Box',
  rewardValueNgn: 8000,
  attributionWindowDays: 30,
  qualificationRules:
    'Each qualifying referral must be a genuinely new customer (verified by normalized phone and email), not the ambassador, with a completed website or WhatsApp order placed within December 1–10, 2026 (Africa/Lagos) whose payment has been manually verified by PGFV management.',
  status: 'active',
  registrationOpen: true,
  createdBy: 'system',
};

/**
 * Normalizes Nigerian and international phone numbers to a canonical digit key
 * e.g. 08012345678, +2348012345678, 234 801-234-5678 -> 2348012345678
 */
export function normalizePhoneNumber(raw: string): string {
  const digits = (raw || '').replace(/[^0-9]/g, '');
  if (!digits) return '';
  if (digits.startsWith('234') && digits.length >= 13) {
    return digits;
  }
  if (digits.startsWith('0') && digits.length === 11) {
    return '234' + digits.slice(1);
  }
  if (digits.length === 10 && !digits.startsWith('0')) {
    return '234' + digits;
  }
  return digits;
}

export function normalizeEmail(raw: string): string {
  return (raw || '').trim().toLowerCase();
}

export async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }
  // Fallback deterministic alphanumeric hash if subtle is unavailable
  let h1 = 0xdeadbeef;
  let h2 = 0x41c6ce57;
  for (let i = 0; i < input.length; i++) {
    const ch = input.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  return (h1 >>> 0).toString(16).padStart(8, '0') + (h2 >>> 0).toString(16).padStart(8, '0');
}

/**
 * Generates a cryptographically secure random alphanumeric token (excluding ambiguous O/0/I/1).
 */
export function generateSecureRandomChars(length: number): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const result: string[] = [];
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const bytes = new Uint32Array(length);
    crypto.getRandomValues(bytes);
    for (let i = 0; i < length; i++) {
      result.push(alphabet[bytes[i] % alphabet.length]);
    }
  } else {
    for (let i = 0; i < length; i++) {
      result.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
    }
  }
  return result.join('');
}

export function generateCandidateReferralCode(): string {
  return `PGFV-${generateSecureRandomChars(5)}`;
}

export function generateApplicationRef(): string {
  return `PGFV-AMB-${generateSecureRandomChars(6)}`;
}

export function generateOrderRef(): string {
  return `PGFV-ORDER-${generateSecureRandomChars(6)}`;
}

export function generateAttributionRef(): string {
  return `ATTR-${generateSecureRandomChars(8)}`;
}

export function generateUniqueDocId(prefix: string): string {
  return `${prefix}-${Date.now()}-${generateSecureRandomChars(5)}`;
}

export function buildReferralLink(code: string): string {
  const origin =
    typeof window !== 'undefined' &&
    window.location.hostname !== 'localhost' &&
    !window.location.hostname.includes('127.0.0.1')
      ? window.location.origin
      : PGFV_OFFICIAL_BASE_URL;
  return `${origin}/?ref=${encodeURIComponent(code)}`;
}

/**
 * Returns YYYY-MM-DD in Africa/Lagos timezone.
 */
export function getLagosDateString(date: Date = new Date()): string {
  try {
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Africa/Lagos',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    return formatter.format(date);
  } catch {
    return date.toISOString().slice(0, 10);
  }
}

export function isDateWithinCampaignWindow(
  dateStr: string,
  campaign: Pick<Campaign, 'startDate' | 'endDate'>
): boolean {
  if (!dateStr) return false;
  const clean = dateStr.slice(0, 10);
  return clean >= campaign.startDate.slice(0, 10) && clean <= campaign.endDate.slice(0, 10);
}

export function isBeforeCampaignStart(
  dateStr: string,
  campaign: Pick<Campaign, 'startDate'>
): boolean {
  return dateStr.slice(0, 10) < campaign.startDate.slice(0, 10);
}

export function isAfterCampaignEnd(
  dateStr: string,
  campaign: Pick<Campaign, 'endDate'>
): boolean {
  return dateStr.slice(0, 10) > campaign.endDate.slice(0, 10);
}

export function formatFirestoreTimestamp(ts: unknown): string {
  if (!ts) return '—';
  try {
    if (typeof ts === 'string') {
      return new Date(ts).toLocaleString('en-NG', { timeZone: 'Africa/Lagos' });
    }
    if (typeof ts === 'object' && ts !== null && 'toDate' in ts && typeof (ts as { toDate: () => Date }).toDate === 'function') {
      return (ts as { toDate: () => Date }).toDate().toLocaleString('en-NG', {
        timeZone: 'Africa/Lagos',
        dateStyle: 'medium',
        timeStyle: 'short',
      });
    }
    if (typeof ts === 'object' && ts !== null && 'seconds' in ts) {
      return new Date((ts as { seconds: number }).seconds * 1000).toLocaleString('en-NG', {
        timeZone: 'Africa/Lagos',
        dateStyle: 'medium',
        timeStyle: 'short',
      });
    }
  } catch {
    return '—';
  }
  return '—';
}

export function downloadCsv(filename: string, headers: string[], rows: (string | number | boolean | undefined | null)[][]): void {
  const escapeCell = (val: string | number | boolean | undefined | null): string => {
    const s = val === undefined || val === null ? '' : String(val);
    if (s.includes('"') || s.includes(',') || s.includes('\n') || s.includes('\r')) {
      return `"${s.replace(/"/g, '""')}"`;
    }
    return s;
  };

  const lines = [
    headers.map(escapeCell).join(','),
    ...rows.map((r) => r.map(escapeCell).join(',')),
  ];
  const csvContent = '\uFEFF' + lines.join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
