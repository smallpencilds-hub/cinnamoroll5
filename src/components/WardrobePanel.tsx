import React, { useState } from 'react';
import { ItemCategory, WardrobeItem, BlushStyle, SavedOutfit } from '../types';
import { ALL_ITEMS } from '../data/items';
import { Dices, RotateCcw, Check, Lock, ShoppingBag, Bookmark, BookmarkPlus, Trash2, Heart } from 'lucide-react';
import { sounds } from '../utils/audio';

interface WardrobePanelProps {
  ownedItemIds: string[];
  equippedHat: string | null;
  equippedClothes: string | null;
  equippedShoes: string | null;
  equippedAccessory: string | null;
  selectedBackground: string;
  blushStyle: BlushStyle;
  onSelectBlush: (style: BlushStyle) => void;
  onEquip: (item: WardrobeItem) => void;
  onUnequipCategory: (category: ItemCategory) => void;
  onRandomize: () => void;
  onResetAll: () => void;
  onOpenShopWithItem?: (item: WardrobeItem) => void;
  savedOutfits: SavedOutfit[];
  onSaveCurrentOutfit: () => void;
  onLoadOutfit: (outfit: SavedOutfit) => void;
  onDeleteOutfit: (id: string) => void;
}

const CATEGORIES: { id: ItemCategory | 'blush' | 'saved'; label: string; icon: string }[] = [
  { id: 'hats', label: 'Ушки & Шапочки', icon: '🎀' },
  { id: 'clothes', label: 'Наряды', icon: '👗' },
  { id: 'shoes', label: 'Обувь', icon: '🩰' },
  { id: 'accessories', label: 'Аксессуары', icon: '✨' },
  { id: 'blush', label: 'Румянец', icon: '💖' },
  { id: 'backgrounds', label: 'Фоны', icon: '🖼️' },
  { id: 'saved', label: 'Мои образы', icon: '🔖' },
];

