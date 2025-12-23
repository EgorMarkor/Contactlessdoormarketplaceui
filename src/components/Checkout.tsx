import { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, CreditCard, Truck, User, Phone, MapPin, Calendar } from 'lucide-react';
import type { ConfiguratorState } from '../App';

interface CheckoutProps {
  state: ConfiguratorState;
  onNavigate: (page: string) => void;
}

export function Checkout({ state, onNavigate }: CheckoutProps) {
  const [step, setStep] = useState<'info' | 'delivery' | 'payment' | 'success'>('info');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    deliveryDate: '',
    deliveryTime: '',
    installationNeeded: true,
    paymentMethod: 'card',
  });

  const doorPrice = state.doorModel?.basePrice || 0;
  const deliveryPrice = 2000;
  const installationPrice = formData.installationNeeded ? 5000 : 0;
  const totalPrice = doorPrice + deliveryPrice + installationPrice;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'info') {
      setStep('delivery');
    } else if (step === 'delivery') {
      setStep('payment');
    } else if (step === 'payment') {
      setStep('success');
    }
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-background py-8 sm:py-12 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl w-full text-center"
        >
          <div className="bg-card rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-12 border border-border">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-accent" />
            </div>
            <h1 className="text-foreground mb-3 sm:mb-4 text-xl sm:text-2xl">Заказ успешно оформлен!</h1>
            <p className="text-muted-foreground mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base px-2">
              Спасибо за ваш заказ! Мы отправили подтверждение на {formData.email}.
              Наш менеджер свяжется с вами в ближайшее время для уточнения деталей доставки.
            </p>
            
            <div className="bg-secondary/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 text-left">
              <h3 className="text-foreground mb-3 sm:mb-4 text-sm sm:text-base">Детали заказа:</h3>
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Дверь:</span>
                  <span className="text-foreground text-right">{state.doorModel?.name || 'Не выбрана'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Цвет:</span>
                  <span className="text-foreground">{state.color}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Доставка:</span>
                  <span className="text-foreground">{formData.deliveryDate}</span>
                </div>
                <div className="flex justify-between pt-2 sm:pt-3 border-t border-border">
                  <span className="text-foreground font-medium">Итого:</span>
                  <span className="text-foreground font-medium">{totalPrice.toLocaleString('ru-RU')} ₽</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => onNavigate('home')}
                className="px-6 sm:px-8 py-2.5 sm:py-3 bg-accent text-accent-foreground rounded-xl sm:rounded-2xl hover:bg-accent/90 transition-all text-sm sm:text-base shadow-md"
              >
                На главную
              </button>
              <button
                onClick={() => onNavigate('catalog')}
                className="px-6 sm:px-8 py-2.5 sm:py-3 bg-card border-2 border-border text-foreground rounded-xl sm:rounded-2xl hover:border-accent/30 transition-all text-sm sm:text-base"
              >
                К каталогу
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-6 sm:py-8 lg:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-foreground mb-2">Оформление заказа</h1>
          <p className="text-muted-foreground text-sm sm:text-base">Бесконтактная покупка в несколько шагов</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {[
              { id: 'info', label: 'Контактные данные', icon: User },
              { id: 'delivery', label: 'Доставка', icon: Truck },
              { id: 'payment', label: 'Оплата', icon: CreditCard },
            ].map((s, i) => (
              <div key={s.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-2 transition-all ${
                      step === s.id
                        ? 'bg-accent text-accent-foreground shadow-md'
                        : ['info', 'delivery', 'payment'].indexOf(step) > i
                        ? 'bg-accent/80 text-accent-foreground'
                        : 'bg-secondary text-muted-foreground'
                    }`}
                  >
                    {['info', 'delivery', 'payment'].indexOf(step) > i ? (
                      <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
                    ) : (
                      <s.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    )}
                  </div>
                  <span className="text-xs sm:text-sm text-muted-foreground text-center hidden sm:block">
                    {s.label}
                  </span>
                </div>
                {i < 2 && (
                  <div
                    className={`h-0.5 flex-1 mx-1 sm:mx-2 ${
                      ['info', 'delivery', 'payment'].indexOf(step) > i
                        ? 'bg-accent'
                        : 'bg-border'
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-card rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-6 border border-border">
              {step === 'info' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-foreground mb-4 sm:mb-6">Контактные данные</h2>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-xs sm:text-sm text-muted-foreground mb-2">
                          Имя <span className="text-destructive">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-border rounded-xl focus:outline-none focus:border-accent bg-background text-sm sm:text-base"
                          placeholder="Иван"
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm text-muted-foreground mb-2">
                          Фамилия <span className="text-destructive">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-border rounded-xl focus:outline-none focus:border-accent bg-background text-sm sm:text-base"
                          placeholder="Иванов"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm text-muted-foreground mb-2">
                        Телефон <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-border rounded-xl focus:outline-none focus:border-accent bg-background text-sm sm:text-base"
                        placeholder="+7 (___) ___-__-__"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm text-muted-foreground mb-2">
                        Email <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-border rounded-xl focus:outline-none focus:border-accent bg-background text-sm sm:text-base"
                        placeholder="ivan@example.com"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 'delivery' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-foreground mb-4 sm:mb-6">Доставка и установка</h2>
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <label className="block text-xs sm:text-sm text-muted-foreground mb-2">
                        Город <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-border rounded-xl focus:outline-none focus:border-accent bg-background text-sm sm:text-base"
                        placeholder="Москва"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm text-muted-foreground mb-2">
                        Адрес доставки <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-border rounded-xl focus:outline-none focus:border-accent bg-background text-sm sm:text-base"
                        placeholder="ул. Примерная, д. 123, кв. 45"
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-xs sm:text-sm text-muted-foreground mb-2">
                          Дата доставки <span className="text-destructive">*</span>
                        </label>
                        <input
                          type="date"
                          required
                          value={formData.deliveryDate}
                          onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-border rounded-xl focus:outline-none focus:border-accent bg-background text-sm sm:text-base"
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm text-muted-foreground mb-2">
                          Время доставки
                        </label>
                        <select
                          value={formData.deliveryTime}
                          onChange={(e) => setFormData({ ...formData, deliveryTime: e.target.value })}
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-border rounded-xl focus:outline-none focus:border-accent bg-background text-sm sm:text-base"
                        >
                          <option value="">Выберите время</option>
                          <option value="09:00-12:00">09:00 - 12:00</option>
                          <option value="12:00-15:00">12:00 - 15:00</option>
                          <option value="15:00-18:00">15:00 - 18:00</option>
                          <option value="18:00-21:00">18:00 - 21:00</option>
                        </select>
                      </div>
                    </div>
                    <div className="pt-4">
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={formData.installationNeeded}
                          onChange={(e) =>
                            setFormData({ ...formData, installationNeeded: e.target.checked })
                          }
                          className="w-5 h-5 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-500 mt-0.5"
                        />
                        <div>
                          <span className="text-neutral-900 group-hover:text-neutral-700 transition-colors">
                            Требуется профессиональная установка
                          </span>
                          <p className="text-sm text-neutral-500 mt-1">
                            Наши специалисты установят дверь качественно и в срок (+5 000 ₽)
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 'payment' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-foreground mb-4 sm:mb-6">Способ оплаты</h2>
                  <div className="space-y-3 mb-6">
                    {[
                      { id: 'card', label: 'Банковская карта', description: 'Оплата онлайн' },
                      { id: 'cash', label: 'Наличные', description: 'При получении' },
                      { id: 'transfer', label: 'Банковский перевод', description: 'По счету' },
                    ].map((method) => (
                      <label
                        key={method.id}
                        className={`block p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          formData.paymentMethod === method.id
                            ? 'border-neutral-900 bg-neutral-50'
                            : 'border-neutral-200 hover:border-neutral-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={formData.paymentMethod === method.id}
                          onChange={(e) =>
                            setFormData({ ...formData, paymentMethod: e.target.value })
                          }
                          className="sr-only"
                        />
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-neutral-900 mb-1">{method.label}</div>
                            <div className="text-sm text-neutral-500">{method.description}</div>
                          </div>
                          {formData.paymentMethod === method.id && (
                            <CheckCircle2 className="w-6 h-6 text-neutral-900" />
                          )}
                        </div>
                      </label>
                    ))}
                  </div>

                  {formData.paymentMethod === 'card' && (
                    <div className="space-y-4 p-4 bg-neutral-50 rounded-xl">
                      <div>
                        <label className="block text-sm text-neutral-600 mb-2">
                          Номер карты
                        </label>
                        <input
                          type="text"
                          placeholder="____ ____ ____ ____"
                          className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-neutral-400 bg-white"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-neutral-600 mb-2">Срок действия</label>
                          <input
                            type="text"
                            placeholder="ММ/ГГ"
                            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-neutral-400 bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-neutral-600 mb-2">CVV</label>
                          <input
                            type="text"
                            placeholder="___"
                            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-neutral-400 bg-white"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              <div className="flex gap-3 mt-8">
                {step !== 'info' && (
                  <button
                    type="button"
                    onClick={() => {
                      if (step === 'delivery') setStep('info');
                      else if (step === 'payment') setStep('delivery');
                    }}
                    className="flex-1 px-6 py-3 bg-white border-2 border-neutral-200 text-neutral-900 rounded-xl hover:border-neutral-300 transition-all"
                  >
                    Назад
                  </button>
                )}
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-neutral-900 text-white rounded-xl hover:bg-neutral-800 transition-all"
                >
                  {step === 'payment' ? 'Оформить заказ' : 'Продолжить'}
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-neutral-900 mb-6">Ваш заказ</h3>

              {/* Door Preview */}
              {state.doorModel && (
                <div className="mb-6">
                  <img
                    src={state.doorModel.image}
                    alt={state.doorModel.name}
                    className="w-full aspect-[3/4] object-cover rounded-xl mb-3"
                  />
                  <h4 className="text-neutral-900 mb-2">{state.doorModel.name}</h4>
                  <div className="space-y-1 text-sm text-neutral-600">
                    <p>Цвет: {state.color}</p>
                    <p>Кромка: {state.edge}</p>
                    <p>Ручка: {state.handle}</p>
                    <p>Стекло: {state.glass}</p>
                    <p>Коробка: {state.frameType}</p>
                  </div>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-3 py-4 border-t border-neutral-200">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Дверь</span>
                  <span className="text-neutral-900">{doorPrice.toLocaleString('ru-RU')} ₽</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Доставка</span>
                  <span className="text-neutral-900">{deliveryPrice.toLocaleString('ru-RU')} ₽</span>
                </div>
                {formData.installationNeeded && (
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Установка</span>
                    <span className="text-neutral-900">
                      {installationPrice.toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                )}
              </div>

              <div className="flex justify-between pt-4 border-t border-neutral-200">
                <span className="text-neutral-900">Итого:</span>
                <span className="text-neutral-900">{totalPrice.toLocaleString('ru-RU')} ₽</span>
              </div>

              {/* Benefits */}
              <div className="mt-6 pt-6 border-t border-neutral-200 space-y-3">
                <div className="flex items-center gap-3 text-sm text-neutral-600">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span>Гарантия 5 лет</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-neutral-600">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span>Возврат в течение 14 дней</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-neutral-600">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span>Бесплатная консультация</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}