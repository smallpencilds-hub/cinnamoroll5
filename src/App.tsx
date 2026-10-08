import React, { useState, useEffect } from 'react';
import { CinnamorollCharacter } from './components/CinnamorollCharacter';
import { WardrobePanel } from './components/WardrobePanel';
import { ShopModal } from './components/ShopModal';
import { PhotoBoothModal } from './components/PhotoBoothModal';
import { BakeryMiniGame } from './components/BakeryMiniGame';
import { QuestsModal } from './components/QuestsModal';
import { TreatsModal } from './components/TreatsModal';
import { LuckyGachaModal } from './components/LuckyGachaModal';
import {
  WardrobeItem,
  ItemCategory,
  CharacterEmotion,
  BlushStyle,
  Quest,
  FloatingParticle,
  SavedOutfit,
  ClickerTreat,
} from './types';
import { INITIAL_FREE_ITEM_IDS, ALL_ITEMS } from './data/items';
import { sounds } from './utils/audio';
import { downloadStandaloneHtmlFile } from './utils/exportHtml';
import {
  Volume2,
  VolumeX,
  Music,
  Camera,
  ShoppingBag,
  Sparkles,
  Trophy,
  Download,
  Croissant,
  Gift,
  ZoomIn,
  ZoomOut,
  Edit2,
  Check,
} from 'lucide-react';
import confetti from 'canvas-confetti';

const INITIAL_QUESTS: Quest[] = [
  {
    id: 'pet_cinnamoroll',
    title: 'Ласковые поглаживания',
    description: 'Погладь Синаморолла 10 раз',
    reward: 50,
    completed: false,
    claimed: false,
    current: 0,
    target: 10,
    icon: '🐾',
  },
  {
    id: 'full_outfit',
    title: 'Полный образ',
    description: 'Надень 4 предмета одновременно',
    reward: 40,
    completed: false,
    claimed: false,
    current: 4,
    target: 4,
    icon: '✨',
  },
  {
    id: 'play_bakery',
    title: 'Сладкая пекарня',
    description: 'Сыграй в мини-игру с булочками',
    reward: 60,
    completed: false,
    claimed: false,
    current: 0,
    target: 1,
    icon: '🥐',
  },
  {
    id: 'take_photo',
    title: 'Фото на память',
    description: 'Создай свою первую фотокарточку',
    reward: 50,
    completed: false,
    claimed: false,
    current: 0,
    target: 1,
    icon: '📷',
  },
  {
    id: 'buy_item',
    title: 'Модный шопинг',
    description: 'Купи любую новую вещь в магазине',
    reward: 70,
    completed: false,
    claimed: false,
    current: 0,
    target: 1,
    icon: '🛍️',
  },
];

const INITIAL_TREATS: ClickerTreat[] = [
  {
    id: 'sugar_bone',
    name: 'Сахарная косточка',
    description: '+1 дополнительная монетка за каждый клик',
    cost: 40,
    level: 1,
    maxLevel: 5,
    bonusPerClick: 1,
    autoPerSecond: 0,
    icon: '🦴',
  },
  {
    id: 'cinnamon_muffin',
    name: 'Маффин с корицей',
    description: '+3 дополнительных монетки за каждый клик',
    cost: 95,
    level: 0,
    maxLevel: 5,
    bonusPerClick: 3,
    autoPerSecond: 0,
    icon: '🧁',
  },
  {
    id: 'marshmallow_cloud',
    name: 'Облачный зефир',
    description: '+5 монеток за клик и шанс на супер-крит',
    cost: 160,
    level: 0,
    maxLevel: 3,
    bonusPerClick: 5,
    autoPerSecond: 0,
    icon: '☁️',
  },
  {
    id: 'auto_cloud',
    name: 'Мягкое авто-облачко',
    description: 'Автоматически гладит щеночка каждые 3 секунды',
    cost: 210,
    level: 0,
    maxLevel: 3,
    bonusPerClick: 0,
    autoPerSecond: 4,
    icon: '🪄',
  },
];

