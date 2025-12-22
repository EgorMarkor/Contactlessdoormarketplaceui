import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Filter, X, ChevronDown } from 'lucide-react';
import { doorModels, colorOptions } from '../data/doors';
import type { DoorModel } from '../App';

interface CatalogProps {
  onNavigate: (page: string, door?: DoorModel) => void;
}

interface Filters {
  colors: string[];
  priceRange: [number, number];
  manufacturers: string[];
  series: string[];
  materials: string[];
  hasGlass: boolean | null;
  textures: string[];
}

export function Catalog({ onNavigate }: CatalogProps) {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    colors: [],
    priceRange: [0, 50000],
    manufacturers: [],
    series: [],
    materials: [],
    hasGlass: null,
    textures: [],
  });

  const manufacturers = [...new Set(doorModels.map(d => d.manufacturer))];
  const series = [...new Set(doorModels.map(d => d.series))];
  const materials = [...new Set(doorModels.map(d => d.material))];
  const textures = [...new Set(doorModels.map(d => d.texture))];

  const filteredDoors = useMemo(() => {
    return doorModels.filter(door => {
      if (filters.colors.length > 0 && !door.colors.some(c => filters.colors.includes(c))) {
        return false;
      }
      if (door.basePrice < filters.priceRange[0] || door.basePrice > filters.priceRange[1]) {
        return false;
      }
      if (filters.manufacturers.length > 0 && !filters.manufacturers.includes(door.manufacturer)) {
        return false;
      }
      if (filters.series.length > 0 && !filters.series.includes(door.series)) {
        return false;
      }
      if (filters.materials.length > 0 && !filters.materials.includes(door.material)) {
        return false;
      }
      if (filters.hasGlass !== null && door.hasGlass !== filters.hasGlass) {
        return false;
      }
      if (filters.textures.length > 0 && !filters.textures.includes(door.texture)) {
        return false;
      }
      return true;
    });
  }, [filters]);

  const toggleFilter = (category: keyof Filters, value: any) => {
    setFilters(prev => {
      const current = prev[category];
      if (Array.isArray(current)) {
        return {
          ...prev,
          [category]: current.includes(value)
            ? current.filter(v => v !== value)
            : [...current, value],
        };
      }
      return prev;
    });
  };

  const clearFilters = () => {
    setFilters({
      colors: [],
      priceRange: [0, 50000],
      manufacturers: [],
      series: [],
      materials: [],
      hasGlass: null,
      textures: [],
    });
  };

  const activeFiltersCount = 
    filters.colors.length +
    filters.manufacturers.length +
    filters.series.length +
    filters.materials.length +
    filters.textures.length +
    (filters.hasGlass !== null ? 1 : 0);

  const FilterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mb-6">
      <button className="flex items-center justify-between w-full mb-3 text-foreground hover:text-accent transition-colors">
        <span>{title}</span>
        <ChevronDown className="w-4 h-4" />
      </button>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );

  const FiltersPanel = () => (
    <div className="bg-card rounded-3xl p-6 sticky top-24 border border-border shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-foreground">Фильтры</h3>
        {activeFiltersCount > 0 && (
          <button
            onClick={clearFilters}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Очистить ({activeFiltersCount})
          </button>
        )}
      </div>

      {/* Price Range */}
      <FilterSection title="Цена">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={filters.priceRange[0]}
              onChange={(e) => setFilters(prev => ({
                ...prev,
                priceRange: [Number(e.target.value), prev.priceRange[1]],
              }))}
              className="w-full px-3 py-2 border border-border rounded-2xl text-sm focus:outline-none focus:border-accent bg-background"
              placeholder="От"
            />
            <span className="text-muted-foreground">—</span>
            <input
              type="number"
              value={filters.priceRange[1]}
              onChange={(e) => setFilters(prev => ({
                ...prev,
                priceRange: [prev.priceRange[0], Number(e.target.value)],
              }))}
              className="w-full px-3 py-2 border border-border rounded-2xl text-sm focus:outline-none focus:border-accent bg-background"
              placeholder="До"
            />
          </div>
          <input
            type="range"
            min="0"
            max="50000"
            step="1000"
            value={filters.priceRange[1]}
            onChange={(e) => setFilters(prev => ({
              ...prev,
              priceRange: [prev.priceRange[0], Number(e.target.value)],
            }))}
            className="w-full accent-accent"
          />
        </div>
      </FilterSection>

      {/* Colors */}
      <FilterSection title="Цвет плёнки">
        {colorOptions.slice(0, 8).map(color => (
          <label key={color} className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={filters.colors.includes(color)}
              onChange={() => toggleFilter('colors', color)}
              className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
            />
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              {color}
            </span>
          </label>
        ))}
      </FilterSection>

      {/* Manufacturers */}
      <FilterSection title="Производитель">
        {manufacturers.map(manufacturer => (
          <label key={manufacturer} className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={filters.manufacturers.includes(manufacturer)}
              onChange={() => toggleFilter('manufacturers', manufacturer)}
              className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
            />
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              {manufacturer}
            </span>
          </label>
        ))}
      </FilterSection>

      {/* Series */}
      <FilterSection title="Серия">
        {series.map(s => (
          <label key={s} className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={filters.series.includes(s)}
              onChange={() => toggleFilter('series', s)}
              className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
            />
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              {s}
            </span>
          </label>
        ))}
      </FilterSection>

      {/* Materials */}
      <FilterSection title="Материал">
        {materials.map(material => (
          <label key={material} className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={filters.materials.includes(material)}
              onChange={() => toggleFilter('materials', material)}
              className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
            />
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              {material}
            </span>
          </label>
        ))}
      </FilterSection>

      {/* Glass */}
      <FilterSection title="Стекло">
        <label className="flex items-center gap-2 cursor-pointer group">
          <input
            type="radio"
            checked={filters.hasGlass === true}
            onChange={() => setFilters(prev => ({ ...prev, hasGlass: true }))}
            className="w-4 h-4 border-border text-accent focus:ring-accent"
          />
          <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
            Со стеклом
          </span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer group">
          <input
            type="radio"
            checked={filters.hasGlass === false}
            onChange={() => setFilters(prev => ({ ...prev, hasGlass: false }))}
            className="w-4 h-4 border-border text-accent focus:ring-accent"
          />
          <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
            Без стекла
          </span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer group">
          <input
            type="radio"
            checked={filters.hasGlass === null}
            onChange={() => setFilters(prev => ({ ...prev, hasGlass: null }))}
            className="w-4 h-4 border-border text-accent focus:ring-accent"
          />
          <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
            Любое
          </span>
        </label>
      </FilterSection>

      {/* Texture */}
      <FilterSection title="Текстура">
        {textures.map(texture => (
          <label key={texture} className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={filters.textures.includes(texture)}
              onChange={() => toggleFilter('textures', texture)}
              className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
            />
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              {texture}
            </span>
          </label>
        ))}
      </FilterSection>
    </div>
  );

  return (
    <div className="min-h-screen bg-background py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-foreground mb-2">Каталог дверей</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            {filteredDoors.length} {filteredDoors.length === 1 ? 'модель' : filteredDoors.length < 5 ? 'модели' : 'моделей'} доступно
          </p>
        </div>

        {/* Mobile Filter Button */}
        <button
          onClick={() => setShowMobileFilters(true)}
          className="lg:hidden mb-6 flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-2xl text-foreground shadow-sm hover:shadow-md transition-shadow"
        >
          <Filter className="w-4 h-4" />
          <span className="text-sm">Фильтры</span>
          {activeFiltersCount > 0 && (
            <span className="px-2 py-0.5 bg-accent text-accent-foreground text-xs rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </button>

        <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Desktop Filters */}
          <aside className="hidden lg:block">
            <FiltersPanel />
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {filteredDoors.map((door, index) => (
                <motion.div
                  key={door.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-card rounded-2xl sm:rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all group cursor-pointer border border-border"
                  onClick={() => onNavigate('product', door)}
                >
                  <div className="aspect-[3/4] overflow-hidden bg-secondary">
                    <img
                      src={door.image}
                      alt={door.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 sm:p-5">
                    <div className="text-xs sm:text-sm text-muted-foreground mb-1">{door.series}</div>
                    <h3 className="text-foreground mb-1 text-sm sm:text-base">{door.name}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-3">{door.manufacturer}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3 sm:mb-4 flex-wrap">
                      <span className="px-2 py-1 bg-secondary/50 rounded-xl">{door.material}</span>
                      <span className="px-2 py-1 bg-secondary/50 rounded-xl">{door.texture}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-foreground text-sm sm:text-base">от {door.basePrice.toLocaleString('ru-RU')} ₽</div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate('configurator', door);
                        }}
                        className="text-xs sm:text-sm text-accent hover:text-accent/80 transition-colors whitespace-nowrap"
                      >
                        Настроить →
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredDoors.length === 0 && (
              <div className="text-center py-12 sm:py-20">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="w-7 h-7 sm:w-8 sm:h-8 text-muted-foreground" />
                </div>
                <h3 className="text-foreground mb-2">Ничего не найдено</h3>
                <p className="text-muted-foreground mb-6 text-sm sm:text-base px-4">
                  Попробуйте изменить параметры фильтрации
                </p>
                <button
                  onClick={clearFilters}
                  className="px-5 sm:px-6 py-2 sm:py-2.5 bg-accent text-accent-foreground rounded-2xl hover:bg-accent/90 transition-all shadow-sm text-sm sm:text-base"
                >
                  Сбросить фильтры
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Overlay */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowMobileFilters(false)}
          ></div>
          <div className="absolute inset-y-0 right-0 w-full max-w-sm bg-background overflow-y-auto shadow-2xl">
            <div className="p-4 bg-card border-b border-border flex items-center justify-between sticky top-0 z-10 shadow-sm">
              <h3 className="text-foreground">Фильтры</h3>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-2 hover:bg-secondary rounded-2xl transition-colors"
                aria-label="Закрыть"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <FiltersPanel />
            </div>
            <div className="p-4 bg-card border-t border-border sticky bottom-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-full px-6 py-3 bg-accent text-accent-foreground rounded-2xl hover:bg-accent/90 transition-all shadow-sm text-sm"
              >
                Показать {filteredDoors.length} {filteredDoors.length === 1 ? 'результат' : filteredDoors.length < 5 ? 'результата' : 'результатов'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}