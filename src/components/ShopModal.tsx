import React, { useState } from 'react';
import { ItemCategory, WardrobeItem } from '../types';
import { ALL_ITEMS } from '../data/items';
import { CinnamorollCharacter } from './CinnamorollCharacter';
import { X, Check, ShoppingBag, Coins, Sparkles, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/audio';

interface ShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  coins: number;
  ownedItemIds: string[];
  onBuyItem: (item: WardrobeItem) => void;
  equippedHat: string | null;
  equippedClothes: string | null;
  equippedShoes: string | null;
  equippedAccessory: string | null;
  initialSelectedItem?: WardrobeItem | null;
}

export const ShopModal: React.FC<ShopModalProps> = ({
  isOpen,
  onClose,
  coins,
  ownedItemIds,
  onBuyItem,
  equippedHat,
  equippedClothes,
  equippedShoes,
  equippedAccessory,
  initialSelectedItem,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory | 'all'>('all');
  const [previewItem, setPreviewItem] = useState<WardrobeItem | null>(initialSelectedItem || null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredItems = ALL_ITEMS.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const activePreview = previewItem || filteredItems.find((i) => !ownedItemIds.includes(i.id)) || filteredItems[0];

  // Calculate character layers previewing this item
  const previewHat =
    activePreview?.category === 'hats' ? activePreview.id : equippedHat;
  const previewClothes =
    activePreview?.category === 'clothes' ? activePreview.id : equippedClothes;
  const previewShoes =
    activePreview?.category === 'shoes' ? activePreview.id : equippedShoes;
  const previewAccessory =
    activePreview?.category === 'accessories' ? activePreview.id : equippedAccessory;

  const handleBuy = (item: WardrobeItem) => {
    if (coins < item.price) {
      setErrorMessage(`Недостаточно монеток! Нужно ещё ${item.price - coins} 🪙. Погладь Синаморолла или сыграй в пекарню!`);
      setTimeout(() => setErrorMessage(null), 4000);
      sounds.playPop();
      return;
    }

    onBuyItem(item);
    sounds.playBuy();
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#89C4F4', '#FBB6CE', '#FAF089', '#E9D8FD'],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-sky-950/40 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-gradient-to-b from-[#F0F7FF] to-[#FFF5F8] rounded-3xl shadow-2xl border-2 border-white flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-white/80 border-b border-sky-100 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🛍️</span>
            <div>
              <h2 className="text-xl font-extrabold text-sky-900 font-['Comfortaa',sans-serif]">
                Магазин Синаморолла
              </h2>
              <p className="text-xs text-sky-600/80">
                Эксклюзивные наряды и украшения за звёздные монетки
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Coins indicator */}
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 font-extrabold text-sm shadow-sm">
              <span className="text-base animate-bounce">🪙</span>
              <span>{coins}</span>
              <span className="text-xs font-normal text-amber-700">монет</span>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition active:scale-95"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Error notification banner if insufficient coins */}
        {errorMessage && (
          <div className="bg-rose-50 border-b border-rose-200 px-4 py-2 flex items-center gap-2 text-xs sm:text-sm text-rose-700 font-bold animate-shake">
            <AlertCircle size={16} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Main Body */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-12 gap-4 p-4 sm:p-6">
          {/* Left Column: Try-On Live Model & Selected Item Preview */}
          <div className="md:col-span-5 flex flex-col items-center bg-white/70 backdrop-blur-md rounded-2xl p-4 border border-sky-100/80 shadow-sm">
            <div className="flex items-center gap-1.5 text-xs font-bold text-sky-700 mb-2">
              <Sparkles size={14} className="text-amber-500" />
              <span>Примерочная (Предпросмотр)</span>
            </div>

            {/* Live Character SVG Model */}
            <div className="w-full max-w-[240px] aspect-square flex items-center justify-center bg-gradient-to-b from-sky-50 to-pink-50 rounded-2xl border border-sky-100 shadow-inner my-2">
              <CinnamorollCharacter
                hatId={previewHat}
                clothesId={previewClothes}
                shoesId={previewShoes}
                accessoryId={previewAccessory}
                scale={0.85}
              />
            </div>

            {/* Selected Item Details */}
            {activePreview ? (
              <div className="w-full mt-2 text-center bg-sky-50/70 rounded-2xl p-3 border border-sky-100">
                <div className="text-3xl mb-1">{activePreview.icon}</div>
                <h3 className="font-extrabold text-sky-950 text-base">
                  {activePreview.name}
                </h3>
                <p className="text-xs text-sky-700 mt-1">
                  {activePreview.description}
                </p>

                <div className="mt-3 flex items-center justify-center gap-2">
                  {ownedItemIds.includes(activePreview.id) ? (
                    <span className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                      <Check size={14} />
                      Уже в гардеробе
                    </span>
                  ) : (
                    <button
                      onClick={() => handleBuy(activePreview)}
                      className={`flex items-center justify-center gap-2 px-6 py-2 rounded-2xl font-bold text-sm text-white shadow-md transition-all active:scale-95 ${
                        coins >= activePreview.price
                          ? 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 shadow-amber-200'
                          : 'bg-slate-300 cursor-not-allowed text-slate-600'
                      }`}
                    >
                      <ShoppingBag size={15} />
                      <span>Купить за {activePreview.price} 🪙</span>
                    </button>
                  )}
                </div>
              </div>
            ) : null}
          </div>

          {/* Right Column: Category Filters & Shop Items List */}
          <div className="md:col-span-7 flex flex-col">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-3 no-scrollbar">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  selectedCategory === 'all'
                    ? 'bg-sky-500 text-white shadow-sm'
                    : 'bg-white text-sky-700 hover:bg-sky-50 border border-sky-100'
                }`}
              >
                Всё
              </button>
              <button
                onClick={() => setSelectedCategory('hats')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  selectedCategory === 'hats'
                    ? 'bg-sky-500 text-white shadow-sm'
                    : 'bg-white text-sky-700 hover:bg-sky-50 border border-sky-100'
                }`}
              >
                🎀 Ушки & Шапочки
              </button>
              <button
                onClick={() => setSelectedCategory('clothes')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  selectedCategory === 'clothes'
                    ? 'bg-sky-500 text-white shadow-sm'
                    : 'bg-white text-sky-700 hover:bg-sky-50 border border-sky-100'
                }`}
              >
                👗 Наряды
              </button>
              <button
                onClick={() => setSelectedCategory('shoes')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  selectedCategory === 'shoes'
                    ? 'bg-sky-500 text-white shadow-sm'
                    : 'bg-white text-sky-700 hover:bg-sky-50 border border-sky-100'
                }`}
              >
                🩰 Обувь
              </button>
              <button
                onClick={() => setSelectedCategory('accessories')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  selectedCategory === 'accessories'
                    ? 'bg-sky-500 text-white shadow-sm'
                    : 'bg-white text-sky-700 hover:bg-sky-50 border border-sky-100'
                }`}
              >
                ✨ Аксессуары
              </button>
              <button
                onClick={() => setSelectedCategory('backgrounds')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  selectedCategory === 'backgrounds'
                    ? 'bg-sky-500 text-white shadow-sm'
                    : 'bg-white text-sky-700 hover:bg-sky-50 border border-sky-100'
                }`}
              >
                🖼️ Фоны
              </button>
            </div>

            {/* Items Grid */}
            <div className="flex-1 overflow-y-auto pr-1 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {filteredItems.map((item) => {
                const isOwned = ownedItemIds.includes(item.id);
                const isSelected = activePreview?.id === item.id;
                const canAfford = coins >= item.price;

                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setPreviewItem(item);
                      sounds.playPop();
                    }}
                    className={`relative p-2.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-sky-500 bg-sky-50 shadow-md scale-[1.02]'
                        : isOwned
                        ? 'border-emerald-100 bg-white/90 hover:border-emerald-300'
                        : 'border-slate-200/80 bg-white/70 hover:border-amber-300'
                    }`}
                  >
                    <div>
                      {/* Badge */}
                      <div className="flex items-center justify-between text-[10px]">
                        {item.isFreeInitial ? (
                          <span className="bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-md font-bold">
                            Бесплатно
                          </span>
                        ) : isOwned ? (
                          <span className="bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded-md font-bold flex items-center gap-0.5">
                            <Check size={10} />
                            Куплено
                          </span>
                        ) : (
                          <span className="bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-md font-extrabold flex items-center gap-0.5">
                            🪙 {item.price}
                          </span>
                        )}
                        {item.tag && (
                          <span className="text-slate-400 font-medium">
                            {item.tag}
                          </span>
                        )}
                      </div>

                      {/* Icon */}
                      <div
                        className="w-12 h-12 mx-auto my-1.5 rounded-xl flex items-center justify-center text-2xl shadow-inner"
                        style={{ backgroundColor: item.color + '40' }}
                      >
                        {item.icon}
                      </div>

                      <h4 className="text-xs font-bold text-slate-800 text-center line-clamp-1">
                        {item.name}
                      </h4>
                    </div>

                    <div className="mt-2 pt-1 border-t border-slate-100">
                      {isOwned ? (
                        <div className="text-center text-[10px] font-bold text-emerald-600">
                          В коллекции
                        </div>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBuy(item);
                          }}
                          disabled={!canAfford}
                          className={`w-full py-1 rounded-xl text-[11px] font-bold transition shadow-sm active:scale-95 ${
                            canAfford
                              ? 'bg-amber-400 hover:bg-amber-500 text-white'
                              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                          }`}
                        >
                          Купить 🪙 {item.price}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer tip */}
        <div className="px-6 py-2.5 bg-white/60 border-t border-sky-100 text-xs text-sky-800/80 flex items-center justify-between">
          <span>💡 Подсказка: Кликай по Синамороллу на главном экране или играй в мини-игру для быстрого заработка монет!</span>
          <button
            onClick={onClose}
            className="px-4 py-1 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs transition"
          >
            Готово
          </button>
        </div>
      </div>
    </div>
  );
};
