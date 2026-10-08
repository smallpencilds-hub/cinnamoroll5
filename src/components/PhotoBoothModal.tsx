import React, { useState, useRef } from 'react';
import { CinnamorollCharacter } from './CinnamorollCharacter';
import { X, Download, Camera, Sparkles, Heart, Sliders, Check } from 'lucide-react';
import { CharacterEmotion, BlushStyle } from '../types';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';

interface PhotoBoothModalProps {
  isOpen: boolean;
  onClose: () => void;
  hatId: string | null;
  clothesId: string | null;
  shoesId: string | null;
  accessoryId: string | null;
  backgroundId: string;
  emotion?: CharacterEmotion;
  blush?: BlushStyle;
}

type FrameStyle = 'polaroid' | 'pastel_heart' | 'star_dream' | 'stamp';
type ColorFilter = 'none' | 'warm_pink' | 'dreamy_blue' | 'vintage_sepia';

export const PhotoBoothModal: React.FC<PhotoBoothModalProps> = ({
  isOpen,
  onClose,
  hatId,
  clothesId,
  shoesId,
  accessoryId,
  backgroundId,
  emotion = 'happy',
  blush = 'classic',
}) => {
  const [frameStyle, setFrameStyle] = useState<FrameStyle>('polaroid');
  const [colorFilter, setColorFilter] = useState<ColorFilter>('none');
  const [caption, setCaption] = useState('Милый день с Синамороллом 💕');
  const [stickers, setStickers] = useState<{ id: number; icon: string; x: number; y: number }[]>([
    { id: 1, icon: '🎀', x: 20, y: 15 },
    { id: 2, icon: '✨', x: 80, y: 18 },
  ]);
  const [isSaving, setIsSaving] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const addSticker = (icon: string) => {
    sounds.playPop();
    const newSticker = {
      id: Date.now(),
      icon,
      x: 30 + Math.random() * 40,
      y: 20 + Math.random() * 50,
    };
    setStickers((prev) => [...prev, newSticker]);
  };

  const removeSticker = (id: number) => {
    sounds.playPop();
    setStickers((prev) => prev.filter((s) => s.id !== id));
  };

  const handleDownload = async () => {
    sounds.playCamera();
    setIsSaving(true);

    try {
      // Create high-res canvas
      const canvas = document.createElement('canvas');
      const width = 700;
      const height = 880;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      if (!ctx) return;

      // Draw background frame based on frameStyle
      if (frameStyle === 'polaroid') {
        ctx.fillStyle = '#FFFFFF';
        ctx.roundRect(0, 0, width, height, 28);
        ctx.fill();

        // Inner photo background
        const innerGrad = ctx.createLinearGradient(0, 40, 0, 640);
        innerGrad.addColorStop(0, '#EBF8FF');
        innerGrad.addColorStop(1, '#FFF5F8');
        ctx.fillStyle = innerGrad;
        ctx.roundRect(45, 45, width - 90, 600, 20);
        ctx.fill();
        ctx.strokeStyle = '#E2E8F0';
        ctx.lineWidth = 3.5;
        ctx.stroke();
      } else if (frameStyle === 'pastel_heart') {
        const frameGrad = ctx.createLinearGradient(0, 0, width, height);
        frameGrad.addColorStop(0, '#FED7E2');
        frameGrad.addColorStop(1, '#BEE3F8');
        ctx.fillStyle = frameGrad;
        ctx.roundRect(0, 0, width, height, 36);
        ctx.fill();

        ctx.fillStyle = '#FFFFFF';
        ctx.roundRect(35, 35, width - 70, 620, 24);
        ctx.fill();
      } else if (frameStyle === 'star_dream') {
        const frameGrad = ctx.createLinearGradient(0, 0, 0, height);
        frameGrad.addColorStop(0, '#FAF5FF');
        frameGrad.addColorStop(1, '#E9D8FD');
        ctx.fillStyle = frameGrad;
        ctx.roundRect(0, 0, width, height, 36);
        ctx.fill();

        ctx.fillStyle = '#FFFFFF';
        ctx.roundRect(35, 35, width - 70, 620, 24);
        ctx.fill();
      } else {
        // Stamp
        ctx.fillStyle = '#FFFDF5';
        ctx.roundRect(0, 0, width, height, 24);
        ctx.fill();
        ctx.strokeStyle = '#D69E2E';
        ctx.setLineDash([14, 10]);
        ctx.lineWidth = 5;
        ctx.strokeRect(25, 25, width - 50, height - 50);
        ctx.setLineDash([]);

        ctx.fillStyle = '#EBF8FF';
        ctx.roundRect(45, 45, width - 90, 600, 20);
        ctx.fill();
      }

      // Convert SVG character to image
      const svgElement = document.getElementById('cinnamoroll-svg');
      if (svgElement) {
        const svgString = new XMLSerializer().serializeToString(svgElement);
        const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
        const URL = window.URL || window.webkitURL || window;
        const blobURL = URL.createObjectURL(svgBlob);

        const img = new Image();
        img.crossOrigin = 'anonymous';
        await new Promise((resolve) => {
          img.onload = () => {
            ctx.drawImage(img, 85, 75, 530, 530);
            URL.revokeObjectURL(blobURL);
            resolve(true);
          };
          img.src = blobURL;
        });
      }

      // Draw color filter overlay if active
      if (colorFilter === 'warm_pink') {
        ctx.fillStyle = 'rgba(255, 182, 193, 0.15)';
        ctx.fillRect(45, 45, width - 90, 600);
      } else if (colorFilter === 'dreamy_blue') {
        ctx.fillStyle = 'rgba(144, 205, 244, 0.15)';
        ctx.fillRect(45, 45, width - 90, 600);
      } else if (colorFilter === 'vintage_sepia') {
        ctx.fillStyle = 'rgba(214, 158, 46, 0.12)';
        ctx.fillRect(45, 45, width - 90, 600);
      }

      // Draw stickers
      ctx.font = '42px sans-serif';
      ctx.textAlign = 'center';
      stickers.forEach((s) => {
        const sx = (s.x / 100) * width;
        const sy = (s.y / 100) * 600 + 45;
        ctx.fillText(s.icon, sx, sy);
      });

      // Draw Caption
      ctx.font = 'bold 28px "Comfortaa", "Nunito", sans-serif';
      ctx.fillStyle = '#2D3748';
      ctx.textAlign = 'center';
      ctx.fillText(caption, width / 2, 725);

      // Footer timestamp
      ctx.font = '15px "Nunito", sans-serif';
      ctx.fillStyle = '#A0AEC0';
      ctx.fillText('✨ Cinnamoroll Sweet Memories • ' + new Date().toLocaleDateString('ru-RU'), width / 2, 795);

      // Trigger download
      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `cinnamoroll_${Date.now()}.png`;
      a.click();

      confetti({
        particleCount: 60,
        spread: 65,
        origin: { y: 0.6 },
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-sky-950/45 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border-4 border-white flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-gradient-to-r from-sky-50 to-pink-50 border-b border-sky-100">
          <div className="flex items-center gap-2">
            <Camera size={22} className="text-pink-500 animate-bounce" />
            <h2 className="text-lg sm:text-xl font-bold text-sky-900 font-['Comfortaa',sans-serif]">
              Фотостудия Синаморолла
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white hover:bg-slate-100 text-slate-600 flex items-center justify-center transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Card Preview */}
          <div className="md:col-span-7 flex justify-center">
            <div
              ref={cardRef}
              className={`relative w-[300px] sm:w-[330px] rounded-3xl p-4 shadow-xl border transition-all ${
                frameStyle === 'polaroid'
                  ? 'bg-white border-slate-200'
                  : frameStyle === 'pastel_heart'
                  ? 'bg-gradient-to-b from-pink-100 to-sky-100 border-pink-200'
                  : frameStyle === 'star_dream'
                  ? 'bg-gradient-to-b from-purple-100 to-blue-100 border-purple-200'
                  : 'bg-amber-50 border-dashed border-2 border-amber-300'
              }`}
            >
              {/* Inner Picture Box */}
              <div
                className={`relative w-full aspect-square bg-gradient-to-b from-sky-50/80 to-pink-50/60 rounded-2xl border border-sky-100/80 overflow-hidden flex items-center justify-center transition-all ${
                  colorFilter === 'warm_pink'
                    ? 'hue-rotate-[340deg] contrast-105'
                    : colorFilter === 'dreamy_blue'
                    ? 'hue-rotate-[190deg] saturate-110'
                    : colorFilter === 'vintage_sepia'
                    ? 'sepia-[0.35]'
                    : ''
                }`}
              >
                <CinnamorollCharacter
                  hatId={hatId}
                  clothesId={clothesId}
                  shoesId={shoesId}
                  accessoryId={accessoryId}
                  emotion={emotion}
                  blush={blush}
                  scale={0.9}
                />

                {/* Stickers Stamp on card */}
                {stickers.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => removeSticker(s.id)}
                    title="Нажми, чтобы удалить стикер"
                    style={{ left: `${s.x}%`, top: `${s.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 text-2xl cursor-pointer hover:scale-125 transition drop-shadow-md select-none"
                  >
                    {s.icon}
                  </div>
                ))}
              </div>

              {/* Caption Text on card */}
              <div className="mt-4 text-center px-1">
                <div className="font-extrabold text-sm sm:text-base text-slate-800 font-['Comfortaa',sans-serif] line-clamp-2">
                  {caption || 'Синаморолл'}
                </div>
                <div className="text-[10px] text-slate-400 mt-1 font-['Nunito',sans-serif]">
                  ✨ Cinnamoroll Sweet Memories
                </div>
              </div>
            </div>
          </div>

          {/* Right Controls */}
          <div className="md:col-span-5 flex flex-col gap-3.5">
            {/* Frame Styles Selector */}
            <div>
              <label className="block text-xs font-bold text-sky-900 mb-1.5">
                Стиль рамочки:
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { id: 'polaroid', label: 'Полароид', icon: '📷' },
                  { id: 'pastel_heart', label: 'Сердечки', icon: '💖' },
                  { id: 'star_dream', label: 'Звёзды', icon: '✨' },
                  { id: 'stamp', label: 'Марка', icon: '🏷️' },
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => {
                      setFrameStyle(st.id as FrameStyle);
                      sounds.playPop();
                    }}
                    className={`py-1.5 px-2.5 rounded-xl text-xs font-bold flex items-center gap-1 transition ${
                      frameStyle === st.id
                        ? 'bg-sky-500 text-white shadow-sm'
                        : 'bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-100'
                    }`}
                  >
                    <span>{st.icon}</span>
                    <span>{st.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Tint */}
            <div>
              <label className="block text-xs font-bold text-sky-900 mb-1.5">
                Цветофильтр карточки:
              </label>
              <div className="flex gap-1.5">
                {[
                  { id: 'none', label: 'Чистый' },
                  { id: 'warm_pink', label: 'Нежно-розовый' },
                  { id: 'dreamy_blue', label: 'Лазурный' },
                  { id: 'vintage_sepia', label: 'Винтаж' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => {
                      setColorFilter(f.id as ColorFilter);
                      sounds.playPop();
                    }}
                    className={`flex-1 py-1 rounded-xl text-[11px] font-bold transition border ${
                      colorFilter === f.id
                        ? 'bg-pink-400 text-white border-pink-400'
                        : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sticker Badges to stamp */}
            <div>
              <label className="block text-xs font-bold text-sky-900 mb-1.5">
                Добавить стикеры:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {['💖', '✨', '🎀', '🥐', '🍓', '🧁', '⭐', '☕', '🌸', '🧸', '🧋'].map((stk) => (
                  <button
                    key={stk}
                    onClick={() => addSticker(stk)}
                    className="w-8 h-8 rounded-xl bg-sky-50 hover:bg-pink-100 text-base flex items-center justify-center transition active:scale-90 border border-sky-100"
                  >
                    {stk}
                  </button>
                ))}
              </div>
              <span className="text-[10px] text-slate-400 mt-0.5 block">
                (Нажми на стикер на фотокарточке, чтобы убрать)
              </span>
            </div>

            {/* Custom caption text */}
            <div>
              <label className="block text-xs font-bold text-sky-900 mb-1">
                Подпись на фото:
              </label>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                maxLength={36}
                placeholder="Напиши что-нибудь милое..."
                className="w-full px-3 py-1.5 rounded-xl text-xs sm:text-sm bg-sky-50/60 border border-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-400 font-bold text-slate-800"
              />
            </div>

            {/* Download Button */}
            <button
              onClick={handleDownload}
              disabled={isSaving}
              className="mt-1 w-full py-2.5 rounded-2xl bg-gradient-to-r from-pink-400 via-rose-400 to-sky-400 hover:from-pink-500 hover:to-sky-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-pink-200 transition active:scale-95"
            >
              <Download size={16} />
              <span>{isSaving ? 'Сохранение...' : 'Скачать карточку (PNG)'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
