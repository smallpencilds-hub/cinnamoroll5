import React, { useState, useEffect, useRef } from 'react';
import { X, Trophy, Sparkles, Timer } from 'lucide-react';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';

interface BakeryMiniGameProps {
  isOpen: boolean;
  onClose: () => void;
  onRewardCoins: (amount: number) => void;
}

interface FallingSweet {
  id: number;
  x: number; // percentage 10% - 90%
  y: number; // percentage 0% - 100%
  type: 'cinnamon' | 'golden_cinnamon' | 'strawberry' | 'boba';
  points: number;
  speed: number;
}

export const BakeryMiniGame: React.FC<BakeryMiniGameProps> = ({
  isOpen,
  onClose,
  onRewardCoins,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25);
  const [score, setScore] = useState(0);
  const [sweets, setSweets] = useState<FallingSweet[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const animationFrameRef = useRef<number | null>(null);
  const nextSweetIdRef = useRef(1);

  // Start new round
  const startGame = () => {
    setIsPlaying(true);
    setTimeLeft(25);
    setScore(0);
    setSweets([]);
    setGameOver(false);
    sounds.playBuy();
  };

  // Timer countdown
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying]);

  // Spawn and fall loop
  useEffect(() => {
    if (!isPlaying) return;

    let spawnTimer = 0;

    const loop = () => {
      spawnTimer++;
      // Spawn new sweets every ~30 frames
      if (spawnTimer % 28 === 0) {
        const rand = Math.random();
        let type: FallingSweet['type'] = 'cinnamon';
        let points = 5;

        if (rand > 0.85) {
          type = 'golden_cinnamon';
          points = 20;
        } else if (rand > 0.6) {
          type = 'strawberry';
          points = 8;
        } else if (rand > 0.4) {
          type = 'boba';
          points = 10;
        }

        const newSweet: FallingSweet = {
          id: nextSweetIdRef.current++,
          x: Math.floor(Math.random() * 80) + 10,
          y: -10,
          type,
          points,
          speed: 0.6 + Math.random() * 0.5,
        };

        setSweets((prev) => [...prev, newSweet]);
      }

      // Update positions
      setSweets((prev) =>
        prev
          .map((s) => ({ ...s, y: s.y + s.speed }))
          .filter((s) => s.y < 105)
      );

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying]);

  const endGame = () => {
    setIsPlaying(false);
    setGameOver(true);
    setSweets([]);
    onRewardCoins(score);
    sounds.playBuy();
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#ED8936', '#FAF089', '#FBB6CE', '#89C4F4'],
    });
  };

  const handleCatch = (sweet: FallingSweet, e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playCoin();
    setScore((prev) => prev + sweet.points);
    // Remove caught sweet
    setSweets((prev) => prev.filter((s) => s.id !== sweet.id));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-sky-950/40 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#EBF8FF] via-[#FFF5F7] to-[#FEFCBF] rounded-3xl shadow-2xl border-4 border-white flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-white/80 border-b border-sky-100 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="text-2xl animate-spin-slow">🥐</span>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-sky-900 font-['Comfortaa',sans-serif]">
                Ловец булочек Синаморолла
              </h2>
              <p className="text-xs text-sky-600/80">
                Лови падающие вкусняшки и зарабатывай горы монеток!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isPlaying && (
              <>
                <div className="flex items-center gap-1 text-sm font-extrabold text-rose-500 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                  <Timer size={14} className="animate-spin" />
                  <span>{timeLeft}с</span>
                </div>
                <div className="flex items-center gap-1 text-sm font-extrabold text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  <span>🪙 {score}</span>
                </div>
              </>
            )}

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Game Area */}
        <div className="relative w-full h-[400px] overflow-hidden bg-gradient-to-b from-sky-100/60 to-pink-50/50 flex flex-col items-center justify-center">
          {/* Background Decorative Clouds */}
          <div className="absolute inset-0 pointer-events-none opacity-40">
            <div className="absolute top-10 left-8 text-4xl">☁️</div>
            <div className="absolute top-28 right-12 text-5xl">☁️</div>
            <div className="absolute bottom-16 left-24 text-3xl">☁️</div>
          </div>

          {!isPlaying && !gameOver && (
            <div className="text-center p-6 bg-white/85 backdrop-blur-md rounded-3xl shadow-xl border border-white max-w-md mx-4 animate-scaleUp">
              <span className="text-5xl block mb-2">🧁</span>
              <h3 className="text-xl font-black text-sky-900 mb-2 font-['Comfortaa',sans-serif]">
                Сладкая Пекарня
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-4">
                Кликай по свежеиспечённым синнабонам и ягодам, пока они падают с неба! У тебя будет 25 секунд.
              </p>
              <div className="flex items-center justify-center gap-3 text-xs text-slate-600 mb-5 bg-sky-50 py-2 rounded-2xl">
                <span>🥐 Булочка: +5 🪙</span>
                <span>🍓 Клубника: +8 🪙</span>
                <span>✨ Золотая: +20 🪙</span>
              </div>
              <button
                onClick={startGame}
                className="px-8 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white font-extrabold text-base shadow-lg shadow-amber-200 transition active:scale-95 flex items-center gap-2 mx-auto"
              >
                <Sparkles size={18} />
                <span>Начать игру!</span>
              </button>
            </div>
          )}

          {isPlaying && (
            <div className="relative w-full h-full cursor-crosshair">
              {sweets.map((sweet) => {
                let icon = '🥐';
                if (sweet.type === 'golden_cinnamon') icon = '⭐🥐';
                if (sweet.type === 'strawberry') icon = '🍓';
                if (sweet.type === 'boba') icon = '🧋';

                return (
                  <button
                    key={sweet.id}
                    onClick={(e) => handleCatch(sweet, e)}
                    style={{
                      left: `${sweet.x}%`,
                      top: `${sweet.y}%`,
                    }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-full transition-transform active:scale-125 select-none hover:scale-110 drop-shadow-md ${
                      sweet.type === 'golden_cinnamon'
                        ? 'bg-amber-300 ring-4 ring-amber-100 animate-pulse text-3xl'
                        : 'text-3xl'
                    }`}
                  >
                    <span>{icon}</span>
                  </button>
                );
              })}
            </div>
          )}

          {gameOver && (
            <div className="text-center p-6 bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-white max-w-md mx-4 animate-scaleUp">
              <Trophy size={48} className="mx-auto text-amber-500 mb-2 animate-bounce" />
              <h3 className="text-2xl font-black text-sky-900 mb-1 font-['Comfortaa',sans-serif]">
                Отличный улов!
              </h3>
              <p className="text-sm text-slate-600 mb-3">
                Ты собрал сладостей на сумму:
              </p>
              <div className="text-3xl font-black text-amber-600 mb-4 bg-amber-50 py-3 rounded-2xl border border-amber-200">
                +{score} 🪙 Монет
              </div>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={startGame}
                  className="px-5 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-white font-extrabold text-sm transition active:scale-95 shadow-md"
                >
                  Сыграть ещё раз
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-sm transition active:scale-95 shadow-md"
                >
                  В гардероб
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
