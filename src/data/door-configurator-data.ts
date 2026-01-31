// =====================
// TYPE DEFINITIONS
// =====================

export type DoorType = 'standard' | 'designer' | 'preset' | 'hidden';
export type ColorCategory = 'wood' | 'solid' | 'concrete' | 'decorative' | 'glass';
export type OptionCategory = 'hardware' | 'glass' | 'edge';

export interface DoorModelConfig {
  id: string;
  name: string;
  series: string;
  type: DoorType;
  basePrice: number;
  availableColors: string[];
  availableOptions: string[];
  lockedColors?: string[]; // Для комбинированных моделей Designer
  image?: string;
}

export interface ColorOption {
  id: string;
  name: string;
  category: ColorCategory;
  price: number;
  textureUrl: string;
}

export interface ConfigOption {
  id: string;
  name: string;
  category: OptionCategory;
  price: number;
  description?: string;
}

// =====================
// COLOR OPTIONS
// =====================

const TEXTURES = {
  wood: '/assets/textures/ai/ai-sand.jpg',
  concrete: '/assets/textures/ai/ai-graphite.jpg',
  solid: '/assets/textures/ai/ai-solid-blanco.jpg',
  decorative: '/assets/textures/ai/ai-sand.jpg',
  glass: '/assets/textures/ai/ai-solid-blanco.jpg'
};


export const colorOptions: ColorOption[] = [
  // WOOD TEXTURES
  { id: 'wood-1', name: 'Северный дуб', category: 'wood', price: 1500, textureUrl: TEXTURES.wood },
{ id: 'wood-2', name: 'Темный дуб', category: 'wood', price: 2500, textureUrl: TEXTURES.wood },
{ id: 'wood-3', name: 'Классик дуб', category: 'wood', price: 2000, textureUrl: TEXTURES.wood },
{ id: 'wood-4', name: 'Ясень белый', category: 'wood', price: 1800, textureUrl: TEXTURES.wood },
{ id: 'wood-5', name: 'Саванна люкс', category: 'wood', price: 1500, textureUrl: TEXTURES.wood },
{ id: 'wood-6', name: 'Пустыня люкс', category: 'wood', price: 1600, textureUrl: TEXTURES.wood },
{ id: 'wood-7', name: 'Терракота люкс', category: 'wood', price: 1700, textureUrl: TEXTURES.wood },
{ id: 'wood-8', name: 'Дюны люкс', category: 'wood', price: 1600, textureUrl: TEXTURES.wood },
{ id: 'wood-9', name: 'Эвкалипт светлый', category: 'wood', price: 1900, textureUrl: TEXTURES.wood },
{ id: 'wood-10', name: 'Каньон люкс', category: 'wood', price: 2100, textureUrl: TEXTURES.wood },


  // SOLID / ENAMEL COLORS
  { id: 'solid-1', name: 'Молочный дуб', category: 'solid', price: 500, textureUrl: TEXTURES.solid },
{ id: 'solid-2', name: 'Дымчатый дуб', category: 'solid', price: 800, textureUrl: TEXTURES.solid },
{ id: 'solid-3', name: 'Хлопок белый', category: 'solid', price: 500, textureUrl: TEXTURES.solid },
{ id: 'solid-4', name: 'Светло-серый', category: 'solid', price: 700, textureUrl: TEXTURES.solid },
{ id: 'solid-5', name: 'Можжевельник графитовый', category: 'solid', price: 1000, textureUrl: TEXTURES.solid },
{ id: 'solid-6', name: 'Миндаль розовый', category: 'solid', price: 900, textureUrl: TEXTURES.solid },
{ id: 'solid-7', name: 'Лен сливочный', category: 'solid', price: 1100, textureUrl: TEXTURES.solid },
{ id: 'solid-8', name: 'Шелк серый', category: 'solid', price: 1200, textureUrl: TEXTURES.solid },
{ id: 'solid-9', name: 'Лес карельский', category: 'solid', price: 800, textureUrl: TEXTURES.solid },
{ id: 'solid-10', name: 'Бухта янтарная', category: 'solid', price: 900, textureUrl: TEXTURES.solid },


  // CONCRETE
  { id: 'concrete-1', name: 'Теплый бетон', category: 'concrete', price: 1300, textureUrl: TEXTURES.concrete },
{ id: 'concrete-2', name: 'Снежный бетон', category: 'concrete', price: 1400, textureUrl: TEXTURES.concrete },
{ id: 'concrete-3', name: 'Графит бетон', category: 'concrete', price: 1500, textureUrl: TEXTURES.concrete },
{ id: 'concrete-4', name: 'Абсолют бетон', category: 'concrete', price: 1400, textureUrl: TEXTURES.concrete },


  // DECORATIVE / TEXTURED
  { id: 'deco-1', name: 'Песок белый', category: 'decorative', price: 1600, textureUrl: TEXTURES.decorative },
{ id: 'deco-2', name: 'Песок черный', category: 'decorative', price: 1700, textureUrl: TEXTURES.decorative },
{ id: 'deco-3', name: 'Альпийский дуб', category: 'decorative', price: 1500, textureUrl: TEXTURES.decorative },
{ id: 'deco-4', name: 'Ривьера ледяная', category: 'decorative', price: 1800, textureUrl: TEXTURES.decorative },
{ id: 'deco-5', name: 'Мыс пепельный', category: 'decorative', price: 1800, textureUrl: TEXTURES.decorative },
{ id: 'deco-6', name: 'Берег песчаный', category: 'decorative', price: 1900, textureUrl: TEXTURES.decorative },
{ id: 'deco-7', name: 'Долина золотая', category: 'decorative', price: 2000, textureUrl: TEXTURES.decorative },


  // GLASS / LACOBEL SURFACES
  { id: 'glass-1', name: 'Lacobel белый', category: 'glass', price: 3500, textureUrl: TEXTURES.glass },
{ id: 'glass-2', name: 'Lacobel ультра белый', category: 'glass', price: 4000, textureUrl: TEXTURES.glass },
{ id: 'glass-3', name: 'Lacobel черный', category: 'glass', price: 3800, textureUrl: TEXTURES.glass },

];

