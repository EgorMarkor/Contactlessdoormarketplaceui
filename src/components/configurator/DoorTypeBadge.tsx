import { Sparkles, Lock, Layers } from 'lucide-react';
import type { DoorType } from '../../data/door-configurator-data';

interface DoorTypeBadgeProps {
  type: DoorType;
  className?: string;
}

export function DoorTypeBadge({ type, className = '' }: DoorTypeBadgeProps) {
  if (type === 'standard') return null;

  const badges = {
    designer: {
      label: 'Дизайнерская серия',
      icon: Sparkles,
      className: 'bg-accent/10 text-accent border border-accent/30'
    },
    preset: {
      label: 'Готовый пресет',
      icon: Lock,
      className: 'bg-primary/10 text-primary border border-primary/30'
    },
    hidden: {
      label: 'Скрытый монтаж',
      icon: Layers,
      className: 'bg-muted text-muted-foreground border border-border'
    }
  };

  const badge = badges[type];
  const Icon = badge.icon;

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs ${badge.className} ${className}`}>
      <Icon className="w-3 h-3" />
      <span>{badge.label}</span>
    </div>
  );
}
