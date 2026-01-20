import { motion } from 'motion/react';
import { DoorTypeBadge } from './DoorTypeBadge';
import { getColorById, getOptionById, type DoorModelConfig } from '../../data/door-configurator-data';

interface ConfiguratorPreviewProps {
  doorModel: DoorModelConfig;
  selectedColorId: string | null;
  selectedOptions: string[];
  totalPrice: number;
}

export function ConfiguratorPreview({ 
  doorModel, 
  selectedColorId, 
  selectedOptions,
  totalPrice 
}: ConfiguratorPreviewProps) {
  const selectedColor = selectedColorId ? getColorById(selectedColorId) : null;

  return (
    <div className="bg-card rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-border">
      {/* Door Preview */}
      <div className="aspect-[3/4] bg-gradient-to-br from-secondary via-secondary/50 to-secondary/30 relative overflow-hidden">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
          <motion.div
            key={doorModel.id + selectedColorId}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-[200px] aspect-[1/2] bg-gradient-to-br from-muted/50 to-muted/20 rounded-lg border-4 border-muted/30 relative shadow-2xl"
          >
            {/* Door panels simulation */}
            <div className="absolute inset-4 border-2 border-muted/20 rounded" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-6 bg-accent/50 rounded-full" />
          </motion.div>

          {/* Model name overlay */}
          <div className="mt-6 text-center">
            <div className="text-sm sm:text-base text-foreground/80 mb-2">{doorModel.name}</div>
            <DoorTypeBadge type={doorModel.type} />
          </div>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Configuration Summary */}
      <div className="p-4 sm:p-6 border-t border-border">
        <div className="space-y-3">
          <div>
            <div className="text-xs text-muted-foreground mb-1">Модель</div>
            <div className="text-sm text-foreground">{doorModel.name} — {doorModel.series}</div>
          </div>

          {selectedColor && (
            <div>
              <div className="text-xs text-muted-foreground mb-1">Цвет</div>
              <div className="text-sm text-foreground">{selectedColor.name}</div>
            </div>
          )}

          {selectedOptions.length > 0 && (
            <div>
              <div className="text-xs text-muted-foreground mb-1">
                Опции ({selectedOptions.length})
              </div>
              <div className="space-y-1">
                {selectedOptions.slice(0, 3).map(optionId => {
                  const option = getOptionById(optionId);
                  return option ? (
                    <div key={optionId} className="text-xs text-foreground">
                      • {option.name}
                    </div>
                  ) : null;
                })}
                {selectedOptions.length > 3 && (
                  <div className="text-xs text-muted-foreground">
                    + еще {selectedOptions.length - 3}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 pt-4 border-t-2 border-border">
          <div className="flex items-baseline justify-between">
            <div className="text-xs text-muted-foreground">Итоговая стоимость:</div>
            <div className="text-xl sm:text-2xl text-accent">{totalPrice.toLocaleString('ru-RU')} ₽</div>
          </div>
        </div>
      </div>
    </div>
  );
}
