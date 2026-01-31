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
  { id: 'wood-belenyi-dub', name: 'Замена ДН', category: 'wood', price: 0, textureUrl: TEXTURES.wood },
  { id: 'wood-venge', name: 'Замена ДН', category: 'wood', price: 0, textureUrl: TEXTURES.wood },
  { id: 'wood-neapol', name: 'Замена ДН', category: 'wood', price: 0, textureUrl: TEXTURES.wood },
  { id: 'wood-orekh', name: 'Замена ДН', category: 'wood', price: 0, textureUrl: TEXTURES.wood },
  { id: 'wood-eshwhite', name: 'Замена ДН', category: 'wood', price: 0, textureUrl: TEXTURES.wood },
  { id: 'wood-yasen-belyy', name: 'Замена ДН', category: 'wood', price: 1250, textureUrl: TEXTURES.wood },
  { id: 'wood-dub-suhoy', name: 'Замена ДН', category: 'wood', price: 0, textureUrl: TEXTURES.wood },
  { id: 'wood-dub-severnyy', name: 'Замена ДН', category: 'wood', price: 0, textureUrl: TEXTURES.wood },
  { id: 'wood-dub-kapuchino', name: 'Замена ДН', category: 'wood', price: 0, textureUrl: TEXTURES.wood },
  { id: 'wood-dub-seryy', name: 'Замена ДН', category: 'wood', price: 0, textureUrl: TEXTURES.wood },
  { id: 'wood-olivkovyy-sleb', name: 'Замена ДН', category: 'wood', price: 0, textureUrl: TEXTURES.wood },

  // SOLID COLORS
  { id: 'solid-belyy-blanko', name: 'Замена ДН', category: 'solid', price: 0, textureUrl: TEXTURES.solid },
  { id: 'solid-grey', name: 'Замена ДН', category: 'solid', price: 0, textureUrl: TEXTURES.solid },
  { id: 'solid-shagren-white', name: 'Замена ДН', category: 'solid', price: 0, textureUrl: TEXTURES.solid },
  { id: 'solid-shagren-black', name: 'Замена ДН', category: 'solid', price: 0, textureUrl: TEXTURES.solid },
  { id: 'solid-svetlo-seryy', name: 'Замена ДН', category: 'solid', price: 0, textureUrl: TEXTURES.solid },
  { id: 'solid-shelk-seryy', name: 'Замена ДН', category: 'solid', price: 0, textureUrl: TEXTURES.solid },
  { id: 'solid-white', name: 'Замена ДН', category: 'solid', price: 600, textureUrl: TEXTURES.solid },
  { id: 'solid-coventry', name: 'Замена ДН', category: 'solid', price: 600, textureUrl: TEXTURES.solid },
  { id: 'solid-graphite', name: 'Замена ДН', category: 'solid', price: 600, textureUrl: TEXTURES.solid },
  { id: 'solid-slonovaya-kost', name: 'Замена ДН', category: 'solid', price: 300, textureUrl: TEXTURES.solid },
  { id: 'solid-kapuchino', name: 'Замена ДН', category: 'solid', price: 300, textureUrl: TEXTURES.solid },
  { id: 'solid-emalit-white', name: 'Замена ДН', category: 'solid', price: 0, textureUrl: TEXTURES.solid },

  // CONCRETE
  { id: 'concrete-beige', name: 'Замена ДН', category: 'concrete', price: 300, textureUrl: TEXTURES.concrete },
  { id: 'concrete-snow', name: 'Замена ДН', category: 'concrete', price: 300, textureUrl: TEXTURES.concrete },
  { id: 'concrete-graphite', name: 'Замена ДН', category: 'concrete', price: 300, textureUrl: TEXTURES.concrete },
  { id: 'concrete-dark', name: 'Замена ДН', category: 'concrete', price: 300, textureUrl: TEXTURES.concrete },

  // DECORATIVE / TEXTURED
  { id: 'deco-riviera-ice', name: 'Замена ДН', category: 'decorative', price: 275, textureUrl: TEXTURES.decorative },
  { id: 'deco-riviera-grey', name: 'Замена ДН', category: 'decorative', price: 275, textureUrl: TEXTURES.decorative },
  { id: 'deco-santorini', name: 'Замена ДН', category: 'decorative', price: 300, textureUrl: TEXTURES.decorative },
  { id: 'deco-vintage-gold', name: 'Замена ДН', category: 'decorative', price: 275, textureUrl: TEXTURES.decorative },
  { id: 'deco-arctic', name: 'Замена ДН', category: 'decorative', price: 300, textureUrl: TEXTURES.decorative },
  { id: 'deco-pacific', name: 'Замена ДН', category: 'decorative', price: 300, textureUrl: TEXTURES.decorative },

  // GLASS / LACOBEL SURFACES
  { id: 'glass-satin-mat', name: 'Замена ДН', category: 'glass', price: 0, textureUrl: TEXTURES.glass },
  { id: 'glass-satin-bronze', name: 'Замена ДН', category: 'glass', price: 0, textureUrl: TEXTURES.glass },
  { id: 'glass-satin-graphite', name: 'Замена ДН', category: 'glass', price: 0, textureUrl: TEXTURES.glass },
  { id: 'glass-lacobel-white', name: 'Замена ДН', category: 'glass', price: 0, textureUrl: TEXTURES.glass },
  { id: 'glass-lacobel-ultra-white', name: 'Замена ДН', category: 'glass', price: 0, textureUrl: TEXTURES.glass },
  { id: 'glass-lacobel-black', name: 'Замена ДН', category: 'glass', price: 0, textureUrl: TEXTURES.glass },
  { id: 'glass-spy', name: 'Замена ДН', category: 'glass', price: 0, textureUrl: TEXTURES.glass },
  { id: 'glass-mirror-graphite', name: 'Замена ДН', category: 'glass', price: 0, textureUrl: TEXTURES.glass },
];

