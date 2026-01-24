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
        style={{ width: '300px', height: '450px', display: 'block' }}
      />

    </div>
  </div>

</div>

  );
}
