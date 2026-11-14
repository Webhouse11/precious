import React, { useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import {
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  LogIn,
  ShieldCheck,
  ArrowRight,
  UserCheck,
  Clock
} from 'lucide-react';
import { auth, signInWithGoogle, signOutUser } from '../../lib/firebase';
import { getActiveCampaign, getAmbassadorByUid, registerAmbassador } from '../../services/referralService';
import { Ambassador, Campaign } from '../../types/referral';
import { DEFAULT_CHRISTMAS_CAMPAIGN } from '../../utils/referralUtils';
import { PageView } from '../../types';

interface AmbassadorRegisterPageProps {
  onNavigate: (page: PageView, sectionId?: string) => void;
}

const NIGERIAN_STATES = [
  'Osun', 'Oyo', 'Lagos', 'Ogun', 'Ondo', 'Ekiti', 'Kwara', 'Abuja (FCT)',
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue',
  'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Enugu', 'Gombe', 'Imo',
  'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Nasarawa', 'Niger',
  'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara', 'Outside Nigeria'
];

const SOCIAL_PLATFORMS = [
  'WhatsApp',
  'Instagram',
  'Facebook',
  'TikTok',
  'X (Twitter)',
  'YouTube',
  'Campus / Community Groups'
];

export const AmbassadorRegisterPage: React.FC<AmbassadorRegisterPageProps> = ({
  onNavigate
}) => {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [existingAmbassador, setExistingAmbassador] = useState<Ambassador | null>(null);
  const [campaign, setCampaign] = useState<Campaign>(DEFAULT_CHRISTMAS_CAMPAIGN);
  const [checkingExisting, setCheckingExisting] = useState(true);

  // Registration Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [stateName, setStateName] = useState('Osun');
  const [city, setCity] = useState('');
  const [socialPlatform, setSocialPlatform] = useState('WhatsApp');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const [authLoading, setAuthLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedRecord, setSubmittedRecord] = useState<Ambassador | null>(null);

  useEffect(() => {
    getActiveCampaign('christmas-2026').then(setCampaign).catch(() => {});

    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        setFullName((prev) => prev || u.displayName || '');
        setEmail(u.email || '');
        try {
          const found = await getAmbassadorByUid(u.uid);
          setExistingAmbassador(found);
        } catch {
          setExistingAmbassador(null);
        }
      } else {
        setExistingAmbassador(null);
      }
      setCheckingExisting(false);
    });
    return () => unsub();
  }, []);

  const handleGoogleSignIn = async () => {
    setError(null);
    setAuthLoading(true);
    try {
      const signedIn = await signInWithGoogle();
      setFullName((prev) => prev || signedIn.displayName || '');
      setEmail(signedIn.email || '');
      const found = await getAmbassadorByUid(signedIn.uid);
      setExistingAmbassador(found);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google Sign-In failed. Please try again.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!user) {
      setError('Please sign in with Google first to verify your account identity.');
      return;
    }
    if (!fullName.trim() || fullName.trim().length < 3) {
      setError('Please enter your full name.');
      return;
    }
    const digits = phone.replace(/[^0-9]/g, '');
    if (digits.length < 10) {
      setError('Please enter a valid 11-digit Nigerian or international phone/WhatsApp number.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!stateName.trim()) {
      setError('Please select your state.');
      return;
    }
    if (!city.trim()) {
      setError('Please enter your city or town.');
      return;
    }
    if (!agreedToTerms) {
      setError('You must agree to the Campaign Terms & Conditions and Privacy Notice.');
      return;
    }

    setSubmitting(true);
    try {
      const created = await registerAmbassador(user, {
        fullName,
        phone,
        email,
        state: stateName,
        city,
        socialPlatform,
        agreedToTerms,
        campaignId: campaign.id,
      });
      setSubmittedRecord(created);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to submit application. Please verify your details and retry.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1E2320] pb-16">
      {/* Top breadcrumb */}
      <div className="bg-[#FAF5EC] border-b border-[#E8E2D5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-xs text-[#6B7B73]">
          <button type="button" onClick={() => onNavigate('home')} className="hover:text-[#1B4332] cursor-pointer">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button
            type="button"
            onClick={() => onNavigate('christmas-ambassadors')}
            className="hover:text-[#1B4332] cursor-pointer"
          >
            Christmas Ambassadors
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#143527] font-bold">Register</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 space-y-8">
        <div className="space-y-2 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C68A1B] block">
            {campaign.name}
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#143527]">
            Ambassador Registration
          </h1>
          <p className="text-sm text-[#52635B] max-w-xl mx-auto">
            Apply below to become an approved PGFV Christmas Ambassador. Applications are reviewed manually by PGFV management.
          </p>
        </div>

        {/* Success View */}
        {submittedRecord ? (
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E3DCD0] shadow-lg text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C68A1B] block">
                Application Submitted — Pending Approval
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#143527]">
                Thank You, {submittedRecord.fullName}!
              </h2>
              <p className="text-sm text-[#52635B] max-w-md mx-auto">
                Your application has been received and PGFV administrators have been notified for review.
              </p>
            </div>

            <div className="max-w-md mx-auto p-5 rounded-2xl bg-[#FAF7F2] border border-[#E5DDD0] space-y-2.5 text-left text-sm">
              <div className="flex items-center justify-between">
                <span className="text-[#6B7B73]">Reference Number:</span>
                <span className="font-mono font-bold text-[#143527]">{submittedRecord.applicationRef}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#6B7B73]">Account Status:</span>
                <span className="font-bold text-amber-700 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  PENDING APPROVAL
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#6B7B73]">Email:</span>
                <span className="font-medium text-[#143527]">{submittedRecord.email}</span>
              </div>
            </div>

            <p className="text-xs text-[#6B7B73] max-w-md mx-auto">
              Only approved ambassadors receive an active referral link. Once approved, your unique code and link will appear immediately inside your Ambassador Dashboard.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onNavigate('ambassador-dashboard')}
                className="min-h-[44px] px-6 py-2.5 rounded-xl bg-[#1B4332] hover:bg-[#143527] text-white font-bold text-sm flex items-center gap-2 cursor-pointer"
              >
                <span>Open Ambassador Dashboard</span>
                <ArrowRight className="w-4 h-4 text-[#E2B13C]" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('christmas-ambassadors')}
                className="min-h-[44px] px-5 py-2.5 rounded-xl border border-[#D5CCBE] bg-white hover:bg-[#FAF7F2] text-[#143527] font-bold text-sm cursor-pointer"
              >
                Back to Campaign Page
              </button>
            </div>
          </div>
        ) : existingAmbassador ? (
          <div className="bg-white rounded-3xl p-8 border border-[#E3DCD0] shadow-sm text-center space-y-4">
            <UserCheck className="w-12 h-12 text-[#1B4332] mx-auto" />
            <h2 className="font-heading font-extrabold text-xl text-[#143527]">
              You Already Have an Ambassador Application
            </h2>
            <p className="text-sm text-[#52635B] max-w-md mx-auto">
              Signed in as <strong>{existingAmbassador.email}</strong> (Ref: <span className="font-mono font-bold">{existingAmbassador.applicationRef}</span>). Current status: <strong>{existingAmbassador.status.replace(/_/g, ' ')}</strong>.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onNavigate('ambassador-dashboard')}
                className="min-h-[44px] px-6 py-2.5 rounded-xl bg-[#1B4332] text-white font-bold text-sm cursor-pointer"
              >
                Go to My Dashboard
              </button>
              <button
                type="button"
                onClick={() => signOutUser()}
                className="min-h-[44px] px-5 py-2.5 rounded-xl border border-[#D5CCBE] text-[#143527] font-bold text-sm cursor-pointer"
              >
                Switch Account
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E3DCD0] shadow-sm space-y-6">
            {!campaign.registrationOpen && (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-900 flex items-center gap-2.5">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>Ambassador registration for this campaign is currently closed.</span>
              </div>
            )}

            {/* Step 1: Google Verification */}
            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E5DDD0] space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#C68A1B] block">
                    Step 1 of 2 — Account Verification
                  </span>
                  <h2 className="font-heading font-bold text-base text-[#143527]">
                    {user ? 'Signed In & Verified' : 'Sign In with Google to Protect Your Account'}
                  </h2>
                </div>
                {user && (
                  <button
                    type="button"
                    onClick={() => signOutUser()}
                    className="text-xs font-semibold text-[#6B7B73] hover:text-[#143527] underline cursor-pointer"
                  >
                    Switch Account
                  </button>
                )}
              </div>

              {user ? (
                <div className="flex items-center gap-3 text-xs sm:text-sm text-[#1B4332] bg-white p-3 rounded-xl border border-[#E2DDD3]">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <p className="font-bold text-[#143527]">{user.displayName || 'Google Account Verified'}</p>
                    <p className="text-[#52635B]">{user.email}</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-2.5">
                  <p className="text-xs text-[#52635B]">
                    Signing in connects your application directly to your secure Ambassador Dashboard so only you can view your stats and referral link.
                  </p>
                  <button
                    type="button"
                    disabled={authLoading || checkingExisting}
                    onClick={handleGoogleSignIn}
                    className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#1B4332] hover:bg-[#143527] disabled:opacity-60 text-white font-bold text-sm flex items-center gap-2 cursor-pointer"
                  >
                    <LogIn className="w-4 h-4 text-[#E2B13C]" />
                    <span>{authLoading ? 'Connecting Google Account...' : 'Sign In with Google'}</span>
                  </button>
                </div>
              )}
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs sm:text-sm text-red-800 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Step 2: Registration Details */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label htmlFor="amb-full-name" className="block text-xs font-bold text-[#143527] mb-1.5">
                    1. Full Name *
                  </label>
                  <input
                    id="amb-full-name"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your legal full name"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CCBE] bg-[#FDFBF7] text-sm text-[#143527] focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
                  />
                </div>

                <div>
                  <label htmlFor="amb-phone" className="block text-xs font-bold text-[#143527] mb-1.5">
                    2. Phone / WhatsApp Number *
                  </label>
                  <input
                    id="amb-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 08012345678"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CCBE] bg-[#FDFBF7] text-sm text-[#143527] focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
                  />
                </div>

                <div>
                  <label htmlFor="amb-email" className="block text-xs font-bold text-[#143527] mb-1.5">
                    3. Email Address *
                  </label>
                  <input
                    id="amb-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    readOnly={Boolean(user?.email)}
                    placeholder="you@example.com"
                    className={`w-full px-3.5 py-2.5 rounded-xl border border-[#D5CCBE] text-sm text-[#143527] focus:outline-none focus:ring-2 focus:ring-[#1B4332] ${
                      user?.email ? 'bg-[#F3EFE6] text-[#52635B]' : 'bg-[#FDFBF7]'
                    }`}
                  />
                </div>

                <div>
                  <label htmlFor="amb-state" className="block text-xs font-bold text-[#143527] mb-1.5">
                    4. State *
                  </label>
                  <select
                    id="amb-state"
                    value={stateName}
                    onChange={(e) => setStateName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CCBE] bg-[#FDFBF7] text-sm text-[#143527] focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
                  >
                    {NIGERIAN_STATES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="amb-city" className="block text-xs font-bold text-[#143527] mb-1.5">
                    5. City or Town *
                  </label>
                  <input
                    id="amb-city"
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Ile-Ife, Osogbo, Ibadan"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CCBE] bg-[#FDFBF7] text-sm text-[#143527] focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="amb-social" className="block text-xs font-bold text-[#143527] mb-1.5">
                    6. Preferred Social Media Platform *
                  </label>
                  <select
                    id="amb-social"
                    value={socialPlatform}
                    onChange={(e) => setSocialPlatform(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CCBE] bg-[#FDFBF7] text-sm text-[#143527] focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
                  >
                    {SOCIAL_PLATFORMS.map((plat) => (
                      <option key={plat} value={plat}>
                        {plat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DDD0]">
                <label className="flex items-start gap-3 cursor-pointer text-xs sm:text-sm text-[#3E4D45]">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-[#1B4332]"
                  />
                  <span>
                    <strong>7. Agreement to Campaign Terms & Privacy Notice *</strong> — I confirm that the details above are genuine, that I will only promote PGFV accurately, and that qualification requires 10 genuinely new customers with completed orders and manually verified payments within December 1–10, 2026.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={submitting || !user || !campaign.registrationOpen}
                className="w-full min-h-[48px] py-3.5 px-6 rounded-xl bg-[#1B4332] hover:bg-[#143527] disabled:opacity-50 text-white font-heading font-bold text-sm sm:text-base shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{submitting ? 'Submitting Application...' : 'Submit Ambassador Application'}</span>
                <ArrowRight className="w-4 h-4 text-[#E2B13C]" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
