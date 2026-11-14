import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { LogIn, ShieldCheck, ArrowRight, AlertCircle, UserPlus, Lock } from 'lucide-react';
import { auth, signInWithGoogle, signOutUser } from '../../lib/firebase';
import { getAmbassadorByUid } from '../../services/referralService';
import { PageView } from '../../types';

interface AmbassadorLoginPageProps {
  onNavigate: (page: PageView, sectionId?: string) => void;
}

export const AmbassadorLoginPage: React.FC<AmbassadorLoginPageProps> = ({ onNavigate }) => {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [checking, setChecking] = useState(true);
  const [loading, setLoading] = useState(false);
  const [noProfileYet, setNoProfileYet] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        try {
          const amb = await getAmbassadorByUid(u.uid);
          if (amb) {
            onNavigate('ambassador-dashboard');
            return;
          } else {
            setNoProfileYet(true);
          }
        } catch {
          setNoProfileYet(false);
        }
      } else {
        setNoProfileYet(false);
      }
      setChecking(false);
    });
    return () => unsub();
  }, [onNavigate]);

  const handleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      const signedIn = await signInWithGoogle();
      const amb = await getAmbassadorByUid(signedIn.uid);
      if (amb) {
        onNavigate('ambassador-dashboard');
      } else {
        setNoProfileYet(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-14 sm:py-20 px-4">
      <div className="max-w-md mx-auto bg-white rounded-3xl border border-[#E3DCD0] shadow-lg p-7 sm:p-9 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#1B4332] text-[#E2B13C] flex items-center justify-center mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#C68A1B] block">
            PGFV Ambassador Portal
          </span>
          <h1 className="font-heading font-extrabold text-2xl text-[#143527]">
            Ambassador Sign In
          </h1>
          <p className="text-xs sm:text-sm text-[#52635B]">
            Sign in securely to view your referral link, progress tracker (0/10 to 10/10), and reward status.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {checking ? (
          <div className="py-8 text-center text-xs text-[#6B7B73]">Checking session...</div>
        ) : noProfileYet && user ? (
          <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E5DDD0] space-y-3 text-center">
            <p className="text-xs sm:text-sm text-[#143527] font-semibold">
              No ambassador profile found for <strong>{user.email}</strong>.
            </p>
            <p className="text-xs text-[#52635B]">
              Submit your PGFV Christmas Ambassador application to get started, or switch to the Google account you used to apply.
            </p>
            <div className="flex flex-col gap-2 pt-1">
              <button
                type="button"
                onClick={() => onNavigate('christmas-ambassadors-register')}
                className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-[#1B4332] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <UserPlus className="w-4 h-4 text-[#E2B13C]" />
                <span>Apply as Christmas Ambassador</span>
              </button>
              <button
                type="button"
                onClick={() => signOutUser()}
                className="w-full min-h-[44px] py-2.5 px-4 rounded-xl border border-[#D5CCBE] text-[#143527] font-bold text-xs cursor-pointer"
              >
                Use Different Google Account
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <button
              type="button"
              disabled={loading}
              onClick={handleLogin}
              className="w-full min-h-[48px] py-3 px-5 rounded-xl bg-[#1B4332] hover:bg-[#143527] disabled:opacity-60 text-white font-heading font-bold text-sm flex items-center justify-center gap-2.5 shadow cursor-pointer"
            >
              <LogIn className="w-4 h-4 text-[#E2B13C]" />
              <span>{loading ? 'Signing In...' : 'Sign In with Google'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-4 border-t border-[#EFE8DC] flex flex-col gap-2 text-center text-xs text-[#6B7B73]">
              <button
                type="button"
                onClick={() => onNavigate('christmas-ambassadors-register')}
                className="text-[#1B4332] font-bold hover:underline cursor-pointer"
              >
                New here? Apply to become a Christmas Ambassador
              </button>
              <button
                type="button"
                onClick={() => onNavigate('admin-login')}
                className="inline-flex items-center justify-center gap-1 text-[#7A8A81] hover:text-[#143527] cursor-pointer"
              >
                <Lock className="w-3 h-3" />
                <span>PGFV Administrator Portal</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
