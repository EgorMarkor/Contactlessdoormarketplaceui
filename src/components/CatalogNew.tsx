import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Filter, X, Settings2, ShoppingCart } from 'lucide-react';
import { doorModels } from '../data/door-configurator-data';
import { DoorTypeBadge } from './configurator/DoorTypeBadge';
import type { DoorModelConfig } from '../data/door-configurator-data';

interface CatalogNewProps {
  onNavigate: (page: string) => void;
  onConfigureModel: (modelId: string) => void;
}

interface Filters {
  priceRange: [number, number];
  series: string[];
  types: string[];
}

export function CatalogNew({ onNavigate, onConfigureModel }: CatalogNewProps) {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    priceRange: [0, 50000],
    series: [],
    types: [],
  });

  const allSeries = [...new Set(doorModels.map(d => d.series))];
  const allTypes = [
    { id: 'standard', label: 'Стандартные' },
    { id: 'designer', label: 'Дизайнерские' },
    { id: 'preset', label: 'Готовые пресеты' },
    { id: 'hidden', label: 'Скрытый монтаж' }
  ];

  const filteredDoors = useMemo(() => {
    return doorModels.filter(door => {
      if (door.basePrice < filters.priceRange[0] || door.basePrice > filters.priceRange[1]) {
        return false;
      }
      if (filters.series.length > 0 && !filters.series.includes(door.series)) {
        return false;
      }
      if (filters.types.length > 0 && !filters.types.includes(door.type)) {
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
      priceRange: [0, 50000],
      series: [],
      types: [],
    });
  };

  const activeFiltersCount = filters.series.length + filters.types.length;

  const FilterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mb-6">
      <h3 className="text-foreground mb-3 text-sm">{title}</h3>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );

  const FilterCheckbox = ({ 
    label, 
    checked, 
    onChange 
  }: { 
    label: string; 
    checked: boolean; 
    onChange: () => void; 
  }) => (
    <label className="flex items-center gap-2 cursor-pointer text-sm group">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 rounded border-2 border-border text-accent focus:ring-2 focus:ring-accent/20 cursor-pointer"
      />
      <span className="text-muted-foreground group-hover:text-foreground transition-colors">
        {label}
      </span>
    </label>
  );

  const FiltersPanel = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-foreground text-base sm:text-lg">Фильтры</h2>
        {activeFiltersCount > 0 && (
          <button
            onClick={clearFilters}
            className="text-xs text-accent hover:text-accent/80 transition-colors flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            Сбросить ({activeFiltersCount})
          </button>
        )}
      </div>

      {/* Price Range */}
      <FilterSection title="Цена">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <input
              type="number"
              value={filters.priceRange[0]}
              onChange={(e) => setFilters(prev => ({ ...prev, priceRange: [+e.target.value, prev.priceRange[1]] }))}
              className="w-full px-3 py-2 border border-border rounded-xl text-foreground bg-background focus:outline-none focus:border-accent"
              placeholder="От"
            />
            <span className="text-muted-foreground">—</span>
            <input
              type="number"
              value={filters.priceRange[1]}
              onChange={(e) => setFilters(prev => ({ ...prev, priceRange: [prev.priceRange[0], +e.target.value] }))}
              className="w-full px-3 py-2 border border-border rounded-xl text-foreground bg-background focus:outline-none focus:border-accent"
              placeholder="До"
            />
          </div>
        </div>
      </FilterSection>

      {/* Type */}
      <FilterSection title="Тип">
        {allTypes.map(type => (
          <FilterCheckbox
            key={type.id}
            label={type.label}
            checked={filters.types.includes(type.id)}
            onChange={() => toggleFilter('types', type.id)}
          />
        ))}
      </FilterSection>

      {/* Series */}
      <FilterSection title="Серия">
        <div className="max-h-64 overflow-y-auto space-y-2">
          {allSeries.map(series => (
            <FilterCheckbox
              key={series}
              label={series}
              checked={filters.series.includes(series)}
              onChange={() => toggleFilter('series', series)}
            />
          ))}
        </div>
      </FilterSection>
    </div>
  );

  return (
    <div className="min-h-screen bg-background py-6 sm:py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-foreground mb-2">Каталог дверей</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            {filteredDoors.length} {filteredDoors.length === 1 ? 'модель' : 'моделей'} доступно для заказа
          </p>
        </div>

        <div className="flex gap-6 lg:gap-8">
          {/* Desktop Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 bg-card rounded-2xl shadow-lg p-6 border border-border">
              <FiltersPanel />
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setShowMobileFilters(true)}
                className="w-full px-4 py-3 bg-card border border-border rounded-2xl flex items-center justify-center gap-2 text-foreground hover:border-accent/50 transition-all"
              >
                <Filter className="w-4 h-4" />
                <span className="text-sm">
                  Фильтры {activeFiltersCount > 0 && `(${activeFiltersCount})`}
                </span>
              </button>
            </div>

            {/* Products */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredDoors.map((door) => (
                <motion.div
                  key={door.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card rounded-2xl shadow-lg overflow-hidden border border-border hover:shadow-xl transition-all group"
                >
                  {/* Image Placeholder */}
                  <div className="aspect-[3/4] bg-gradient-to-br from-secondary via-secondary/50 to-secondary/30 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-4xl text-muted-foreground/20">{door.name}</div>
                    </div>
                    
                    {/* Badge */}
                    <div className="absolute top-3 right-3">
                      <DoorTypeBadge type={door.type} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="mb-3">
                      <h3 className="text-foreground mb-1 text-base">{door.name}</h3>
                      <p className="text-xs text-muted-foreground">Серия {door.series}</p>
                    </div>

                    <div className="flex items-baseline justify-between mb-4">
                      <div>
                        <div className="text-xs text-muted-foreground">от</div>
                        <div className="text-lg text-accent">{door.basePrice.toLocaleString('ru-RU')} ₽</div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        onNavigate('configurator');
                        // В будущем можно передать ID модели
                      }}
                      className="w-full px-4 py-2.5 bg-accent text-accent-foreground rounded-xl hover:bg-accent/90 transition-all flex items-center justify-center gap-2 text-sm"
                    >
                      <Settings2 className="w-4 h-4" />
                      <span>Настроить</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredDoors.length === 0 && (
              <div className="text-center py-12 bg-card rounded-2xl border border-border">
                <p className="text-muted-foreground mb-4">
                  По заданным фильтрам ничего не найдено
                </p>
                <button
                  onClick={clearFilters}
                  className="text-sm text-accent hover:text-accent/80 transition-colors"
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
        <div className="lg:hidden fixed inset-0 bg-black/50 z-50" onClick={() => setShowMobileFilters(false)}>
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-card shadow-2xl overflow-y-auto"
          >
            <div className="sticky top-0 bg-card border-b border-border px-4 py-4 flex items-center justify-between z-10">
              <h2 className="text-foreground text-lg">Фильтры</h2>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-2 hover:bg-secondary rounded-xl transition-colors"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>
            </div>
            <div className="p-4">
              <FiltersPanel />
            </div>
            <div className="sticky bottom-0 bg-card border-t border-border p-4">
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-full px-4 py-3 bg-accent text-accent-foreground rounded-2xl hover:bg-accent/90 transition-all"
              >
                Применить фильтры
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
