import React from 'react';
import { Quest } from '../types';
import { X, CheckCircle2, Sparkles, Trophy } from 'lucide-react';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';

interface QuestsModalProps {
  isOpen: boolean;
  onClose: () => void;
  quests: Quest[];
  onClaimReward: (questId: string) => void;
}

export const QuestsModal: React.FC<QuestsModalProps> = ({
  isOpen,
  onClose,
  quests,
  onClaimReward,
}) => {
  if (!isOpen) return null;

  const handleClaim = (quest: Quest) => {
    sounds.playBuy();
    onClaimReward(quest.id);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#FAF089', '#F687B3', '#89C4F4'],
    });
  };

  const completedCount = quests.filter((q) => q.completed).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-sky-950/45 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-[#F0F8FF] to-[#FFF5F8] rounded-3xl shadow-2xl border-4 border-white flex flex-col max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-white/80 border-b border-sky-100 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <Trophy size={22} className="text-amber-500" />
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-sky-900 font-['Comfortaa',sans-serif]">
                Милые Задания
              </h2>
              <p className="text-xs text-sky-600/80">
                Выполняй квесты и получай монетки на обновки!
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

        {/* Progress summary */}
        <div className="px-6 py-2.5 bg-sky-100/50 flex items-center justify-between text-xs font-bold text-sky-800">
          <span>Прогресс заданий:</span>
          <span>
            {completedCount} / {quests.length} выполнено
          </span>
        </div>

        {/* Quest List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          {quests.map((quest) => {
            const isReadyToClaim = quest.completed && !quest.claimed;

            return (
              <div
                key={quest.id}
                className={`p-3.5 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 ${
                  quest.claimed
                    ? 'bg-slate-50 border-slate-200 opacity-60'
                    : isReadyToClaim
                    ? 'bg-amber-50/90 border-amber-300 shadow-sm animate-pulse'
                    : 'bg-white border-sky-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center">
                    {quest.icon}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                      {quest.title}
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      {quest.description} ({Math.min(quest.current, quest.target)}/{quest.target})
                    </p>
                  </div>
                </div>

                <div>
                  {quest.claimed ? (
                    <span className="flex items-center gap-1 text-xs text-slate-400 font-bold px-2 py-1">
                      <CheckCircle2 size={14} />
                      Получено
                    </span>
                  ) : isReadyToClaim ? (
                    <button
                      onClick={() => handleClaim(quest)}
                      className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-white font-extrabold text-xs shadow-md shadow-amber-200 transition active:scale-95 flex items-center gap-1"
                    >
                      <Sparkles size={13} />
                      Забрать +{quest.reward} 🪙
                    </button>
                  ) : (
                    <span className="text-xs font-bold text-amber-700 bg-amber-100/80 px-2.5 py-1 rounded-xl">
                      +{quest.reward} 🪙
                    </span>
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
