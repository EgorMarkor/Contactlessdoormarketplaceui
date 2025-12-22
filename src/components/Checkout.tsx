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
      <div className="min-h-screen bg-neutral-50 py-12 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto px-4 text-center"
        >
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-neutral-900 mb-4">Заказ успешно оформлен!</h1>
            <p className="text-neutral-600 mb-8 leading-relaxed">
              Спасибо за ваш заказ! Мы отправили подтверждение на {formData.email}.
              Наш менеджер свяжется с вами в ближайшее время для уточнения деталей доставки.
            </p>
            
            <div className="bg-neutral-50 rounded-xl p-6 mb-8 text-left">
              <h3 className="text-neutral-900 mb-4">Детали заказа:</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Дверь:</span>
                  <span className="text-neutral-900">{state.doorModel?.name || 'Не выбрана'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Цвет:</span>
                  <span className="text-neutral-900">{state.color}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Доставка:</span>
                  <span className="text-neutral-900">{formData.deliveryDate}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-neutral-200">
                  <span className="text-neutral-900">Итого:</span>
                  <span className="text-neutral-900">{totalPrice.toLocaleString('ru-RU')} ₽</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => onNavigate('home')}
                className="px-8 py-3 bg-neutral-900 text-white rounded-xl hover:bg-neutral-800 transition-all"
              >
                На главную
              </button>
              <button
                onClick={() => onNavigate('catalog')}
                className="px-8 py-3 bg-white border-2 border-neutral-200 text-neutral-900 rounded-xl hover:border-neutral-300 transition-all"
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
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-neutral-900 mb-2">Оформление заказа</h1>
          <p className="text-neutral-600">Бесконтактная покупка в несколько шагов</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {[
              { id: 'info', label: 'Контактные данные', icon: User },
              { id: 'delivery', label: 'Доставка', icon: Truck },
              { id: 'payment', label: 'Оплата', icon: CreditCard },
            ].map((s, i) => (
              <div key={s.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${
                      step === s.id
                        ? 'bg-neutral-900 text-white'
                        : ['info', 'delivery', 'payment'].indexOf(step) > i
                        ? 'bg-green-600 text-white'
                        : 'bg-neutral-200 text-neutral-500'
                    }`}
                  >
                    {['info', 'delivery', 'payment'].indexOf(step) > i ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <s.icon className="w-6 h-6" />
                    )}
                  </div>
                  <span className="text-sm text-neutral-600 text-center hidden sm:block">
                    {s.label}
                  </span>
                </div>
                {i < 2 && (
                  <div
                    className={`h-0.5 flex-1 mx-2 ${
                      ['info', 'delivery', 'payment'].indexOf(step) > i
                        ? 'bg-green-600'
                        : 'bg-neutral-200'
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6">
              {step === 'info' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-neutral-900 mb-6">Контактные данные</h2>
                  <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-neutral-600 mb-2">
                          Имя <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-neutral-400"
                          placeholder="Иван"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-neutral-600 mb-2">
                          Фамилия <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-neutral-400"
                          placeholder="Иванов"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-neutral-600 mb-2">
                        Телефон <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-neutral-400"
                        placeholder="+7 (___) ___-__-__"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-neutral-600 mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-neutral-400"
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
                  <h2 className="text-neutral-900 mb-6">Доставка и установка</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-neutral-600 mb-2">
                        Город <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-neutral-400"
                        placeholder="Москва"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-neutral-600 mb-2">
                        Адрес доставки <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-neutral-400"
                        placeholder="ул. Примерная, д. 123, кв. 45"
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-neutral-600 mb-2">
                          Дата доставки <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          required
                          value={formData.deliveryDate}
                          onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-neutral-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-neutral-600 mb-2">
                          Время доставки
                        </label>
                        <select
                          value={formData.deliveryTime}
                          onChange={(e) => setFormData({ ...formData, deliveryTime: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-neutral-400"
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
                  <h2 className="text-neutral-900 mb-6">Способ оплаты</h2>
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
