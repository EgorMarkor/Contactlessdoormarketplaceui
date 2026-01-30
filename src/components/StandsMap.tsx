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
  latitude: number;
  longitude: number;
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
      latitude: 55.7909,
      longitude: 37.5312,
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
      latitude: 55.6507,
      longitude: 37.8466,
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
      latitude: 59.9269,
      longitude: 30.3596,
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
      latitude: 60.0582,
      longitude: 30.3277,
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
      latitude: 55.8251,
      longitude: 49.1056,
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
      latitude: 56.8257,
      longitude: 60.5956,
      availableColors: ['Дуб натуральный', 'Дуб беленый', 'Орех', 'Белый', 'Серый'],
      availableEdges: ['Стандартная', 'Алюминий'],
      availableHandles: ['Хром матовый', 'Черный мат', 'Золото'],
    },
  ];

  const cityCenters: Record<string, { latitude: number; longitude: number; zoom: number }> = {
    Москва: { latitude: 55.7558, longitude: 37.6173, zoom: 10 },
    'Санкт-Петербург': { latitude: 59.9311, longitude: 30.3609, zoom: 10 },
    Казань: { latitude: 55.7961, longitude: 49.1064, zoom: 11 },
    Екатеринбург: { latitude: 56.8389, longitude: 60.6057, zoom: 11 },
  };

  const cities = [...new Set(stands.map(s => s.city))];
  const filteredStands = stands.filter(s => s.city === selectedCity);
  const mapCenter = cityCenters[selectedCity] ?? {
    latitude: filteredStands[0]?.latitude ?? 55.7558,
    longitude: filteredStands[0]?.longitude ?? 37.6173,
    zoom: 11,
  };
  const mapPoints = filteredStands
    .map(stand => `${stand.longitude},${stand.latitude},pm2rdl`)
    .join('~');
  const mapUrl = `https://yandex.ru/map-widget/v1/?ll=${mapCenter.longitude},${mapCenter.latitude}&z=${mapCenter.zoom}&pt=${mapPoints}`;

  return (
    <div className="min-h-screen bg-background py-6 sm:py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-foreground mb-2">Стойки с образцами в вашем городе</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Посетите наши стойки, чтобы увидеть и потрогать материалы вживую
          </p>
        </div>

        {/* City Filter */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {cities.map(city => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl transition-all text-sm sm:text-base ${
                  selectedCity === city
                    ? 'bg-accent text-accent-foreground shadow-md'
                    : 'bg-card text-foreground hover:bg-secondary border border-border'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Map */}
          <div className="lg:sticky lg:top-24 h-fit order-last lg:order-first">
            <div className="bg-card rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-border">
              <div className="aspect-square sm:aspect-[4/3] lg:aspect-square bg-secondary relative">
                <iframe
                  title={`Карта стоек: ${selectedCity}`}
                  src={mapUrl}
                  className="w-full h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="absolute top-3 left-3 bg-card/90 backdrop-blur px-3 py-2 rounded-xl border border-border shadow-sm">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-foreground">
                    <MapPin className="w-4 h-4 text-accent" />
                    <span>
                      {filteredStands.length} {filteredStands.length === 1 ? 'стойка' : filteredStands.length < 5 ? 'стойки' : 'стоек'} в городе {selectedCity}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 sm:p-6 bg-accent/5 border-t border-accent/20">
                <div className="flex items-start gap-3">
                  <Navigation className="w-4 h-4 sm:w-5 sm:h-5 text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-accent mb-1 text-sm sm:text-base">Как добраться?</h4>
                    <p className="text-xs sm:text-sm text-foreground leading-relaxed">
                      Выберите стойку из списка, чтобы увидеть точный адрес и получить маршрут
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stands List */}
          <div className="space-y-4 sm:space-y-6">
            {filteredStands.map((stand, index) => (
              <motion.div
                key={stand.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-card rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden border border-border"
              >
                <div className="p-4 sm:p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-foreground mb-1 text-sm sm:text-base">{stand.location}</h3>
                      <p className="text-muted-foreground text-xs sm:text-sm">{stand.address}</p>
                    </div>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                    </div>
                  </div>

                  <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                    <div className="flex items-center gap-2 sm:gap-3 text-muted-foreground text-xs sm:text-sm">
                      <Phone className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <a href={`tel:${stand.phone}`} className="hover:text-accent transition-colors">
                        {stand.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 text-muted-foreground text-xs sm:text-sm">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span>{stand.hours}</span>
                    </div>
                  </div>

                  {/* Available Materials */}
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <h4 className="text-xs sm:text-sm text-muted-foreground mb-2">Доступные цвета плёнки:</h4>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {stand.availableColors.map(color => (
                          <span
                            key={color}
                            className="inline-flex items-center gap-1 px-2 sm:px-3 py-0.5 sm:py-1 bg-secondary rounded-full text-xs text-foreground"
                          >
                            <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-accent flex-shrink-0" />
                            <span className="truncate">{color}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs sm:text-sm text-muted-foreground mb-2">Доступные кромки:</h4>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {stand.availableEdges.map(edge => (
                          <span
                            key={edge}
                            className="inline-flex items-center gap-1 px-2 sm:px-3 py-0.5 sm:py-1 bg-secondary rounded-full text-xs text-foreground"
                          >
                            <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-accent flex-shrink-0" />
                            {edge}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs sm:text-sm text-muted-foreground mb-2">Доступные ручки:</h4>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {stand.availableHandles.map(handle => (
                          <span
                            key={handle}
                            className="inline-flex items-center gap-1 px-2 sm:px-3 py-0.5 sm:py-1 bg-secondary rounded-full text-xs text-foreground"
                          >
                            <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-accent flex-shrink-0" />
                            {handle}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <a
                    href={`https://yandex.ru/maps/?text=${encodeURIComponent(`${stand.city}, ${stand.address}`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full mt-4 sm:mt-6 px-4 sm:px-6 py-2.5 sm:py-3 bg-accent text-accent-foreground rounded-2xl hover:bg-accent/90 transition-all flex items-center justify-center gap-2 text-sm sm:text-base shadow-md"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Построить маршрут</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 sm:mt-12 bg-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-border">
          <h2 className="text-foreground mb-4 sm:mb-6">Как это работает?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                <span className="text-accent text-lg sm:text-xl font-medium">1</span>
              </div>
              <h3 className="text-foreground mb-2 text-sm sm:text-base">Выберите город</h3>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                Найдите ближайшую к вам стойку с образцами на карте
              </p>
            </div>
            <div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                <span className="text-accent text-lg sm:text-xl font-medium">2</span>
              </div>
              <h3 className="text-foreground mb-2 text-sm sm:text-base">Посетите стойку</h3>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                Приезжайте в удобное время и изучите все доступные материалы
              </p>
            </div>
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                <span className="text-accent text-lg sm:text-xl font-medium">3</span>
              </div>
              <h3 className="text-foreground mb-2 text-sm sm:text-base">Оформите заказ</h3>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                Настройте дверь в конфигураторе и закажите онлайн
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
