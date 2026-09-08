import { Calendar, MessageSquare, ArrowRight, Sparkles } from 'lucide-react';
import { createWhatsAppUrl } from '../../utils/helpers';

interface FinalCTASectionProps {
  onStartSaving: () => void;
}

export function FinalCTASection({ onStartSaving }: FinalCTASectionProps) {
  const handleChat = () => {
    const text = 'Hello PGFV, I am ready to start planning ahead for Christmas foodstuff.';
    window.open(createWhatsAppUrl(text), '_blank');
  };

  return (
    <section className="py-16 sm:py-24 bg-[#143527] text-white relative overflow-hidden border-b border-[#214F3B]">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#E2B13C]/10 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E2B13C]/20 border border-[#E2B13C]/30 text-[#E2B13C] text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#E2B13C]" />
          <span>DECEMBER IS NEARER THAN YOU THINK</span>
        </div>

        <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
          READY TO PLAN AHEAD?
        </h2>

        <p className="text-base sm:text-xl text-[#D0E2D7] max-w-2xl mx-auto leading-relaxed">
          Don’t wait until December. Start planning today with PGFV.
        </p>

        <p className="text-xs sm:text-sm text-[#A3C4B3] max-w-xl mx-auto leading-relaxed">
          Choose a savings option that works for you and begin building towards your Christmas foodstuff package.
        </p>

        {/* Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onStartSaving}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#E2B13C] hover:bg-[#C68A1B] text-[#122A20] font-extrabold text-sm uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2"
            id="final-cta-start-saving-btn"
          >
            <Calendar className="w-4 h-4 text-[#122A20]" />
            <span>START SAVING</span>
            <ArrowRight className="w-4 h-4 text-[#122A20]" />
          </button>

          <button
            onClick={handleChat}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all flex items-center justify-center gap-2"
            id="final-cta-chat-btn"
          >
            <MessageSquare className="w-4 h-4 text-[#25D366]" />
            <span>CHAT WITH PGFV</span>
          </button>
        </div>

        {/* Final Statement Pill */}
        <div className="pt-6">
          <div className="inline-block px-5 py-2.5 rounded-full bg-[#0E261C] border border-[#23533D] text-xs sm:text-sm font-extrabold tracking-widest text-[#E2B13C] uppercase">
            START SMALL • SAVE CONSISTENTLY • PLAN AHEAD
          </div>
        </div>

      </div>
    </section>
  );
}
