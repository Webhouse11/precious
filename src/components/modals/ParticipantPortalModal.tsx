import { useState } from 'react';
import { X, Search, ShieldCheck, CreditCard, Calendar, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';
import { MOCK_PARTICIPANTS, BUSINESS_INFO } from '../../data/mockData';
import { ParticipantRecord } from '../../types';
import { formatNaira, STORAGE_KEYS, createWhatsAppUrl } from '../../utils/helpers';

interface ParticipantPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenRegister: () => void;
}

export function ParticipantPortalModal({ isOpen, onClose, onOpenRegister }: ParticipantPortalModalProps) {
  const [searchId, setSearchId] = useState('PGFV-2026-0042');
  const [record, setRecord] = useState<ParticipantRecord | null>(MOCK_PARTICIPANTS[0]);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSearch = () => {
    setErrorMessage('');
    const query = searchId.trim().toUpperCase();

    // Check mock participants first
    const foundMock = MOCK_PARTICIPANTS.find((p) => p.participantId.toUpperCase() === query);
    if (foundMock) {
      setRecord(foundMock);
      return;
    }

    // Check localStorage participants
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEYS.REGISTRATIONS) || '[]');
      const foundStored = stored.find((p: { participantId?: string }) => 
        p.participantId && p.participantId.toUpperCase() === query
      );
      if (foundStored) {
        setRecord({
          participantId: foundStored.participantId,
          fullName: foundStored.fullName,
          planName: foundStored.planLabel,
          weeklyAmount: foundStored.weeklyAmount,
          weeksContributed: 1,
          totalSaved: foundStored.calculatedAmount,
          registrationDate: new Date(foundStored.submittedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          status: 'Pending Verification',
          lastPaymentDate: 'Pending Verification',
          paymentReference: 'PENDING-VERIFY'
        });
        return;
      }
    } catch {
      // ignore
    }

    setRecord(null);
    setErrorMessage(`No record found matching "${query}". Please verify your Participant ID or contact PGFV support.`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-[#E8E2D5] my-auto">
        
        {/* Modal Header */}
        <div className="bg-[#1B4332] text-white p-5 sm:p-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-white p-1 flex items-center justify-center font-bold shadow-xs border border-[#E2B13C]/60 shrink-0 overflow-hidden">
              <img
                src={BUSINESS_INFO.logo}
                alt="PGFV Official Logo"
                className="w-full h-full object-contain rounded-lg"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-base sm:text-lg text-white">
                Participant Record & Savings Card
              </h3>
              <p className="text-xs text-[#C8DBD2]">
                Precious Gem Foods Ventures • Management & Accountability
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Lookup Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#697A72] mb-1.5">
              Enter Unique Participant ID
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#7A8B82] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. PGFV-2026-0042"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D5CCBE] text-xs sm:text-sm uppercase font-mono tracking-wider focus:outline-none focus:border-[#1B4332]"
                />
              </div>
              <button
                type="button"
                onClick={handleSearch}
                className="px-5 py-2.5 rounded-xl bg-[#1B4332] hover:bg-[#143527] text-white text-xs font-bold uppercase tracking-wider transition-colors shrink-0"
              >
                Lookup
              </button>
            </div>

            {/* Quick Demo ID pills */}
            <div className="flex items-center gap-2 mt-2 text-[11px] text-[#718077]">
              <span>Sample IDs:</span>
              <button
                onClick={() => { setSearchId('PGFV-2026-0042'); }}
                className="font-mono text-[#1B4332] font-semibold underline"
              >
                PGFV-2026-0042
              </button>
              <span>•</span>
              <button
                onClick={() => { setSearchId('PGFV-2026-0118'); }}
                className="font-mono text-[#1B4332] font-semibold underline"
              >
                PGFV-2026-0118
              </button>
            </div>
          </div>

          {errorMessage && (
            <div className="p-4 rounded-xl bg-[#FFF5F5] border border-[#FED7D7] text-[#C53030] text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">{errorMessage}</p>
                <p className="mt-1 text-[11px]">
                  Haven't registered yet? You can select a plan and receive an official Participant ID right away.
                </p>
                <button
                  onClick={() => { onClose(); onOpenRegister(); }}
                  className="mt-2 text-xs font-bold text-[#1B4332] underline"
                >
                  Click here to register now →
                </button>
              </div>
            </div>
          )}

          {record && (
            <div className="space-y-5">
              
              {/* Digital Savings Card UI */}
              <div className="bg-gradient-to-br from-[#1B4332] to-[#0D251A] text-white p-6 rounded-2xl shadow-xl border border-[#E2B13C]/50 relative overflow-hidden">
                <div className="flex items-center justify-between mb-4 border-b border-[#2C5743] pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white p-1 border border-[#E2B13C] shadow-xs flex items-center justify-center shrink-0 overflow-hidden">
                      <img
                        src={BUSINESS_INFO.logo}
                        alt="PGFV Official Logo"
                        className="w-full h-full object-contain rounded-lg"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#E2B13C]">
                        PGFV OFFICIAL SAVINGS CARD
                      </span>
                      <h5 className="font-heading font-extrabold text-base text-white">
                        Precious Gem Foods Ventures
                      </h5>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold bg-[#E2B13C] text-[#122A20] px-3 py-1 rounded-md shadow-xs">
                    {record.participantId}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                  <div>
                    <span className="text-[#A2C2B3] block text-[10px] uppercase">Participant</span>
                    <strong className="text-sm text-white">{record.fullName}</strong>
                  </div>
                  <div>
                    <span className="text-[#A2C2B3] block text-[10px] uppercase">Status</span>
                    <strong className="text-white flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${record.status === 'Active' ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
                      {record.status}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[#A2C2B3] block text-[10px] uppercase">Plan</span>
                    <strong className="text-[#E2B13C]">{record.planName}</strong>
                  </div>
                  <div>
                    <span className="text-[#A2C2B3] block text-[10px] uppercase">Registered Date</span>
                    <strong className="text-white">{record.registrationDate}</strong>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#143628] border border-[#2B5441] flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] uppercase text-[#A8C7B9] block">Weeks Contributed</span>
                    <strong className="text-base text-white">{record.weeksContributed} Weeks</strong>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase text-[#A8C7B9] block">Verified Savings Total</span>
                    <strong className="text-lg text-[#E2B13C] font-heading font-bold">{formatNaira(record.totalSaved)}</strong>
                  </div>
                </div>
              </div>

              {/* Verified Receipts Snapshot */}
              <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E8E2D5] space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-[#143527]">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#1B4332]" />
                    <span>Last Payment Record Verified</span>
                  </span>
                  <span className="font-mono text-[11px] text-[#697A72]">{record.paymentReference}</span>
                </div>
                <div className="text-xs text-[#55635C] flex justify-between">
                  <span>Last Reconciled Date:</span>
                  <span className="font-medium text-[#1B4332]">{record.lastPaymentDate}</span>
                </div>
                <p className="text-[11px] text-[#786C5E] italic pt-1 border-t border-[#EDE7DC]">
                  Official digital payment receipts and updated statements are dispatched via WhatsApp/SMS to registered participants.
                </p>
              </div>

              {/* Direct Support Button */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={createWhatsAppUrl(`Hello PGFV, I am checking my savings details for Participant ID: ${record.participantId} (${record.fullName}).`)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Enquire on WhatsApp About This ID</span>
                </a>

                <button
                  onClick={onClose}
                  className="py-3 px-5 rounded-xl border border-[#D5CCBE] text-[#1B4332] text-xs font-semibold hover:bg-[#FAF7F2]"
                >
                  Close
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