const STANDARD_COLOR_IDS = [
  'wood-belenyi-dub',
  'wood-venge',
  'wood-neapol',
  'wood-orekh',
  'wood-eshwhite',
  'wood-yasen-belyy',
  'wood-dub-suhoy',
  'wood-dub-severnyy',
  'wood-dub-kapuchino',
  'wood-dub-seryy',
  'wood-olivkovyy-sleb',
  'solid-belyy-blanko',
  'solid-grey',
  'solid-shagren-white',
  'solid-shagren-black',
  'solid-svetlo-seryy',
  'solid-shelk-seryy',
  'solid-white',
  'solid-coventry',
  'solid-graphite',
  'solid-slonovaya-kost',
  'solid-kapuchino',
  'concrete-beige',
  'concrete-snow',
  'concrete-graphite',
  'concrete-dark',
  'deco-riviera-ice',
  'deco-riviera-grey',
  'deco-santorini',
  'deco-vintage-gold',
  'deco-arctic',
  'deco-pacific',
];

const GLASS_COLOR_IDS = [
  'glass-satin-mat',
  'glass-satin-bronze',
  'glass-satin-graphite',
  'glass-lacobel-white',
  'glass-lacobel-ultra-white',
  'glass-lacobel-black',
  'glass-spy',
  'glass-mirror-graphite',
];

