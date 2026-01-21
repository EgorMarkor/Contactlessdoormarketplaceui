import { useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react';
import { UploadCloud, Sparkles, X, Loader2, CheckCircle2 } from 'lucide-react';
import '@google/model-viewer';
import { doorModels } from '../../data/door-configurator-data';

interface AiDoorPickerProps {
  onClose: () => void;
  onApply: (selection: { modelId: string; colorId: string }) => void;
}

interface AiRecommendation {
  modelId: string;
  colorId: string;
  explanation: string;
}

const MODEL_ID = 'l1';
const MODEL_URL = '/assets/models/door-l1.glb';

const AI_COLOR_PRESETS = [
  {
    id: 'solid-1',
    name: 'Белый бланко',
    textureUrl: '/assets/textures/ai/ai-solid-blanco.svg',
    swatch: '#EDEAE4'
  },
  {
    id: 'solid-5',
    name: 'Графит',
    textureUrl: '/assets/textures/ai/ai-graphite.svg',
    swatch: '#454A52'
  },
  {
    id: 'wood-3',
    name: 'Орех',
    textureUrl: '/assets/textures/ai/ai-sand.svg',
    swatch: '#C6AE8E'
  }
];

const fileToDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Не удалось прочитать файл.'));
    reader.readAsDataURL(file);
  });

