import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ShoppingCart, MapPin } from 'lucide-react';
import { ConfiguratorStepper } from './configurator/ConfiguratorStepper';
import { ModelSelection } from './configurator/ModelSelection';
import { ColorSelection } from './configurator/ColorSelection';
import { OptionsSelection } from './configurator/OptionsSelection';
import { DoorTypeBadge } from './configurator/DoorTypeBadge';
import { ConfiguratorPreview } from './configurator/ConfiguratorPreview';
import {
  getDoorById,
  getColorById,
  getOptionById,
  type DoorModelConfig
} from '../data/door-configurator-data';
import type { CartItem } from '../App';

interface NewConfiguratorProps {
  onNavigate: (page: string) => void;
  addToCart: (item: Omit<CartItem, 'id'>) => void;
}

export function NewConfigurator({ onNavigate, addToCart }: NewConfiguratorProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedModel, setSelectedModel] = useState<DoorModelConfig | null>(null);
  const [selectedColorId, setSelectedColorId] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const steps = [
    { id: 1, label: 'Модель', completed: !!selectedModel },
    { id: 2, label: 'Цвет', completed: !!selectedColorId },
    { id: 3, label: 'Опции', completed: selectedOptions.length > 0 }
  ];

  // Auto-advance to next step when selection is made
  useEffect(() => {
    if (currentStep === 1 && selectedModel) {
      // Auto-select first available color for preset models
      if (selectedModel.type === 'preset' && selectedModel.availableColors.length > 0) {
        setSelectedColorId(selectedModel.availableColors[0]);
      }
      // Auto-select locked colors for combo designer models
      if (selectedModel.lockedColors && selectedModel.lockedColors.length > 0) {
        setSelectedColorId(selectedModel.lockedColors[0]);
      }
    }
  }, [selectedModel, currentStep]);

  const handleModelSelect = (model: DoorModelConfig) => {
    setSelectedModel(model);
    setSelectedColorId(null);
    setSelectedOptions([]);
  };

  const handleColorSelect = (colorId: string) => {
    setSelectedColorId(colorId);
  };

  const handleOptionToggle = (optionId: string) => {
    setSelectedOptions(prev => 
      prev.includes(optionId)
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (step: number) => {
    if (step === 1) {
      setCurrentStep(1);
    } else if (step === 2 && selectedModel) {
      setCurrentStep(2);
    } else if (step === 3 && selectedModel && selectedColorId) {
      setCurrentStep(3);
    }
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    if (!selectedModel) return 0;
    
    let total = selectedModel.basePrice;
    
    if (selectedColorId) {
      const color = getColorById(selectedColorId);
      if (color) total += color.price;
    }
    
    selectedOptions.forEach(optionId => {
      const option = getOptionById(optionId);
      if (option) total += option.price;
    });
    
    return total;
  };

  const totalPrice = calculateTotalPrice();

  const handleAddToCart = () => {
    if (!selectedModel || !selectedColorId) return;

    const color = getColorById(selectedColorId);
    const options = selectedOptions.map(id => getOptionById(id)).filter(Boolean);

    // Create a legacy-compatible configuration object
    const configuration = {
      doorModel: selectedModel,
      color: color?.name || '',
      edge: options.find(o => o?.category === 'edge')?.name || 'Стандартная',
      handle: 'Стандартная',
      glass: options.find(o => o?.category === 'glass')?.name || 'Без стекла',
      frameType: 'Стандартная коробка'
    };

    // Convert to legacy DoorModel format
    const legacyDoorModel = {
      id: selectedModel.id,
      name: selectedModel.name,
      series: selectedModel.series,
      manufacturer: 'DoorMaster',
      basePrice: selectedModel.basePrice,
      image: 'https://images.unsplash.com/photo-1659720879327-827462ca3942?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBpbnRlcmlvciUyMGRvb3J8ZW58MXx8fHwxNzY0ODQ3OTY5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      material: 'МДФ',
      hasGlass: options.some(o => o?.category === 'glass'),
      colors: [color?.name || ''],
      texture: 'Матовая'
    };

    addToCart({
      doorModel: legacyDoorModel,
      configuration,
      quantity: 1,
      price: totalPrice
    });

    onNavigate('cart');
  };

  const canProceedToNext = () => {
    if (currentStep === 1) return !!selectedModel;
    if (currentStep === 2) return !!selectedColorId;
    return true;
  };

  return (
    <div className="min-h-screen bg-background py-6 sm:py-8 lg:py-12 pb-32 lg:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-foreground mb-2">Конфигуратор дверей</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Создайте идеальную дверь за 3 простых шага
          </p>
        </div>

        {/* Stepper */}
        <ConfiguratorStepper
          currentStep={currentStep}
          steps={steps}
          onStepClick={handleStepClick}
        />

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="bg-card rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-6 border border-border">
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-foreground mb-4 sm:mb-6 text-lg sm:text-xl">Выберите модель двери</h2>
                    <ModelSelection
                      selectedModelId={selectedModel?.id || null}
                      onSelect={handleModelSelect}
                    />
                  </motion.div>
                )}

                {currentStep === 2 && selectedModel && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-4 sm:mb-6">
                      <h2 className="text-foreground mb-2 text-lg sm:text-xl">Выберите цвет</h2>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Модель: {selectedModel.name}</span>
                        <DoorTypeBadge type={selectedModel.type} />
                      </div>
                    </div>
                    <ColorSelection
                      doorModel={selectedModel}
                      selectedColorId={selectedColorId}
                      onSelect={handleColorSelect}
                    />
                  </motion.div>
                )}

                {currentStep === 3 && selectedModel && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-4 sm:mb-6">
                      <h2 className="text-foreground mb-2 text-lg sm:text-xl">Дополнительные опции</h2>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Модель: {selectedModel.name}</span>
                        <DoorTypeBadge type={selectedModel.type} />
                      </div>
                    </div>
                    <OptionsSelection
                      doorModel={selectedModel}
                      selectedOptions={selectedOptions}
                      onToggle={handleOptionToggle}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons - Desktop */}
              <div className="hidden lg:flex items-center justify-between mt-6 pt-6 border-t border-border">
                <button
                  onClick={handlePrevStep}
                  disabled={currentStep === 1}
                  className="px-4 py-2.5 rounded-2xl border-2 border-border text-foreground hover:border-accent/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Назад</span>
                </button>

                {currentStep < 3 ? (
                  <button
                    onClick={handleNextStep}
                    disabled={!canProceedToNext()}
                    className="px-6 py-2.5 rounded-2xl bg-accent text-accent-foreground hover:bg-accent/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <span>Далее</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    disabled={!selectedModel || !selectedColorId}
                    className="px-6 py-2.5 rounded-2xl bg-accent text-accent-foreground hover:bg-accent/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Добавить в корзину</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Summary */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="lg:sticky lg:top-24 space-y-4 sm:space-y-6">
              {/* Preview - Only show when model is selected */}
              {selectedModel && (
                <div className="hidden lg:block">
                  <ConfiguratorPreview
                    doorModel={selectedModel}
                    selectedColorId={selectedColorId}
                    selectedOptions={selectedOptions}
                    totalPrice={totalPrice}
                  />
                </div>
              )}

              {/* Price Summary - Desktop */}
              {selectedModel && (
                <div className="hidden lg:block bg-card rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-6 border border-border">
                  <h3 className="text-foreground mb-4 text-base sm:text-lg">Итоговая стоимость</h3>
                  
                  <div className="space-y-3 mb-6">
                    {selectedModel && (
                      <div className="flex items-start justify-between pb-3 border-b border-border">
                        <div className="flex-1">
                          <div className="text-sm text-foreground mb-1">{selectedModel.name}</div>
                          <div className="text-xs text-muted-foreground">{selectedModel.series}</div>
                        </div>
                        <div className="text-sm text-foreground">{selectedModel.basePrice.toLocaleString('ru-RU')} ₽</div>
                      </div>
                    )}

                    {selectedColorId && (() => {
                      const color = getColorById(selectedColorId);
                      return color ? (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{color.name}</span>
                          <span className="text-accent">+{color.price.toLocaleString('ru-RU')} ₽</span>
                        </div>
                      ) : null;
                    })()}

                    {selectedOptions.map(optionId => {
                      const option = getOptionById(optionId);
                      return option ? (
                        <div key={optionId} className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{option.name}</span>
                          <span className="text-accent">+{option.price.toLocaleString('ru-RU')} ₽</span>
                        </div>
                      ) : null;
                    })}
                  </div>

                  <div className="flex items-baseline justify-between pt-4 border-t-2 border-border">
                    <span className="text-muted-foreground text-sm">Итого:</span>
                    <span className="text-foreground text-xl sm:text-2xl">{totalPrice.toLocaleString('ru-RU')} ₽</span>
                  </div>
                </div>
              )}

              {/* Info Card */}
              <div className="bg-accent/10 border border-accent/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6">
                <h3 className="text-accent mb-2 text-sm sm:text-base">Хотите увидеть образцы?</h3>
                <p className="text-foreground text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                  Посетите наши стойки с образцами материалов в торговых центрах вашего города.
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
      </div>

      {/* Mobile Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t-2 border-border shadow-2xl z-40 safe-area-bottom">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-xs text-muted-foreground">Итого:</div>
              <div className="text-foreground text-lg">{totalPrice.toLocaleString('ru-RU')} ₽</div>
            </div>
            {selectedModel && (
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Модель</div>
                <div className="text-xs text-foreground">{selectedModel.name}</div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {currentStep > 1 && (
              <button
                onClick={handlePrevStep}
                className="flex-shrink-0 px-4 py-3 bg-secondary border border-border text-foreground rounded-2xl hover:bg-secondary/80 transition-all flex items-center justify-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}

            {currentStep < 3 ? (
              <button
                onClick={handleNextStep}
                disabled={!canProceedToNext()}
                className="flex-1 px-4 py-3 bg-accent text-accent-foreground rounded-2xl hover:bg-accent/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
              >
                <span>Далее</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleAddToCart}
                disabled={!selectedModel || !selectedColorId}
                className="flex-1 px-4 py-3 bg-accent text-accent-foreground rounded-2xl hover:bg-accent/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>В корзину</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}