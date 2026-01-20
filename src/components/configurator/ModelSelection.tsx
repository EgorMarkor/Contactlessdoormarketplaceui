import { Search, Filter } from 'lucide-react';
import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { DoorTypeBadge } from './DoorTypeBadge';
import type { DoorModelConfig } from '../../data/door-configurator-data';
import { doorModels } from '../../data/door-configurator-data';

interface ModelSelectionProps {
  selectedModelId: string | null;
  onSelect: (model: DoorModelConfig) => void;
}

export function ModelSelection({ selectedModelId, onSelect }: ModelSelectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeries, setSelectedSeries] = useState<string>('all');

  // Get unique series
  const allSeries = useMemo(() => {
    const series = new Set(doorModels.map(d => d.series));
    return ['all', ...Array.from(series)];
  }, []);

  // Filter models
  const filteredModels = useMemo(() => {
    return doorModels.filter(model => {
      const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          model.series.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSeries = selectedSeries === 'all' || model.series === selectedSeries;
      return matchesSearch && matchesSeries;
    });
  }, [searchQuery, selectedSeries]);

  // Group by series
  const groupedModels = useMemo(() => {
    const groups: Record<string, DoorModelConfig[]> = {};
    filteredModels.forEach(model => {
      if (!groups[model.series]) {
        groups[model.series] = [];
      }
      groups[model.series].push(model);
    });
    return groups;
  }, [filteredModels]);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Search and Filter */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Поиск модели..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 sm:py-3 border-2 border-border rounded-2xl text-sm sm:text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent bg-background transition-all"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          {allSeries.map(series => (
            <button
              key={series}
              onClick={() => setSelectedSeries(series)}
              className={`px-3 py-1.5 rounded-full text-xs sm:text-sm whitespace-nowrap transition-all ${
                selectedSeries === series
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
              }`}
            >
              {series === 'all' ? 'Все серии' : series}
            </button>
          ))}
        </div>
      </div>

      {/* Models Grid */}
      <div className="space-y-6">
        {Object.entries(groupedModels).map(([series, models]) => (
          <div key={series}>
            <h3 className="text-foreground mb-3 text-sm sm:text-base">Серия {series}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {models.map(model => (
                <motion.button
                  key={model.id}
                  onClick={() => onSelect(model)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${
                    selectedModelId === model.id
                      ? 'border-accent bg-accent/10 shadow-lg'
                      : 'border-border hover:border-accent/50 bg-card'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="text-sm sm:text-base text-foreground mb-1">{model.name}</div>
                      <div className="text-xs text-muted-foreground">{model.series}</div>
                    </div>
                    <DoorTypeBadge type={model.type} />
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">от</div>
                    <div className="text-sm sm:text-base text-accent">{model.basePrice.toLocaleString('ru-RU')} ₽</div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filteredModels.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-sm sm:text-base">
            Модели не найдены. Попробуйте изменить критерии поиска.
          </p>
        </div>
      )}
    </div>
  );
}
