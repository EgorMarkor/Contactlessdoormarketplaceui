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
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={door.image}
                  alt={door.name}
                  className="w-full aspect-[3/4] object-cover"
                />
              </div>
              
              <div className="mt-4 grid grid-cols-4 gap-3">
                {[door.image, door.image, door.image, door.image].map((img, i) => (
                  <button
                    key={i}
                    className="aspect-square rounded-lg overflow-hidden bg-neutral-100 border-2 border-transparent hover:border-neutral-300 transition-all"
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
            <div className="mb-4">
              <div className="inline-block px-3 py-1 bg-neutral-100 rounded-full text-sm text-neutral-700 mb-3">
                {door.series}
              </div>
              <h1 className="text-neutral-900 mb-2">{door.name}</h1>
              <p className="text-neutral-600">{door.manufacturer}</p>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm text-neutral-600">4.9 (127 отзывов)</span>
            </div>

            <div className="mb-8">
              <div className="text-sm text-neutral-500 mb-1">Цена от</div>
              <div className="text-neutral-900">{door.basePrice.toLocaleString('ru-RU')} ₽</div>
              <p className="text-sm text-neutral-500 mt-2">
                Итоговая стоимость зависит от выбранных опций
              </p>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-neutral-900 mb-4">Описание</h2>
              <p className="text-neutral-600 leading-relaxed mb-4">
                {door.name} — это сочетание современного дизайна и высокого качества исполнения. 
                Идеально подходит для создания стильного интерьера в вашем доме или квартире.
              </p>
              <p className="text-neutral-600 leading-relaxed">
                Изготовлена из качественного материала {door.material} с {door.texture.toLowerCase()} текстурой, 
                что обеспечивает долговечность и привлекательный внешний вид на долгие годы.
              </p>
            </div>

            {/* Available Colors */}
            <div className="mb-8">
              <h3 className="text-neutral-900 mb-4">Доступные цвета</h3>
              <div className="flex flex-wrap gap-2">
                {door.colors.map(color => (
                  <span
                    key={color}
                    className="px-4 py-2 bg-neutral-100 rounded-lg text-sm text-neutral-700"
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button
                onClick={() => onNavigate('configurator', door)}
                className="flex-1 px-6 py-4 bg-neutral-900 text-white rounded-xl hover:bg-neutral-800 transition-all"
              >
                Настроить эту модель
              </button>
              <button
                onClick={() => onNavigate('stands')}
                className="flex-1 px-6 py-4 bg-white border-2 border-neutral-200 text-neutral-900 rounded-xl hover:border-neutral-300 transition-all"
              >
                Посмотреть образцы
              </button>
            </div>

            {/* Features */}
            <div className="space-y-4 mb-8">
              {features.map((feature, i) => (
                <div key={i} className="flex gap-4 p-4 bg-white rounded-xl">
                  <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-neutral-700" />
                  </div>
                  <div>
                    <h4 className="text-neutral-900 mb-1">{feature.title}</h4>
                    <p className="text-sm text-neutral-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Specifications */}
            <div className="bg-white rounded-2xl p-6">
              <h3 className="text-neutral-900 mb-4">Характеристики</h3>
              <div className="space-y-3">
                {specifications.map((spec, i) => (
                  <div key={i} className="flex justify-between py-3 border-b border-neutral-100 last:border-0">
                    <span className="text-neutral-600">{spec.label}</span>
                    <span className="text-neutral-900">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="mt-6 bg-green-50 border border-green-200 rounded-2xl p-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-green-900">Бесплатная доставка от 15 000 ₽</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-green-900">Профессиональная установка</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-green-900">Гарантия 5 лет</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-green-900">Возврат в течение 14 дней</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