// =====================
// CONFIGURATION OPTIONS
// =====================

export const configOptions: ConfigOption[] = [
  // HARDWARE
  { 
    id: 'hw-1', 
    name: 'Врезка замка MORELLI 1895', 
    category: 'hardware', 
    price: 2500,
    description: 'Высококачественный итальянский замок скрытого монтажа'
  },
  { 
    id: 'hw-2', 
    name: 'Врезка петель скрытого монтажа HH-4', 
    category: 'hardware', 
    price: 3500,
    description: 'Невидимые петли, обеспечивающие современный минималистичный вид'
  },

  // GLASS OPTIONS
  { id: 'gl-1', name: 'Стекло без рисунка', category: 'glass', price: 3000 },
  { id: 'gl-2', name: 'Стекло ромб', category: 'glass', price: 3500 },
  { id: 'gl-3', name: 'Стекло берн', category: 'glass', price: 3800 },
  { id: 'gl-4', name: 'Стекло версаль', category: 'glass', price: 4000 },
  { id: 'gl-5', name: '«Шпион» полупрозрачный зеркальный элемент', category: 'glass', price: 4500 },
  { id: 'gl-6', name: 'Зеркало двустороннее графит', category: 'glass', price: 5000 },

  // EDGE FINISHING
  { id: 'edge-1', name: 'Кромка АБС пластик черная', category: 'edge', price: 800 },
  { id: 'edge-2', name: 'Кромка АБС пластик серебристая', category: 'edge', price: 800 },
  { id: 'edge-3', name: 'Кромка АБС пластик графит', category: 'edge', price: 800 },
  { id: 'edge-4', name: 'Кромка пластик с 4-х сторон', category: 'edge', price: 1200 },
  { id: 'edge-5', name: 'Кромка AL c 2-х сторон черная', category: 'edge', price: 1800 },
  { id: 'edge-6', name: 'Кромка AL c 2-х сторон хром', category: 'edge', price: 1800 },
  { id: 'edge-7', name: 'Кромка AL c 4-х сторон черная', category: 'edge', price: 2500 },
  { id: 'edge-8', name: 'Кромка AL c 4-х сторон хром', category: 'edge', price: 2500 },
  { id: 'edge-9', name: 'Бескромочная технология (кромка в цвет двери)', category: 'edge', price: 2000 },
];

