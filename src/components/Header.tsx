import { Menu, X, Phone, Mail, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

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
    { id: 'stands', label: 'Стойки с образцами' },
  ];

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar - hidden on mobile */}
        <div className="py-2 border-b border-border hidden lg:flex justify-between items-center text-sm text-muted-foreground">
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
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-accent to-[#B8903E] rounded-2xl flex items-center justify-center shadow-md">
              <span className="text-primary font-bold text-sm sm:text-base">ДН</span>
            </div>
            <div className="text-left">
              <div className="text-foreground text-sm sm:text-base font-medium">Дверной навигатор</div>
              <div className="text-xs text-muted-foreground hidden sm:block">Ваш путь к идеальной двери</div>
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
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
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
              className="relative p-2 text-muted-foreground hover:text-accent rounded-xl hover:bg-secondary transition-colors"
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
              className="lg:hidden p-2 text-muted-foreground hover:text-foreground rounded-xl hover:bg-secondary transition-colors"
              aria-label="Меню"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-card">
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
                    ? 'bg-accent/10 text-accent border border-accent/20'
                    : 'text-muted-foreground hover:bg-secondary/50'
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
            <div className="pt-4 mt-4 border-t border-border space-y-2">
              <a href="tel:+78001234567" className="flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-accent transition-colors">
                <Phone className="w-4 h-4" />
                <span className="text-sm">8 (800) 123-45-67</span>
              </a>
              <a href="mailto:info@doorpoint.ru" className="flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-accent transition-colors">
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