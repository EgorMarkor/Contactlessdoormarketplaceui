import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: any) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-accent to-[#B8903E] rounded-2xl flex items-center justify-center shadow-md">
                <span className="text-primary font-bold">ДН</span>
              </div>
              <div>
                <div className="text-primary-foreground font-medium">Дверной навигатор</div>
                <div className="text-xs opacity-70">Ваш путь к идеальной двери</div>
              </div>
            </div>
            <p className="text-sm opacity-70 leading-relaxed">
              Современная платформа для бесконтактной покупки дверей с возможностью конфигурации и просмотра образцов.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-primary-foreground mb-3 sm:mb-4 text-sm sm:text-base">Навигация</h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button onClick={() => onNavigate('home')} className="opacity-70 hover:opacity-100 hover:text-accent transition-all">
                  Главная
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog')} className="opacity-70 hover:opacity-100 hover:text-accent transition-all">
                  Каталог дверей
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('configurator')} className="opacity-70 hover:opacity-100 hover:text-accent transition-all">
                  Конфигуратор
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('stands')} className="opacity-70 hover:opacity-100 hover:text-accent transition-all">
                  Стойки с образцами
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-primary-foreground mb-3 sm:mb-4 text-sm sm:text-base">Контакты</h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <li className="flex items-center gap-2 opacity-70">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href="tel:+78001234567" className="hover:opacity-100 hover:text-accent transition-all">
                  8 (800) 123-45-67
                </a>
              </li>
              <li className="flex items-center gap-2 opacity-70">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href="mailto:info@doorpoint.ru" className="hover:opacity-100 hover:text-accent transition-all break-all">
                  info@doorpoint.ru
                </a>
              </li>
              <li className="flex items-start gap-2 opacity-70">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Москва, ул. Примерная, д. 123</span>
              </li>
            </ul>
          </div>

          {/* Social & Hours */}
          <div>
            <h3 className="text-primary-foreground mb-3 sm:mb-4 text-sm sm:text-base">Мы в соцсетях</h3>
            <div className="flex gap-2 sm:gap-3 mb-4 sm:mb-6">
              <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-accent transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-accent transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-accent transition-colors" aria-label="YouTube">
                <Youtube className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
            <div className="text-xs sm:text-sm">
              <p className="text-primary-foreground mb-1">Режим работы:</p>
              <p className="opacity-70">Пн-Пт: 9:00 - 20:00</p>
              <p className="opacity-70">Сб-Вс: 10:00 - 18:00</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 sm:mt-12 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs sm:text-sm opacity-70">
          <p>© 2024 Дверной навигатор. Все права защищены.</p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-center">
            <a href="#" className="hover:opacity-100 hover:text-accent transition-all">Политика конфиденциальности</a>
            <a href="#" className="hover:opacity-100 hover:text-accent transition-all">Условия использования</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
