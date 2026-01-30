/* =======================
   TYPES
======================= */

export type WallpaperType =
  | 'standard'
  | 'designer'
  | 'vinyl'
  | 'textile'
  | 'mural';

export type WallpaperSeries =
  | 'Classic'
  | 'Modern'
  | 'Loft'
  | 'Kids'
  | 'Art';

export type MaterialCategory =
  | 'paper'
  | 'vinyl'
  | 'textile'
  | 'nonwoven';

export type OptionCategory =
  | 'finish'
  | 'coating'
  | 'installation';

/* =======================
   MATERIALS
======================= */

export interface MaterialOption {
  id: string;
  name: string;
  category: MaterialCategory;
  priceMultiplier: number;
}

export const materialOptions: MaterialOption[] = [
  { id: 'paper-1', name: 'Бумажные', category: 'paper', priceMultiplier: 1.0 },
  { id: 'vinyl-1', name: 'Винил', category: 'vinyl', priceMultiplier: 1.3 },
  { id: 'textile-1', name: 'Текстиль', category: 'textile', priceMultiplier: 1.6 },
  { id: 'nonwoven-1', name: 'Флизелин', category: 'nonwoven', priceMultiplier: 1.2 },
];

/* =======================
   CONFIG OPTIONS
======================= */

export interface ConfigOption {
  id: string;
  name: string;
  category: OptionCategory;
  price: number;
}

export const configOptions: ConfigOption[] = [
  { id: 'finish-matte', name: 'Матовая поверхность', category: 'finish', price: 0 },
  { id: 'finish-glossy', name: 'Глянцевая поверхность', category: 'finish', price: 300 },

  { id: 'coat-washable', name: 'Моющаяся защита', category: 'coating', price: 500 },
  { id: 'coat-uv', name: 'UV-защита', category: 'coating', price: 700 },

  { id: 'install-basic', name: 'Базовый монтаж', category: 'installation', price: 2000 },
  { id: 'install-premium', name: 'Премиум монтаж', category: 'installation', price: 3500 },
];

/* =======================
   WALLPAPER MODELS
======================= */

export interface WallpaperModelConfig {
  id: string;
  name: string;
  series: WallpaperSeries;
  type: WallpaperType;

  basePricePerM2: number;

  availableMaterials: string[];
  availableOptions: string[];

  lockedMaterials?: string[];

  image?: {
    preview: string;
    card?: string;
  };
}

/* =======================
   PRESETS
======================= */

const STANDARD_MATERIALS = [
  'paper-1',
  'vinyl-1',
  'nonwoven-1',
];

const PREMIUM_MATERIALS = [
  'vinyl-1',
  'textile-1',
  'nonwoven-1',
];

const STANDARD_OPTIONS = [
  'finish-matte',
  'finish-glossy',
  'coat-washable',
  'install-basic',
];

const PREMIUM_OPTIONS = [
  'finish-matte',
  'finish-glossy',
  'coat-washable',
  'coat-uv',
  'install-basic',
  'install-premium',
];

/* =======================
   WALLPAPER CATALOG
======================= */

export const wallpaperModels: WallpaperModelConfig[] = [
  {
    id: 'classic-flowers',
    name: 'Цветочный орнамент',
    series: 'Classic',
    type: 'standard',
    basePricePerM2: 1200,
    availableMaterials: STANDARD_MATERIALS,
    availableOptions: STANDARD_OPTIONS,
    image: {
      preview: '/img/wallpapers/classic-flowers.jpg',
    },
  },

  {
    id: 'modern-geometry',
    name: 'Геометрия',
    series: 'Modern',
    type: 'vinyl',
    basePricePerM2: 1600,
    availableMaterials: PREMIUM_MATERIALS,
    availableOptions: PREMIUM_OPTIONS,
    image: {
      preview: '/img/wallpapers/modern-geometry.jpg',
    },
  },

  {
    id: 'loft-concrete',
    name: 'Бетон Loft',
    series: 'Loft',
    type: 'designer',
    basePricePerM2: 1900,
    availableMaterials: ['vinyl-1', 'textile-1'],
    lockedMaterials: ['textile-1'],
    availableOptions: PREMIUM_OPTIONS,
    image: {
      preview: '/img/wallpapers/loft-concrete.jpg',
    },
  },

  {
    id: 'kids-space',
    name: 'Космос',
    series: 'Kids',
    type: 'standard',
    basePricePerM2: 1100,
    availableMaterials: STANDARD_MATERIALS,
    availableOptions: STANDARD_OPTIONS,
    image: {
      preview: '/img/wallpapers/kids-space.jpg',
    },
  },

  {
    id: 'art-mural-city',
    name: 'Городской мурал',
    series: 'Art',
    type: 'mural',
    basePricePerM2: 2500,
    availableMaterials: ['textile-1'],
    lockedMaterials: ['textile-1'],
    availableOptions: PREMIUM_OPTIONS,
    image: {
      preview: '/img/wallpapers/art-city.jpg',
    },
  },
];
