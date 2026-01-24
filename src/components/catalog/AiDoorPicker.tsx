import { useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react';
import { UploadCloud, Sparkles, X, Loader2, CheckCircle2, SlidersHorizontal } from 'lucide-react';
import '@google/model-viewer';
import { doorModels, getColorById } from '../../data/door-configurator-data';
import { getOpenAiApiKey } from '../../utils/openai-config';

interface AiDoorPickerProps {
  onClose: () => void;
  onApply: (selection: { modelId: string; colorId: string }) => void;
}

interface OpeningBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface AiRecommendation {
  modelId: string;
  colorId: string;
  explanation: string;
  openingBox: OpeningBox;
}

interface CatalogModelProfile {
  id: string;
  modelUrl: string;
  styleTags: string[];
  size: {
    widthMm: number;
    heightMm: number;
  };
}

const FALLBACK_MODEL_URL = '/assets/models/door-l1.glb';

const catalogModelProfiles: CatalogModelProfile[] = doorModels.map(model => ({
  id: model.id,
  modelUrl: FALLBACK_MODEL_URL,
  styleTags: [model.series.toLowerCase(), model.type],
  size: {
    widthMm: model.type === 'hidden' ? 900 : 800,
    heightMm: model.type === 'hidden' ? 2100 : 2000
  }
}));

const catalogModelById = new Map(catalogModelProfiles.map(profile => [profile.id, profile]));

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

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const normalizeOpeningBox = (box: OpeningBox): OpeningBox => {
  const width = clamp(box.width, 0.2, 0.95);
  const height = clamp(box.height, 0.4, 0.98);
  const x = clamp(box.x, 0.01, 0.99 - width);
  const y = clamp(box.y, 0.01, 0.99 - height);
  return { x, y, width, height };
};

const defaultOpeningBox: OpeningBox = {
  x: 0.28,
  y: 0.08,
  width: 0.44,
  height: 0.86
};

function getModelProfile(modelId: string): CatalogModelProfile {
  return catalogModelById.get(modelId) ?? catalogModelProfiles[0];
}

function getModelUrl(modelId: string): string {
  return getModelProfile(modelId).modelUrl || FALLBACK_MODEL_URL;
}

export function AiDoorPicker({ onClose, onApply }: AiDoorPickerProps) {
  const initialModelId = doorModels[0]?.id ?? 'l1';
  const [selectedModelId, setSelectedModelId] = useState(initialModelId);
  const [selectedColorId, setSelectedColorId] = useState(AI_COLOR_PRESETS[0].id);
  const [openingBox, setOpeningBox] = useState<OpeningBox>(defaultOpeningBox);
  const [modelError, setModelError] = useState('');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');
  const [aiRecommendation, setAiRecommendation] = useState<AiRecommendation | null>(null);
  const modelViewerRef = useRef<HTMLElement | null>(null);

  const selectedModel = useMemo(() => {
    return doorModels.find(model => model.id === selectedModelId) ?? doorModels[0];
  }, [selectedModelId]);

  const selectedColor = useMemo(() => {
    const presetColor = AI_COLOR_PRESETS.find(color => color.id === selectedColorId);
    if (presetColor) return presetColor;
    const fallback = getColorById(selectedColorId);
    if (!fallback) return AI_COLOR_PRESETS[0];
    return {
      id: fallback.id,
      name: fallback.name,
      textureUrl: AI_COLOR_PRESETS[0].textureUrl,
      swatch: '#E5E7EB'
    };
  }, [selectedColorId]);

  const selectedModelUrl = useMemo(() => getModelUrl(selectedModelId), [selectedModelId]);

  const modelSizingHint = useMemo(() => {
    const profile = getModelProfile(selectedModelId);
    const openingWidthMm = Math.round(profile.size.widthMm / openingBox.width);
    const openingHeightMm = Math.round(profile.size.heightMm / openingBox.height);
    return {
      modelWidthMm: profile.size.widthMm,
      modelHeightMm: profile.size.heightMm,
      openingWidthMm,
      openingHeightMm
    };
  }, [openingBox.height, openingBox.width, selectedModelId]);

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

  const applySelectedTexture = async () => {
    const viewer = modelViewerRef.current as
      | (HTMLElement & {
          model?: { materials: Array<{ pbrMetallicRoughness: { setBaseColorTexture: (tex: unknown) => void } }> };
          createTexture?: (url: string) => Promise<unknown>;
        })
      | null;
    if (!viewer?.model || !viewer.createTexture) return;
    const texture = await viewer.createTexture(selectedColor.textureUrl);
    viewer.model.materials.forEach(material => {
      material.pbrMetallicRoughness.setBaseColorTexture(texture);
    });
  };

  useEffect(() => {
    const viewer = modelViewerRef.current;
    if (!viewer) return;
    const handleLoad = () => {
      setModelError('');
      void applySelectedTexture();
    };
    viewer.addEventListener('load', handleLoad);
    return () => viewer.removeEventListener('load', handleLoad);
  }, [selectedColor.textureUrl, selectedModelUrl]);

  useEffect(() => {
    void applySelectedTexture();
  }, [selectedColor.textureUrl, selectedModelUrl]);

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setAiRecommendation(null);
    setAiError('');
  };

  const applyOpeningBox = (nextBox: OpeningBox) => {
    setOpeningBox(normalizeOpeningBox(nextBox));
  };

  const handleAiPick = async () => {
    if (!photoFile) {
      setAiError('Загрузите фотографию дверного проёма, чтобы получить подбор.');
      return;
    }

    const apiKey = await getOpenAiApiKey();
    if (!apiKey) {
      setAiError('Укажите ключ в public/openai-config.json (apiKey) или в VITE_OPENAI_API_KEY.');
      return;
    }

    try {
      setAiLoading(true);
      setAiError('');
      const imageDataUrl = await fileToDataUrl(photoFile);
      const modelsContext = catalogModelProfiles
        .slice(0, 40)
        .map(profile => {
          const model = doorModels.find(item => item.id === profile.id);
          const label = model ? `${model.name} (${model.series})` : profile.id;
          const style = profile.styleTags.join(', ');
          return `${profile.id} — ${label}; style: ${style}; size: ${profile.size.widthMm}x${profile.size.heightMm}mm`;
        })
        .join('\n');
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
          response_format: { type: 'json_object' },
          messages: [
            {
              role: 'system',
              content:
                'Ты дизайнер интерьеров и замерщик дверей. Отвечай строго JSON без markdown. Подбирай модель двери из каталога и нормализованный прямоугольник дверного проёма на фото.'
            },
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text:
                    `Каталог моделей:\n${modelsContext}\n\nДоступные цвета: ${colorContext}.\n\nНужно: 1) определить дверной проём на фото и вернуть openingBox в нормализованных координатах (x, y, width, height, значения 0..1); 2) подобрать modelId из каталога; 3) подобрать colorId из доступных; 4) дать короткое объяснение. Если не уверен в размерах — выбери наиболее вероятный прямоугольник проёма.`
                },
                {
                  type: 'image_url',
                  image_url: {
                    url: imageDataUrl,
                    detail: 'high'
                  }
                }
              ]
            }
          ]
        })
      });

      if (!response.ok) {
        const errorPayload = await response.text();
        throw new Error(errorPayload || 'Ошибка при обращении к AI.');
      }

      const data = (await response.json()) as {
        choices?: Array<{ message?: { content?: string } }>;
      };
      const messageContent = data.choices?.[0]?.message?.content;
      if (!messageContent) throw new Error('AI не вернул ответ.');

      const parsed = JSON.parse(messageContent) as Partial<AiRecommendation> & {
        openingBox?: Partial<OpeningBox>;
      };

      const recommendedModelId = parsed.modelId && catalogModelById.has(parsed.modelId) ? parsed.modelId : selectedModelId;
      const recommendedColorId = AI_COLOR_PRESETS.some(color => color.id === parsed.colorId)
        ? parsed.colorId!
        : selectedColorId;
      const recommendedBox = normalizeOpeningBox({
        x: parsed.openingBox?.x ?? openingBox.x,
        y: parsed.openingBox?.y ?? openingBox.y,
        width: parsed.openingBox?.width ?? openingBox.width,
        height: parsed.openingBox?.height ?? openingBox.height
      });

      const recommendation: AiRecommendation = {
        modelId: recommendedModelId,
        colorId: recommendedColorId,
        explanation: parsed.explanation?.trim() || 'ИИ подобрал модель и аккуратно вписал её в проём.',
        openingBox: recommendedBox
      };

      setSelectedModelId(recommendation.modelId);
      setSelectedColorId(recommendation.colorId);
      applyOpeningBox(recommendation.openingBox);
      setAiRecommendation(recommendation);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Не удалось получить рекомендации.';
      setAiError(message);
    } finally {
      setAiLoading(false);
    }
  };

  const openingBoxStyles = {
    left: `${openingBox.x * 100}%`,
    top: `${openingBox.y * 100}%`,
    width: `${openingBox.width * 100}%`,
    height: `${openingBox.height * 100}%`
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm">
      <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6">
        <div className="relative w-full max-w-6xl max-h-[94vh] overflow-hidden rounded-3xl border border-white/10 bg-background shadow-2xl">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 rounded-full border border-border/60 bg-background/80 p-2 text-foreground hover:border-accent/60"
            aria-label="Закрыть AI-подбор"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-0">
            <div className="relative flex flex-col gap-4 border-b border-border/60 p-5 sm:p-6 lg:border-b-0 lg:border-r">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs text-accent">
                    <Sparkles className="h-3.5 w-3.5" />
                    AI-подбор двери
                  </div>
                  <h2 className="mt-3 text-lg text-foreground">Вписывание двери в дверной проём</h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    Загрузите фото, и нейросеть подберёт модель из каталога и аккуратно впишет её в проём.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_240px]">
                <div className="relative rounded-2xl overflow-hidden border border-border bg-gradient-to-br from-secondary/30 via-secondary/60 to-muted/40 w-full h-[64vh] min-h-[520px] lg:min-h-[640px]">
                  {photoPreview ? (
                    <img src={photoPreview} alt="Фото дверного проёма" className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-muted-foreground px-6">
                      <UploadCloud className="h-10 w-10 text-accent/70" />
                      <div className="text-sm text-foreground">Добавьте фотографию проёма</div>
                      <div className="text-xs max-w-xs">
                        После загрузки AI определит границы проёма и примерит дверь прямо на фото.
                      </div>
                    </div>
                  )}

                  {photoPreview && (
                    <>
                      <div className="pointer-events-none absolute inset-0">
                        <div
                          className="absolute rounded-[24px] border-2 border-white/80 shadow-[0_0_0_9999px_rgba(15,23,42,0.55)] transition-all duration-500"
                          style={openingBoxStyles}
                        />
                      </div>
                      <div className="absolute" style={openingBoxStyles}>
                        <div className="relative h-full w-full rounded-[24px] border border-white/40 bg-black/10 shadow-2xl overflow-hidden">
                          <model-viewer
                            key={`${selectedModelId}-${selectedColorId}`}
                            ref={node => {
                              modelViewerRef.current = node;
                            }}
                            src={selectedModelUrl}
                            alt={`3D модель двери ${selectedModel?.name ?? selectedModelId}`}
                            camera-controls
                            auto-rotate
                            exposure="0.9"
                            shadow-intensity="0.6"
                            onError={() => {
                              setModelError('Добавьте 3D модели в public/assets/models, чтобы AI мог примерять двери.');
                            }}
                            className="h-full w-full bg-transparent"
                          />
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/30" />
                          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl border border-white/20 bg-black/45 px-3 py-2 text-[11px] text-white/90 backdrop-blur">
                            <div className="truncate">
                              {selectedModel?.name ?? selectedModelId.toUpperCase()} · {selectedColor.name}
                            </div>
                            <div className="ml-2 rounded-full border border-white/30 px-2 py-0.5 text-[10px] uppercase tracking-wide">
                              AI FIT
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="space-y-3 rounded-2xl border border-border bg-card/70 p-4">
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">Текущая модель</div>
                  <div className="text-sm text-foreground">{selectedModel?.name ?? selectedModelId}</div>
                  <div className="text-xs text-muted-foreground">
                    Проём ≈ {modelSizingHint.openingWidthMm}×{modelSizingHint.openingHeightMm} мм · дверь {modelSizingHint.modelWidthMm}×{modelSizingHint.modelHeightMm} мм
                  </div>
                  {modelError && (
                    <div className="rounded-xl border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                      {modelError}
                    </div>
                  )}
                  <button
                    onClick={() => onApply({ modelId: selectedModelId, colorId: selectedColorId })}
                    className="mt-2 w-full rounded-xl border border-border px-4 py-3 text-sm text-foreground transition-colors hover:border-accent/60"
                  >
                    Применить в конфигураторе
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-5 p-5 sm:p-6">
              <div className="rounded-2xl border border-dashed border-border p-5 bg-background/40">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                    <UploadCloud className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-foreground text-sm">Загрузите фото дверного проёма</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Чем ровнее фото, тем точнее нейросеть определит границы проёма.
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
                      className="w-full max-h-64 object-cover bg-muted/30"
                    />
                  </div>
                )}
              </div>

              <div className="rounded-2xl border border-border p-5 bg-card/70">
                <div className="flex items-center gap-2 text-sm text-foreground mb-4">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <span>AI вписывание в проём</span>
                </div>
                <button
                  onClick={handleAiPick}
                  disabled={aiLoading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-accent text-accent-foreground text-sm hover:bg-accent/90 transition-colors disabled:opacity-60"
                >
                  {aiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  {aiLoading ? 'AI анализирует фото...' : 'Подобрать и вписать дверь'}
                </button>
                <p className="text-[11px] text-muted-foreground mt-3">
                  Ключ OpenAI можно указать в <code className="font-mono">public/openai-config.json</code>, и он будет работать в build-версии.
                </p>
                {aiError && <p className="text-xs text-destructive mt-3">{aiError}</p>}
                {aiRecommendation && (
                  <div className="mt-4 rounded-xl border border-border bg-background/60 px-4 py-3">
                    <div className="flex items-center gap-2 text-sm text-foreground">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      Рекомендовано: {aiRecommendation.modelId.toUpperCase()} · {aiRecommendation.colorId}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">{aiRecommendation.explanation}</p>
                  </div>
                )}
              </div>

              <div className="rounded-2xl border border-border p-5 bg-background/40">
                <div className="flex items-center gap-2 text-sm text-foreground mb-4">
                  <SlidersHorizontal className="h-4 w-4 text-accent" />
                  Точная подгонка проёма
                </div>
                <div className="space-y-3">
                  {([
                    { key: 'x', label: 'Смещение X', min: 0.02, max: 0.78, step: 0.01 },
                    { key: 'y', label: 'Смещение Y', min: 0.02, max: 0.4, step: 0.01 },
                    { key: 'width', label: 'Ширина проёма', min: 0.28, max: 0.9, step: 0.01 },
                    { key: 'height', label: 'Высота проёма', min: 0.6, max: 0.98, step: 0.01 }
                  ] as const).map(control => (
                    <label key={control.key} className="block">
                      <div className="mb-1 flex items-center justify-between text-[11px] text-muted-foreground">
                        <span>{control.label}</span>
                        <span className="font-mono text-foreground/80">{openingBox[control.key].toFixed(2)}</span>
                      </div>
                      <input
                        type="range"
                        min={control.min}
                        max={control.max}
                        step={control.step}
                        value={openingBox[control.key]}
                        onChange={event => {
                          const nextValue = Number(event.target.value);
                          applyOpeningBox({ ...openingBox, [control.key]: nextValue });
                        }}
                        className="w-full accent-accent"
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-border p-5 bg-background/40">
                <h3 className="text-sm text-foreground mb-3">Доступные цвета для примера</h3>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export const aiDoorPickerModel = {
  id: doorModels[0]?.id ?? 'l1',
  url: FALLBACK_MODEL_URL
};

export const aiDoorPickerTexturePresets = AI_COLOR_PRESETS.map(color => ({
  id: color.id,
  name: color.name,
  textureUrl: color.textureUrl
}));
