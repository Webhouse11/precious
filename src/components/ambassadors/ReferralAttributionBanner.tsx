import React, { useEffect, useState } from 'react';
import { Tag, X } from 'lucide-react';
import { getStoredAttribution } from '../../services/referralTracking';
import { ReferralAttributionCookie } from '../../types/referral';

interface ReferralAttributionBannerProps {
  attribution?: ReferralAttributionCookie | null;
}

export const ReferralAttributionBanner: React.FC<ReferralAttributionBannerProps> = ({
  attribution
}) => {
  const [activeAttr, setActiveAttr] = useState<ReferralAttributionCookie | null>(
    attribution || null
  );
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setActiveAttr(attribution || getStoredAttribution());
  }, [attribution]);

  if (!activeAttr || dismissed) return null;

  return (
    <div className="bg-[#FAF5EC] border-b border-[#E2B13C]/40 text-[#143527] text-xs py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Tag className="w-3.5 h-3.5 text-[#C68A1B] shrink-0" />
          <span>
            Shopping with PGFV Christmas Ambassador Referral Code{' '}
            <strong className="font-mono text-[#1B4332]">{activeAttr.referralCode}</strong> — automatically applied to your website & WhatsApp orders.
          </span>
        </div>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Hide referral notice"
          className="p-1 text-[#6B7B73] hover:text-[#143527] cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
