import { useState } from 'react';
import { Plus, UploadCloud, Layers3, Palette, Boxes } from 'lucide-react';

interface SeriesEntry {
  id: string;
  name: string;
  description: string;
}

interface ProductEntry {
  id: string;
  name: string;
  series: string;
  basePrice: string;
}

interface ModelEntry {
  id: string;
  product: string;
  format: string;
  notes: string;
}

interface TextureEntry {
  id: string;
  name: string;
  mapType: string;
  colorCode: string;
}

export function SeriesManager() {
  const [series, setSeries] = useState<SeriesEntry[]>([
    { id: 'series-1', name: 'L', description: 'Стандартные полотна' }
  ]);
  const [products, setProducts] = useState<ProductEntry[]>([
    { id: 'product-1', name: 'L8', series: 'L', basePrice: '22000' }
  ]);
  const [models, setModels] = useState<ModelEntry[]>([
    { id: 'model-1', product: 'L8', format: 'glb', notes: 'LOD 0' }
  ]);
  const [textures, setTextures] = useState<TextureEntry[]>([
    { id: 'texture-1', name: 'Беленый дуб', mapType: 'Albedo', colorCode: '#D9C7A2' }
  ]);

  const addSeries = () => {
    setSeries(prev => [
      ...prev,
      { id: `series-${prev.length + 1}`, name: '', description: '' }
    ]);
  };

  const addProduct = () => {
    setProducts(prev => [
      ...prev,
      { id: `product-${prev.length + 1}`, name: '', series: '', basePrice: '' }
    ]);
  };

  const addModel = () => {
    setModels(prev => [
      ...prev,
      { id: `model-${prev.length + 1}`, product: '', format: '', notes: '' }
    ]);
  };

  const addTexture = () => {
    setTextures(prev => [
      ...prev,
      { id: `texture-${prev.length + 1}`, name: '', mapType: '', colorCode: '' }
    ]);
  };

  return (
    <div className="min-h-screen bg-background py-8 sm:py-10 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <h1 className="text-foreground mb-2">Управление сериями и 3D-контентом</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Добавляйте серии, товары, 3D-модели и текстуры для отображения в конфигураторе.
          </p>
        </div>

        <section className="bg-card border border-border rounded-3xl p-5 sm:p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Layers3 className="w-5 h-5 text-accent" />
              <h2 className="text-foreground text-lg">Серии</h2>
            </div>
            <button
              onClick={addSeries}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-accent text-accent-foreground text-sm hover:bg-accent/90 transition-all"
            >
              <Plus className="w-4 h-4" />
              Добавить серию
            </button>
          </div>
          <div className="grid gap-4">
            {series.map(item => (
              <div key={item.id} className="grid gap-3 sm:grid-cols-3">
                <input
                  value={item.name}
                  onChange={(event) =>
                    setSeries(prev =>
                      prev.map(entry =>
                        entry.id === item.id ? { ...entry, name: event.target.value } : entry
                      )
                    )
                  }
                  placeholder="Название серии"
                  className="w-full rounded-2xl border border-border bg-background px-4 py-2 text-sm text-foreground"
                />
                <input
                  value={item.description}
                  onChange={(event) =>
                    setSeries(prev =>
                      prev.map(entry =>
                        entry.id === item.id ? { ...entry, description: event.target.value } : entry
                      )
                    )
                  }
                  placeholder="Описание"
                  className="w-full rounded-2xl border border-border bg-background px-4 py-2 text-sm text-foreground sm:col-span-2"
                />
              </div>
            ))}
          </div>
        </section>

        <section className="bg-card border border-border rounded-3xl p-5 sm:p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Boxes className="w-5 h-5 text-accent" />
              <h2 className="text-foreground text-lg">Товары</h2>
            </div>
            <button
              onClick={addProduct}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-accent text-accent-foreground text-sm hover:bg-accent/90 transition-all"
            >
              <Plus className="w-4 h-4" />
              Добавить товар
            </button>
          </div>
          <div className="grid gap-4">
            {products.map(item => (
              <div key={item.id} className="grid gap-3 sm:grid-cols-3">
                <input
                  value={item.name}
                  onChange={(event) =>
                    setProducts(prev =>
                      prev.map(entry =>
                        entry.id === item.id ? { ...entry, name: event.target.value } : entry
                      )
                    )
                  }
                  placeholder="Название товара"
                  className="w-full rounded-2xl border border-border bg-background px-4 py-2 text-sm text-foreground"
                />
                <input
                  value={item.series}
                  onChange={(event) =>
                    setProducts(prev =>
                      prev.map(entry =>
                        entry.id === item.id ? { ...entry, series: event.target.value } : entry
                      )
                    )
                  }
                  placeholder="Серия"
                  className="w-full rounded-2xl border border-border bg-background px-4 py-2 text-sm text-foreground"
                />
                <input
                  value={item.basePrice}
                  onChange={(event) =>
                    setProducts(prev =>
                      prev.map(entry =>
                        entry.id === item.id ? { ...entry, basePrice: event.target.value } : entry
                      )
                    )
                  }
                  placeholder="Базовая цена"
                  className="w-full rounded-2xl border border-border bg-background px-4 py-2 text-sm text-foreground"
                />
              </div>
            ))}
          </div>
        </section>

        <section className="bg-card border border-border rounded-3xl p-5 sm:p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <UploadCloud className="w-5 h-5 text-accent" />
              <h2 className="text-foreground text-lg">3D модели</h2>
            </div>
            <button
              onClick={addModel}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-accent text-accent-foreground text-sm hover:bg-accent/90 transition-all"
            >
              <Plus className="w-4 h-4" />
              Прикрепить модель
            </button>
          </div>
          <div className="grid gap-4">
            {models.map(item => (
              <div key={item.id} className="grid gap-3 sm:grid-cols-3">
                <input
                  value={item.product}
                  onChange={(event) =>
                    setModels(prev =>
                      prev.map(entry =>
                        entry.id === item.id ? { ...entry, product: event.target.value } : entry
                      )
                    )
                  }
                  placeholder="Товар"
                  className="w-full rounded-2xl border border-border bg-background px-4 py-2 text-sm text-foreground"
                />
                <input
                  value={item.format}
                  onChange={(event) =>
                    setModels(prev =>
                      prev.map(entry =>
                        entry.id === item.id ? { ...entry, format: event.target.value } : entry
                      )
                    )
                  }
                  placeholder="Формат (glb, fbx)"
                  className="w-full rounded-2xl border border-border bg-background px-4 py-2 text-sm text-foreground"
                />
                <input
                  value={item.notes}
                  onChange={(event) =>
                    setModels(prev =>
                      prev.map(entry =>
                        entry.id === item.id ? { ...entry, notes: event.target.value } : entry
                      )
                    )
                  }
                  placeholder="Комментарий"
                  className="w-full rounded-2xl border border-border bg-background px-4 py-2 text-sm text-foreground"
                />
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-2xl border border-dashed border-border px-4 py-6 text-center text-sm text-muted-foreground">
            Перетащите файлы .glb/.fbx сюда или выберите из каталога.
          </div>
        </section>

        <section className="bg-card border border-border rounded-3xl p-5 sm:p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Palette className="w-5 h-5 text-accent" />
              <h2 className="text-foreground text-lg">Текстуры и цвета</h2>
            </div>
            <button
              onClick={addTexture}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-accent text-accent-foreground text-sm hover:bg-accent/90 transition-all"
            >
              <Plus className="w-4 h-4" />
              Добавить текстуру
            </button>
          </div>
          <div className="grid gap-4">
            {textures.map(item => (
              <div key={item.id} className="grid gap-3 sm:grid-cols-4">
                <input
                  value={item.name}
                  onChange={(event) =>
                    setTextures(prev =>
                      prev.map(entry =>
                        entry.id === item.id ? { ...entry, name: event.target.value } : entry
                      )
                    )
                  }
                  placeholder="Название текстуры"
                  className="w-full rounded-2xl border border-border bg-background px-4 py-2 text-sm text-foreground"
                />
                <input
                  value={item.mapType}
                  onChange={(event) =>
                    setTextures(prev =>
                      prev.map(entry =>
                        entry.id === item.id ? { ...entry, mapType: event.target.value } : entry
                      )
                    )
                  }
                  placeholder="Тип карты (Albedo, Normal)"
                  className="w-full rounded-2xl border border-border bg-background px-4 py-2 text-sm text-foreground"
                />
                <input
                  value={item.colorCode}
                  onChange={(event) =>
                    setTextures(prev =>
                      prev.map(entry =>
                        entry.id === item.id ? { ...entry, colorCode: event.target.value } : entry
                      )
                    )
                  }
                  placeholder="HEX или RAL"
                  className="w-full rounded-2xl border border-border bg-background px-4 py-2 text-sm text-foreground"
                />
                <button className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-2xl bg-secondary text-foreground text-sm hover:bg-secondary/80 transition-all">
                  <UploadCloud className="w-4 h-4" />
                  Загрузить карты
                </button>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Текстуры будут применяться к 3D модели при выборе соответствующего цвета в конфигураторе.
          </p>
        </section>
      </div>
    </div>
  );
}
