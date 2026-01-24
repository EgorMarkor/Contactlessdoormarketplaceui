import { useEffect, useMemo, useState, type ChangeEvent } from 'react';
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

const DEFAULT_MODEL_ID = 'l1';
const getModelUrl = (modelId: string) => `/assets/models/door-${modelId}.glb`;

const getTextureUrl = (name: string) => {
  const lower = name.toLowerCase();
  if (lower.includes('бел') || lower.includes('снеж')) {
    return '/assets/textures/ai/ai-solid-blanco.jpg';
  }
  if (lower.includes('черн') || lower.includes('графит') || lower.includes('дымчат')) {
    return '/assets/textures/ai/ai-graphite.jpg';
  }
  return '/assets/textures/ai/ai-sand.jpg';
};

const AI_COLOR_PRESETS = [
  { id: 'northern-oak', name: 'Северный дуб', swatch: '#C9B59A' },
  { id: 'milky-oak', name: 'Молочный дуб', swatch: '#E6D7C3' },
  { id: 'dark-oak', name: 'Темный дуб', swatch: '#6B4A32' },
  { id: 'smoky-oak', name: 'Дымчатый дуб', swatch: '#8A7766' },
  { id: 'misty-oak', name: 'Туманный дуб', swatch: '#B9ADA0' },
  { id: 'classic-oak', name: 'Классик дуб', swatch: '#B2875A' },
  { id: 'alpine-oak', name: 'Альпийский дуб', swatch: '#D7C3A7' },
  { id: 'riviera-ice', name: 'Ривьера ледяная', swatch: '#DCE6EB' },
  { id: 'cape-ash', name: 'Мыс пепельный', swatch: '#9B8F83' },
  { id: 'sandy-shore', name: 'Берег песчаный', swatch: '#D2B48C' },
  { id: 'golden-valley', name: 'Долина золотая', swatch: '#C9A25B' },
  { id: 'karelian-forest', name: 'Лес карельский', swatch: '#7A5A3A' },
  { id: 'amber-bay', name: 'Бухта янтарная', swatch: '#C68642' },
  { id: 'savanna-lux', name: 'Саванна люкс', swatch: '#C7A97D' },
  { id: 'desert-lux', name: 'Пустыня люкс', swatch: '#C19A6B' },
  { id: 'terracotta-lux', name: 'Терракота люкс', swatch: '#B85C38' },
  { id: 'dunes-lux', name: 'Дюны люкс', swatch: '#D8B98A' },
  { id: 'canyon-lux', name: 'Каньон люкс', swatch: '#8C4E2E' },
  { id: 'white-cotton', name: 'Хлопок белый', swatch: '#F5F2ED' },
  { id: 'light-eucalyptus', name: 'Эвкалипт светлый', swatch: '#C7D3C4' },
  { id: 'graphite-juniper', name: 'Можжевельник графитовый', swatch: '#4E5451' },
  { id: 'creamy-linen', name: 'Лен сливочный', swatch: '#F1E4CF' },
  { id: 'pink-almond', name: 'Миндаль розовый', swatch: '#E5C7BE' },
  { id: 'warm-laurel', name: 'Лавр теплый', swatch: '#A39B6A' },
  { id: 'warm-concrete', name: 'Теплый бетон', swatch: '#B9B1A6' },
  { id: 'snow-concrete', name: 'Снежный бетон', swatch: '#E8E8E6' },
  { id: 'graphite-concrete', name: 'Графит бетон', swatch: '#5B5C5E' },
  { id: 'absolute-concrete', name: 'Абсолют бетон', swatch: '#3F4042' },
  { id: 'white-sand', name: 'Песок белый', swatch: '#E9DFCF' },
  { id: 'black-sand', name: 'Песок черный', swatch: '#2F2F2F' }
].map(color => ({
  ...color,
  textureUrl: getTextureUrl(color.name)
}));

const fileToDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Не удалось прочитать файл.'));
    reader.readAsDataURL(file);
  });

export function AiDoorPicker({ onClose, onApply }: AiDoorPickerProps) {
  const [selectedModelId, setSelectedModelId] = useState(DEFAULT_MODEL_ID);
  const [selectedColorId, setSelectedColorId] = useState(AI_COLOR_PRESETS[0].id);
  const [modelError, setModelError] = useState('');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');
  const [aiRecommendation, setAiRecommendation] = useState<AiRecommendation | null>(null);

  const modelLabel = useMemo(() => {
    return doorModels.find(model => model.id === selectedModelId)?.name ?? selectedModelId.toUpperCase();
  }, [selectedModelId]);

  const modelUrl = useMemo(() => getModelUrl(selectedModelId), [selectedModelId]);

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
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  useEffect(() => {
    setModelError('');
  }, [selectedModelId]);

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setAiRecommendation(null);
    setAiError('');
  };


