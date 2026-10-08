import React, { useState } from 'react';
import { X, Sparkles, Gift } from 'lucide-react';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';

interface LuckyGachaModalProps {
  isOpen: boolean;
  onClose: () => void;
  coins: number;
  onSpendCoins: (amount: number) => void;
  onRewardCoins: (amount: number) => void;
  onRewardItem?: (itemId: string) => void;
  ownedItemIds: string[];
}

export const LuckyGachaModal: React.FC<LuckyGachaModalProps> = ({
  isOpen,
  onClose,
  coins,
  onSpendCoins,
  onRewardCoins,
  onRewardItem,
  ownedItemIds,
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [prize, setPrize] = useState<{ icon: string; text: string; sub: string } | null>(null);

  if (!isOpen) return null;

  const handlePull = () => {
    if (coins < 35 || isSpinning) return;

    sounds.playPop();
    onSpendCoins(35);
    setIsSpinning(true);
    setPrize(null);

    // Cute spin delay
    setTimeout(() => {
      setIsSpinning(false);
      sounds.playBuy();

      const rand = Math.random();
      if (rand > 0.65) {
        // Coin Jackpot
        const win = Math.floor(Math.random() * 80) + 60;
        onRewardCoins(win);
        setPrize({
          icon: '🪙',
          text: `Джекпот: +${win} Монет!`,
          sub: 'Ура, Синаморолл нашёл сладкое сокровище!',
        });
      } else if (rand > 0.3) {
        const bonus = 45;
        onRewardCoins(bonus);
        setPrize({
          icon: '🥐',
          text: `Сладкий куш: +${bonus} Монет!`,
          sub: 'Вкусные синнабоны принесли прибыль!',
        });
      } else {
        const win = 100;
        onRewardCoins(win);
        setPrize({
          icon: '✨',
          text: `Супер-Звезда: +${win} Монет!`,
          sub: 'Редкая звёздная награда!',
        });
      }

      confetti({
        particleCount: 50,
        spread: 65,
        origin: { y: 0.6 },
        colors: ['#FBB6CE', '#89C4F4', '#FAF089', '#E9D8FD'],
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-sky-950/45 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#FFF5F8] via-[#EBF8FF] to-[#FAF5FF] rounded-3xl shadow-2xl border-4 border-white flex flex-col overflow-hidden text-center p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white hover:bg-slate-100 text-slate-600 flex items-center justify-center transition"
        >
          <X size={18} />
        </button>

        <span className="text-5xl block mx-auto mb-2">🎁</span>
        <h2 className="text-xl font-black text-sky-900 font-['Comfortaa',sans-serif]">
          Счастливая Коробочка
        </h2>
        <p className="text-xs text-sky-700/80 mt-1 mb-4">
          Потяни за ленточку сюрприза и выиграй монеты или супер-приз!
        </p>

        {/* Capsule Visual Container */}
        <div className="relative w-48 h-48 mx-auto my-2 rounded-3xl bg-white/70 border-2 border-pink-200/80 shadow-inner flex flex-col items-center justify-center overflow-hidden">
          {isSpinning ? (
            <div className="animate-spin text-6xl">🔮</div>
          ) : prize ? (
            <div className="animate-scaleUp">
              <span className="text-5xl block mb-1">{prize.icon}</span>
              <div className="font-extrabold text-sm text-slate-800">{prize.text}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">{prize.sub}</div>
            </div>
          ) : (
            <div className="text-center p-2">
              <span className="text-5xl block mb-1 animate-bounce">🎀</span>
              <span className="text-xs font-bold text-pink-600">Готово к открытию!</span>
            </div>
          )}
        </div>

        {/* Pull Button */}
        <div className="mt-4">
          <button
            onClick={handlePull}
            disabled={coins < 35 || isSpinning}
            className={`w-full py-3 rounded-2xl font-extrabold text-sm shadow-md transition active:scale-95 flex items-center justify-center gap-2 ${
              coins >= 35 && !isSpinning
                ? 'bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white shadow-pink-200'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Sparkles size={16} />
            <span>{isSpinning ? 'Открываем...' : 'Открыть за 35 🪙'}</span>
          </button>
          <span className="text-[11px] text-slate-500 mt-2 block">
            Твой баланс: {coins} 🪙 монет
          </span>
        </div>
      </div>
    </div>
  );
};
