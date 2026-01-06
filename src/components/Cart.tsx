import { motion } from 'motion/react';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import type { CartItem } from '../App';

interface CartProps {
  items: CartItem[];
  onNavigate: (page: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
}

export function Cart({ items, onNavigate, updateQuantity, removeItem }: CartProps) {
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background py-12 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground" />
          </div>
          <h2 className="text-foreground mb-3">Корзина пуста</h2>
          <p className="text-muted-foreground mb-6 text-sm sm:text-base">
            Добавьте товары из каталога или настройте дверь в конфигураторе
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => onNavigate('catalog')}
              className="px-6 py-3 bg-accent text-accent-foreground rounded-2xl hover:bg-accent/90 transition-all shadow-md"
            >
              Перейти в каталог
            </button>
            <button
              onClick={() => onNavigate('configurator')}
              className="px-6 py-3 bg-card border-2 border-border text-foreground rounded-2xl hover:border-accent/30 transition-all"
            >
              Открыть конфигуратор
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-6 sm:py-8 lg:py-12 pb-32 lg:pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-2">
            <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8 text-accent" />
            <h1 className="text-foreground">Корзина</h1>
          </div>
          <p className="text-muted-foreground text-sm sm:text-base">
            {totalItems} {totalItems === 1 ? 'товар' : totalItems < 5 ? 'товара' : 'товаров'} на сумму {totalPrice.toLocaleString('ru-RU')} ₽
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden border border-border"
              >
                <div className="p-4 sm:p-6">
                  <div className="flex gap-4 sm:gap-6">
                    {/* Image */}
                    <div className="w-20 h-24 sm:w-24 sm:h-32 flex-shrink-0 bg-secondary rounded-xl overflow-hidden">
                      <img
                        src={item.doorModel.image}
                        alt={item.doorModel.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0 pr-2">
                          <h3 className="text-foreground mb-1 text-sm sm:text-base truncate">
                            {item.doorModel.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                            {item.doorModel.series}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-muted-foreground hover:text-destructive transition-colors flex-shrink-0"
                          aria-label="Удалить"
                        >
                          <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                      </div>

                      {/* Configuration */}
                      <div className="space-y-1 mb-4 text-xs sm:text-sm text-muted-foreground">
                        <p>Цвет: {item.configuration.color}</p>
                        <p>Кромка: {item.configuration.edge}</p>
                        <p>Ручка: {item.configuration.handle}</p>
                        {item.configuration.glass !== 'Без стекла' && (
                          <p>Стекло: {item.configuration.glass}</p>
                        )}
                      </div>

                      {/* Price and Quantity */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 sm:gap-3 bg-secondary rounded-xl p-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-card hover:bg-accent hover:text-accent-foreground transition-all flex items-center justify-center"
                            aria-label="Уменьшить количество"
                          >
                            <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                          <span className="text-foreground w-8 text-center text-sm sm:text-base">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-card hover:bg-accent hover:text-accent-foreground transition-all flex items-center justify-center"
                            aria-label="Увеличить количество"
                          >
                            <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                        </div>

                        <div className="text-right">
                          <div className="text-foreground text-base sm:text-lg">
                            {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                          </div>
                          {item.quantity > 1 && (
                            <div className="text-xs text-muted-foreground">
                              {item.price.toLocaleString('ru-RU')} ₽ × {item.quantity}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary - Desktop */}
          <div className="hidden lg:block lg:sticky lg:top-24 h-fit">
            <div className="bg-card rounded-3xl shadow-lg p-6 border border-border">
              <h3 className="text-foreground mb-6">Итого</h3>

              <div className="space-y-3 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Товары ({totalItems})</span>
                  <span className="text-foreground">{totalPrice.toLocaleString('ru-RU')} ₽</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Доставка</span>
                  <span className="text-foreground">Рассчитается при оформлении</span>
                </div>
              </div>

              <div className="flex justify-between mb-6 pb-6 border-b border-border">
                <span className="text-foreground text-lg">Сумма заказа:</span>
                <span className="text-foreground text-xl">{totalPrice.toLocaleString('ru-RU')} ₽</span>
              </div>

              <button
                onClick={() => onNavigate('checkout')}
                className="w-full px-6 py-4 bg-accent text-accent-foreground rounded-2xl hover:bg-accent/90 transition-all shadow-lg flex items-center justify-center gap-2 group"
              >
                <span>Оформить заказ</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('catalog')}
                className="w-full mt-3 px-6 py-3 bg-card border-2 border-border text-foreground rounded-2xl hover:border-accent/30 transition-all"
              >
                Продолжить покупки
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-2xl z-40">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-xs text-muted-foreground">Итого:</div>
              <div className="text-foreground text-lg">{totalPrice.toLocaleString('ru-RU')} ₽</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-muted-foreground">{totalItems} {totalItems === 1 ? 'товар' : totalItems < 5 ? 'товара' : 'товаров'}</div>
            </div>
          </div>
          <button
            onClick={() => onNavigate('checkout')}
            className="w-full px-4 py-3 bg-accent text-accent-foreground rounded-2xl hover:bg-accent/90 transition-all shadow-lg text-sm font-medium flex items-center justify-center gap-2"
          >
            <span>Оформить заказ</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
