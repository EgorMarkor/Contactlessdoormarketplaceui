import { motion } from 'motion/react';
import { Info, Check } from 'lucide-react';
import { useState } from 'react';
import {
  optionCategories,
  getOptionCategoryLabel,
  getOptionsByCategory,
  isOptionAvailable,
  type OptionCategory,
  type DoorModelConfig
} from '../../data/door-configurator-data';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

interface OptionsSelectionProps {
  doorModel: DoorModelConfig;
  selectedOptions: string[];
  onToggle: (optionId: string) => void;
}

export function OptionsSelection({ doorModel, selectedOptions, onToggle }: OptionsSelectionProps) {
  const [expandedCategory, setExpandedCategory] = useState<OptionCategory | null>('edge');

  const isPreset = doorModel.type === 'preset';

  return (
    <div className="space-y-4">
      {isPreset && (
        <div className="bg-accent/10 border border-accent/30 rounded-2xl p-4">
          <p className="text-xs sm:text-sm text-foreground">
            Для готовых пресетов опции уже предустановлены и не могут быть изменены.
          </p>
        </div>
      )}

      <div className="space-y-4">
        {optionCategories.map(category => {
          const options = getOptionsByCategory(category);
          const availableOptions = options.filter(o => isOptionAvailable(doorModel.id, o.id));
          
          if (availableOptions.length === 0) return null;

          const isExpanded = expandedCategory === category;
          const selectedInCategory = selectedOptions.filter(id => 
            availableOptions.some(o => o.id === id)
          ).length;

          return (
            <div key={category} className="border border-border rounded-2xl overflow-hidden">
              <button
                onClick={() => setExpandedCategory(isExpanded ? null : category)}
                className="w-full px-4 py-3 bg-secondary hover:bg-secondary/80 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm sm:text-base text-foreground">{getOptionCategoryLabel(category)}</span>
                  <span className="text-xs text-muted-foreground">
                    ({selectedInCategory}/{availableOptions.length})
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.div>
              </button>

              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 bg-card"
                >
                  <div className="space-y-2 sm:space-y-3">
                    {options.map(option => {
                      const isAvailable = isOptionAvailable(doorModel.id, option.id);
                      const isSelected = selectedOptions.includes(option.id);
                      const isDisabled = !isAvailable || isPreset;

                      return (
                        <TooltipProvider key={option.id}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                onClick={() => !isDisabled && onToggle(option.id)}
                                disabled={isDisabled}
                                className={`w-full p-3 sm:p-4 rounded-2xl border-2 transition-all text-left relative ${
                                  isSelected
                                    ? 'border-accent bg-accent/10'
                                    : isDisabled
                                    ? 'border-border bg-muted/50 opacity-50 cursor-not-allowed'
                                    : 'border-border hover:border-accent/50 bg-card'
                                }`}
                              >
                                <div className="flex items-start gap-3">
                                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                                    isSelected
                                      ? 'border-accent bg-accent'
                                      : 'border-border bg-background'
                                  }`}>
                                    {isSelected && <Check className="w-3 h-3 text-accent-foreground" />}
                                  </div>

                                  <div className="flex-1">
                                    <div className="text-xs sm:text-sm text-foreground mb-1">
                                      {option.name}
                                    </div>
                                    {option.description && (
                                      <div className="text-xs text-muted-foreground mb-2">
                                        {option.description}
                                      </div>
                                    )}
                                    <div className="text-xs text-accent">
                                      +{option.price.toLocaleString('ru-RU')} ₽
                                    </div>
                                  </div>

                                  {isDisabled && (
                                    <Info className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                  )}
                                </div>
                              </button>
                            </TooltipTrigger>
                            {isDisabled && !isPreset && (
                              <TooltipContent>
                                <p className="text-xs">
                                  Опция недоступна для выбранной модели
                                </p>
                              </TooltipContent>
                            )}
                          </Tooltip>
                        </TooltipProvider>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
