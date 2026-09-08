import { useState, useId } from 'react';
import { Calculator, AlertCircle, ArrowRight, Check } from 'lucide-react';
import { formatNaira } from '../../utils/helpers';

interface SavingsCalculatorSectionProps {
  onStartWithAmount: (weeklyAmount: number, weeks: number) => void;
}

export function SavingsCalculatorSection({ onStartWithAmount }: SavingsCalculatorSectionProps) {
  const [selectedWeekly, setSelectedWeekly] = useState<number>(5000);
  const [weeks, setWeeks] = useState<number>(12);
  const weeksSliderId = useId();

  const weeklyOptions = [2000, 3000, 5000, 10000, 15000];

  const estimatedTotal = selectedWeekly * weeks;

  return (
    <section id="savings-calculator" className="py-16 sm:py-24 bg-[#FAF7F2] border-b border-[#E8E2D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B4332]/10 text-[#1B4332] text-xs font-bold uppercase tracking-wider mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>INTERACTIVE ESTIMATOR</span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-[#143527]">
            CHRISTMAS SAVINGS CALCULATOR
          </h2>
          <p className="text-sm sm:text-base text-[#56655D] mt-2">
            Plan your personal contribution schedule and see your estimated total foodstuff savings accumulation.
          </p>
        </div>

        {/* Calculator Body Card */}
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-[#E3DCcf] shadow-md">
          <div className="space-y-8">
            
            {/* Step 1: Select Weekly Amount */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#697A72] mb-3">
                1. Select Weekly Contribution Amount
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {weeklyOptions.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setSelectedWeekly(amt)}
                    className={`py-3 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all border ${
                      selectedWeekly === amt
                        ? 'bg-[#1B4332] text-white border-[#1B4332] shadow-sm'
                        : 'bg-[#F9F7F3] text-[#343F39] border-[#E5DFD4] hover:bg-[#F2ECE1]'
                    }`}
                  >
                    {formatNaira(amt)}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Select Weeks */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor={weeksSliderId} className="text-xs font-bold uppercase tracking-wider text-[#697A72]">
                  2. Select Number of Weeks to Save
                </label>
                <span className="font-heading font-extrabold text-[#1B4332] text-base bg-[#EFE9DF] px-3 py-0.5 rounded-lg">
                  {weeks} {weeks === 1 ? 'Week' : 'Weeks'}
                </span>
              </div>

              <input
                id={weeksSliderId}
                type="range"
                min="4"
                max="16"
                step="1"
                value={weeks}
                onChange={(e) => setWeeks(Number(e.target.value))}
                className="w-full h-2.5 bg-[#E8E2D5] rounded-lg appearance-none cursor-pointer accent-[#1B4332]"
              />

              <div className="flex justify-between text-[11px] text-[#7A8B83] mt-2 font-medium">
                <span>4 Weeks (1 Month)</span>
                <span>8 Weeks (2 Months)</span>
                <span>12 Weeks (3 Months)</span>
                <span>16 Weeks (Full Period)</span>
              </div>
            </div>

            {/* Step 3: Estimated Output Display */}
            <div className="rounded-2xl bg-gradient-to-br from-[#1B4332] to-[#0F281D] text-white p-6 sm:p-8 shadow-inner relative overflow-hidden">
              <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#E2B13C] font-bold block mb-1">
                    Your estimated savings
                  </span>
                  <div className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                    {formatNaira(estimatedTotal)}
                  </div>
                  <p className="text-xs text-[#B6CEBF] mt-1">
                    Based on {formatNaira(selectedWeekly)} weekly for {weeks} weeks
                  </p>
                </div>

                <button
                  onClick={() => onStartWithAmount(selectedWeekly, weeks)}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#E2B13C] hover:bg-[#C68A1B] text-[#122A20] font-bold text-xs uppercase tracking-wider shadow-md transition-colors flex items-center justify-center gap-2 shrink-0"
                  id="calc-start-plan-btn"
                >
                  <span>START WITH THIS PLAN</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Mandatory Disclaimer */}
            <div className="p-4 rounded-xl bg-[#FFF9E6] border border-[#F0DFAC] text-[#634E1D] flex items-start gap-3 text-xs leading-relaxed">
              <AlertCircle className="w-4 h-4 shrink-0 text-[#C68A1B] mt-0.5" />
              <div>
                <strong className="block mb-0.5 font-bold">Important Programme Disclaimer:</strong>
                <p>
                  This calculator shows your contribution total only. Final food package contents and quantities depend on total savings, prevailing market prices and product availability.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
