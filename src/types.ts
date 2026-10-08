export type ItemCategory = 'hats' | 'clothes' | 'shoes' | 'accessories' | 'backgrounds';

export type CharacterEmotion = 'happy' | 'winking' | 'sparkling' | 'sleepy' | 'eating' | 'love' | 'shy';

export type BlushStyle = 'classic' | 'hearts' | 'stars' | 'sakura' | 'sparkles';

export interface WardrobeItem {
  id: string;
  name: string;
  description: string;
  category: ItemCategory;
  price: number; // 0 for starting free items
  isFreeInitial?: boolean; // one of the 7 initial free items
  icon: string; // emoji or SVG key
  color: string;
  tag?: string; // e.g. "Новинка", "Хит", "Редкий"
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  reward: number;
  completed: boolean;
  claimed: boolean;
  current: number;
  target: number;
  icon: string;
}

export interface FloatingParticle {
  id: number;
  x: number;
  y: number;
  text: string;
  color?: string;
}

export interface SavedOutfit {
  id: string;
  name: string;
  createdAt: number;
  hat: string | null;
  clothes: string | null;
  shoes: string | null;
  accessory: string | null;
  background: string;
  emotion: CharacterEmotion;
  blush: BlushStyle;
}

export interface ClickerTreat {
  id: string;
  name: string;
  description: string;
  cost: number;
  level: number;
  maxLevel: number;
  bonusPerClick: number;
  autoPerSecond: number;
  icon: string;
}