export const WardrobePanel: React.FC<WardrobePanelProps> = ({
  ownedItemIds,
  equippedHat,
  equippedClothes,
  equippedShoes,
  equippedAccessory,
  selectedBackground,
  blushStyle,
  onSelectBlush,
  onEquip,
  onUnequipCategory,
  onRandomize,
  onResetAll,
  onOpenShopWithItem,
  savedOutfits,
  onSaveCurrentOutfit,
  onLoadOutfit,
  onDeleteOutfit,
}) => {
  const [activeTab, setActiveTab] = useState<ItemCategory | 'blush' | 'saved'>('hats');

  const filteredItems = ALL_ITEMS.filter((item) => item.category === activeTab);

  const isEquipped = (item: WardrobeItem) => {
    if (item.category === 'hats') return equippedHat === item.id;
    if (item.category === 'clothes') return equippedClothes === item.id;
    if (item.category === 'shoes') return equippedShoes === item.id;
    if (item.category === 'accessories') return equippedAccessory === item.id;
    if (item.category === 'backgrounds') return selectedBackground === item.id;
    return false;
  };

  const getEquippedCountForTab = (category: string) => {
    if (category === 'hats') return equippedHat ? 1 : 0;
    if (category === 'clothes') return equippedClothes ? 1 : 0;
    if (category === 'shoes') return equippedShoes ? 1 : 0;
    if (category === 'accessories') return equippedAccessory ? 1 : 0;
    if (category === 'saved') return savedOutfits.length;
    return 1;
  };

  return (
    <div className="bg-white/85 backdrop-blur-md rounded-3xl p-4 sm:p-6 shadow-[0_12px_36px_rgba(186,215,248,0.35)] border border-white flex flex-col h-full max-h-[660px]">
      {/* Header with Quick Tools */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-sky-100">
        <div className="flex items-center gap-2">
          <span className="text-xl">🪞</span>
          <h2 className="text-lg sm:text-xl font-bold text-sky-900 font-['Comfortaa',sans-serif]">
            Гардеробная
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onRandomize}
            title="Случайный милый образ"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-sky-50 hover:bg-sky-100 text-sky-700 transition active:scale-95 shadow-sm border border-sky-200/60"
          >
            <Dices size={15} className="text-sky-500 animate-spin-slow" />
            <span>Случайный</span>
          </button>
          <button
            onClick={onResetAll}
            title="Снять все наряды"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-rose-50 hover:bg-rose-100 text-rose-600 transition active:scale-95 shadow-sm border border-rose-200/60"
          >
            <RotateCcw size={14} />
            <span>Снять всё</span>
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 py-3 overflow-x-auto no-scrollbar">
        {CATEGORIES.map((cat) => {
          const isActive = activeTab === cat.id;
          const count = getEquippedCountForTab(cat.id);
          return (
            <button
              key={cat.id}
              onClick={() => {
                setActiveTab(cat.id);
                sounds.playPop();
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 shadow-sm ${
                isActive
                  ? 'bg-gradient-to-r from-sky-400 to-blue-400 text-white shadow-sky-200 scale-105'
                  : 'bg-sky-50/80 hover:bg-sky-100/70 text-sky-800 border border-sky-100'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
              {count > 0 && !isActive && (
                <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>

      {/* Subheader: Category Actions & Unequip */}
      {activeTab !== 'saved' && activeTab !== 'blush' && (
        <div className="flex items-center justify-between px-1 py-1 text-xs text-sky-700/80">
          <span className="font-medium">
            Доступно: {filteredItems.length}
          </span>
          {activeTab !== 'backgrounds' && (
            <button
              onClick={() => onUnequipCategory(activeTab as ItemCategory)}
              className="text-xs text-sky-600 hover:text-sky-800 underline hover:font-bold transition"
            >
              Снять в этой категории
            </button>
          )}
        </div>
      )}

      {/* 1. BLUSH SELECTION TAB */}
      {activeTab === 'blush' && (
        <div className="flex-1 overflow-y-auto p-2 space-y-3">
          <p className="text-xs text-slate-500 font-bold mb-2">
            Выбери стиль нежного румянца для щёчек Синаморолла:
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'classic', label: 'Классический румянец', icon: '🌸', desc: 'Нежное розовое сияние' },
              { id: 'hearts', label: 'Сердечки на щёчках', icon: '💖', desc: 'Милые сердечки любви' },
              { id: 'stars', label: 'Звёздная пыль', icon: '✨', desc: 'Мерцающие золотые звёздочки' },
              { id: 'sakura', label: 'Лепестки сакуры', icon: '🌺', desc: 'Весенние японские цветки' },
              { id: 'sparkles', label: 'Искрящиеся блики', icon: '⭐', desc: 'Аниме блики на румянце' },
            ].map((b) => (
              <div
                key={b.id}
                onClick={() => {
                  onSelectBlush(b.id as BlushStyle);
                  sounds.playPop();
                }}
                className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                  blushStyle === b.id
                    ? 'border-pink-400 bg-pink-50/80 shadow-md scale-105'
                    : 'border-sky-100 bg-white hover:border-pink-200'
                }`}
              >
                <div className="text-2xl mb-1">{b.icon}</div>
                <div className="text-xs font-black text-slate-800">{b.label}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{b.desc}</div>
                {blushStyle === b.id && (
                  <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-pink-600 bg-pink-100 px-2 py-0.5 rounded-full">
                    <Check size={11} /> Выбрано
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. SAVED OUTFITS PRESETS TAB */}
      {activeTab === 'saved' && (
        <div className="flex-1 overflow-y-auto p-2 space-y-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-sky-800">
              Сохранено образов: {savedOutfits.length}/5
            </span>
            <button
              onClick={() => {
                onSaveCurrentOutfit();
                sounds.playBuy();
              }}
              disabled={savedOutfits.length >= 5}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-400 hover:bg-pink-500 text-white text-xs font-bold transition shadow-sm"
            >
              <BookmarkPlus size={14} />
              <span>Сохранить текущий</span>
            </button>
          </div>

          {savedOutfits.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <span className="text-4xl block mb-2">👗</span>
              <p className="text-xs">У тебя пока нет сохранённых образов.</p>
              <p className="text-[11px] mt-1">Одень Синаморолла и нажми «Сохранить текущий»!</p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {savedOutfits.map((outfit) => (
                <div
                  key={outfit.id}
                  className="p-3 rounded-2xl bg-white border border-sky-100 shadow-sm flex items-center justify-between gap-3 hover:border-sky-300 transition"
                >
                  <div>
                    <h4 className="text-xs sm:text-sm font-extrabold text-slate-800">
                      {outfit.name}
                    </h4>
                    <p className="text-[10px] text-slate-400">
                      {new Date(outfit.createdAt).toLocaleDateString('ru-RU')}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        onLoadOutfit(outfit);
                        sounds.playEquip();
                      }}
                      className="px-3 py-1.5 rounded-xl bg-sky-100 hover:bg-sky-200 text-sky-800 text-xs font-bold transition active:scale-95"
                    >
                      Надеть
                    </button>
                    <button
                      onClick={() => {
                        onDeleteOutfit(outfit.id);
                        sounds.playPop();
                      }}
                      className="p-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-500 transition"
                      title="Удалить образ"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 3. ITEMS GRID (HATS, CLOTHES, SHOES, ACCESSORIES, BACKGROUNDS) */}
      {activeTab !== 'saved' && activeTab !== 'blush' && (
        <div className="flex-1 overflow-y-auto pr-1 py-2 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {filteredItems.map((item) => {
            const owned = ownedItemIds.includes(item.id);
            const equipped = isEquipped(item);

            return (
              <div
                key={item.id}
                onClick={() => {
                  if (owned) {
                    onEquip(item);
                  } else if (onOpenShopWithItem) {
                    onOpenShopWithItem(item);
                  }
                }}
                className={`group relative flex flex-col p-3 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${
                  equipped
                    ? 'bg-gradient-to-b from-sky-50 to-blue-100/50 border-sky-400 shadow-md scale-[1.02]'
                    : owned
                    ? 'bg-white/90 hover:bg-sky-50/60 border-sky-100 hover:border-sky-300 hover:shadow-sm'
                    : 'bg-slate-50/70 hover:bg-slate-100/80 border-dashed border-slate-200 opacity-80'
                }`}
              >
                {/* Status Badge */}
                <div className="flex items-center justify-between mb-1">
                  {item.tag && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        item.isFreeInitial
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-pink-100 text-pink-700'
                      }`}
                    >
                      {item.tag}
                    </span>
                  )}
                  {equipped ? (
                    <span className="ml-auto flex items-center gap-0.5 text-[10px] bg-sky-500 text-white font-bold px-2 py-0.5 rounded-full shadow-sm">
                      <Check size={11} strokeWidth={3} />
                      Надето
                    </span>
                  ) : !owned ? (
                    <span className="ml-auto flex items-center gap-1 text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                      <Lock size={10} />
                      {item.price} 🪙
                    </span>
                  ) : null}
                </div>

                {/* Icon Visual */}
                <div
                  className="w-14 h-14 mx-auto my-1.5 rounded-2xl flex items-center justify-center text-3xl transition-transform group-hover:scale-110 shadow-inner"
                  style={{
                    backgroundColor: item.color + '40',
                    borderColor: item.color,
                  }}
                >
                  <span>{item.icon}</span>
                </div>

                {/* Title & Description */}
                <div className="text-center mt-1">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                    {item.description}
                  </p>
                </div>

                {/* Action Button inside card */}
                <div className="mt-2 pt-1 border-t border-slate-100 text-center">
                  {equipped ? (
                    <span className="text-[11px] font-bold text-sky-600">
                      Активно
                    </span>
                  ) : owned ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEquip(item);
                      }}
                      className="w-full py-1 rounded-xl bg-sky-100 hover:bg-sky-200 text-sky-800 text-xs font-bold transition active:scale-95"
                    >
                      Примерить
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onOpenShopWithItem) onOpenShopWithItem(item);
                      }}
                      className="w-full py-1 rounded-xl bg-amber-400 hover:bg-amber-500 text-white text-xs font-bold flex items-center justify-center gap-1 transition active:scale-95 shadow-sm"
                    >
                      <ShoppingBag size={12} />
                      Купить {item.price} 🪙
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
