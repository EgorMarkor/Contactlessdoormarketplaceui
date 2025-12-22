import { motion } from 'motion/react';
import { Sparkles, Shield, Layers, MapPin, ArrowRight, CheckCircle2, Eye } from 'lucide-react';
import { doorModels } from '../data/doors';
import type { DoorModel } from '../App';

interface HomeProps {
  onNavigate: (page: string, door?: DoorModel) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const featuredDoors = doorModels.slice(0, 3);

  const advantages = [
    {
      icon: Sparkles,
      title: 'Конфигурация в реальном времени',
      description: 'Настройте каждую деталь двери и сразу увидьте результат с точной визуализацией текстур и цветов.',
    },
    {
      icon: Shield,
      title: 'Бесконтактная покупка',
      description: 'Выберите, настройте и закажите дверь онлайн без визита в салон. Доставка и установка — под ключ.',
    },
    {
      icon: Layers,
      title: 'Гибридная модель',
      description: 'Настройте онлайн, посмотрите образцы материалов на физических стойках в вашем городе.',
    },
    {
      icon: MapPin,
      title: 'Стойки по всей России',
      description: 'Потрогайте плёнки, кромки и ручки на стойках с образцами в торговых центрах вашего города.',
    },
  ];

  return (
    <div className="bg-card">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary/30 via-card to-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-xs sm:text-sm text-accent mb-4 sm:mb-6">
                <Sparkles className="w-4 h-4" />
                <span>Новая эра выбора дверей</span>
              </div>
              
              <h1 className="text-foreground mb-4 sm:mb-6">
                Бесконтактная покупка дверей
              </h1>
              
              <p className="text-muted-foreground mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                Настройте идеальную дверь в нашем конфигураторе, посмотрите образцы материалов на физических стойках и закажите с доставкой — всё без походов в салоны.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={() => onNavigate('configurator')}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-accent text-accent-foreground rounded-3xl hover:bg-accent/90 transition-all flex items-center justify-center gap-2 group shadow-lg hover:shadow-xl text-sm sm:text-base"
                >
                  <span>Сконфигурировать дверь</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-card border-2 border-border text-foreground rounded-3xl hover:border-accent/30 hover:bg-secondary/50 transition-all text-sm sm:text-base"
                >
                  Смотреть каталог
                </button>
              </div>

              <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4 sm:gap-8">
                <div>
                  <div className="text-foreground">500+</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Моделей дверей</div>
                </div>
                <div className="w-px h-10 sm:h-12 bg-border"></div>
                <div>
                  <div className="text-foreground">50+</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Городов России</div>
                </div>
                <div className="w-px h-10 sm:h-12 bg-border"></div>
                <div>
                  <div className="text-foreground">1000+</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Довольных клиентов</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative order-first lg:order-last"
            >
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1659720879327-827462ca3942?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBpbnRlcmlvciUyMGRvb3J8ZW58MXx8fHwxNzY0ODQ3OTY5fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Современная дверь"
                  className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Floating card - hidden on mobile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="hidden sm:block absolute -bottom-6 -left-6 bg-card rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 max-w-xs border border-border"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-accent/10 rounded-2xl flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                  </div>
                  <div className="text-foreground text-sm sm:text-base">Бесплатная доставка</div>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  При заказе от 15 000 ₽ доставка по России бесплатна
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Door Point Concept */}
      <section className="py-12 sm:py-16 lg:py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-foreground mb-3 sm:mb-4">
              Что такое Дверной навигатор?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base px-4">
              Инновационная платформа, объединяющая удобство онлайн-покупок с возможностью физического контакта с материалами
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-secondary rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Eye className="w-7 h-7 sm:w-8 sm:h-8 text-accent" />
              </div>
              <h3 className="text-foreground mb-2 sm:mb-3">1. Выбирайте онлайн</h3>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base px-2">
                Просматривайте каталог из сотен моделей дверей и настраивайте каждую деталь в конфигураторе
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-secondary rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <MapPin className="w-7 h-7 sm:w-8 sm:h-8 text-accent" />
              </div>
              <h3 className="text-foreground mb-2 sm:mb-3">2. Потрогайте образцы</h3>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base px-2">
                Посетите стойки с образцами в вашем городе, чтобы увидеть и потрогать плёнки, кромки и фурнитуру
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center sm:col-span-2 lg:col-span-1"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-secondary rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-accent" />
              </div>
              <h3 className="text-foreground mb-2 sm:mb-3">3. Заказывайте легко</h3>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base px-2">
                Оформите заказ онлайн, и мы доставим и установим вашу дверь точно в срок
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Doors */}
      <section className="py-12 sm:py-16 lg:py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 sm:mb-12 gap-4">
            <div>
              <h2 className="text-foreground mb-2">
                Популярные модели
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base">
                Самые востребованные двери нашего каталога
              </p>
            </div>
            <button
              onClick={() => onNavigate('catalog')}
              className="hidden md:flex items-center gap-2 text-accent hover:gap-3 transition-all text-sm"
            >
              <span>Все модели</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {featuredDoors.map((door, index) => (
              <motion.div
                key={door.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
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
                <div className="p-4 sm:p-6">
                  <div className="text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-2">{door.series}</div>
                  <h3 className="text-foreground mb-1 sm:mb-2 text-sm sm:text-base">{door.name}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">{door.manufacturer}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-foreground text-sm sm:text-base">от {door.basePrice.toLocaleString('ru-RU')} ₽</div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate('configurator', door);
                      }}
                      className="text-xs sm:text-sm text-accent hover:text-accent/80 transition-colors"
                    >
                      Настроить →
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <button
            onClick={() => onNavigate('catalog')}
            className="md:hidden mx-auto mt-6 sm:mt-8 flex items-center gap-2 text-accent"
          >
            <span>Все модели</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-12 sm:py-16 lg:py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-foreground mb-3 sm:mb-4">
              Преимущества Дверного навигатора
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base px-4">
              Современный подход к выбору и покупке дверей
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {advantages.map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-4 sm:gap-6 p-5 sm:p-8 bg-secondary/50 rounded-2xl sm:rounded-3xl hover:bg-secondary transition-all border border-border"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-card rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm">
                  <advantage.icon className="w-6 h-6 sm:w-7 sm:h-7 text-accent" />
                </div>
                <div>
                  <h3 className="text-foreground mb-1 sm:mb-2 text-sm sm:text-base">{advantage.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">
                    {advantage.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-primary via-primary to-accent/20 text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-primary-foreground mb-4 sm:mb-6">
              Готовы выбрать идеальную дверь?
            </h2>
            <p className="opacity-90 mb-6 sm:mb-8 text-sm sm:text-lg leading-relaxed px-4">
              Используйте наш конфигуратор, чтобы создать дверь своей мечты всего за несколько минут
            </p>
            <button
              onClick={() => onNavigate('configurator')}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-card text-foreground rounded-3xl hover:bg-secondary transition-all inline-flex items-center gap-2 group shadow-xl text-sm sm:text-base"
            >
              <span>Начать конфигурацию</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}