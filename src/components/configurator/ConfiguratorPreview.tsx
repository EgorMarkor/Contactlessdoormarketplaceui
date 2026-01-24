import { useState } from 'react';
import { motion } from 'motion/react';
import { DoorTypeBadge } from './DoorTypeBadge';
import { getColorById, getOptionById, type DoorModelConfig } from '../../data/door-configurator-data';
import { useAdminContent } from '../admin/AdminContentProvider';
import '@google/model-viewer';

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
  const [modelError, setModelError] = useState('');
  const { entries } = useAdminContent();
  const entry = entries[doorModel.id];
  const linkedTexture = selectedColorId
    ? entry?.textures?.find(texture => texture.linkedColorId === selectedColorId)
    : undefined;
  const fallbackTexture = linkedTexture ?? entry?.textures?.[0];
  const modelAsset = entry?.modelAssets?.[0];
  const selectedColor = selectedColorId ? getColorById(selectedColorId) : null;
  const colorTheme = selectedColor
    ? {
        wood: {
          gradient: 'from-[#9A7B4F] via-[#B08D5A] to-[#D5B68C]'
        },
        solid: {
          gradient: 'from-[#E5E7EB] via-[#CBD5F5] to-[#94A3B8]'
        },
        concrete: {
          gradient: 'from-[#9CA3AF] via-[#6B7280] to-[#4B5563]'
        },
        decorative: {
          gradient: 'from-[#7C5C4A] via-[#A0704F] to-[#C08B5B]'
        },
        glass: {
          gradient: 'from-[#D1FAE5] via-[#7DD3FC] to-[#38BDF8]'
        }
      }[selectedColor.category]
    : null;
  const viewerGradient = colorTheme?.gradient ?? 'from-muted/30 via-secondary/60 to-muted/50';
  const textureLabel = fallbackTexture?.name
    ?? (selectedColor
      ? {
          wood: 'Шпон натуральный',
          solid: 'Эмаль матовая',
          concrete: 'Бетонная фактура',
          decorative: 'Декоративная текстура',
          glass: 'Стеклянная вставка'
        }[selectedColor.category]
      : 'Базовая отделка');
  const modelFormat = modelAsset?.format?.toUpperCase() ?? 'GLB';
  const isL1Model = doorModel.id === 'l1';
  const modelViewerSrc = '/assets/models/door-l1.glb';

  return (
    <div className="bg-card rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-border">
      {/* 3D Door Viewer */}
      <div className={`min-h-[520px] sm:min-h-[640px] lg:min-h-[740px] bg-gradient-to-br ${viewerGradient} relative overflow-hidden`}>
        <div className="absolute inset-0 flex flex-col p-6 sm:p-8">
          <div className="w-full flex items-center justify-between text-xs text-foreground/70 mb-4">
            <span className="px-2 py-1 rounded-full bg-black/20">3D просмотр</span>
            <span className="hidden sm:inline">Потяните для поворота</span>
          </div>

          <div className="flex-1 w-full flex items-center justify-center">
            {isL1Model ? (
              <div className="relative w-full h-full max-w-none">
                <div className="absolute inset-0 rounded-[28px] bg-black/20 blur-xl" />
                <div className="relative h-full rounded-[24px] border border-white/30 shadow-2xl overflow-hidden bg-black/15">
                  <model-viewer
                    src={modelViewerSrc}
                    alt="3D модель двери L1"
                    camera-controls
                    auto-rotate
                    exposure="0.85"
                    shadow-intensity="0.6"
                    onLoad={() => {
                      setModelError('');
                    }}
                    onError={() => {
                      setModelError(
                        'Добавьте 3D модель L1 в папку /public/assets/models, чтобы включить просмотр.'
                      );
                    }}
                    className="w-full h-full"
                  />
                  {modelError && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-xs text-white px-6 text-center">
                      {modelError}
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 right-4 text-[10px] sm:text-xs text-white/80">
                    Текстура: {textureLabel}
                  </div>
                </div>
              </div>
            ) : (
              <motion.div
                key={doorModel.id + selectedColorId}
                initial={{ rotateX: -10, rotateY: 15, opacity: 0 }}
                animate={{ rotateX: -6, rotateY: 18, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="relative w-full h-full max-w-none"
                style={{ perspective: '1000px' }}
              >
                <div className="absolute inset-0 rounded-[26px] bg-black/20 blur-xl" />
                <div
                  className="relative h-full rounded-[22px] border border-white/30 shadow-2xl overflow-hidden"
                  style={{ transform: 'rotateY(-12deg) rotateX(4deg)' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-transparent" />
                  <div className="absolute inset-4 rounded-2xl border border-white/30" />
                  <div className="absolute inset-8 rounded-xl border border-white/20" />
                  <div className="absolute right-6 top-1/2 h-12 w-2 rounded-full bg-black/30" />
                  <div className="absolute left-0 top-0 h-full w-2 bg-white/40" />
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-[10px] sm:text-xs text-white/80">
                    Текстура: {textureLabel}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          <div className="mt-6 text-center">
            <div className="text-sm sm:text-base text-foreground/90 mb-2">{doorModel.name}</div>
            <DoorTypeBadge type={doorModel.type} />
          </div>
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] text-foreground/80">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-white/80" />
            {selectedColor ? selectedColor.name : 'Выберите цвет'}
          </div>
          <div className="flex items-center gap-1">
            <span className="px-2 py-1 rounded-full bg-black/20">HD</span>
            <span>{modelFormat}</span>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
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

          <div>
            <div className="text-xs text-muted-foreground mb-1">Текстура модели</div>
            <div className="text-sm text-foreground">{textureLabel}</div>
          </div>
          {modelAsset && (
            <div>
              <div className="text-xs text-muted-foreground mb-1">3D модель</div>
              <div className="text-sm text-foreground">
                {modelAsset.name} · {modelFormat}
              </div>
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
