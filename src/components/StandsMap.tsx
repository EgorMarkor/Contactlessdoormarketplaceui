import { motion } from 'motion/react';
import { MapPin, Phone, Clock, Navigation, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

interface StandsMapProps {
  onNavigate: (page: string) => void;
}

interface Stand {
  id: string;
  city: string;
  location: string;
  address: string;
  phone: string;
  hours: string;
  availableColors: string[];
  availableEdges: string[];
  availableHandles: string[];
}

export function StandsMap({ onNavigate }: StandsMapProps) {
  const [selectedCity, setSelectedCity] = useState<string>('Москва');

  const stands: Stand[] = [
    {
      id: '1',
      city: 'Москва',
      location: 'ТЦ Авиапарк',
      address: 'Ходынский бульвар, 4',
      phone: '+7 (495) 123-45-67',
      hours: 'Пн-Вс: 10:00 - 22:00',
      availableColors: ['Дуб натуральный', 'Дуб беленый', 'Орех', 'Венге', 'Белый', 'Серый'],
      availableEdges: ['Стандартная', 'Алюминий', 'ПВХ цветная'],
      availableHandles: ['Хром матовый', 'Хром глянцевый', 'Черный мат', 'Золото'],
    },
    {
      id: '2',
      city: 'Москва',
      location: 'ТЦ Мега Белая Дача',
      address: 'Котляково, 14-й км МКАД',
      phone: '+7 (495) 234-56-78',
      hours: 'Пн-Вс: 10:00 - 22:00',
      availableColors: ['Дуб натуральный', 'Орех', 'Венге', 'Белый', 'Графит'],
      availableEdges: ['Стандартная', 'Алюминий', 'Деревянная'],
      availableHandles: ['Хром матовый', 'Черный мат', 'Медь'],
    },
    {
      id: '3',
      city: 'Санкт-Петербург',
      location: 'ТЦ Галерея',
      address: 'Лиговский проспект, 30А',
      phone: '+7 (812) 345-67-89',
      hours: 'Пн-Вс: 10:00 - 22:00',
      availableColors: ['Дуб натуральный', 'Дуб беленый', 'Орех', 'Белый', 'Серый', 'Черный'],
      availableEdges: ['Стандартная', 'Алюминий', 'ПВХ цветная', 'Деревянная'],
      availableHandles: ['Хром матовый', 'Хром глянцевый', 'Черный мат', 'Золото', 'Медь'],
    },
    {
      id: '4',
      city: 'Санкт-Петербург',
      location: 'ТЦ Мега Парнас',
      address: 'Полюстровский проспект, 84Б',
      phone: '+7 (812) 456-78-90',
      hours: 'Пн-Вс: 10:00 - 22:00',
      availableColors: ['Дуб натуральный', 'Орех', 'Венге', 'Белый'],
      availableEdges: ['Стандартная', 'Алюминий'],
      availableHandles: ['Хром матовый', 'Черный мат'],
    },
    {
      id: '5',
      city: 'Казань',
      location: 'ТЦ Мега',
      address: 'Мамадышский тракт, 12',
      phone: '+7 (843) 567-89-01',
      hours: 'Пн-Вс: 10:00 - 22:00',
      availableColors: ['Дуб натуральный', 'Орех', 'Белый', 'Серый'],
      availableEdges: ['Стандартная', 'Алюминий', 'ПВХ цветная'],
      availableHandles: ['Хром матовый', 'Хром глянцевый', 'Черный мат'],
    },
    {
      id: '6',
      city: 'Екатеринбург',
      location: 'ТЦ Мега',
      address: 'Металлургов, 87',
      phone: '+7 (343) 678-90-12',
      hours: 'Пн-Вс: 10:00 - 22:00',
      availableColors: ['Дуб натуральный', 'Дуб беленый', 'Орех', 'Белый', 'Серый'],
      availableEdges: ['Стандартная', 'Алюминий'],
      availableHandles: ['Хром матовый', 'Черный мат', 'Золото'],
    },
  ];

  const cities = [...new Set(stands.map(s => s.city))];
  const filteredStands = stands.filter(s => s.city === selectedCity);

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-neutral-900 mb-2">Стойки с образцами в вашем городе</h1>
          <p className="text-neutral-600">
            Посетите наши стойки, чтобы увидеть и потрогать материалы вживую
          </p>
        </div>

        {/* City Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {cities.map(city => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-6 py-3 rounded-xl transition-all ${
                  selectedCity === city
                    ? 'bg-neutral-900 text-white'
                    : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map Placeholder */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="aspect-square bg-neutral-100 relative">
                <img
                  src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=800&h=800&fit=crop"
                  alt="Карта"
                  className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                    <h3 className="text-neutral-700 mb-2">Интерактивная карта</h3>
                    <p className="text-neutral-500 text-sm max-w-xs">
                      {filteredStands.length} {filteredStands.length === 1 ? 'стойка' : filteredStands.length < 5 ? 'стойки' : 'стоек'} в городе {selectedCity}
                    </p>
                  </div>
                </div>
                
                {/* Map pins */}
                {filteredStands.map((stand, i) => (
                  <motion.div
                    key={stand.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="absolute"
                    style={{
                      left: `${20 + i * 25}%`,
                      top: `${30 + i * 15}%`,
                    }}
                  >
                    <div className="relative">
                      <div className="w-10 h-10 bg-neutral-900 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white px-3 py-1 rounded-lg shadow-lg whitespace-nowrap text-sm">
                        {stand.location}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="p-6 bg-gradient-to-br from-blue-50 to-white border-t border-blue-100">
                <div className="flex items-start gap-3">
                  <Navigation className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-blue-900 mb-1">Как добраться?</h4>
                    <p className="text-sm text-blue-800 leading-relaxed">
                      Выберите стойку из списка, чтобы увидеть точный адрес и получить маршрут
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stands List */}
          <div className="space-y-6">
            {filteredStands.map((stand, index) => (
              <motion.div
                key={stand.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-neutral-900 mb-1">{stand.location}</h3>
                      <p className="text-neutral-600 text-sm">{stand.address}</p>
                    </div>
                    <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-neutral-700" />
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-neutral-600">
                      <Phone className="w-4 h-4" />
                      <a href={`tel:${stand.phone}`} className="hover:text-neutral-900 transition-colors">
                        {stand.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-3 text-neutral-600">
                      <Clock className="w-4 h-4" />
                      <span>{stand.hours}</span>
                    </div>
                  </div>

                  {/* Available Materials */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm text-neutral-500 mb-2">Доступные цвета плёнки:</h4>
                      <div className="flex flex-wrap gap-2">
                        {stand.availableColors.map(color => (
                          <span
                            key={color}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-neutral-100 rounded-full text-xs text-neutral-700"
                          >
                            <CheckCircle2 className="w-3 h-3 text-green-600" />
                            {color}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm text-neutral-500 mb-2">Доступные кромки:</h4>
                      <div className="flex flex-wrap gap-2">
                        {stand.availableEdges.map(edge => (
                          <span
                            key={edge}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-neutral-100 rounded-full text-xs text-neutral-700"
                          >
                            <CheckCircle2 className="w-3 h-3 text-green-600" />
                            {edge}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm text-neutral-500 mb-2">Доступные ручки:</h4>
                      <div className="flex flex-wrap gap-2">
                        {stand.availableHandles.map(handle => (
                          <span
                            key={handle}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-neutral-100 rounded-full text-xs text-neutral-700"
                          >
                            <CheckCircle2 className="w-3 h-3 text-green-600" />
                            {handle}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button className="w-full mt-6 px-6 py-3 bg-neutral-900 text-white rounded-xl hover:bg-neutral-800 transition-all flex items-center justify-center gap-2">
                    <Navigation className="w-4 h-4" />
                    <span>Построить маршрут</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-white rounded-2xl p-8">
          <h2 className="text-neutral-900 mb-6">Как это работает?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="w-12 h-12 bg-neutral-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-neutral-900">1</span>
              </div>
              <h3 className="text-neutral-900 mb-2">Выберите город</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Найдите ближайшую к вам стойку с образцами на карте
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-neutral-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-neutral-900">2</span>
              </div>
              <h3 className="text-neutral-900 mb-2">Посетите стойку</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Приезжайте в удобное время и изучите все доступные материалы
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-neutral-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-neutral-900">3</span>
              </div>
              <h3 className="text-neutral-900 mb-2">Оформите заказ</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Настройте дверь в конфигураторе и закажите онлайн
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
