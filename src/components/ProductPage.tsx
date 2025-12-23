import { motion } from 'motion/react';
import { CheckCircle2, Ruler, Shield, Truck, Star } from 'lucide-react';
import type { DoorModel } from '../App';

interface ProductPageProps {
  door: DoorModel;
  onNavigate: (page: string, door?: DoorModel) => void;
}

export function ProductPage({ door, onNavigate }: ProductPageProps) {
  const specifications = [
    { label: 'Серия', value: door.series },
    { label: 'Производитель', value: door.manufacturer },
    { label: 'Материал', value: door.material },
    { label: 'Текстура', value: door.texture },
    { label: 'Высота', value: '2000 мм' },
    { label: 'Ширина', value: '800 мм' },
    { label: 'Толщина', value: '40 мм' },
    { label: 'Наличие стекла', value: door.hasGlass ? 'Доступно' : 'Не предусмотрено' },
  ];

  const features = [
    {
      icon: Shield,
      title: 'Гарантия качества',
      description: '5 лет гарантии от производителя',
    },
    {
      icon: Truck,
      title: 'Доставка и установка',
      description: 'Профессиональный монтаж в удобное время',
    },
    {
      icon: Ruler,
      title: 'Точные размеры',
      description: 'Изготовление под ваши проёмы',
    },
  ];

  return (
    <div className="min-h-screen bg-background py-6 sm:py-8 lg:py-12 pb-24 lg:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="lg:sticky lg:top-24">
              <div className="bg-card rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-border">
                <img
                  src={door.image}
                  alt={door.name}
                  className="w-full aspect-[3/4] object-cover"
                />
              </div>
              
              <div className="mt-3 sm:mt-4 grid grid-cols-4 gap-2 sm:gap-3">
                {[door.image, door.image, door.image, door.image].map((img, i) => (
                  <button
                    key={i}
                    className="aspect-square rounded-lg sm:rounded-xl overflow-hidden bg-secondary border-2 border-transparent hover:border-accent transition-all"
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4 sm:mb-6">
              <div className="inline-block px-3 py-1 bg-secondary rounded-full text-xs sm:text-sm text-muted-foreground mb-3">
                {door.series}
              </div>
              <h1 className="text-foreground mb-2">{door.name}</h1>
              <p className="text-muted-foreground text-sm sm:text-base">{door.manufacturer}</p>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-accent text-accent" />
                ))}
              </div>
              <span className="text-xs sm:text-sm text-muted-foreground">4.9 (127 отзывов)</span>
            </div>

            <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-secondary/30 rounded-2xl sm:rounded-3xl border border-border">
              <div className="text-xs sm:text-sm text-muted-foreground mb-1">Цена от</div>
              <div className="text-foreground text-xl sm:text-2xl">{door.basePrice.toLocaleString('ru-RU')} ₽</div>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                Итоговая стоимость зависит от выбранных опций
              </p>
            </div>

            {/* Description */}
            <div className="mb-6 sm:mb-8">
              <h2 className="text-foreground mb-3 sm:mb-4">Описание</h2>
              <p className="text-muted-foreground leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
                {door.name} — это сочетание современного дизайна и высокого качества исполнения. 
                Идеально подходит для создания стильного интерьера в вашем доме или квартире.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                Изготовлена из качественного материала {door.material} с {door.texture.toLowerCase()} текстурой, 
                что обеспечивает долговечность и привлекательный внешний вид на долгие годы.
              </p>
            </div>

            {/* Available Colors */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-foreground mb-3 sm:mb-4">Доступные цвета</h3>
              <div className="flex flex-wrap gap-2">
                {door.colors.map(color => (
                  <span
                    key={color}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 bg-secondary rounded-xl text-xs sm:text-sm text-foreground border border-border"
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex flex-col sm:flex-row gap-3 mb-8">
              <button
                onClick={() => onNavigate('configurator', door)}
                className="flex-1 px-6 py-4 bg-accent text-accent-foreground rounded-2xl hover:bg-accent/90 transition-all shadow-lg"
              >
                Настроить эту модель
              </button>
              <button
                onClick={() => onNavigate('stands')}
                className="flex-1 px-6 py-4 bg-card border-2 border-border text-foreground rounded-2xl hover:border-accent/30 transition-all"
              >
                Посмотреть образцы
              </button>
            </div>

            {/* Features */}
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              {features.map((feature, i) => (
                <div key={i} className="flex gap-3 sm:gap-4 p-3 sm:p-4 bg-card rounded-2xl border border-border">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-foreground mb-1 text-sm sm:text-base">{feature.title}</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Specifications */}
            <div className="bg-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-border">
              <h3 className="text-foreground mb-3 sm:mb-4">Характеристики</h3>
              <div className="space-y-2 sm:space-y-3">
                {specifications.map((spec, i) => (
                  <div key={i} className="flex justify-between py-2 sm:py-3 border-b border-border last:border-0">
                    <span className="text-muted-foreground text-xs sm:text-sm">{spec.label}</span>
                    <span className="text-foreground text-xs sm:text-sm">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="mt-4 sm:mt-6 bg-accent/10 border border-accent/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6">
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2 sm:gap-3">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />
                  <span className="text-foreground text-xs sm:text-sm">Бесплатная доставка от 15 000 ₽</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />
                  <span className="text-foreground text-xs sm:text-sm">Профессиональная установка</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />
                  <span className="text-foreground text-xs sm:text-sm">Гарантия 5 лет</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />
                  <span className="text-foreground text-xs sm:text-sm">Возврат в течение 14 дней</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-2xl z-40">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-xs text-muted-foreground">Цена от</div>
              <div className="text-foreground text-lg">{door.basePrice.toLocaleString('ru-RU')} ₽</div>
            </div>
            <button
              onClick={() => onNavigate('stands')}
              className="px-3 py-2 bg-secondary border border-border text-foreground rounded-xl hover:bg-secondary/80 transition-all text-xs"
            >
              Образцы
            </button>
          </div>
          <button
            onClick={() => onNavigate('configurator', door)}
            className="w-full px-4 py-3 bg-accent text-accent-foreground rounded-2xl hover:bg-accent/90 transition-all shadow-lg text-sm font-medium"
          >
            Настроить эту модель
          </button>
        </div>
      </div>
    </div>
  );
}