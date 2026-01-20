import { useEffect, useMemo, useState } from 'react';
import { Boxes, ImagePlus, Layers3, Palette, UploadCloud, X } from 'lucide-react';
import { doorModels, colorOptions } from '../data/door-configurator-data';
import { useAdminContent } from './admin/AdminContentProvider';
import type { AdminModelAsset, AdminTextureAsset } from '../data/admin-content';

const readFileAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Не удалось прочитать файл'));
    reader.readAsDataURL(file);
  });

const createId = (prefix: string) =>
  `${prefix}-${crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`}`;

export function SeriesManager() {
  const { entries, updateEntry, addModelAsset, removeModelAsset, addTextureAsset, removeTextureAsset } =
    useAdminContent();
  const [selectedSeries, setSelectedSeries] = useState<string>('all');
  const [selectedModelId, setSelectedModelId] = useState<string>(doorModels[0]?.id ?? '');
  const [modelDraft, setModelDraft] = useState({
    name: '',
    format: 'glb',
    notes: '',
    file: null as File | null
  });
  const [textureDraft, setTextureDraft] = useState({
    name: '',
    mapType: '',
    colorCode: '',
    linkedColorId: '',
    file: null as File | null
  });
  const [coverUploadError, setCoverUploadError] = useState('');

  const entry = entries[selectedModelId];
  const seriesOptions = useMemo(() => {
    const series = new Set(doorModels.map(model => model.series));
    return ['all', ...Array.from(series)];
  }, []);
  const filteredModels = useMemo(() => {
    if (selectedSeries === 'all') return doorModels;
    return doorModels.filter(model => model.series === selectedSeries);
  }, [selectedSeries]);

  useEffect(() => {
    if (!filteredModels.find(model => model.id === selectedModelId)) {
      setSelectedModelId(filteredModels[0]?.id ?? '');
    }
  }, [filteredModels, selectedModelId]);

  const handleHighlightsChange = (value: string) => {
    const highlights = value
      .split('\n')
      .map(item => item.trim())
      .filter(Boolean);
    updateEntry(selectedModelId, { highlights });
  };

  const handleCoverUpload = async (file: File | null) => {
    if (!file) return;
    setCoverUploadError('');
    try {
      const dataUrl = await readFileAsDataUrl(file);
      updateEntry(selectedModelId, { coverImage: dataUrl });
    } catch {
      setCoverUploadError('Не удалось загрузить обложку. Попробуйте другой файл.');
    }
  };

  const handleAddModelAsset = async () => {
    if (!modelDraft.file) return;
    const file = modelDraft.file;
    const dataUrl = await readFileAsDataUrl(file);
    const asset: AdminModelAsset = {
      id: createId('model'),
      name: modelDraft.name || file.name,
      format: modelDraft.format || 'glb',
      notes: modelDraft.notes,
      fileName: file.name,
      fileUrl: dataUrl,
      fileSize: file.size,
      uploadedAt: new Date().toISOString()
    };
    addModelAsset(selectedModelId, asset);
    setModelDraft({ name: '', format: 'glb', notes: '', file: null });
  };

  const handleAddTextureAsset = async () => {
    if (!textureDraft.file) return;
    const file = textureDraft.file;
    const dataUrl = await readFileAsDataUrl(file);
    const asset: AdminTextureAsset = {
      id: createId('texture'),
      name: textureDraft.name || file.name,
      mapType: textureDraft.mapType,
      colorCode: textureDraft.colorCode,
      linkedColorId: textureDraft.linkedColorId || undefined,
      fileName: file.name,
      fileUrl: dataUrl,
      fileSize: file.size,
      uploadedAt: new Date().toISOString()
    };
    addTextureAsset(selectedModelId, asset);
    setTextureDraft({ name: '', mapType: '', colorCode: '', linkedColorId: '', file: null });
  };

  return (
    <div className="min-h-screen bg-background py-8 sm:py-10 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <h1 className="text-foreground mb-2">Управление каталогом и 3D-контентом</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Наполните карточки каталога, загрузите 3D модели и текстуры, которые будут доступны в каталоге и
            конфигураторе.
          </p>
        </div>

        <section className="bg-card border border-border rounded-3xl p-5 sm:p-6 shadow-lg space-y-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-foreground text-lg">Выбор модели</h2>
              <p className="text-muted-foreground text-sm">
                Сначала выберите серию и модель, затем заполните описание и добавьте файлы.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <select
                value={selectedSeries}
                onChange={event => setSelectedSeries(event.target.value)}
                className="rounded-2xl border border-border bg-background px-4 py-2 text-sm text-foreground"
              >
                {seriesOptions.map(series => (
                  <option key={series} value={series}>
                    {series === 'all' ? 'Все серии' : `Серия ${series}`}
                  </option>
                ))}
              </select>
              <select
                value={selectedModelId}
                onChange={event => setSelectedModelId(event.target.value)}
                className="rounded-2xl border border-border bg-background px-4 py-2 text-sm text-foreground"
              >
                {filteredModels.map(model => (
                  <option key={model.id} value={model.id}>
                    {model.name} — {model.series}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <section className="bg-card border border-border rounded-3xl p-5 sm:p-6 shadow-lg space-y-5">
          <div className="flex items-center gap-3">
            <Boxes className="w-5 h-5 text-accent" />
            <h2 className="text-foreground text-lg">Карточка каталога</h2>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                value={entry?.displayName ?? ''}
                onChange={event => updateEntry(selectedModelId, { displayName: event.target.value })}
                placeholder="Название модели в каталоге"
                className="w-full rounded-2xl border border-border bg-background px-4 py-2 text-sm text-foreground"
              />
              <input
                value={entry?.description ?? ''}
                onChange={event => updateEntry(selectedModelId, { description: event.target.value })}
                placeholder="Краткое описание"
                className="w-full rounded-2xl border border-border bg-background px-4 py-2 text-sm text-foreground"
              />
            </div>
            <textarea
              value={(entry?.highlights ?? []).join('\n')}
              onChange={event => handleHighlightsChange(event.target.value)}
              placeholder="Ключевые преимущества (каждая строка = отдельный пункт)"
              rows={4}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground"
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-muted-foreground">Обложка для каталога</label>
              <input
                type="file"
                accept="image/*"
                onChange={event => handleCoverUpload(event.target.files?.[0] ?? null)}
                className="text-sm text-muted-foreground"
              />
              {coverUploadError && <p className="text-xs text-destructive">{coverUploadError}</p>}
            </div>
            {entry?.coverImage ? (
              <div className="rounded-2xl border border-border overflow-hidden bg-secondary/30">
                <img src={entry.coverImage} alt="cover" className="h-40 w-full object-cover" />
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-border h-40 flex items-center justify-center text-sm text-muted-foreground">
                Обложка еще не загружена
              </div>
            )}
          </div>
        </section>

        <section className="bg-card border border-border rounded-3xl p-5 sm:p-6 shadow-lg space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Layers3 className="w-5 h-5 text-accent" />
              <h2 className="text-foreground text-lg">3D модели</h2>
            </div>
            <span className="text-xs text-muted-foreground">
              Загрузите .glb/.fbx или другие поддерживаемые форматы
            </span>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-3 sm:grid-cols-4">
              <input
                value={modelDraft.name}
                onChange={event => setModelDraft(prev => ({ ...prev, name: event.target.value }))}
                placeholder="Название 3D модели"
                className="w-full rounded-2xl border border-border bg-background px-4 py-2 text-sm text-foreground"
              />
              <input
                value={modelDraft.format}
                onChange={event => setModelDraft(prev => ({ ...prev, format: event.target.value }))}
                placeholder="Формат (glb, fbx)"
                className="w-full rounded-2xl border border-border bg-background px-4 py-2 text-sm text-foreground"
              />
              <input
                value={modelDraft.notes}
                onChange={event => setModelDraft(prev => ({ ...prev, notes: event.target.value }))}
                placeholder="Комментарий"
                className="w-full rounded-2xl border border-border bg-background px-4 py-2 text-sm text-foreground"
              />
              <input
                type="file"
                accept=".glb,.fbx,.gltf,.obj"
                onChange={event => setModelDraft(prev => ({ ...prev, file: event.target.files?.[0] ?? null }))}
                className="text-sm text-muted-foreground"
              />
            </div>
            <button
              onClick={handleAddModelAsset}
              disabled={!modelDraft.file}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-accent text-accent-foreground text-sm hover:bg-accent/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <UploadCloud className="w-4 h-4" />
              Прикрепить модель
            </button>
          </div>
          <div className="space-y-3">
            {(entry?.modelAssets ?? []).length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border px-4 py-6 text-center text-sm text-muted-foreground">
                Пока нет загруженных 3D моделей.
              </div>
            ) : (
              entry?.modelAssets.map(asset => (
                <div
                  key={asset.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-2xl border border-border px-4 py-3"
                >
                  <div>
                    <div className="text-sm text-foreground">{asset.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {asset.format.toUpperCase()} · {asset.fileName} · {(asset.fileSize / 1024 / 1024).toFixed(1)} МБ
                    </div>
                  </div>
                  <button
                    onClick={() => removeModelAsset(selectedModelId, asset.id)}
                    className="inline-flex items-center gap-2 text-xs text-destructive hover:text-destructive/80"
                  >
                    <X className="w-4 h-4" />
                    Удалить
                  </button>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="bg-card border border-border rounded-3xl p-5 sm:p-6 shadow-lg space-y-5">
          <div className="flex items-center gap-3">
            <Palette className="w-5 h-5 text-accent" />
            <h2 className="text-foreground text-lg">Текстуры и карты материалов</h2>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-3 sm:grid-cols-5">
              <input
                value={textureDraft.name}
                onChange={event => setTextureDraft(prev => ({ ...prev, name: event.target.value }))}
                placeholder="Название текстуры"
                className="w-full rounded-2xl border border-border bg-background px-4 py-2 text-sm text-foreground"
              />
              <input
                value={textureDraft.mapType}
                onChange={event => setTextureDraft(prev => ({ ...prev, mapType: event.target.value }))}
                placeholder="Тип карты (Albedo, Normal)"
                className="w-full rounded-2xl border border-border bg-background px-4 py-2 text-sm text-foreground"
              />
              <input
                value={textureDraft.colorCode}
                onChange={event => setTextureDraft(prev => ({ ...prev, colorCode: event.target.value }))}
                placeholder="HEX / RAL"
                className="w-full rounded-2xl border border-border bg-background px-4 py-2 text-sm text-foreground"
              />
              <select
                value={textureDraft.linkedColorId}
                onChange={event => setTextureDraft(prev => ({ ...prev, linkedColorId: event.target.value }))}
                className="w-full rounded-2xl border border-border bg-background px-4 py-2 text-sm text-foreground"
              >
                <option value="">Связать с цветом (опционально)</option>
                {colorOptions.map(color => (
                  <option key={color.id} value={color.id}>
                    {color.name}
                  </option>
                ))}
              </select>
              <input
                type="file"
                accept="image/*"
                onChange={event => setTextureDraft(prev => ({ ...prev, file: event.target.files?.[0] ?? null }))}
                className="text-sm text-muted-foreground"
              />
            </div>
            <button
              onClick={handleAddTextureAsset}
              disabled={!textureDraft.file}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-accent text-accent-foreground text-sm hover:bg-accent/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ImagePlus className="w-4 h-4" />
              Добавить текстуру
            </button>
          </div>

          <div className="grid gap-3">
            {(entry?.textures ?? []).length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border px-4 py-6 text-center text-sm text-muted-foreground">
                Текстуры не добавлены. Они появятся в конфигураторе после загрузки.
              </div>
            ) : (
              entry?.textures.map(asset => (
                <div
                  key={asset.id}
                  className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 rounded-2xl border border-border px-4 py-3"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden border border-border bg-secondary/40">
                      <img src={asset.fileUrl} alt={asset.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="text-sm text-foreground">{asset.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {asset.mapType || 'Без типа'} · {asset.colorCode || 'Без кода'} · {asset.fileName}
                      </div>
                      {asset.linkedColorId && (
                        <div className="text-xs text-muted-foreground">
                          Связано с цветом: {colorOptions.find(color => color.id === asset.linkedColorId)?.name}
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => removeTextureAsset(selectedModelId, asset.id)}
                    className="inline-flex items-center gap-2 text-xs text-destructive hover:text-destructive/80"
                  >
                    <X className="w-4 h-4" />
                    Удалить
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
