import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, ShoppingCart, Palette, Frame, Hand, Square, Box, Plus } from 'lucide-react';
import { doorModels, colorOptions, edgeOptions, handleOptions, glassOptions, frameOptions } from '../data/doors';
import type { ConfiguratorState, DoorModel, CartItem } from '../App';

interface ConfiguratorProps {
  state: ConfiguratorState;
  setState: (state: ConfiguratorState) => void;
  onNavigate: (page: string, door?: DoorModel) => void;
  addToCart: (item: Omit<CartItem, 'id'>) => void;
}

export function Configurator({ state, setState, onNavigate, addToCart }: ConfiguratorProps) {
  const [activeTab, setActiveTab] = useState<'color' | 'edge' | 'handle' | 'glass' | 'frame'>('color');

  const currentDoor = state.doorModel || doorModels[0];

  const prices = {
    color: {
      'Дуб натуральный': 0,
      'Дуб беленый': 1500,
      'Орех': 2000,
      'Венге': 2500,
      'Белый': 500,
      'Серый': 800,
      'Черный': 1200,
      'Графит': 1000,
    },
    edge: {
      'Стандартная': 0,
      'Алюминий': 1500,
      'ПВХ цветная': 800,
      'Деревянная': 2000,
    },
    handle: {
      'Хром матовый': 0,
      'Хром глянцевый': 500,
      'Черный мат': 800,
      'Золото': 1500,
      'Медь': 1200,
      'Нержавеющая сталь': 600,
    },
    glass: {
      'Без стекла': 0,
      'Прозрачное': 3000,
      'Матовое': 3500,
      'Тонированное': 4000,
      'С рисунком': 5000,
      'Триплекс': 6000,
    },
    frame: {
      'Стандартная коробка': 0,
      'Телескопическая': 2000,
      'Скрытая': 3500,
      'С порогом': 500,
      'Без порога': 0,
    },
  };

  const totalPrice = 
    currentDoor.basePrice +
    (prices.color[state.color as keyof typeof prices.color] || 0) +
    (prices.edge[state.edge as keyof typeof prices.edge] || 0) +
    (prices.handle[state.handle as keyof typeof prices.handle] || 0) +
    (prices.glass[state.glass as keyof typeof prices.glass] || 0) +
    (prices.frame[state.frameType as keyof typeof prices.frame] || 0);

  const tabs = [
    { id: 'color' as const, label: 'Цвет плёнки', icon: Palette },
    { id: 'edge' as const, label: 'Кромка', icon: Frame },
    { id: 'handle' as const, label: 'Ручки', icon: Hand },
    { id: 'glass' as const, label: 'Стекло', icon: Square },
    { id: 'frame' as const, label: 'Коробка', icon: Box },
  ];

  const renderOptions = () => {
    switch (activeTab) {
      case 'color':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            {colorOptions.map(color => (
              <button
                key={color}
                onClick={() => setState({ ...state, color })}
                className={`p-3 sm:p-4 rounded-2xl border-2 transition-all text-left ${
                  state.color === color
                    ? 'border-accent bg-accent/10'
                    : 'border-border hover:border-accent/50'
                }`}
              >
                <div className="text-xs sm:text-sm text-foreground mb-1">{color}</div>
                <div className="text-xs text-muted-foreground">
                  +{(prices.color[color as keyof typeof prices.color] || 0).toLocaleString('ru-RU')} ₽
                </div>
              </button>
            ))}
          </div>
        );
      case 'edge':
        return (
          <div className="space-y-2 sm:space-y-3">
            {edgeOptions.map(edge => (
              <button
                key={edge}
                onClick={() => setState({ ...state, edge })}
                className={`w-full p-3 sm:p-4 rounded-2xl border-2 transition-all text-left ${
                  state.edge === edge
                    ? 'border-accent bg-accent/10'
                    : 'border-border hover:border-accent/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-xs sm:text-sm text-foreground">{edge}</div>
                  <div className="text-xs text-muted-foreground">
                    +{(prices.edge[edge as keyof typeof prices.edge] || 0).toLocaleString('ru-RU')} ₽
                  </div>
                </div>
              </button>
            ))}
          </div>
        );
      case 'handle':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            {handleOptions.map(handle => (
              <button
                key={handle}
                onClick={() => setState({ ...state, handle })}
                className={`p-3 sm:p-4 rounded-2xl border-2 transition-all text-left ${
                  state.handle === handle
                    ? 'border-accent bg-accent/10'
                    : 'border-border hover:border-accent/50'
                }`}
              >
                <div className="text-xs sm:text-sm text-foreground mb-1">{handle}</div>
                <div className="text-xs text-muted-foreground">
                  +{(prices.handle[handle as keyof typeof prices.handle] || 0).toLocaleString('ru-RU')} ₽
                </div>
              </button>
            ))}
          </div>
        );
      case 'glass':
        return (
          <div className="space-y-2 sm:space-y-3">
            {glassOptions.map(glass => (
              <button
                key={glass}
                onClick={() => setState({ ...state, glass })}
                className={`w-full p-3 sm:p-4 rounded-2xl border-2 transition-all text-left ${
                  state.glass === glass
                    ? 'border-accent bg-accent/10'
                    : 'border-border hover:border-accent/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-xs sm:text-sm text-foreground">{glass}</div>
                  <div className="text-xs text-muted-foreground">
                    +{(prices.glass[glass as keyof typeof prices.glass] || 0).toLocaleString('ru-RU')} ₽
                  </div>
                </div>
              </button>
            ))}
          </div>
        );
      case 'frame':
        return (
          <div className="space-y-2 sm:space-y-3">
            {frameOptions.map(frame => (
              <button
                key={frame}
                onClick={() => setState({ ...state, frameType: frame })}
                className={`w-full p-3 sm:p-4 rounded-2xl border-2 transition-all text-left ${
                  state.frameType === frame
                    ? 'border-accent bg-accent/10'
                    : 'border-border hover:border-accent/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-xs sm:text-sm text-foreground">{frame}</div>
                  <div className="text-xs text-muted-foreground">
                    +{(prices.frame[frame as keyof typeof prices.frame] || 0).toLocaleString('ru-RU')} ₽
                  </div>
                </div>
              </button>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background py-6 sm:py-8 lg:py-12 pb-24 lg:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-foreground mb-2">Конфигуратор дверей</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Настройте каждую деталь и увидьте результат в реальном времени
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Preview */}
          <div className="lg:sticky lg:top-24 h-fit">
            <motion.div
              layout
              className="bg-card rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-border"
            >
              <div className="aspect-[3/4] sm:aspect-[3/4] bg-gradient-to-br from-secondary via-secondary/50 to-secondary/30 relative overflow-hidden">
                <motion.img
                  key={currentDoor.id + state.color}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  src={currentDoor.image}
                  alt={currentDoor.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Configuration overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                    <h2 className="text-white mb-2 text-base sm:text-lg">{currentDoor.name}</h2>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs sm:text-sm">
                      <p>Цвет: {state.color}</p>
                      <p>Кромка: {state.edge}</p>
                      <p>Ручка: {state.handle}</p>
                      <p>Стекло: {state.glass}</p>
                      <p className="col-span-2">Коробка: {state.frameType}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop buttons */}
              <div className="hidden lg:block p-4 sm:p-6 border-t border-border">
                <div className="flex items-baseline justify-between mb-4 sm:mb-6">
                  <div>
                    <div className="text-xs sm:text-sm text-muted-foreground mb-1">Стоимость:</div>
                    <div className="text-foreground text-lg sm:text-xl">{totalPrice.toLocaleString('ru-RU')} ₽</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs sm:text-sm text-muted-foreground mb-1">Базовая цена:</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">{currentDoor.basePrice.toLocaleString('ru-RU')} ₽</div>
                  </div>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <button
                    onClick={() => {
                      addToCart({
                        doorModel: currentDoor,
                        configuration: state,
                        quantity: 1,
                        price: totalPrice
                      });
                      onNavigate('cart');
                    }}
                    className="flex-1 px-4 py-3 bg-accent text-accent-foreground rounded-2xl hover:bg-accent/90 transition-all flex items-center justify-center gap-2 shadow-lg text-sm font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Добавить в корзину</span>
                  </button>
                  
                  <button
                    onClick={() => onNavigate('stands')}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-card border-2 border-border text-foreground rounded-2xl sm:rounded-3xl hover:border-accent/30 hover:bg-secondary/50 transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Где посмотреть образцы</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Configuration Panel */}
          <div>
            <div className="bg-card rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6 border border-border">
              <div className="mb-4 sm:mb-6">
                <label className="block text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">Выберите модель:</label>
                <select
                  value={currentDoor.id}
                  onChange={(e) => {
                    const door = doorModels.find(d => d.id === e.target.value);
                    if (door) {
                      setState({ ...state, doorModel: door });
                    }
                  }}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-border rounded-2xl text-foreground focus:outline-none focus:border-accent bg-background text-sm"
                >
                  {doorModels.map(door => (
                    <option key={door.id} value={door.id}>
                      {door.name} - {door.series} ({door.basePrice.toLocaleString('ru-RU')} ₽)
                    </option>
                  ))}
                </select>
              </div>

              {/* Tabs */}
              <div className="border-b border-border mb-4 sm:mb-6 -mx-4 sm:mx-0 px-4 sm:px-0">
                <div className="flex gap-1 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex flex-col sm:flex-row items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-t-2xl whitespace-nowrap transition-all text-xs sm:text-sm flex-shrink-0 snap-start ${
                        activeTab === tab.id
                          ? 'bg-accent text-accent-foreground shadow-sm'
                          : 'text-muted-foreground hover:bg-secondary'
                      }`}
                    >
                      <tab.icon className="w-4 h-4 sm:w-4 sm:h-4" />
                      <span className="text-xs sm:text-sm">{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Options */}
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {renderOptions()}
              </motion.div>
            </div>

            {/* Info Card */}
            <div className="bg-accent/10 border border-accent/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6">
              <h3 className="text-accent mb-2 text-sm sm:text-base">Хотите увидеть образцы?</h3>
              <p className="text-foreground text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                Посетите наши стойки с образцами материалов в торговых центрах вашего города. Вы сможете потрогать плёнки, кромки и фурнитуру вживую.
              </p>
              <button
                onClick={() => onNavigate('stands')}
                className="text-xs sm:text-sm text-accent hover:text-accent/80 transition-colors flex items-center gap-2"
              >
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Найти ближайшую стойку →</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-2xl z-40 safe-area-bottom">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-xs text-muted-foreground">Итого:</div>
              <div className="text-foreground text-lg">{totalPrice.toLocaleString('ru-RU')} ₽</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-muted-foreground">Базовая:</div>
              <div className="text-xs text-muted-foreground line-through">{currentDoor.basePrice.toLocaleString('ru-RU')} ₽</div>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onNavigate('stands')}
              className="flex-shrink-0 px-4 py-3 bg-secondary border border-border text-foreground rounded-2xl hover:bg-secondary/80 transition-all flex items-center justify-center gap-2"
              aria-label="Образцы"
            >
              <MapPin className="w-4 h-4" />
            </button>
            <button
              onClick={() => addToCart({ doorModel: currentDoor, color: state.color, edge: state.edge, handle: state.handle, glass: state.glass, frameType: state.frameType })}
              className="flex-1 px-4 py-3 bg-accent text-accent-foreground rounded-2xl hover:bg-accent/90 transition-all flex items-center justify-center gap-2 shadow-lg text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              <span>Добавить в корзину</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}