export function AiDoorPicker({ onClose, onApply }: AiDoorPickerProps) {
  const modelViewerRef = useRef<HTMLElement | null>(null);
  const [selectedColorId, setSelectedColorId] = useState(AI_COLOR_PRESETS[0].id);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [modelError, setModelError] = useState('');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');
  const [aiRecommendation, setAiRecommendation] = useState<AiRecommendation | null>(null);

  const modelLabel = useMemo(() => {
    return doorModels.find(model => model.id === MODEL_ID)?.name ?? 'L1';
  }, []);

  const selectedColor = useMemo(() => {
    return AI_COLOR_PRESETS.find(color => color.id === selectedColorId) ?? AI_COLOR_PRESETS[0];
  }, [selectedColorId]);

  useEffect(() => {
    if (!photoFile) {
      setPhotoPreview(null);
      return;
    }
    const previewUrl = URL.createObjectURL(photoFile);
    setPhotoPreview(previewUrl);
    return () => URL.revokeObjectURL(previewUrl);
  }, [photoFile]);

  useEffect(() => {
    const applyTexture = async () => {
      if (!modelLoaded || !modelViewerRef.current || !selectedColor?.textureUrl) return;
      const modelViewer = modelViewerRef.current as any;
      if (!modelViewer.model?.materials?.length) return;
      const texture = await modelViewer.createTexture(selectedColor.textureUrl);
      modelViewer.model.materials.forEach((material: any) => {
        const pbr = material.pbrMetallicRoughness;
        if (!pbr?.baseColorTexture) return;
        pbr.baseColorTexture.setTexture(texture);
      });
    };

    void applyTexture();
  }, [modelLoaded, selectedColor]);

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setAiRecommendation(null);
    setAiError('');
  };

  const handleAiPick = async () => {
    if (!photoFile) {
      setAiError('Загрузите фотографию дверного проёма, чтобы получить подбор.');
      return;
    }

    const apiKey = import.meta.env.VITE_OPENAI_API_KEY as string | undefined;
    if (!apiKey) {
      setAiError('Добавьте VITE_OPENAI_API_KEY в .env, чтобы включить подбор через ChatGPT API.');
      return;
    }

    try {
      setAiLoading(true);
      setAiError('');
      const imageDataUrl = await fileToDataUrl(photoFile);
      const colorContext = AI_COLOR_PRESETS.map(color => `${color.id} — ${color.name}`).join(', ');
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          temperature: 0.4,
          messages: [
            {
              role: 'system',
              content:
                'Ты помощник салона дверей. Подбирай модель и цвет двери по фото интерьера. Отвечай строго JSON-объектом.'
            },
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text:
                    `Проанализируй фото дверного проёма (обои, пол, общая тональность). ` +
                    `Разрешена только модель ${MODEL_ID.toUpperCase()} и цвета: ${colorContext}. ` +
                    'Ответь JSON вида: {"modelId":"l1","colorId":"solid-1","explanation":"..."}.'
                },
                { type: 'image_url', image_url: { url: imageDataUrl } }
              ]
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error('Не удалось получить ответ от ChatGPT API.');
      }

      const data = await response.json();
      const content: string = data?.choices?.[0]?.message?.content ?? '';
      let parsed: AiRecommendation | null = null;

      try {
        parsed = JSON.parse(content) as AiRecommendation;
      } catch {
        parsed = null;
      }

      const safeColorId = AI_COLOR_PRESETS.some(color => color.id === parsed?.colorId)
        ? parsed?.colorId
        : AI_COLOR_PRESETS[0].id;
      const recommendation: AiRecommendation = {
        modelId: parsed?.modelId === MODEL_ID ? MODEL_ID : MODEL_ID,
        colorId: safeColorId,
        explanation: parsed?.explanation || 'Подбор выполнен с учетом освещения и оттенков интерьера.'
      };

      setAiRecommendation(recommendation);
      setSelectedColorId(recommendation.colorId);
      onApply({ modelId: recommendation.modelId, colorId: recommendation.colorId });
    } catch (error) {
      setAiError(error instanceof Error ? error.message : 'Не удалось получить подбор.');
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4 py-8" role="dialog">
      <div className="w-full max-w-5xl bg-card border border-border rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div>
            <h2 className="text-foreground text-lg sm:text-xl">ИИ-подбор двери по фотографии</h2>
            <p className="text-xs text-muted-foreground mt-1">
              Сфотографируйте дверной проём, чтобы получить рекомендацию по модели и цвету.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-secondary transition-colors"
            aria-label="Закрыть"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 p-6">
          <div className="space-y-5">
            <div className="rounded-2xl border border-dashed border-border p-5 bg-background/40">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-foreground text-sm">Загрузите фото дверного проёма</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Фото должно захватывать обои, пол и уровень освещения комнаты.
                  </p>
                </div>
              </div>
              <label className="mt-4 flex flex-col items-center justify-center rounded-xl border border-border bg-card px-4 py-6 cursor-pointer hover:border-accent/60 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
                <span className="text-sm text-foreground">Выбрать фото</span>
                <span className="text-xs text-muted-foreground mt-1">JPG, PNG или HEIC</span>
              </label>
              {photoPreview && (
                <div className="mt-4 rounded-xl overflow-hidden border border-border">
                  <img src={photoPreview} alt="Превью фото" className="w-full h-56 object-cover" />
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-border p-5 bg-card/70">
              <div className="flex items-center gap-2 text-sm text-foreground mb-4">
                <Sparkles className="w-4 h-4 text-accent" />
                <span>Запустите ИИ-подбор</span>
              </div>
              <button
                onClick={handleAiPick}
                disabled={aiLoading}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-accent text-accent-foreground text-sm hover:bg-accent/90 transition-colors disabled:opacity-60"
              >
                {aiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                {aiLoading ? 'Подбор выполняется...' : 'Получить рекомендации'}
              </button>
              {aiError && <p className="text-xs text-destructive mt-3">{aiError}</p>}
              {aiRecommendation && (
                <div className="mt-4 rounded-xl border border-border bg-background/60 px-4 py-3">
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Рекомендовано: модель {aiRecommendation.modelId.toUpperCase()}, цвет {selectedColor.name}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{aiRecommendation.explanation}</p>
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-border p-5 bg-background/40">
              <h3 className="text-sm text-foreground mb-3">Доступные цвета L1</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {AI_COLOR_PRESETS.map(color => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColorId(color.id)}
                    className={`flex items-center gap-3 rounded-xl border px-3 py-2 text-left transition-colors ${
                      selectedColorId === color.id
                        ? 'border-accent bg-accent/10'
                        : 'border-border hover:border-accent/60'
                    }`}
                  >
                    <span className="w-10 h-10 rounded-lg border" style={{ backgroundColor: color.swatch }} />
                    <span className="text-xs text-foreground">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-background/40 p-4 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm text-foreground">3D просмотр модели {modelLabel}</h3>
                <p className="text-xs text-muted-foreground">Цвет: {selectedColor.name}</p>
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">L1</span>
            </div>
            <div className="relative rounded-2xl overflow-hidden border border-border bg-gradient-to-br from-secondary/30 via-secondary/60 to-muted/40 h-[420px]">
              <model-viewer
                ref={modelViewerRef}
                src={MODEL_URL}
                alt="3D модель двери"
                camera-controls
                auto-rotate
                exposure="0.85"
                shadow-intensity="0.6"
                onLoad={() => {
                  setModelLoaded(true);
                  setModelError('');
                }}
                onError={() => {
                  setModelError('Добавьте 3D модель L1 в папку /public/assets/models, чтобы включить просмотр.');
                }}
                className="w-full h-full"
              />
              {modelError && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-xs text-white px-6 text-center">
                  {modelError}
                </div>
              )}
            </div>
            <button
              onClick={() => onApply({ modelId: MODEL_ID, colorId: selectedColorId })}
              className="w-full px-4 py-3 rounded-xl border border-border text-sm text-foreground hover:border-accent/60 transition-colors"
            >
              Применить выбранный цвет
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export const aiDoorPickerModel = {
  id: MODEL_ID,
  url: MODEL_URL
};

export const aiDoorPickerTexturePresets = AI_COLOR_PRESETS.map(color => ({
  id: color.id,
  name: color.name,
  textureUrl: color.textureUrl
}));
