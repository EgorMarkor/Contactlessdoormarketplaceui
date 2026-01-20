import { motion } from 'motion/react';
import { Lock, Info } from 'lucide-react';
import { useState } from 'react';
import {
  colorCategories,
  getCategoryLabel,
  getColorsByCategory,
  isColorAvailable,
  type ColorCategory,
  type DoorModelConfig
} from '../../data/door-configurator-data';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

interface ColorSelectionProps {
  doorModel: DoorModelConfig;
  selectedColorId: string | null;
  onSelect: (colorId: string) => void;
}

export function ColorSelection({ doorModel, selectedColorId, onSelect }: ColorSelectionProps) {
  const [expandedCategory, setExpandedCategory] = useState<ColorCategory | null>('wood');

  const hasLockedColors = doorModel.lockedColors && doorModel.lockedColors.length > 0;

  return (
    <div className="space-y-4">
      {hasLockedColors && (
        <div className="bg-accent/10 border border-accent/30 rounded-2xl p-4 flex items-start gap-3">
          <Lock className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-sm text-accent mb-1">Цвета заблокированы</div>
            <p className="text-xs text-foreground/80">
              Эта модель имеет предустановленную комбинацию цветов, которая не может быть изменена.
            </p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {colorCategories.map(category => {
          const colors = getColorsByCategory(category);
          const availableColors = colors.filter(c => isColorAvailable(doorModel.id, c.id));
          
          if (availableColors.length === 0) return null;

          const isExpanded = expandedCategory === category;

          return (
            <div key={category} className="border border-border rounded-2xl overflow-hidden">
              <button
                onClick={() => setExpandedCategory(isExpanded ? null : category)}
                className="w-full px-4 py-3 bg-secondary hover:bg-secondary/80 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm sm:text-base text-foreground">{getCategoryLabel(category)}</span>
                  <span className="text-xs text-muted-foreground">({availableColors.length})</span>
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    {colors.map(color => {
                      const isAvailable = isColorAvailable(doorModel.id, color.id);
                      const isLocked = hasLockedColors && !doorModel.lockedColors?.includes(color.id);
                      const isDisabled = !isAvailable || isLocked;
                      const isSelected = selectedColorId === color.id;

                      return (
                        <TooltipProvider key={color.id}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                onClick={() => !isDisabled && onSelect(color.id)}
                                disabled={isDisabled}
                                className={`p-3 sm:p-4 rounded-2xl border-2 transition-all text-left relative ${
                                  isSelected
                                    ? 'border-accent bg-accent/10'
                                    : isDisabled
                                    ? 'border-border bg-muted/50 opacity-50 cursor-not-allowed'
                                    : 'border-border hover:border-accent/50 bg-card'
                                }`}
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="text-xs sm:text-sm text-foreground mb-1 flex items-center gap-2">
                                      {color.name}
                                      {isLocked && <Lock className="w-3 h-3 text-muted-foreground" />}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                      +{color.price.toLocaleString('ru-RU')} ₽
                                    </div>
                                  </div>
                                  {isDisabled && (
                                    <Info className="w-4 h-4 text-muted-foreground" />
                                  )}
                                </div>
                              </button>
                            </TooltipTrigger>
                            {isDisabled && (
                              <TooltipContent>
                                <p className="text-xs">
                                  {isLocked
                                    ? 'Цвет заблокирован для этой модели'
                                    : 'Цвет недоступен для выбранной модели'
                                  }
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
