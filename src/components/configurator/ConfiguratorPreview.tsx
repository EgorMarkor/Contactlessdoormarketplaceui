import { useMemo, useState, type CSSProperties } from 'react';
import { getColorById, type DoorModelConfig } from '../../data/door-configurator-data';
import '@google/model-viewer';

interface ConfiguratorPreviewProps {
  doorModel: DoorModelConfig;
  selectedColorId: string | null;
  selectedOptions: string[];
  totalPrice: number;
}

type TextureOverlayConfig = {
  url: string;
  blendMode?: CSSProperties['mixBlendMode'];
  opacity?: number;
};

const L1_COLOR_OVERLAYS: Record<string, TextureOverlayConfig> = {
  'solid-1': { url: '/textures/ai/ai-solid-blanco.svg', blendMode: 'multiply', opacity: 0.96 },
  'solid-5': { url: '/textures/ai/ai-graphite.svg', blendMode: 'multiply', opacity: 0.96 },
  'solid-6': { url: '/textures/ai/ai-sand.svg', blendMode: 'multiply', opacity: 0.96 },
};

export function ConfiguratorPreview({
  doorModel,
  selectedColorId,
  selectedOptions: _selectedOptions,
  totalPrice: _totalPrice,
}: ConfiguratorPreviewProps) {
  const [modelError, setModelError] = useState<string | null>(null);
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
  const isL1Model = doorModel.id === 'l1';
  const modelViewerSrc = '/assets/models/door-l1.glb';

  const overlayConfig = useMemo(() => {
    if (!isL1Model || !selectedColorId) return null;
    return L1_COLOR_OVERLAYS[selectedColorId] ?? null;
  }, [isL1Model, selectedColorId]);

  const overlayStyle: CSSProperties | undefined = overlayConfig
    ? {
        mixBlendMode: overlayConfig.blendMode ?? 'multiply',
        opacity: overlayConfig.opacity ?? 1,
      }
    : undefined;

  return (
    <div className={`relative bg-gradient-to-br ${viewerGradient} overflow-hidden h-[70vh]`}>
      <div className="relative w-full h-full">
        <div className="absolute inset-0 rounded-[28px] bg-black/20 blur-xl" />

        <div className="relative w-full h-full rounded-[24px] border border-white/30 shadow-2xl overflow-hidden bg-black/15">
          <model-viewer
            src={modelViewerSrc}
            alt="3D модель двери L1"
            camera-controls
            auto-rotate
            exposure="0.85"
            shadow-intensity="0.6"
            style={{ width: '100%', height: '100%', display: 'block' }}
            onError={() => setModelError('Не удалось загрузить 3D модель.')}
          />

          {overlayConfig && (
            <img
              src={overlayConfig.url}
              alt={`Текстура цвета: ${selectedColor?.name ?? ''}`}
              className="pointer-events-none absolute inset-0 h-full w-full object-contain"
              style={overlayStyle}
            />
          )}

          {modelError && (
            <div className="absolute inset-x-4 bottom-4 rounded-lg bg-black/70 px-4 py-2 text-sm text-white">
              {modelError}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