const GENERAL_COLOR_IDS = [
  ...STANDARD_COLOR_IDS,
  ...GLASS_COLOR_IDS.filter(id => id !== 'glass-lacobel-ultra-white')
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
    price: 300,
    description: 'Врезка в пластиковую кромку + царгу'
  },
  {
    id: 'hw-2',
    name: 'Врезка петель скрытого монтажа HH-4',
    category: 'hardware',
    price: 350,
    description: 'Врезка в пластиковую кромку + царгу'
  },

  // GLASS OPTIONS
  { id: 'gl-1', name: 'Стекло без рисунка', category: 'glass', price: 0 },
  { id: 'gl-2', name: 'Стекло ромб', category: 'glass', price: 0 },
  { id: 'gl-3', name: 'Стекло берн', category: 'glass', price: 0 },
  { id: 'gl-4', name: 'Стекло версаль', category: 'glass', price: 0 },

  // EDGE FINISHING
  { id: 'edge-1', name: 'Кромка АБС пластик черная', category: 'edge', price: 0 },
  { id: 'edge-2', name: 'Кромка АБС пластик серебристая', category: 'edge', price: 0 },
  { id: 'edge-3', name: 'Кромка АБС пластик графит', category: 'edge', price: 0 },
  { id: 'edge-4', name: 'Кромка пластик с 4-х сторон', category: 'edge', price: 0 },
  { id: 'edge-5', name: 'Кромка AL c 2-х сторон черная', category: 'edge', price: 0 },
  { id: 'edge-6', name: 'Кромка AL c 2-х сторон хром', category: 'edge', price: 0 },
  { id: 'edge-7', name: 'Кромка AL c 4-х сторон черная', category: 'edge', price: 0 },
  { id: 'edge-8', name: 'Кромка AL c 4-х сторон хром', category: 'edge', price: 0 },
  { id: 'edge-9', name: 'Бескромочная технология (кромка в цвет двери)', category: 'edge', price: 0 },
];

const STANDARD_OPTIONS = [
  'hw-1',
  'hw-2',
  'gl-1',
  'gl-2',
  'gl-3',
  'gl-4',
  'edge-1',
  'edge-2',
  'edge-3',
  'edge-4',
  'edge-5',
  'edge-6',
  'edge-7',
  'edge-8',
  'edge-9',
];

// =====================
// DOOR MODELS
// =====================

