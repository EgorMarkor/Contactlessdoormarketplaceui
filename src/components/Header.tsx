import { Menu, X, Phone, Mail, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import logo from 'figma:asset/55fc416e58e8befb83e6a4b8f1d5dd7c7c251711.png';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: any) => void;
  cartItemsCount: number;
}

export function Header({ currentPage, onNavigate, cartItemsCount }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Главная' },
    { id: 'catalog', label: 'Каталог дверей' },
    { id: 'configurator', label: 'Конфигуратор' },
    { id: 'management', label: 'Управление контентом' },
    { id: 'stands', label: 'Стойки с образцами' },
  ];

  return (
    <header className="bg-[#15181C] border-b border-border/20 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar - hidden on mobile */}
        <div className="py-2 border-b border-white/10 hidden lg:flex justify-between items-center text-sm text-white/60">
          <div className="flex items-center gap-6">
            <a href="tel:+78001234567" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Phone className="w-4 h-4" />
              <span>8 (800) 123-45-67</span>
            </a>
            <a href="mailto:info@doorpoint.ru" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Mail className="w-4 h-4" />
              <span>info@doorpoint.ru</span>
            </a>
          </div>
          <div className="text-sm">
            Бесконтактная покупка дверей по всей России
          </div>
        </div>

        {/* Main header */}
        <div className="py-3 sm:py-4 flex items-center justify-between gap-4">
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 sm:gap-3 group flex-shrink-0"
          >
            <div className="h-10 sm:h-12">
              <img src={logo} alt="Дверной навигатор" className="h-full w-auto object-contain" />
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-sm transition-colors relative group ${
                  currentPage === item.id
                    ? 'text-white'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {item.label}
                {currentPage === item.id && (
                  <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-accent rounded-full" />
                )}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Cart Button */}
            <button
              onClick={() => onNavigate('cart')}
              className="relative p-2 text-white/60 hover:text-accent rounded-xl hover:bg-white/5 transition-colors"
              aria-label="Корзина"
            >
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center font-medium shadow-md">
                  {cartItemsCount > 9 ? '9+' : cartItemsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onNavigate('configurator')}
              className="hidden md:flex px-4 lg:px-6 py-2 sm:py-2.5 bg-accent text-accent-foreground rounded-2xl hover:bg-accent/90 transition-all shadow-md hover:shadow-lg text-sm whitespace-nowrap"
            >
              Сконфигурировать
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white/60 hover:text-white rounded-xl hover:bg-white/5 transition-colors"
              aria-label="Меню"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#15181C]">
          <nav className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-2xl transition-colors ${
                  currentPage === item.id
                    ? 'bg-accent/20 text-accent border border-accent/30'
                    : 'text-white/60 hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                onNavigate('configurator');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-3 bg-accent text-accent-foreground rounded-2xl hover:bg-accent/90 transition-all shadow-sm mt-4"
            >
              Сконфигурировать дверь
            </button>
            <div className="pt-4 mt-4 border-t border-white/10 space-y-2">
              <a href="tel:+78001234567" className="flex items-center gap-2 px-4 py-2 text-white/60 hover:text-accent transition-colors">
                <Phone className="w-4 h-4" />
                <span className="text-sm">8 (800) 123-45-67</span>
              </a>
              <a href="mailto:info@doorpoint.ru" className="flex items-center gap-2 px-4 py-2 text-white/60 hover:text-accent transition-colors">
                <Mail className="w-4 h-4" />
                <span className="text-sm">info@doorpoint.ru</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