export default function App() {
  // --- Game Economy & Inventory State ---
  const [coins, setCoins] = useState<number>(() => {
    const saved = localStorage.getItem('cinna_coins');
    return saved !== null ? parseInt(saved, 10) : 180;
  });

  const [ownedItemIds, setOwnedItemIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('cinna_owned');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return Array.from(new Set([...INITIAL_FREE_ITEM_IDS, ...parsed]));
      } catch {
        // fallback
      }
    }
    return [...INITIAL_FREE_ITEM_IDS];
  });

  // --- Equipped Items State ---
  const [equippedHat, setEquippedHat] = useState<string | null>('sky_ribbon');
  const [equippedClothes, setEquippedClothes] = useState<string | null>('sweater_cinnamon');
  const [equippedShoes, setEquippedShoes] = useState<string | null>('pink_shoes');
  const [equippedAccessory, setEquippedAccessory] = useState<string | null>('marshmallow_cocoa');
  const [selectedBackground, setSelectedBackground] = useState<string>('bg_cloud_sky');
  const [blushStyle, setBlushStyle] = useState<BlushStyle>('classic');

  // --- Character Customization Details ---
  const [petName, setPetName] = useState<string>('Синаморолл');
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [charScale, setCharScale] = useState<number>(1);
  const [stageTime, setStageTime] = useState<'day' | 'sunset' | 'night'>('day');

  // --- Character State ---
  const [emotion, setEmotion] = useState<CharacterEmotion>('happy');
  const [isPetting, setIsPetting] = useState<boolean>(false);
  const [petCount, setPetCount] = useState<number>(0);
  const [particles, setParticles] = useState<FloatingParticle[]>([]);

  // --- Clicker Treats & Upgrades ---
  const [treats, setTreats] = useState<ClickerTreat[]>(() => {
    const saved = localStorage.getItem('cinna_treats');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return INITIAL_TREATS;
  });

  // --- Saved Outfits Presets ---
  const [savedOutfits, setSavedOutfits] = useState<SavedOutfit[]>(() => {
    const saved = localStorage.getItem('cinna_presets');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return [];
  });

  // --- Modals State ---
  const [quests, setQuests] = useState<Quest[]>(INITIAL_QUESTS);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [shopInitialItem, setShopInitialItem] = useState<WardrobeItem | null>(null);
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);
  const [isMiniGameOpen, setIsMiniGameOpen] = useState(false);
  const [isQuestsOpen, setIsQuestsOpen] = useState(false);
  const [isTreatsOpen, setIsTreatsOpen] = useState(false);
  const [isGachaOpen, setIsGachaOpen] = useState(false);

  // Audio controls
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [musicActive, setMusicActive] = useState(false);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('cinna_coins', coins.toString());
  }, [coins]);

  useEffect(() => {
    localStorage.setItem('cinna_owned', JSON.stringify(ownedItemIds));
  }, [ownedItemIds]);

  useEffect(() => {
    localStorage.setItem('cinna_treats', JSON.stringify(treats));
  }, [treats]);

  useEffect(() => {
    localStorage.setItem('cinna_presets', JSON.stringify(savedOutfits));
  }, [savedOutfits]);

  // Passive Auto-Pet Income from Cloud Treat
  useEffect(() => {
    const autoTreat = treats.find((t) => t.id === 'auto_cloud');
    if (!autoTreat || autoTreat.level === 0) return;

    const interval = setInterval(() => {
      const passive = autoTreat.autoPerSecond * autoTreat.level;
      setCoins((c) => c + passive);
      // Gentle sparkle particle
      const p: FloatingParticle = {
        id: Date.now() + Math.random(),
        x: 200 + Math.random() * 80,
        y: 200,
        text: `+${passive} 🪙 🪄`,
        color: '#89C4F4',
      };
      setParticles((prev) => [...prev, p]);
      setTimeout(() => {
        setParticles((prev) => prev.filter((item) => item.id !== p.id));
      }, 1000);
    }, 3000);

    return () => clearInterval(interval);
  }, [treats]);

  // Sound toggles
  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sounds.enabled = next;
    if (next) sounds.playPop();
  };

  const toggleMusic = () => {
    const active = sounds.toggleMusic();
    setMusicActive(active);
  };

  // Check outfit quest
  useEffect(() => {
    const count = [equippedHat, equippedClothes, equippedShoes, equippedAccessory].filter(Boolean).length;
    setQuests((prev) =>
      prev.map((q) => {
        if (q.id === 'full_outfit') {
          return {
            ...q,
            current: count,
            completed: count >= q.target,
          };
        }
        return q;
      })
    );
  }, [equippedHat, equippedClothes, equippedShoes, equippedAccessory]);

  // Calculate click bonus from treats
  const getClickBonus = () => {
    return treats.reduce((sum, t) => sum + t.bonusPerClick * t.level, 0);
  };

  // --- Petting Cinnamoroll Clicker ---
  const handlePet = (e: React.MouseEvent<SVGSVGElement>) => {
    sounds.playPet();
    setIsPetting(true);
    setTimeout(() => setIsPetting(false), 220);

    const isCrit = Math.random() > 0.8;
    const base = Math.floor(Math.random() * 3) + 3;
    const bonus = getClickBonus();
    const earned = isCrit ? (base + bonus) * 2 : base + bonus;

    setCoins((c) => c + earned);
    setPetCount((p) => p + 1);

    // Update quest
    setQuests((prev) =>
      prev.map((q) => {
        if (q.id === 'pet_cinnamoroll') {
          const nextVal = q.current + 1;
          return {
            ...q,
            current: nextVal,
            completed: nextVal >= q.target,
          };
        }
        return q;
      })
    );

    // Emotion wiggle
    if (Math.random() > 0.5) {
      const cuteEmotions: CharacterEmotion[] = ['winking', 'sparkling', 'love', 'happy'];
      const chosen = isCrit ? 'sparkling' : cuteEmotions[Math.floor(Math.random() * cuteEmotions.length)];
      setEmotion(chosen);
      setTimeout(() => setEmotion('happy'), 1600);
    }

    // Add particle
    const rect = (e.currentTarget as SVGElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newParticle: FloatingParticle = {
      id: Date.now() + Math.random(),
      x,
      y,
      text: isCrit ? `+${earned} 🪙 КРИТ!` : `+${earned} 🪙`,
      color: isCrit ? '#DD6B20' : '#D69E2E',
    };

    setParticles((prev) => [...prev, newParticle]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
    }, 1000);
  };

  // --- Equip Item ---
  const handleEquip = (item: WardrobeItem) => {
    sounds.playEquip();

    switch (item.category) {
      case 'hats':
        setEquippedHat((prev) => (prev === item.id ? null : item.id));
        break;
      case 'clothes':
        setEquippedClothes((prev) => (prev === item.id ? null : item.id));
        break;
      case 'shoes':
        setEquippedShoes((prev) => (prev === item.id ? null : item.id));
        break;
      case 'accessories':
        setEquippedAccessory((prev) => (prev === item.id ? null : item.id));
        break;
      case 'backgrounds':
        setSelectedBackground(item.id);
        break;
    }
  };

  // --- Unequip Category ---
  const handleUnequipCategory = (category: ItemCategory) => {
    sounds.playPop();
    switch (category) {
      case 'hats':
        setEquippedHat(null);
        break;
      case 'clothes':
        setEquippedClothes(null);
        break;
      case 'shoes':
        setEquippedShoes(null);
        break;
      case 'accessories':
        setEquippedAccessory(null);
        break;
    }
  };

  // --- Random Outfit ---
  const handleRandomize = () => {
    sounds.playBuy();

    const ownedHats = ALL_ITEMS.filter((i) => i.category === 'hats' && ownedItemIds.includes(i.id));
    const ownedClothes = ALL_ITEMS.filter((i) => i.category === 'clothes' && ownedItemIds.includes(i.id));
    const ownedShoes = ALL_ITEMS.filter((i) => i.category === 'shoes' && ownedItemIds.includes(i.id));
    const ownedAcc = ALL_ITEMS.filter((i) => i.category === 'accessories' && ownedItemIds.includes(i.id));

    if (ownedHats.length) setEquippedHat(ownedHats[Math.floor(Math.random() * ownedHats.length)].id);
    if (ownedClothes.length) setEquippedClothes(ownedClothes[Math.floor(Math.random() * ownedClothes.length)].id);
    if (ownedShoes.length) setEquippedShoes(ownedShoes[Math.floor(Math.random() * ownedShoes.length)].id);
    if (ownedAcc.length) setEquippedAccessory(ownedAcc[Math.floor(Math.random() * ownedAcc.length)].id);

    setEmotion('sparkling');
    setTimeout(() => setEmotion('happy'), 1500);

    confetti({
      particleCount: 35,
      spread: 55,
      origin: { y: 0.6 },
      colors: ['#89C4F4', '#FBB6CE', '#FEFCBF'],
    });
  };

  // --- Reset All Outfits ---
  const handleResetAll = () => {
    sounds.playPop();
    setEquippedHat(null);
    setEquippedClothes(null);
    setEquippedShoes(null);
    setEquippedAccessory(null);
  };

  // --- Buy Item in Shop ---
  const handleBuyItem = (item: WardrobeItem) => {
    if (coins < item.price || ownedItemIds.includes(item.id)) return;

    setCoins((c) => c - item.price);
    setOwnedItemIds((prev) => [...prev, item.id]);
    handleEquip(item);

    setQuests((prev) =>
      prev.map((q) => {
        if (q.id === 'buy_item') {
          return { ...q, current: 1, completed: true };
        }
        return q;
      })
    );
  };

  // --- Upgrade Clicker Treat ---
  const handleUpgradeTreat = (treatId: string) => {
    setTreats((prev) =>
      prev.map((t) => {
        if (t.id === treatId && coins >= t.cost && t.level < t.maxLevel) {
          setCoins((c) => c - t.cost);
          return {
            ...t,
            level: t.level + 1,
            cost: Math.round(t.cost * 1.5),
          };
        }
        return t;
      })
    );
  };

  // --- Save Outfit Preset ---
  const handleSaveCurrentOutfit = () => {
    if (savedOutfits.length >= 5) return;
    const newPreset: SavedOutfit = {
      id: Date.now().toString(),
      name: `Образ #${savedOutfits.length + 1}`,
      createdAt: Date.now(),
      hat: equippedHat,
      clothes: equippedClothes,
      shoes: equippedShoes,
      accessory: equippedAccessory,
      background: selectedBackground,
      emotion,
      blush: blushStyle,
    };
    setSavedOutfits((prev) => [...prev, newPreset]);
  };

  const handleLoadOutfit = (outfit: SavedOutfit) => {
    setEquippedHat(outfit.hat);
    setEquippedClothes(outfit.clothes);
    setEquippedShoes(outfit.shoes);
    setEquippedAccessory(outfit.accessory);
    setSelectedBackground(outfit.background);
    setEmotion(outfit.emotion);
    setBlushStyle(outfit.blush);
  };

  const handleDeleteOutfit = (id: string) => {
    setSavedOutfits((prev) => prev.filter((o) => o.id !== id));
  };

  // --- Claim Quest Reward ---
  const handleClaimReward = (questId: string) => {
    const q = quests.find((quest) => quest.id === questId);
    if (!q || !q.completed || q.claimed) return;

    setCoins((c) => c + q.reward);
    setQuests((prev) =>
      prev.map((item) => (item.id === questId ? { ...item, claimed: true } : item))
    );
  };

  // --- Reward from Mini-Game ---
  const handleMiniGameReward = (amount: number) => {
    setCoins((c) => c + amount);
    setQuests((prev) =>
      prev.map((q) => {
        if (q.id === 'play_bakery') {
          return { ...q, current: 1, completed: true };
        }
        return q;
      })
    );
  };

  const readyQuestsCount = quests.filter((q) => q.completed && !q.claimed).length;

  // Background styling resolver with lighting time
  const getStageBackgroundStyle = () => {
    if (stageTime === 'sunset') {
      return 'from-[#FFF0E6] via-[#FED7D7] to-[#FBB6CE] border-[#ED8936]/40';
    }
    if (stageTime === 'night') {
      return 'from-[#2D3748] via-[#4A5568] to-[#1A202C] border-[#805AD5]/50 text-white';
    }

    switch (selectedBackground) {
      case 'bg_cafe_cinnamon':
        return 'from-[#FFFDF0] via-[#FEEBC8] to-[#FBD38D] border-[#ED8936]/30';
      case 'bg_strawberry_room':
        return 'from-[#FFF5F5] via-[#FED7E2] to-[#FBB6CE] border-[#F687B3]/30';
      case 'bg_starry_night':
        return 'from-[#FAF5FF] via-[#E9D8FD] to-[#D6BCFA] border-[#805AD5]/30';
      default:
        return 'from-[#EBF8FF] via-[#BEE3F8] to-[#E2E8F0] border-[#90CDF4]/40';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EBF8FF] via-[#FFF5F8] to-[#FAF5FF] flex flex-col selection:bg-pink-200">
      {/* 1. TOP HEADER NAVIGATION */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-sky-100 shadow-sm px-4 sm:px-8 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Logo & Subtitle */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-300 to-pink-200 flex items-center justify-center text-2xl shadow-sm border border-white">
              ☁️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black text-sky-900 tracking-tight font-['Comfortaa',sans-serif]">
                  Синаморолл
                </h1>
                <span className="text-pink-500 text-[10px] px-2 py-0.5 rounded-full bg-pink-50 font-bold border border-pink-200">
                  Deluxe Dress-Up
                </span>
              </div>
              <p className="text-[10px] text-sky-600 font-bold hidden sm:block">
                Пастельная гардеробная, магазин нарядов и пекарня Sanrio
              </p>
            </div>
          </div>

          {/* Quick Action Badges */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Standalone Single HTML Download button */}
            <button
              onClick={() => {
                sounds.playPop();
                downloadStandaloneHtmlFile();
              }}
              title="Скачать игру как единый автономный HTML файл для запуска без интернета"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition border border-indigo-200 active:scale-95 shadow-sm"
            >
              <Download size={14} />
              <span className="hidden md:inline">Скачать .HTML</span>
            </button>

            {/* Lucky Gacha Box */}
            <button
              onClick={() => {
                sounds.playPop();
                setIsGachaOpen(true);
              }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold transition border border-purple-200 active:scale-95 shadow-sm"
            >
              <Gift size={14} className="text-purple-500 animate-bounce" />
              <span className="hidden sm:inline">Сюрприз</span>
            </button>

            {/* Treats / Upgrades */}
            <button
              onClick={() => {
                sounds.playPop();
                setIsTreatsOpen(true);
              }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold transition border border-amber-200 active:scale-95 shadow-sm"
            >
              <span className="text-xs">🧁</span>
              <span className="hidden sm:inline">Угощения</span>
            </button>

            {/* Quests Button */}
            <button
              onClick={() => {
                sounds.playPop();
                setIsQuestsOpen(true);
              }}
              className="relative flex items-center gap-1 px-3 py-1.5 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-700 text-xs font-bold transition border border-pink-200 active:scale-95 shadow-sm"
            >
              <Trophy size={14} className="text-amber-500" />
              <span className="hidden sm:inline">Квесты</span>
              {readyQuestsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] flex items-center justify-center font-extrabold animate-bounce">
                  {readyQuestsCount}
                </span>
              )}
            </button>

            {/* Mini-Game Button */}
            <button
              onClick={() => {
                sounds.playPop();
                setIsMiniGameOpen(true);
              }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold transition border border-amber-200 active:scale-95 shadow-sm"
            >
              <Croissant size={14} className="text-amber-600" />
              <span className="hidden sm:inline">Пекарня</span>
            </button>

            {/* Melody Music Toggle */}
            <button
              onClick={toggleMusic}
              title={musicActive ? 'Выключить музыку' : 'Включить милую шкатулку-колыбельную'}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition border active:scale-95 ${
                musicActive
                  ? 'bg-pink-400 text-white border-pink-500 shadow-pink-200 shadow-sm'
                  : 'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100'
              }`}
            >
              <Music size={14} className={musicActive ? 'animate-spin-slow' : ''} />
            </button>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              title={soundEnabled ? 'Выключить звук' : 'Включить звук'}
              className="w-8 h-8 rounded-full bg-sky-50 hover:bg-sky-100 text-sky-700 flex items-center justify-center transition border border-sky-200 active:scale-95"
            >
              {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} className="text-slate-400" />}
            </button>

            {/* Coin Balance Badge */}
            <div
              onClick={() => setIsShopOpen(true)}
              title="Нажми, чтобы открыть магазин нарядов"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-100 to-yellow-100 border-2 border-amber-300 text-amber-900 font-black text-xs sm:text-sm shadow-sm cursor-pointer hover:scale-105 transition active:scale-95"
            >
              <span className="text-base animate-bounce">🪙</span>
              <span>{coins}</span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. MAIN WORKSPACE / GAME LAYOUT */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-5 grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* LEFT / CENTER: Character Stage (7 Columns on desktop) */}
        <div className="lg:col-span-7 flex flex-col">
          <div
            className={`relative flex-1 min-h-[500px] sm:min-h-[580px] rounded-3xl bg-gradient-to-b ${getStageBackgroundStyle()} border-4 shadow-xl backdrop-blur-sm flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden transition-all duration-500`}
          >
            {/* Background floating decor */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
              <div className="absolute top-6 left-8 text-3xl opacity-50 animate-pulse">☁️</div>
              <div className="absolute top-16 right-10 text-4xl opacity-50 animate-pulse delay-700">☁️</div>
              <div className="absolute bottom-16 left-12 text-2xl opacity-40">✨</div>
              <div className="absolute top-32 left-1/4 text-2xl opacity-30">⭐</div>
              <div className="absolute bottom-24 right-16 text-3xl opacity-40">🌸</div>
            </div>

            {/* Stage Lighting / Time of Day pill */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-1 bg-white/80 backdrop-blur-sm p-1 rounded-2xl border border-sky-100 shadow-sm text-xs">
              <button
                onClick={() => setStageTime('day')}
                title="Дневной свет"
                className={`px-2 py-1 rounded-xl font-bold transition ${
                  stageTime === 'day' ? 'bg-sky-400 text-white shadow-sm' : 'text-slate-600'
                }`}
              >
                ☀️ День
              </button>
              <button
                onClick={() => setStageTime('sunset')}
                title="Золотой закат"
                className={`px-2 py-1 rounded-xl font-bold transition ${
                  stageTime === 'sunset' ? 'bg-amber-400 text-white shadow-sm' : 'text-slate-600'
                }`}
              >
                🌅 Закат
              </button>
              <button
                onClick={() => setStageTime('night')}
                title="Ночные звёзды"
                className={`px-2 py-1 rounded-xl font-bold transition ${
                  stageTime === 'night' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600'
                }`}
              >
                🌙 Ночь
              </button>
            </div>

            {/* Quick Top-Stage Action Buttons */}
            <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
              {/* Zoom Controls */}
              <div className="flex items-center gap-1 bg-white/85 backdrop-blur-sm p-1 rounded-2xl border border-sky-100 shadow-sm">
                <button
                  onClick={() => setCharScale((s) => Math.min(s + 0.1, 1.25))}
                  title="Приблизить персонажа"
                  className="w-7 h-7 rounded-xl text-sky-700 hover:bg-sky-100 flex items-center justify-center transition"
                >
                  <ZoomIn size={14} />
                </button>
                <button
                  onClick={() => setCharScale((s) => Math.max(s - 0.1, 0.85))}
                  title="Отдалить персонажа"
                  className="w-7 h-7 rounded-xl text-sky-700 hover:bg-sky-100 flex items-center justify-center transition"
                >
                  <ZoomOut size={14} />
                </button>
              </div>

              <button
                onClick={() => {
                  sounds.playPop();
                  setIsPhotoOpen(true);
                  setQuests((prev) =>
                    prev.map((q) => (q.id === 'take_photo' ? { ...q, current: 1, completed: true } : q))
                  );
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white/90 hover:bg-white text-pink-600 font-extrabold text-xs sm:text-sm shadow-md hover:shadow-lg transition active:scale-95 border border-pink-100"
              >
                <Camera size={15} className="text-pink-500 animate-pulse" />
                <span>Сделать фото</span>
              </button>

              <button
                onClick={() => {
                  sounds.playPop();
                  setIsShopOpen(true);
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white font-extrabold text-xs sm:text-sm shadow-md hover:shadow-lg transition active:scale-95"
              >
                <ShoppingBag size={15} />
                <span>Магазин</span>
              </button>
            </div>

            {/* Floating Particles from clicking */}
            <div className="absolute inset-0 pointer-events-none z-30">
              {particles.map((p) => (
                <div
                  key={p.id}
                  style={{ left: p.x, top: p.y, color: p.color }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 font-black text-sm sm:text-base pointer-events-none drop-shadow-md animate-floatUp"
                >
                  {p.text}
                </div>
              ))}
            </div>

            {/* Main Center Character SVG */}
            <div className="relative z-10 flex flex-col items-center justify-center my-auto">
              {/* Customizable Name Tag */}
              <div className="mb-2 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3.5 py-1 rounded-full shadow-sm border border-sky-100">
                <span className="text-xs">🐾</span>
                {isEditingName ? (
                  <input
                    type="text"
                    value={petName}
                    maxLength={16}
                    onChange={(e) => setPetName(e.target.value)}
                    onBlur={() => setIsEditingName(false)}
                    onKeyDown={(e) => e.key === 'Enter' && setIsEditingName(false)}
                    autoFocus
                    className="w-28 text-xs font-black text-sky-900 border-b border-sky-300 focus:outline-none"
                  />
                ) : (
                  <span
                    onClick={() => setIsEditingName(true)}
                    className="text-xs font-black text-sky-900 cursor-pointer hover:underline"
                    title="Нажми, чтобы изменить имя"
                  >
                    {petName}
                  </span>
                )}
                <button
                  onClick={() => setIsEditingName(!isEditingName)}
                  className="text-slate-400 hover:text-sky-600 text-[10px]"
                >
                  <Edit2 size={10} />
                </button>
              </div>

              <CinnamorollCharacter
                hatId={equippedHat}
                clothesId={equippedClothes}
                shoesId={equippedShoes}
                accessoryId={equippedAccessory}
                emotion={emotion}
                blush={blushStyle}
                isPetting={isPetting}
                onPet={handlePet}
                scale={charScale}
                className="drop-shadow-2xl"
              />

              {/* Sweet Petting Hint & Pet Counter */}
              <div className="mt-4 flex flex-col items-center">
                <button
                  onClick={(e) => {
                    const svg = document.getElementById('cinnamoroll-svg') as unknown as SVGSVGElement;
                    if (svg) {
                      handlePet({
                        clientX: e.clientX,
                        clientY: e.clientY,
                        currentTarget: svg,
                      } as unknown as React.MouseEvent<SVGSVGElement>);
                    }
                  }}
                  className="group flex items-center gap-2 px-5 py-2 rounded-full bg-white/90 hover:bg-white text-sky-800 text-xs sm:text-sm font-black shadow-md border border-sky-100 hover:border-sky-300 transition active:scale-95"
                >
                  <span className="text-base group-hover:scale-125 transition-transform">🐾</span>
                  <span>Погладь щеночка!</span>
                  <span className="text-amber-600 font-extrabold">(+{4 + getClickBonus()} 🪙)</span>
                </button>
                <span className="text-[11px] text-sky-800/80 mt-1 font-bold">
                  Обнимашек: {petCount} • Кликай по Синамороллу прямо в центре!
                </span>
              </div>
            </div>

            {/* Bottom Expression Bar */}
            <div className="absolute bottom-4 left-4 z-20 flex items-center gap-1.5 bg-white/80 backdrop-blur-sm p-1 rounded-2xl border border-sky-100 shadow-sm">
              <span className="text-[10px] font-bold text-sky-700 px-1.5">Эмоция:</span>
              {[
                { id: 'happy', icon: '😊', title: 'Радостный' },
                { id: 'winking', icon: '😉', title: 'Подмигивает' },
                { id: 'sparkling', icon: '✨', title: 'Восторг' },
                { id: 'love', icon: '😍', title: 'Любовь' },
                { id: 'shy', icon: '🙈', title: 'Смущённый' },
                { id: 'sleepy', icon: '😴', title: 'Сонный' },
                { id: 'eating', icon: '🧁', title: 'Лакомка' },
              ].map((em) => (
                <button
                  key={em.id}
                  onClick={() => {
                    setEmotion(em.id as CharacterEmotion);
                    sounds.playPop();
                  }}
                  title={em.title}
                  className={`w-7 h-7 rounded-xl text-sm flex items-center justify-center transition active:scale-90 ${
                    emotion === em.id
                      ? 'bg-sky-400 text-white shadow-sm scale-110'
                      : 'hover:bg-sky-100/60'
                  }`}
                >
                  {em.icon}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Wardrobe & Inventory Panel (5 Columns on desktop) */}
        <div className="lg:col-span-5 flex flex-col">
          <WardrobePanel
            ownedItemIds={ownedItemIds}
            equippedHat={equippedHat}
            equippedClothes={equippedClothes}
            equippedShoes={equippedShoes}
            equippedAccessory={equippedAccessory}
            selectedBackground={selectedBackground}
            blushStyle={blushStyle}
            onSelectBlush={setBlushStyle}
            onEquip={handleEquip}
            onUnequipCategory={handleUnequipCategory}
            onRandomize={handleRandomize}
            onResetAll={handleResetAll}
            onOpenShopWithItem={(item) => {
              setShopInitialItem(item);
              setIsShopOpen(true);
            }}
            savedOutfits={savedOutfits}
            onSaveCurrentOutfit={handleSaveCurrentOutfit}
            onLoadOutfit={handleLoadOutfit}
            onDeleteOutfit={handleDeleteOutfit}
          />
        </div>
      </main>

      {/* 3. MODALS */}
      {/* Shop Modal */}
      <ShopModal
        isOpen={isShopOpen}
        onClose={() => {
          setIsShopOpen(false);
          setShopInitialItem(null);
        }}
        coins={coins}
        ownedItemIds={ownedItemIds}
        onBuyItem={handleBuyItem}
        equippedHat={equippedHat}
        equippedClothes={equippedClothes}
        equippedShoes={equippedShoes}
        equippedAccessory={equippedAccessory}
        initialSelectedItem={shopInitialItem}
      />

      {/* Photo Booth Modal */}
      <PhotoBoothModal
        isOpen={isPhotoOpen}
        onClose={() => setIsPhotoOpen(false)}
        hatId={equippedHat}
        clothesId={equippedClothes}
        shoesId={equippedShoes}
        accessoryId={equippedAccessory}
        backgroundId={selectedBackground}
        emotion={emotion}
        blush={blushStyle}
      />

      {/* Bakery Catch Mini-Game */}
      <BakeryMiniGame
        isOpen={isMiniGameOpen}
        onClose={() => setIsMiniGameOpen(false)}
        onRewardCoins={handleMiniGameReward}
      />

      {/* Quests Modal */}
      <QuestsModal
        isOpen={isQuestsOpen}
        onClose={() => setIsQuestsOpen(false)}
        quests={quests}
        onClaimReward={handleClaimReward}
      />

      {/* Treats / Upgrades Modal */}
      <TreatsModal
        isOpen={isTreatsOpen}
        onClose={() => setIsTreatsOpen(false)}
        coins={coins}
        treats={treats}
        onUpgradeTreat={handleUpgradeTreat}
      />

      {/* Lucky Gacha Box Modal */}
      <LuckyGachaModal
        isOpen={isGachaOpen}
        onClose={() => setIsGachaOpen(false)}
        coins={coins}
        onSpendCoins={(amount) => setCoins((c) => Math.max(0, c - amount))}
        onRewardCoins={(amount) => setCoins((c) => c + amount)}
        ownedItemIds={ownedItemIds}
      />
    </div>
  );
}