export const doorModels: DoorModelConfig[] = [
  // ===== STANDARD SERIES =====
  // L Series
  { id: 'l1', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 3320, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'l1-5', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 3320, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'l1-ds', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 4390, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'l1-st', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 3530, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'l2', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 3640, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'l4', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 3530, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'l5', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 3690, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'l5-3', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 3690, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'l6', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 3850, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'l7', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 3585, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'l8', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 3638, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'l8-2', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 3960, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'l8-3', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 3800, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'l8-4', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 3960, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'l8-5', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 3800, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'l9', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 3800, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'l9-st', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 4495, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'l10', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 3585, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'l11', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 3320, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'l11-5', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 3530, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'l11-6', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 3530, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'l11-st', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 3960, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'l12', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 3530, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'l13', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 3530, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'l13-2', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 3530, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'l14', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 3530, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'l15', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 4280, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },

  // LX Series
  { id: 'lx1', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 3480, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'lx2', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 3480, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'lx3', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 3480, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'lx4', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 3480, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'lx4-1', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 3480, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'lx5', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 3480, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'lx6', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 3480, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'lx7', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 3480, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'lx8', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 3480, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'lx8-2', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 3480, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'lx9', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 3480, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'lx10', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 3480, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'lx11', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 3480, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'lx12', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 3480, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'lx13', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 3480, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'lx13-2', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 3480, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'lx14', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 3480, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },

  // S Series
  { id: 's1', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 3640, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 's2', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 3640, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 's2-1', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 3640, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 's3', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 3640, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 's4', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 3640, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 's7', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 4015, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 's7-2', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 4015, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 's8', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 4015, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 's15', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 4015, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },

  // SH Series
  { id: 'sh-1', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 22000, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'sh-2', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 22500, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'sh-3', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 23000, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'sh-4', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 23500, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'sh-5', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 24000, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'sh-6', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 24500, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'sh-7', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 25000, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'sh-8', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 25500, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },

  // Classic Series
  { id: 'classic-1', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 19500, availableColors: STANDARD_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'classic-1bg', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 20000, availableColors: STANDARD_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'classic-do1', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 22000, availableColors: STANDARD_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'classic-do1bg', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 22500, availableColors: STANDARD_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'classic-2', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 20500, availableColors: STANDARD_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'classic-do2', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 23000, availableColors: STANDARD_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'classic-3', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 21000, availableColors: STANDARD_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'classic-3bg', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 21500, availableColors: STANDARD_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'classic-do3', name: 'Замена ДН', series: 'Замена ДН', type: 'standard', basePrice: 23500, availableColors: STANDARD_COLOR_IDS, availableOptions: STANDARD_OPTIONS },

  // ===== DESIGNER SERIES =====
  // LINE Series
  { id: 'line-1', name: 'Замена ДН', series: 'Замена ДН', type: 'designer', basePrice: 28990, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'line-2', name: 'Замена ДН', series: 'Замена ДН', type: 'designer', basePrice: 29990, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'line-3', name: 'Замена ДН', series: 'Замена ДН', type: 'designer', basePrice: 30990, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'line-4', name: 'Замена ДН', series: 'Замена ДН', type: 'designer', basePrice: 31990, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },

  // LINE Combo models (preset colors)
  { id: 'line-2-combo1', name: 'Замена ДН', series: 'Замена ДН', type: 'designer', basePrice: 32990, availableColors: ['solid-white', 'wood-dub-kapuchino'], lockedColors: ['solid-white', 'wood-dub-kapuchino'], availableOptions: STANDARD_OPTIONS },
  { id: 'line-2-combo2', name: 'Замена ДН', series: 'Замена ДН', type: 'designer', basePrice: 33990, availableColors: ['solid-coventry', 'wood-olivkovyy-sleb'], lockedColors: ['solid-coventry', 'wood-olivkovyy-sleb'], availableOptions: STANDARD_OPTIONS },
  { id: 'line-2-combo3', name: 'Замена ДН', series: 'Замена ДН', type: 'designer', basePrice: 32990, availableColors: ['deco-pacific', 'solid-graphite'], lockedColors: ['deco-pacific', 'solid-graphite'], availableOptions: STANDARD_OPTIONS },
  { id: 'line-2-combo4', name: 'Замена ДН', series: 'Замена ДН', type: 'designer', basePrice: 31990, availableColors: ['deco-arctic', 'solid-white'], lockedColors: ['deco-arctic', 'solid-white'], availableOptions: STANDARD_OPTIONS },
  { id: 'line-4-combo1', name: 'Замена ДН', series: 'Замена ДН', type: 'designer', basePrice: 34990, availableColors: ['solid-white', 'wood-dub-kapuchino'], lockedColors: ['solid-white', 'wood-dub-kapuchino'], availableOptions: STANDARD_OPTIONS },
  { id: 'line-4-combo2', name: 'Замена ДН', series: 'Замена ДН', type: 'designer', basePrice: 35990, availableColors: ['solid-coventry', 'wood-olivkovyy-sleb'], lockedColors: ['solid-coventry', 'wood-olivkovyy-sleb'], availableOptions: STANDARD_OPTIONS },
  { id: 'line-4-combo3', name: 'Замена ДН', series: 'Замена ДН', type: 'designer', basePrice: 34990, availableColors: ['deco-pacific', 'solid-graphite'], lockedColors: ['deco-pacific', 'solid-graphite'], availableOptions: STANDARD_OPTIONS },
  { id: 'line-4-combo4', name: 'Замена ДН', series: 'Замена ДН', type: 'designer', basePrice: 33990, availableColors: ['deco-arctic', 'solid-white'], lockedColors: ['deco-arctic', 'solid-white'], availableOptions: STANDARD_OPTIONS },

  // K NEO Series
  { id: 'k1-neo-s1', name: 'Замена ДН', series: 'Замена ДН', type: 'designer', basePrice: 33990, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'k1-neo-s2', name: 'Замена ДН', series: 'Замена ДН', type: 'designer', basePrice: 34990, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'k1-neo-s3', name: 'Замена ДН', series: 'Замена ДН', type: 'designer', basePrice: 35990, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'k2-neo-s1', name: 'Замена ДН', series: 'Замена ДН', type: 'designer', basePrice: 36990, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'k3-neo-s1', name: 'Замена ДН', series: 'Замена ДН', type: 'designer', basePrice: 37990, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'k3-neo-s2', name: 'Замена ДН', series: 'Замена ДН', type: 'designer', basePrice: 38990, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'k3-neo-s3', name: 'Замена ДН', series: 'Замена ДН', type: 'designer', basePrice: 39990, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },

  // VERTA Series
  { id: 'verta-2', name: 'Замена ДН', series: 'Замена ДН', type: 'designer', basePrice: 30990, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'verta-4', name: 'Замена ДН', series: 'Замена ДН', type: 'designer', basePrice: 31990, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'verta-5', name: 'Замена ДН', series: 'Замена ДН', type: 'designer', basePrice: 32990, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'verta-6', name: 'Замена ДН', series: 'Замена ДН', type: 'designer', basePrice: 33990, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
  { id: 'verta-7', name: 'Замена ДН', series: 'Замена ДН', type: 'designer', basePrice: 34990, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },

  // 3D Series
  { id: '3d', name: 'Замена ДН', series: 'Замена ДН', type: 'designer', basePrice: 32990, availableColors: GENERAL_COLOR_IDS, availableOptions: STANDARD_OPTIONS },

  // ===== PRESET SERIES (SKY) =====
  { id: 'sky-1', name: 'Замена ДН', series: 'Замена ДН', type: 'preset', basePrice: 35990, availableColors: ['solid-emalit-white'], lockedColors: ['solid-emalit-white'], availableOptions: ['gl-1'] },
  { id: 'sky-2', name: 'Замена ДН', series: 'Замена ДН', type: 'preset', basePrice: 36990, availableColors: ['concrete-graphite'], lockedColors: ['concrete-graphite'], availableOptions: ['gl-1'] },
  { id: 'sky-3', name: 'Замена ДН', series: 'Замена ДН', type: 'preset', basePrice: 37990, availableColors: ['concrete-beige'], lockedColors: ['concrete-beige'], availableOptions: ['gl-1'] },
  { id: 'sky-4', name: 'Замена ДН', series: 'Замена ДН', type: 'preset', basePrice: 36990, availableColors: ['concrete-dark'], lockedColors: ['concrete-dark'], availableOptions: ['gl-1'] },
  { id: 'sky-5', name: 'Замена ДН', series: 'Замена ДН', type: 'preset', basePrice: 36990, availableColors: ['concrete-snow'], lockedColors: ['concrete-snow'], availableOptions: ['gl-1'] },
  { id: 'sky-6', name: 'Замена ДН', series: 'Замена ДН', type: 'preset', basePrice: 37990, availableColors: ['solid-slonovaya-kost'], lockedColors: ['solid-slonovaya-kost'], availableOptions: ['gl-1'] },
  { id: 'sky-7', name: 'Замена ДН', series: 'Замена ДН', type: 'preset', basePrice: 37990, availableColors: ['solid-kapuchino'], lockedColors: ['solid-kapuchino'], availableOptions: ['gl-1'] },
  { id: 'sky-8', name: 'Замена ДН', series: 'Замена ДН', type: 'preset', basePrice: 37990, availableColors: ['solid-graphite'], lockedColors: ['solid-graphite'], availableOptions: ['gl-1'] },

  // ===== HIDDEN SERIES =====
  { id: 'hidden-id', name: 'Замена ДН', series: 'Замена ДН', type: 'hidden', basePrice: 42990, availableColors: GLASS_COLOR_IDS, availableOptions: STANDARD_OPTIONS },
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