// =====================
// DOOR MODELS
// =====================

export const doorModels: DoorModelConfig[] = [
  // ===== STANDARD SERIES =====
  // L Series
  { id: 'l1', name: 'VS-01', series: 'L', type: 'standard', basePrice: 18990, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'l1-5', name: 'VS-01-5', series: 'L', type: 'standard', basePrice: 19500, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'l1-ds', name: 'VS-01-DS', series: 'L', type: 'standard', basePrice: 20200, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'l1-st', name: 'VS-01-ST', series: 'L', type: 'standard', basePrice: 21000, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'l2', name: 'VS-02', series: 'L', type: 'standard', basePrice: 19200, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'l4', name: 'VS-04', series: 'L', type: 'standard', basePrice: 19800, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'l5', name: 'VS-05', series: 'L', type: 'standard', basePrice: 20500, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'l5-3', name: 'VS-05-3', series: 'L', type: 'standard', basePrice: 20900, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'l6', name: 'VS-06', series: 'L', type: 'standard', basePrice: 21200, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'l7', name: 'VS-07', series: 'L', type: 'standard', basePrice: 21500, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'l8', name: 'VS-08', series: 'L', type: 'standard', basePrice: 22000, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'gl-1', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'l8-2', name: 'VS-08-2', series: 'L', type: 'standard', basePrice: 22300, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'gl-1', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'l8-3', name: 'VS-08-3', series: 'L', type: 'standard', basePrice: 22500, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'gl-1', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'l8-4', name: 'VS-08-4', series: 'L', type: 'standard', basePrice: 22700, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'gl-1', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'l8-5', name: 'VS-08-5', series: 'L', type: 'standard', basePrice: 23000, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'gl-1', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'l9', name: 'VS-09', series: 'L', type: 'standard', basePrice: 23500, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'gl-1', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'l9-st', name: 'VS-09-ST', series: 'L', type: 'standard', basePrice: 24000, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'gl-1', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'l10', name: 'VS-10', series: 'L', type: 'standard', basePrice: 24500, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'l11', name: 'VS-11', series: 'L', type: 'standard', basePrice: 25000, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'l11-5', name: 'VS-11-5', series: 'L', type: 'standard', basePrice: 25300, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'l11-6', name: 'VS-11-6', series: 'L', type: 'standard', basePrice: 25500, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'l11-st', name: 'VS-11-ST', series: 'L', type: 'standard', basePrice: 26000, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'l12', name: 'VS-12', series: 'L', type: 'standard', basePrice: 26500, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'l13', name: 'VS-13', series: 'L', type: 'standard', basePrice: 27000, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'l13-2', name: 'VS-13-2', series: 'L', type: 'standard', basePrice: 27200, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'l14', name: 'VS-14', series: 'L', type: 'standard', basePrice: 27500, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'l15', name: 'VS-15', series: 'L', type: 'standard', basePrice: 28000, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },

  // LX Series
  { id: 'lx1', name: 'EG-01', series: 'LX', type: 'standard', basePrice: 21000, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'lx2', name: 'EG-02', series: 'LX', type: 'standard', basePrice: 21500, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'lx3', name: 'EG-03', series: 'LX', type: 'standard', basePrice: 22000, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'lx4', name: 'EG-04', series: 'LX', type: 'standard', basePrice: 22500, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'lx4-1', name: 'EG-04-1', series: 'LX', type: 'standard', basePrice: 22700, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'lx5', name: 'EG-05', series: 'LX', type: 'standard', basePrice: 23000, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'lx6', name: 'EG-06', series: 'LX', type: 'standard', basePrice: 23500, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'lx7', name: 'EG-07', series: 'LX', type: 'standard', basePrice: 24000, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'lx8', name: 'EG-08', series: 'LX', type: 'standard', basePrice: 24500, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'lx8-2', name: 'EG-08-2', series: 'LX', type: 'standard', basePrice: 24700, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'lx9', name: 'EG-09', series: 'LX', type: 'standard', basePrice: 25000, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'lx10', name: 'EG-10', series: 'LX', type: 'standard', basePrice: 25500, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'lx11', name: 'EG-11', series: 'LX', type: 'standard', basePrice: 26000, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'lx12', name: 'EG-12', series: 'LX', type: 'standard', basePrice: 26500, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'lx13', name: 'EG-13', series: 'LX', type: 'standard', basePrice: 27000, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'lx13-2', name: 'EG-13-2', series: 'LX', type: 'standard', basePrice: 27200, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'lx14', name: 'EG-14', series: 'LX', type: 'standard', basePrice: 27500, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },

  // S Series
  { id: 's1', name: 'SK-01', series: 'S', type: 'standard', basePrice: 17990, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 's2', name: 'SK-02', series: 'S', type: 'standard', basePrice: 18500, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 's2-1', name: 'SK-02-1', series: 'S', type: 'standard', basePrice: 18700, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 's3', name: 'SK-03', series: 'S', type: 'standard', basePrice: 19000, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 's4', name: 'SK-04', series: 'S', type: 'standard', basePrice: 19500, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 's7', name: 'SK-07', series: 'S', type: 'standard', basePrice: 20000, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 's7-2', name: 'SK-07-2', series: 'S', type: 'standard', basePrice: 20200, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 's8', name: 'SK-08', series: 'S', type: 'standard', basePrice: 20500, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 's15', name: 'SK-15', series: 'S', type: 'standard', basePrice: 21000, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },

  // SH Series
  { id: 'sh-1', name: 'GS-01', series: 'SH', type: 'standard', basePrice: 22000, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'sh-2', name: 'GS-02', series: 'SH', type: 'standard', basePrice: 22500, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'sh-3', name: 'GS-03', series: 'SH', type: 'standard', basePrice: 23000, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'sh-4', name: 'GS-04', series: 'SH', type: 'standard', basePrice: 23500, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'sh-5', name: 'GS-05', series: 'SH', type: 'standard', basePrice: 24000, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'sh-6', name: 'GS-06', series: 'SH', type: 'standard', basePrice: 24500, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'sh-7', name: 'GS-07', series: 'SH', type: 'standard', basePrice: 25000, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'sh-8', name: 'SD', series: 'SH', type: 'standard', basePrice: 25500, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },

  // Classic Series
  { id: 'classic-1', name: 'CL-02', series: 'Классика', type: 'standard', basePrice: 19500, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4'] },
  { id: 'classic-1bg', name: 'CL-02B', series: 'Классика', type: 'standard', basePrice: 20000, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4'] },
  { id: 'classic-2', name: 'CL-03', series: 'Классика', type: 'standard', basePrice: 20500, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4'] },
  { id: 'classic-3', name: 'CL-01', series: 'Классика', type: 'standard', basePrice: 21000, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4'] },
  { id: 'classic-3bg', name: 'CL-01B', series: 'Классика', type: 'standard', basePrice: 21500, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4'] },
  { id: 'classic-do1', name: 'CL-02G', series: 'Классика', type: 'standard', basePrice: 22000, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6'], availableOptions: ['hw-1', 'hw-2', 'gl-1', 'gl-2', 'gl-3', 'edge-1', 'edge-2', 'edge-3', 'edge-4'] },
  { id: 'classic-do1bg', name: 'CL-02BG', series: 'Классика', type: 'standard', basePrice: 22500, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6'], availableOptions: ['hw-1', 'hw-2', 'gl-1', 'gl-2', 'gl-3', 'edge-1', 'edge-2', 'edge-3', 'edge-4'] },
  { id: 'classic-do2', name: 'CL-03G', series: 'Классика', type: 'standard', basePrice: 23000, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6'], availableOptions: ['hw-1', 'hw-2', 'gl-1', 'gl-2', 'gl-3', 'edge-1', 'edge-2', 'edge-3', 'edge-4'] },
  { id: 'classic-do3', name: 'CL-01BG', series: 'Классика', type: 'standard', basePrice: 23500, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6'], availableOptions: ['hw-1', 'hw-2', 'gl-1', 'gl-2', 'gl-3', 'edge-1', 'edge-2', 'edge-3', 'edge-4'] },

  // ===== DESIGNER SERIES =====
  // LINE Series
  { id: 'line-1', name: 'AL-01', series: 'LINE', type: 'designer', basePrice: 28990, availableColors: ['solid-3', 'solid-5', 'solid-9', 'solid-10', 'wood-7', 'wood-9', 'wood-10'], availableOptions: ['hw-1', 'hw-2', 'gl-1', 'gl-5', 'gl-6', 'edge-5', 'edge-6', 'edge-7', 'edge-8'] },
  { id: 'line-2', name: 'AL-02', series: 'LINE', type: 'designer', basePrice: 29990, availableColors: ['solid-3', 'solid-5', 'solid-9', 'solid-10', 'wood-7', 'wood-9', 'wood-10'], availableOptions: ['hw-1', 'hw-2', 'gl-1', 'gl-5', 'gl-6', 'edge-5', 'edge-6', 'edge-7', 'edge-8'] },
  { id: 'line-3', name: 'AL-03', series: 'LINE', type: 'designer', basePrice: 30990, availableColors: ['solid-3', 'solid-5', 'solid-9', 'solid-10', 'wood-7', 'wood-9', 'wood-10'], availableOptions: ['hw-1', 'hw-2', 'gl-1', 'gl-5', 'gl-6', 'edge-5', 'edge-6', 'edge-7', 'edge-8'] },
  { id: 'line-4', name: 'AL-04', series: 'LINE', type: 'designer', basePrice: 31990, availableColors: ['solid-3', 'solid-5', 'solid-9', 'solid-10', 'wood-7', 'wood-9', 'wood-10'], availableOptions: ['hw-1', 'hw-2', 'gl-1', 'gl-5', 'gl-6', 'edge-5', 'edge-6', 'edge-7', 'edge-8'] },
  
  // LINE Combo models (preset colors)
  { id: 'line-2-combo1', name: 'SF-02V1', series: 'LINE', type: 'designer', basePrice: 32990, availableColors: ['solid-3', 'wood-7'], lockedColors: ['solid-3', 'wood-7'], availableOptions: ['hw-1', 'hw-2', 'gl-5', 'edge-7', 'edge-8'] },
  { id: 'line-2-combo2', name: 'SF-02V2', series: 'LINE', type: 'designer', basePrice: 33990, availableColors: ['wood-9', 'wood-10'], lockedColors: ['wood-9', 'wood-10'], availableOptions: ['hw-1', 'hw-2', 'gl-5', 'edge-7', 'edge-8'] },
  { id: 'line-2-combo3', name: 'SF-02V3', series: 'LINE', type: 'designer', basePrice: 32990, availableColors: ['solid-10', 'solid-5'], lockedColors: ['solid-10', 'solid-5'], availableOptions: ['hw-1', 'hw-2', 'gl-5', 'edge-7', 'edge-8'] },
  { id: 'line-2-combo4', name: 'SF-02V4', series: 'LINE', type: 'designer', basePrice: 31990, availableColors: ['solid-9', 'solid-3'], lockedColors: ['solid-9', 'solid-3'], availableOptions: ['hw-1', 'hw-2', 'gl-5', 'edge-7', 'edge-8'] },
  { id: 'line-4-combo1', name: 'SF-04V1', series: 'LINE', type: 'designer', basePrice: 34990, availableColors: ['solid-3', 'wood-7'], lockedColors: ['solid-3', 'wood-7'], availableOptions: ['hw-1', 'hw-2', 'gl-5', 'edge-7', 'edge-8'] },
  { id: 'line-4-combo2', name: 'SF-04V2', series: 'LINE', type: 'designer', basePrice: 35990, availableColors: ['wood-9', 'wood-10'], lockedColors: ['wood-9', 'wood-10'], availableOptions: ['hw-1', 'hw-2', 'gl-5', 'edge-7', 'edge-8'] },
  { id: 'line-4-combo3', name: 'SF-04V3', series: 'LINE', type: 'designer', basePrice: 34990, availableColors: ['solid-10', 'solid-5'], lockedColors: ['solid-10', 'solid-5'], availableOptions: ['hw-1', 'hw-2', 'gl-5', 'edge-7', 'edge-8'] },
  { id: 'line-4-combo4', name: 'SF-04V4', series: 'LINE', type: 'designer', basePrice: 33990, availableColors: ['solid-9', 'solid-3'], lockedColors: ['solid-9', 'solid-3'], availableOptions: ['hw-1', 'hw-2', 'gl-5', 'edge-7', 'edge-8'] },

  // K NEO Series
  { id: 'k1-neo-s1', name: 'FR-D-P-1', series: 'K NEO', type: 'designer', basePrice: 33990, availableColors: ['solid-1', 'solid-3', 'solid-5', 'solid-7', 'solid-8', 'wood-1', 'wood-4', 'deco-4', 'deco-5'], availableOptions: ['hw-1', 'hw-2', 'gl-1', 'gl-5', 'edge-5', 'edge-6', 'edge-7', 'edge-8', 'edge-9'] },
  { id: 'k1-neo-s2', name: 'FR-D-F-2', series: 'K NEO', type: 'designer', basePrice: 34990, availableColors: ['solid-1', 'solid-3', 'solid-5', 'solid-7', 'solid-8', 'wood-1', 'wood-4', 'deco-4', 'deco-5'], availableOptions: ['hw-1', 'hw-2', 'gl-1', 'gl-5', 'edge-5', 'edge-6', 'edge-7', 'edge-8', 'edge-9'] },
  { id: 'k1-neo-s3', name: 'FR-D-R-3', series: 'K NEO', type: 'designer', basePrice: 35990, availableColors: ['solid-1', 'solid-3', 'solid-5', 'solid-7', 'solid-8', 'wood-1', 'wood-4', 'deco-4', 'deco-5'], availableOptions: ['hw-1', 'hw-2', 'gl-1', 'gl-5', 'edge-5', 'edge-6', 'edge-7', 'edge-8', 'edge-9'] },
  { id: 'k2-neo-s1', name: 'FR-G-P-1', series: 'K NEO', type: 'designer', basePrice: 36990, availableColors: ['solid-1', 'solid-3', 'solid-5', 'solid-7', 'solid-8', 'wood-1', 'wood-4', 'deco-4', 'deco-5'], availableOptions: ['hw-1', 'hw-2', 'gl-1', 'gl-5', 'edge-5', 'edge-6', 'edge-7', 'edge-8', 'edge-9'] },
  { id: 'k3-neo-s1', name: 'FR-O-P-1', series: 'K NEO', type: 'designer', basePrice: 37990, availableColors: ['solid-1', 'solid-3', 'solid-5', 'solid-7', 'solid-8', 'wood-1', 'wood-4', 'deco-4', 'deco-5'], availableOptions: ['hw-1', 'hw-2', 'gl-1', 'gl-5', 'edge-5', 'edge-6', 'edge-7', 'edge-8', 'edge-9'] },
  { id: 'k3-neo-s2', name: 'FR-O-F-2', series: 'K NEO', type: 'designer', basePrice: 38990, availableColors: ['solid-1', 'solid-3', 'solid-5', 'solid-7', 'solid-8', 'wood-1', 'wood-4', 'deco-4', 'deco-5'], availableOptions: ['hw-1', 'hw-2', 'gl-1', 'gl-5', 'edge-5', 'edge-6', 'edge-7', 'edge-8', 'edge-9'] },
  { id: 'k3-neo-s3', name: 'FR-O-R-3', series: 'K NEO', type: 'designer', basePrice: 39990, availableColors: ['solid-1', 'solid-3', 'solid-5', 'solid-7', 'solid-8', 'wood-1', 'wood-4', 'deco-4', 'deco-5'], availableOptions: ['hw-1', 'hw-2', 'gl-1', 'gl-5', 'edge-5', 'edge-6', 'edge-7', 'edge-8', 'edge-9'] },

  // VERTA Series
  { id: 'verta-2', name: 'FS-02', series: 'Верта', type: 'designer', basePrice: 30990, availableColors: ['solid-1', 'solid-3', 'solid-5', 'deco-1', 'deco-3', 'deco-6'], availableOptions: ['hw-1', 'hw-2', 'gl-1', 'gl-2', 'gl-3', 'gl-4', 'edge-5', 'edge-6', 'edge-7', 'edge-8'] },
  { id: 'verta-4', name: 'FS-04', series: 'Верта', type: 'designer', basePrice: 31990, availableColors: ['solid-1', 'solid-3', 'solid-5', 'deco-1', 'deco-3', 'deco-6'], availableOptions: ['hw-1', 'hw-2', 'gl-1', 'gl-2', 'gl-3', 'gl-4', 'edge-5', 'edge-6', 'edge-7', 'edge-8'] },
  { id: 'verta-5', name: 'FS-05', series: 'Верта', type: 'designer', basePrice: 32990, availableColors: ['solid-1', 'solid-3', 'solid-5', 'deco-1', 'deco-3', 'deco-6'], availableOptions: ['hw-1', 'hw-2', 'gl-1', 'gl-2', 'gl-3', 'gl-4', 'edge-5', 'edge-6', 'edge-7', 'edge-8'] },
  { id: 'verta-6', name: 'FS-06', series: 'Верта', type: 'designer', basePrice: 33990, availableColors: ['solid-1', 'solid-3', 'solid-5', 'deco-1', 'deco-3', 'deco-6'], availableOptions: ['hw-1', 'hw-2', 'gl-1', 'gl-2', 'gl-3', 'gl-4', 'edge-5', 'edge-6', 'edge-7', 'edge-8'] },
  { id: 'verta-7', name: 'FS-07', series: 'Верта', type: 'designer', basePrice: 34990, availableColors: ['solid-1', 'solid-3', 'solid-5', 'deco-1', 'deco-3', 'deco-6'], availableOptions: ['hw-1', 'hw-2', 'gl-1', 'gl-2', 'gl-3', 'gl-4', 'edge-5', 'edge-6', 'edge-7', 'edge-8'] },

  // ===== PRESET SERIES (SKY) =====
  { id: 'sky-1', name: 'SKY Эмалит белый / стекло матовое', series: 'SKY', type: 'preset', basePrice: 35990, availableColors: ['solid-1'], lockedColors: ['solid-1'], availableOptions: ['gl-1'] },
  { id: 'sky-2', name: 'SKY Графит бетон / стекло графит', series: 'SKY', type: 'preset', basePrice: 36990, availableColors: ['concrete-3'], lockedColors: ['concrete-3'], availableOptions: ['gl-1'] },
  { id: 'sky-3', name: 'SKY Теплый бетон / стекло шпион', series: 'SKY', type: 'preset', basePrice: 37990, availableColors: ['concrete-1'], lockedColors: ['concrete-1'], availableOptions: ['gl-5'] },
  { id: 'sky-4', name: 'SKY Абсолют бетон / стекло черное', series: 'SKY', type: 'preset', basePrice: 36990, availableColors: ['concrete-4'], lockedColors: ['concrete-4'], availableOptions: ['gl-1'] },
  { id: 'sky-5', name: 'SKY Снежный бетон / стекло матовое', series: 'SKY', type: 'preset', basePrice: 36990, availableColors: ['concrete-2'], lockedColors: ['concrete-2'], availableOptions: ['gl-1'] },
  { id: 'sky-6', name: 'SKY Лен сливочный / стекло матовое', series: 'SKY', type: 'preset', basePrice: 37990, availableColors: ['solid-7'], lockedColors: ['solid-7'], availableOptions: ['gl-1'] },
  { id: 'sky-7', name: 'SKY Миндаль розовый / стекло матовое', series: 'SKY', type: 'preset', basePrice: 37990, availableColors: ['solid-6'], lockedColors: ['solid-6'], availableOptions: ['gl-1'] },
  { id: 'sky-8', name: 'SKY Можжевельник графитовый / стекло графит', series: 'SKY', type: 'preset', basePrice: 37990, availableColors: ['solid-5'], lockedColors: ['solid-5'], availableOptions: ['gl-1'] },

  // ===== HIDDEN SERIES =====
  { id: 'hidden-id', name: 'PN', series: 'ID', type: 'hidden', basePrice: 42990, availableColors: ['glass-1', 'glass-2', 'glass-3'], availableOptions: ['hw-2', 'edge-5', 'edge-6', 'edge-7', 'edge-8'] },
];

// =====================
// HELPER FUNCTIONS
// =====================

export function getColorById(id: string): ColorOption | undefined {
  return colorOptions.find(c => c.id === id);
}

export function getOptionById(id: string): ConfigOption | undefined {
  return configOptions.find(o => o.id === id);
}

export function getDoorById(id: string): DoorModelConfig | undefined {
  return doorModels.find(d => d.id === id);
}

export function getColorsByCategory(category: ColorCategory): ColorOption[] {
  return colorOptions.filter(c => c.category === category);
}

export function getOptionsByCategory(category: OptionCategory): ConfigOption[] {
  return configOptions.filter(o => o.category === category);
}

export function isColorAvailable(doorId: string, colorId: string): boolean {
  const door = getDoorById(doorId);
  if (!door) return false;
  return door.availableColors.includes(colorId);
}

export function isOptionAvailable(doorId: string, optionId: string): boolean {
  const door = getDoorById(doorId);
  if (!door) return false;
  return door.availableOptions.includes(optionId);
}

export function getCategoryLabel(category: ColorCategory): string {
  const labels: Record<ColorCategory, string> = {
    wood: 'Текстуры дерева',
    solid: 'Однотонные эмали',
    concrete: 'Бетон',
    decorative: 'Декоративные покрытия',
    glass: 'Lacobel'
  };
  return labels[category];
}

export function getOptionCategoryLabel(category: OptionCategory): string {
  const labels: Record<OptionCategory, string> = {
    hardware: 'Фурнитура',
    glass: 'Стекло',
    edge: 'Кромка'
  };
  return labels[category];
}

export const colorCategories: ColorCategory[] = ['wood', 'solid', 'concrete', 'decorative', 'glass'];
export const optionCategories: OptionCategory[] = ['hardware', 'glass', 'edge'];