async function convertToJpeg(file: File): Promise<File> {
  if (
    file.type === 'image/jpeg' ||
    file.type === 'image/png' ||
    file.type === 'image/webp'
  ) {
    return file;
  }

  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement('canvas');
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;

  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(bitmap, 0, 0);

  const blob: Blob = await new Promise(resolve =>
    canvas.toBlob(b => resolve(b!), 'image/jpeg', 0.9)
  );

  return new File([blob], 'photo.jpg', { type: 'image/jpeg' });
}


async function uploadToImgbb(file: File): Promise<string> {
  const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
  if (!apiKey) throw new Error('Нет VITE_IMGBB_API_KEY');

  const form = new FormData();
  form.append('image', file);

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: 'POST',
    body: form
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error('ImgBB upload error: ' + err);
  }

  const data = await res.json();
  return data.data.url; // ✅ публичный https URL
}


const handleAiPick = async () => {
  if (!photoFile) {
    setAiError('Загрузите фотографию дверного проёма.');
    return;
  }

  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  if (!apiKey) {
    setAiError('Нет VITE_OPENAI_API_KEY');
    return;
  }

  try {
    setAiLoading(true);
    setAiError('');

    // 1️⃣ грузим фото во внешний сервис
    const safeFile = await convertToJpeg(photoFile);
    const imageUrl = await uploadToImgbb(safeFile);

    const modelContext = doorModels.map(m => `${m.id} — ${m.name}`).join(', ');
    const colorContext = AI_COLOR_PRESETS.map(c => `${c.id} — ${c.name}`).join(', ');

    // 2️⃣ chat/completions
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        temperature: 0.4,
        response_format: { type: 'json_object' },
        messages: [
          {
            role: 'system',
            content:
              'Ты помощник салона дверей. Подбирай модель и цвет двери по фото интерьера. ' +
              'Отвечай строго JSON.'
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text:
                  `Проанализируй фото дверного проёма. ` +
                  `Разрешены модели: ${modelContext}. ` +
                  `Разрешены цвета: ${colorContext}. ` +
                  'Ответь JSON вида {"modelId":"l1","colorId":"northern-oak","explanation":"..."}'
              },
              {
                type: 'image_url',
                image_url: { url: imageUrl }
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`OpenAI ${response.status}: ${err}`);
    }

    const data = await response.json();
    const parsed = JSON.parse(data.choices[0].message.content);

    setAiRecommendation(parsed);
    setSelectedModelId(parsed.modelId);
    setSelectedColorId(parsed.colorId);
    onApply({ modelId: parsed.modelId, colorId: parsed.colorId });
  } catch (e) {
    setAiError(e instanceof Error ? e.message : 'Ошибка AI-подбора');
  } finally {
    setAiLoading(false);
  }
};



  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-start justify-center px-4 py-6 overflow-y-auto"
      role="dialog"
    >
      <div className="w-full max-w-4xl bg-card border border-border rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
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

        <div className="grid flex-1 grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 p-6 overflow-y-auto">
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
                  <img
                    src={photoPreview}
                    alt="Превью фото"
                    className="w-full max-h-64 object-contain bg-muted/30"
                  />
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
              <h3 className="text-sm text-foreground mb-3">Доступные цвета</h3>
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
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {selectedModelId.toUpperCase()}
              </span>
            </div>
            <div className="relative rounded-2xl overflow-hidden border border-border bg-gradient-to-br from-secondary/30 via-secondary/60 to-muted/40 h-[420px]">
              <model-viewer
                src={modelUrl}
                alt="3D модель двери"
                camera-controls
                auto-rotate
                exposure="0.85"
                shadow-intensity="0.6"
                onLoad={() => {
                  setModelError('');
                }}
                onError={() => {
                  setModelError(
                    `Добавьте 3D модель door-${selectedModelId}.glb в папку /public/assets/models, чтобы включить просмотр.`
                  );
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
              onClick={() => onApply({ modelId: selectedModelId, colorId: selectedColorId })}
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
  id: DEFAULT_MODEL_ID,
  url: getModelUrl(DEFAULT_MODEL_ID)
};

export const aiDoorPickerTexturePresets = AI_COLOR_PRESETS.map(color => ({
  id: color.id,
  name: color.name,
  textureUrl: color.textureUrl
}));
