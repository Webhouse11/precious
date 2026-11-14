import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { Lock, LogIn, ShieldAlert, ArrowRight, ArrowLeft } from 'lucide-react';
import { auth, checkIsAdminUser, signInWithGoogle, signOutUser } from '../../lib/firebase';
import { PageView } from '../../types';

interface AdminLoginPageProps {
  onNavigate: (page: PageView, sectionId?: string) => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onNavigate }) => {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [checking, setChecking] = useState(true);
  const [loading, setLoading] = useState(false);
  const [deniedEmail, setDeniedEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        const isAdmin = await checkIsAdminUser(u);
        if (isAdmin) {
          onNavigate('admin-dashboard');
          return;
        }
        setDeniedEmail(u.email || u.uid);
      } else {
        setDeniedEmail(null);
      }
      setChecking(false);
    });
    return () => unsub();
  }, [onNavigate]);

  const handleAdminSignIn = async () => {
    setError(null);
    setDeniedEmail(null);
    setLoading(true);
    try {
      const signedIn = await signInWithGoogle();
      const isAdmin = await checkIsAdminUser(signedIn);
      if (isAdmin) {
        onNavigate('admin-dashboard');
      } else {
        setDeniedEmail(signedIn.email || signedIn.uid);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#122A20] text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white text-[#1E2320] rounded-3xl p-7 sm:p-9 shadow-2xl border border-[#E3DCD0] space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#1B4332] text-[#E2B13C] flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#C68A1B] block">
            Restricted Access
          </span>
          <h1 className="font-heading font-extrabold text-2xl text-[#143527]">
            PGFV Administrator Console
          </h1>
          <p className="text-xs sm:text-sm text-[#52635B]">
            Authorized Precious Gem Foods Ventures administrators only.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800">
            {error}
          </div>
        )}

        {checking ? (
          <div className="py-6 text-center text-xs text-[#6B7B73]">Verifying authorization...</div>
        ) : deniedEmail && user ? (
          <div className="p-5 rounded-2xl bg-red-50 border border-red-200 space-y-3 text-center">
            <ShieldAlert className="w-8 h-8 text-red-700 mx-auto" />
            <p className="text-sm font-bold text-red-900">Access Denied</p>
            <p className="text-xs text-red-800">
              The account <strong>{deniedEmail}</strong> is not authorized as a PGFV administrator.
            </p>
            <button
              type="button"
              onClick={() => signOutUser()}
              className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold text-xs cursor-pointer"
            >
              Sign Out & Switch Account
            </button>
          </div>
        ) : (
          <button
            type="button"
            disabled={loading}
            onClick={handleAdminSignIn}
            className="w-full min-h-[48px] py-3 px-5 rounded-xl bg-[#1B4332] hover:bg-[#143527] disabled:opacity-60 text-white font-heading font-bold text-sm flex items-center justify-center gap-2.5 shadow cursor-pointer"
          >
            <LogIn className="w-4 h-4 text-[#E2B13C]" />
            <span>{loading ? 'Verifying Admin...' : 'Sign In as Administrator'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}

        <div className="pt-4 border-t border-[#EFE8DC] flex justify-between items-center text-xs">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-1 text-[#52635B] hover:text-[#143527] font-semibold cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Website</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('ambassador-login')}
            className="text-[#1B4332] font-bold hover:underline cursor-pointer"
          >
            Ambassador Login
          </button>
        </div>
      </div>
    </div>
  );
};
