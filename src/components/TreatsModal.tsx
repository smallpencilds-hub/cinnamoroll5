import React from 'react';
import { ClickerTreat } from '../types';
import { X, Sparkles, Zap, ArrowUpCircle } from 'lucide-react';
import { sounds } from '../utils/audio';

interface TreatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  coins: number;
  treats: ClickerTreat[];
  onUpgradeTreat: (treatId: string) => void;
}

export const TreatsModal: React.FC<TreatsModalProps> = ({
  isOpen,
  onClose,
  coins,
  treats,
  onUpgradeTreat,
}) => {
  if (!isOpen) return null;

  const handleUpgrade = (treat: ClickerTreat) => {
    if (coins < treat.cost || treat.level >= treat.maxLevel) return;
    sounds.playUpgrade();
    onUpgradeTreat(treat.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-sky-950/45 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-[#FFFDF5] to-[#FFF5F8] rounded-3xl shadow-2xl border-4 border-white flex flex-col max-h-[88vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-white/80 border-b border-amber-100 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🧁</span>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-amber-950 font-['Comfortaa',sans-serif]">
                Сладкие Улучшения
              </h2>
              <p className="text-xs text-amber-700/80">
                Угощай Синаморолла, чтобы получать больше монеток!
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Treats List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          {treats.map((treat) => {
            const isMax = treat.level >= treat.maxLevel;
            const canAfford = coins >= treat.cost;

            return (
              <div
                key={treat.id}
                className="p-3.5 rounded-2xl bg-white border-2 border-amber-100/80 shadow-sm flex items-center justify-between gap-3 hover:border-amber-300 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="text-3xl w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center border border-amber-100">
                    {treat.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                        {treat.name}
                      </h4>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-extrabold">
                        Ур. {treat.level}/{treat.maxLevel}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {treat.description}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-600 mt-1">
                      {treat.bonusPerClick > 0 && (
                        <span>+{treat.bonusPerClick * treat.level} к клику</span>
                      )}
                      {treat.autoPerSecond > 0 && (
                        <span>+{treat.autoPerSecond * treat.level} 🪙/3 сек пассивно</span>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  {isMax ? (
                    <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1.5 rounded-xl block text-center">
                      Максимум
                    </span>
                  ) : (
                    <button
                      onClick={() => handleUpgrade(treat)}
                      disabled={!canAfford}
                      className={`px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 shadow-sm transition active:scale-95 ${
                        canAfford
                          ? 'bg-amber-400 hover:bg-amber-500 text-white'
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      <ArrowUpCircle size={13} />
                      <span>{treat.cost} 🪙</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
