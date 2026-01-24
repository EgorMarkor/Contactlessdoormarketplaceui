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

  console.log(selectedColor);

  const textureUrl = selectedColor?.textureUrl ?? null;

  // ✅ путь к модели
  const modelViewerSrc = '/assets/models/door-l1.glb';

  // ✅ НАЛОЖЕНИЕ ТЕКСТУРЫ/ЦВЕТА ПО АНАЛОГИИ С THREE.JS
  useEffect(() => {
  console.log('🟡 [INIT] useEffect mount');

  const viewer = viewerRef.current;
  console.log('🟡 [INIT] viewerRef.current =', viewer);

  if (!viewer) {
    console.log('🔴 [INIT] viewerRef.current NULL');
    return;
  }

  const onModelLoad = () => {
    console.log('🔥🔥🔥 [EVENT] model-viewer LOAD FIRED');
    console.log('🧠 viewer.model =', viewer.model);
    setModelLoaded(true);
  };

  viewer.addEventListener('load', onModelLoad);

  return () => {
    console.log('🟡 [CLEANUP] remove load listener');
    viewer.removeEventListener('load', onModelLoad);
  };
}, []);

useEffect(() => {
  console.log('🟣 [TEXTURE EFFECT] fired');
  console.log('🟣 modelLoaded =', modelLoaded);
  console.log('🟣 textureUrl =', textureUrl);

  const viewer = viewerRef.current;
  if (!viewer) {
    console.log('🔴 viewer NULL');
    return;
  }

  if (!modelLoaded) {
    console.log('🔴 model not loaded yet');
    return;
  }

  if (!viewer.model) {
    console.log('🔴 viewer.model NULL');
    return;
  }

  const materials = viewer.model.materials;
  console.log('🟢 materials =', materials);

  if (!materials || materials.length === 0) {
    console.log('🔴 NO MATERIALS');
    return;
  }

  (async () => {
    if (!textureUrl) {
      console.log('🟡 no textureUrl — skip');
      return;
    }

    console.log('🟢 creating texture', textureUrl);
    const texture = await viewer.createTexture(textureUrl);
    console.log('🟢 texture created', texture);

    materials.forEach((material: any, i: number) => {
      const pbr = material.pbrMetallicRoughness;
      console.log(`🎨 material ${i} pbr`, pbr);

      if (!pbr?.baseColorTexture) {
        console.log(
          `❌ material ${i} has NO baseColorTexture`
        );
        return;
      }

      console.log(`✅ applying texture to material ${i}`);
      pbr.baseColorTexture.setTexture(texture);
      pbr.setBaseColorFactor([1, 1, 1, 1]);
    });
  })();
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
