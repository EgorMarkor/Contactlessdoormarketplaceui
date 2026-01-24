import { useEffect, useRef, useState } from 'react';
import { DoorTypeBadge } from './DoorTypeBadge';
import {
  getColorById,
  type DoorModelConfig,
} from '../../data/door-configurator-data';
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
  totalPrice,
}: ConfiguratorPreviewProps) {
  const viewerRef = useRef<any>(null);
  const [modelLoaded, setModelLoaded] = useState(false);

  // ✅ ПРАВИЛЬНО: берём цвет из colorOptions
  const selectedColor = selectedColorId
    ? getColorById(selectedColorId)
    : null;

  const textureUrl = selectedColor?.textureUrl ?? null;

  // ✅ путь к модели
  const modelViewerSrc = '/assets/models/door-l1.glb';

  // ✅ НАЛОЖЕНИЕ ТЕКСТУРЫ
  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer || !modelLoaded || !textureUrl) return;

    const applyTexture = async () => {
      const model = viewer.model;
      if (!model) return;

      const material = model.materials?.[0];
      if (!material) return;

      const texture = await viewer.createTexture(textureUrl);

      material.pbrMetallicRoughness.baseColorTexture.setTexture(texture);
      material.pbrMetallicRoughness.setBaseColorFactor([1, 1, 1, 1]);
    };

    applyTexture();
  }, [textureUrl, modelLoaded]);

  return (
    <div className="relative h-[70vh] rounded-3xl bg-muted/30 overflow-hidden">
      <div className="relative w-full h-full flex items-center justify-center">
        <model-viewer
          ref={viewerRef}
          src={modelViewerSrc}
          camera-controls
          auto-rotate
          exposure="0.9"
          shadow-intensity="0.6"
          style={{ width: '320px', height: '480px' }}
          onLoad={() => setModelLoaded(true)}
        />
      </div>

      <div className="absolute bottom-4 left-4 right-4 text-white text-sm">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium">{doorModel.name}</span>
          <DoorTypeBadge type={doorModel.type} />
        </div>

        {selectedColor && (
          <div className="opacity-90">
            Цвет: {selectedColor.name}
          </div>
        )}

        <div className="mt-1 text-lg font-semibold">
          {totalPrice.toLocaleString('ru-RU')} ₽
        </div>
      </div>
    </div>
  );
}
