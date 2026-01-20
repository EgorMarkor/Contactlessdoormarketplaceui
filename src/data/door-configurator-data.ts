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

export const colorOptions: ColorOption[] = [
  // WOOD TEXTURES
  { id: 'wood-1', name: 'Беленый дуб', category: 'wood', price: 1500 },
  { id: 'wood-2', name: 'Венге', category: 'wood', price: 2500 },
  { id: 'wood-3', name: 'Орех', category: 'wood', price: 2000 },
  { id: 'wood-4', name: 'Ясень белый', category: 'wood', price: 1800 },
  { id: 'wood-5', name: 'Дуб сухой', category: 'wood', price: 1500 },
  { id: 'wood-6', name: 'Дуб северный', category: 'wood', price: 1600 },
  { id: 'wood-7', name: 'Дуб капучино', category: 'wood', price: 1700 },
  { id: 'wood-8', name: 'Дуб серый', category: 'wood', price: 1600 },
  { id: 'wood-9', name: 'Ковентри', category: 'wood', price: 1900 },
  { id: 'wood-10', name: 'Оливковый слэб', category: 'wood', price: 2100 },

  // SOLID / ENAMEL COLORS
  { id: 'solid-1', name: 'Белый бланко', category: 'solid', price: 500 },
  { id: 'solid-2', name: 'Грей', category: 'solid', price: 800 },
  { id: 'solid-3', name: 'Вайт', category: 'solid', price: 500 },
  { id: 'solid-4', name: 'Светло-серый', category: 'solid', price: 700 },
  { id: 'solid-5', name: 'Графит', category: 'solid', price: 1000 },
  { id: 'solid-6', name: 'Капучино', category: 'solid', price: 900 },
  { id: 'solid-7', name: 'Слоновая кость', category: 'solid', price: 1100 },
  { id: 'solid-8', name: 'Шелк серый', category: 'solid', price: 1200 },
  { id: 'solid-9', name: 'Арктик', category: 'solid', price: 800 },
  { id: 'solid-10', name: 'Пацифик', category: 'solid', price: 900 },

  // CONCRETE
  { id: 'concrete-1', name: 'Бетон бежевый', category: 'concrete', price: 1300 },
  { id: 'concrete-2', name: 'Бетон снежный', category: 'concrete', price: 1400 },
  { id: 'concrete-3', name: 'Бетон графит', category: 'concrete', price: 1500 },
  { id: 'concrete-4', name: 'Бетон темный', category: 'concrete', price: 1400 },

  // DECORATIVE / TEXTURED
  { id: 'deco-1', name: 'Шагрень белая', category: 'decorative', price: 1600 },
  { id: 'deco-2', name: 'Шагрень черная', category: 'decorative', price: 1700 },
  { id: 'deco-3', name: 'Эшвайт', category: 'decorative', price: 1500 },
  { id: 'deco-4', name: 'Ривьера Айс', category: 'decorative', price: 1800 },
  { id: 'deco-5', name: 'Ривьера грей', category: 'decorative', price: 1800 },
  { id: 'deco-6', name: 'Санторини', category: 'decorative', price: 1900 },
  { id: 'deco-7', name: 'Винтаж золотой', category: 'decorative', price: 2000 },

  // GLASS / LACOBEL SURFACES
  { id: 'glass-1', name: 'Lacobel белый', category: 'glass', price: 3500 },
  { id: 'glass-2', name: 'Lacobel ультра белый', category: 'glass', price: 4000 },
  { id: 'glass-3', name: 'Lacobel черный', category: 'glass', price: 3800 },
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
  { id: 'l1', name: 'L1', series: 'L', type: 'standard', basePrice: 18990, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'l1-5', name: 'L1-5', series: 'L', type: 'standard', basePrice: 19500, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'l1-ds', name: 'L1-DS', series: 'L', type: 'standard', basePrice: 20200, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'l1-st', name: 'L1-ST', series: 'L', type: 'standard', basePrice: 21000, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'l2', name: 'L2', series: 'L', type: 'standard', basePrice: 19200, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'l4', name: 'L4', series: 'L', type: 'standard', basePrice: 19800, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'l5', name: 'L5', series: 'L', type: 'standard', basePrice: 20500, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'l5-3', name: 'L5-3', series: 'L', type: 'standard', basePrice: 20900, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'l6', name: 'L6', series: 'L', type: 'standard', basePrice: 21200, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'l7', name: 'L7', series: 'L', type: 'standard', basePrice: 21500, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'l8', name: 'L8', series: 'L', type: 'standard', basePrice: 22000, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'gl-1', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'l8-2', name: 'L8-2', series: 'L', type: 'standard', basePrice: 22300, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'gl-1', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'l8-3', name: 'L8-3', series: 'L', type: 'standard', basePrice: 22500, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'gl-1', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'l8-4', name: 'L8-4', series: 'L', type: 'standard', basePrice: 22700, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'gl-1', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'l8-5', name: 'L8-5', series: 'L', type: 'standard', basePrice: 23000, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'gl-1', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'l9', name: 'L9', series: 'L', type: 'standard', basePrice: 23500, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'gl-1', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'l9-st', name: 'L9-ST', series: 'L', type: 'standard', basePrice: 24000, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'gl-1', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'l10', name: 'L10', series: 'L', type: 'standard', basePrice: 24500, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'l11', name: 'L11', series: 'L', type: 'standard', basePrice: 25000, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'l11-5', name: 'L11-5', series: 'L', type: 'standard', basePrice: 25300, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'l11-6', name: 'L11-6', series: 'L', type: 'standard', basePrice: 25500, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'l11-st', name: 'L11-ST', series: 'L', type: 'standard', basePrice: 26000, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'l12', name: 'L12', series: 'L', type: 'standard', basePrice: 26500, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'l13', name: 'L13', series: 'L', type: 'standard', basePrice: 27000, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'l13-2', name: 'L13-2', series: 'L', type: 'standard', basePrice: 27200, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'l14', name: 'L14', series: 'L', type: 'standard', basePrice: 27500, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'l15', name: 'L15', series: 'L', type: 'standard', basePrice: 28000, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },

  // LX Series
  { id: 'lx1', name: 'LX1', series: 'LX', type: 'standard', basePrice: 21000, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'lx2', name: 'LX2', series: 'LX', type: 'standard', basePrice: 21500, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'lx3', name: 'LX3', series: 'LX', type: 'standard', basePrice: 22000, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'lx4', name: 'LX4', series: 'LX', type: 'standard', basePrice: 22500, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'lx4-1', name: 'LX4-1', series: 'LX', type: 'standard', basePrice: 22700, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'lx5', name: 'LX5', series: 'LX', type: 'standard', basePrice: 23000, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'lx6', name: 'LX6', series: 'LX', type: 'standard', basePrice: 23500, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'lx7', name: 'LX7', series: 'LX', type: 'standard', basePrice: 24000, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'lx8', name: 'LX8', series: 'LX', type: 'standard', basePrice: 24500, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'lx8-2', name: 'LX8-2', series: 'LX', type: 'standard', basePrice: 24700, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'lx9', name: 'LX9', series: 'LX', type: 'standard', basePrice: 25000, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'lx10', name: 'LX10', series: 'LX', type: 'standard', basePrice: 25500, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'lx11', name: 'LX11', series: 'LX', type: 'standard', basePrice: 26000, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'lx12', name: 'LX12', series: 'LX', type: 'standard', basePrice: 26500, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'lx13', name: 'LX13', series: 'LX', type: 'standard', basePrice: 27000, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'lx13-2', name: 'LX13-2', series: 'LX', type: 'standard', basePrice: 27200, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'lx14', name: 'LX14', series: 'LX', type: 'standard', basePrice: 27500, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },

  // S Series
  { id: 's1', name: 'S1', series: 'S', type: 'standard', basePrice: 17990, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 's2', name: 'S2', series: 'S', type: 'standard', basePrice: 18500, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 's2-1', name: 'S2-1', series: 'S', type: 'standard', basePrice: 18700, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 's3', name: 'S3', series: 'S', type: 'standard', basePrice: 19000, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 's4', name: 'S4', series: 'S', type: 'standard', basePrice: 19500, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 's7', name: 'S7', series: 'S', type: 'standard', basePrice: 20000, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 's7-2', name: 'S7-2', series: 'S', type: 'standard', basePrice: 20200, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 's8', name: 'S8', series: 'S', type: 'standard', basePrice: 20500, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 's15', name: 'S15', series: 'S', type: 'standard', basePrice: 21000, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },

  // SH Series
  { id: 'sh-1', name: 'SH-1', series: 'SH', type: 'standard', basePrice: 22000, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'sh-2', name: 'SH-2', series: 'SH', type: 'standard', basePrice: 22500, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'sh-3', name: 'SH-3', series: 'SH', type: 'standard', basePrice: 23000, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'sh-4', name: 'SH-4', series: 'SH', type: 'standard', basePrice: 23500, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'sh-5', name: 'SH-5', series: 'SH', type: 'standard', basePrice: 24000, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'sh-6', name: 'SH-6', series: 'SH', type: 'standard', basePrice: 24500, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'sh-7', name: 'SH-7', series: 'SH', type: 'standard', basePrice: 25000, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },
  { id: 'sh-8', name: 'SH-8', series: 'SH', type: 'standard', basePrice: 25500, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6', 'concrete-1', 'concrete-2', 'concrete-3', 'concrete-4', 'deco-1', 'deco-2', 'deco-3'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6'] },

  // Classic Series
  { id: 'classic-1', name: 'ДГ Классика 1', series: 'Классика', type: 'standard', basePrice: 19500, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4'] },
  { id: 'classic-1bg', name: 'ДГ Классика 1БГ', series: 'Классика', type: 'standard', basePrice: 20000, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4'] },
  { id: 'classic-2', name: 'ДГ Классика 2', series: 'Классика', type: 'standard', basePrice: 20500, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4'] },
  { id: 'classic-3', name: 'ДГ Классика 3 (1 филенка)', series: 'Классика', type: 'standard', basePrice: 21000, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4'] },
  { id: 'classic-3bg', name: 'ДГ Классика 3 БГ', series: 'Классика', type: 'standard', basePrice: 21500, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6'], availableOptions: ['hw-1', 'hw-2', 'edge-1', 'edge-2', 'edge-3', 'edge-4'] },
  { id: 'classic-do1', name: 'ДО Классика 1', series: 'Классика', type: 'standard', basePrice: 22000, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6'], availableOptions: ['hw-1', 'hw-2', 'gl-1', 'gl-2', 'gl-3', 'edge-1', 'edge-2', 'edge-3', 'edge-4'] },
  { id: 'classic-do1bg', name: 'ДО Классика 1 БГ', series: 'Классика', type: 'standard', basePrice: 22500, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6'], availableOptions: ['hw-1', 'hw-2', 'gl-1', 'gl-2', 'gl-3', 'edge-1', 'edge-2', 'edge-3', 'edge-4'] },
  { id: 'classic-do2', name: 'ДО Классика 2', series: 'Классика', type: 'standard', basePrice: 23000, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6'], availableOptions: ['hw-1', 'hw-2', 'gl-1', 'gl-2', 'gl-3', 'edge-1', 'edge-2', 'edge-3', 'edge-4'] },
  { id: 'classic-do3', name: 'ДО Классика 3', series: 'Классика', type: 'standard', basePrice: 23500, availableColors: ['wood-1', 'wood-2', 'wood-3', 'wood-4', 'wood-5', 'wood-6', 'wood-7', 'wood-8', 'solid-1', 'solid-2', 'solid-3', 'solid-4', 'solid-5', 'solid-6'], availableOptions: ['hw-1', 'hw-2', 'gl-1', 'gl-2', 'gl-3', 'edge-1', 'edge-2', 'edge-3', 'edge-4'] },

  // ===== DESIGNER SERIES =====
  // LINE Series
  { id: 'line-1', name: 'LINE 1', series: 'LINE', type: 'designer', basePrice: 28990, availableColors: ['solid-3', 'solid-5', 'solid-9', 'solid-10', 'wood-7', 'wood-9', 'wood-10'], availableOptions: ['hw-1', 'hw-2', 'gl-1', 'gl-5', 'gl-6', 'edge-5', 'edge-6', 'edge-7', 'edge-8'] },
  { id: 'line-2', name: 'LINE 2', series: 'LINE', type: 'designer', basePrice: 29990, availableColors: ['solid-3', 'solid-5', 'solid-9', 'solid-10', 'wood-7', 'wood-9', 'wood-10'], availableOptions: ['hw-1', 'hw-2', 'gl-1', 'gl-5', 'gl-6', 'edge-5', 'edge-6', 'edge-7', 'edge-8'] },
  { id: 'line-3', name: 'LINE 3', series: 'LINE', type: 'designer', basePrice: 30990, availableColors: ['solid-3', 'solid-5', 'solid-9', 'solid-10', 'wood-7', 'wood-9', 'wood-10'], availableOptions: ['hw-1', 'hw-2', 'gl-1', 'gl-5', 'gl-6', 'edge-5', 'edge-6', 'edge-7', 'edge-8'] },
  { id: 'line-4', name: 'LINE 4', series: 'LINE', type: 'designer', basePrice: 31990, availableColors: ['solid-3', 'solid-5', 'solid-9', 'solid-10', 'wood-7', 'wood-9', 'wood-10'], availableOptions: ['hw-1', 'hw-2', 'gl-1', 'gl-5', 'gl-6', 'edge-5', 'edge-6', 'edge-7', 'edge-8'] },
  
  // LINE Combo models (preset colors)
  { id: 'line-2-combo1', name: 'LINE 2 комби вайт+дуб капучино', series: 'LINE', type: 'designer', basePrice: 32990, availableColors: ['solid-3', 'wood-7'], lockedColors: ['solid-3', 'wood-7'], availableOptions: ['hw-1', 'hw-2', 'gl-5', 'edge-7', 'edge-8'] },
  { id: 'line-2-combo2', name: 'LINE 2 комби ковентри+оливковый слэб', series: 'LINE', type: 'designer', basePrice: 33990, availableColors: ['wood-9', 'wood-10'], lockedColors: ['wood-9', 'wood-10'], availableOptions: ['hw-1', 'hw-2', 'gl-5', 'edge-7', 'edge-8'] },
  { id: 'line-2-combo3', name: 'LINE 2 комби пацифик+графит', series: 'LINE', type: 'designer', basePrice: 32990, availableColors: ['solid-10', 'solid-5'], lockedColors: ['solid-10', 'solid-5'], availableOptions: ['hw-1', 'hw-2', 'gl-5', 'edge-7', 'edge-8'] },
  { id: 'line-2-combo4', name: 'LINE 2 комби арктик+вайт', series: 'LINE', type: 'designer', basePrice: 31990, availableColors: ['solid-9', 'solid-3'], lockedColors: ['solid-9', 'solid-3'], availableOptions: ['hw-1', 'hw-2', 'gl-5', 'edge-7', 'edge-8'] },
  { id: 'line-4-combo1', name: 'LINE 4 комби вайт+дуб капучино', series: 'LINE', type: 'designer', basePrice: 34990, availableColors: ['solid-3', 'wood-7'], lockedColors: ['solid-3', 'wood-7'], availableOptions: ['hw-1', 'hw-2', 'gl-5', 'edge-7', 'edge-8'] },
  { id: 'line-4-combo2', name: 'LINE 4 комби ковентри+оливковый слэб', series: 'LINE', type: 'designer', basePrice: 35990, availableColors: ['wood-9', 'wood-10'], lockedColors: ['wood-9', 'wood-10'], availableOptions: ['hw-1', 'hw-2', 'gl-5', 'edge-7', 'edge-8'] },
  { id: 'line-4-combo3', name: 'LINE 4 комби пацифик+графит', series: 'LINE', type: 'designer', basePrice: 34990, availableColors: ['solid-10', 'solid-5'], lockedColors: ['solid-10', 'solid-5'], availableOptions: ['hw-1', 'hw-2', 'gl-5', 'edge-7', 'edge-8'] },
  { id: 'line-4-combo4', name: 'LINE 4 комби арктик+вайт', series: 'LINE', type: 'designer', basePrice: 33990, availableColors: ['solid-9', 'solid-3'], lockedColors: ['solid-9', 'solid-3'], availableOptions: ['hw-1', 'hw-2', 'gl-5', 'edge-7', 'edge-8'] },

  // K NEO Series
  { id: 'k1-neo-s1', name: 'K 1 NEO style 1', series: 'K NEO', type: 'designer', basePrice: 33990, availableColors: ['solid-1', 'solid-3', 'solid-5', 'solid-7', 'solid-8', 'wood-1', 'wood-4', 'deco-4', 'deco-5'], availableOptions: ['hw-1', 'hw-2', 'gl-1', 'gl-5', 'edge-5', 'edge-6', 'edge-7', 'edge-8', 'edge-9'] },
  { id: 'k1-neo-s2', name: 'K 1 NEO style 2', series: 'K NEO', type: 'designer', basePrice: 34990, availableColors: ['solid-1', 'solid-3', 'solid-5', 'solid-7', 'solid-8', 'wood-1', 'wood-4', 'deco-4', 'deco-5'], availableOptions: ['hw-1', 'hw-2', 'gl-1', 'gl-5', 'edge-5', 'edge-6', 'edge-7', 'edge-8', 'edge-9'] },
  { id: 'k1-neo-s3', name: 'K 1 NEO style 3', series: 'K NEO', type: 'designer', basePrice: 35990, availableColors: ['solid-1', 'solid-3', 'solid-5', 'solid-7', 'solid-8', 'wood-1', 'wood-4', 'deco-4', 'deco-5'], availableOptions: ['hw-1', 'hw-2', 'gl-1', 'gl-5', 'edge-5', 'edge-6', 'edge-7', 'edge-8', 'edge-9'] },
  { id: 'k2-neo-s1', name: 'K 2 NEO style 1', series: 'K NEO', type: 'designer', basePrice: 36990, availableColors: ['solid-1', 'solid-3', 'solid-5', 'solid-7', 'solid-8', 'wood-1', 'wood-4', 'deco-4', 'deco-5'], availableOptions: ['hw-1', 'hw-2', 'gl-1', 'gl-5', 'edge-5', 'edge-6', 'edge-7', 'edge-8', 'edge-9'] },
  { id: 'k3-neo-s1', name: 'K 3 NEO style 1', series: 'K NEO', type: 'designer', basePrice: 37990, availableColors: ['solid-1', 'solid-3', 'solid-5', 'solid-7', 'solid-8', 'wood-1', 'wood-4', 'deco-4', 'deco-5'], availableOptions: ['hw-1', 'hw-2', 'gl-1', 'gl-5', 'edge-5', 'edge-6', 'edge-7', 'edge-8', 'edge-9'] },
  { id: 'k3-neo-s2', name: 'K 3 NEO style 2', series: 'K NEO', type: 'designer', basePrice: 38990, availableColors: ['solid-1', 'solid-3', 'solid-5', 'solid-7', 'solid-8', 'wood-1', 'wood-4', 'deco-4', 'deco-5'], availableOptions: ['hw-1', 'hw-2', 'gl-1', 'gl-5', 'edge-5', 'edge-6', 'edge-7', 'edge-8', 'edge-9'] },
  { id: 'k3-neo-s3', name: 'K 3 NEO style 3', series: 'K NEO', type: 'designer', basePrice: 39990, availableColors: ['solid-1', 'solid-3', 'solid-5', 'solid-7', 'solid-8', 'wood-1', 'wood-4', 'deco-4', 'deco-5'], availableOptions: ['hw-1', 'hw-2', 'gl-1', 'gl-5', 'edge-5', 'edge-6', 'edge-7', 'edge-8', 'edge-9'] },

  // VERTA Series
  { id: 'verta-2', name: 'Верта 2', series: 'Верта', type: 'designer', basePrice: 30990, availableColors: ['solid-1', 'solid-3', 'solid-5', 'deco-1', 'deco-3', 'deco-6'], availableOptions: ['hw-1', 'hw-2', 'gl-1', 'gl-2', 'gl-3', 'gl-4', 'edge-5', 'edge-6', 'edge-7', 'edge-8'] },
  { id: 'verta-4', name: 'Верта 4', series: 'Верта', type: 'designer', basePrice: 31990, availableColors: ['solid-1', 'solid-3', 'solid-5', 'deco-1', 'deco-3', 'deco-6'], availableOptions: ['hw-1', 'hw-2', 'gl-1', 'gl-2', 'gl-3', 'gl-4', 'edge-5', 'edge-6', 'edge-7', 'edge-8'] },
  { id: 'verta-5', name: 'Верта 5', series: 'Верта', type: 'designer', basePrice: 32990, availableColors: ['solid-1', 'solid-3', 'solid-5', 'deco-1', 'deco-3', 'deco-6'], availableOptions: ['hw-1', 'hw-2', 'gl-1', 'gl-2', 'gl-3', 'gl-4', 'edge-5', 'edge-6', 'edge-7', 'edge-8'] },
  { id: 'verta-6', name: 'Верта 6', series: 'Верта', type: 'designer', basePrice: 33990, availableColors: ['solid-1', 'solid-3', 'solid-5', 'deco-1', 'deco-3', 'deco-6'], availableOptions: ['hw-1', 'hw-2', 'gl-1', 'gl-2', 'gl-3', 'gl-4', 'edge-5', 'edge-6', 'edge-7', 'edge-8'] },
  { id: 'verta-7', name: 'Верта 7', series: 'Верта', type: 'designer', basePrice: 34990, availableColors: ['solid-1', 'solid-3', 'solid-5', 'deco-1', 'deco-3', 'deco-6'], availableOptions: ['hw-1', 'hw-2', 'gl-1', 'gl-2', 'gl-3', 'gl-4', 'edge-5', 'edge-6', 'edge-7', 'edge-8'] },

  // ===== PRESET SERIES (SKY) =====
  { id: 'sky-1', name: 'SKY Эмалит белый / стекло матовое', series: 'SKY', type: 'preset', basePrice: 35990, availableColors: ['solid-1'], lockedColors: ['solid-1'], availableOptions: ['gl-1'] },
  { id: 'sky-2', name: 'SKY Бетон графит / стекло графит', series: 'SKY', type: 'preset', basePrice: 36990, availableColors: ['concrete-3'], lockedColors: ['concrete-3'], availableOptions: ['gl-1'] },
  { id: 'sky-3', name: 'SKY Бетон бежевый / стекло шпион', series: 'SKY', type: 'preset', basePrice: 37990, availableColors: ['concrete-1'], lockedColors: ['concrete-1'], availableOptions: ['gl-5'] },
  { id: 'sky-4', name: 'SKY Бетон темный / стекло черное', series: 'SKY', type: 'preset', basePrice: 36990, availableColors: ['concrete-4'], lockedColors: ['concrete-4'], availableOptions: ['gl-1'] },
  { id: 'sky-5', name: 'SKY Бетон снежный / стекло матовое', series: 'SKY', type: 'preset', basePrice: 36990, availableColors: ['concrete-2'], lockedColors: ['concrete-2'], availableOptions: ['gl-1'] },
  { id: 'sky-6', name: 'SKY Слоновая кость / стекло матовое', series: 'SKY', type: 'preset', basePrice: 37990, availableColors: ['solid-7'], lockedColors: ['solid-7'], availableOptions: ['gl-1'] },
  { id: 'sky-7', name: 'SKY Капучино / стекло матовое', series: 'SKY', type: 'preset', basePrice: 37990, availableColors: ['solid-6'], lockedColors: ['solid-6'], availableOptions: ['gl-1'] },
  { id: 'sky-8', name: 'SKY Графит / стекло графит', series: 'SKY', type: 'preset', basePrice: 37990, availableColors: ['solid-5'], lockedColors: ['solid-5'], availableOptions: ['gl-1'] },

  // ===== HIDDEN SERIES =====
  { id: 'hidden-id', name: 'Щитовые двери скрытого монтажа (ID)', series: 'ID', type: 'hidden', basePrice: 42990, availableColors: ['glass-1', 'glass-2', 'glass-3'], availableOptions: ['hw-2', 'edge-5', 'edge-6', 'edge-7', 'edge-8'] },
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
