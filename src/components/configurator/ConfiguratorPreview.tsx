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

  // ✅ НАЛОЖЕНИЕ ТЕКСТУРЫ/ЦВЕТА ПО АНАЛОГИИ С THREE.JS
  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer || !modelLoaded) return;

    let cancelled = false;

    const applyTexture = async () => {
      const model = viewer.model;
      const materials = model?.materials ?? [];
      if (materials.length === 0) return;

      // Поведение как в рабочем примере: либо накладываем текстуру, либо очищаем её
      if (!textureUrl) {
        materials.forEach((material: any) => {
          const pbr = material?.pbrMetallicRoughness;
          if (!pbr?.baseColorTexture) return;
          pbr.baseColorTexture.setTexture(null);
          pbr.setBaseColorFactor([1, 1, 1, 1]);
        });
        return;
      }

      const texture = await viewer.createTexture(textureUrl);
      if (cancelled) return;

      materials.forEach((material: any) => {
        const pbr = material?.pbrMetallicRoughness;
        if (!pbr?.baseColorTexture) return;
        pbr.baseColorTexture.setTexture(texture);
        pbr.setBaseColorFactor([1, 1, 1, 1]);
      });
    };

    applyTexture();

    return () => {
      cancelled = true;
    };
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
