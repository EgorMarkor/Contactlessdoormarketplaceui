import { useState } from 'react';
import { Home } from './components/Home';
import { Catalog } from './components/Catalog';
import { Configurator } from './components/Configurator';
import { ProductPage } from './components/ProductPage';
import { StandsMap } from './components/StandsMap';
import { Checkout } from './components/Checkout';
import { Cart } from './components/Cart';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

type Page = 'home' | 'catalog' | 'configurator' | 'product' | 'stands' | 'checkout' | 'cart';

export interface DoorModel {
  id: string;
  name: string;
  series: string;
  manufacturer: string;
  basePrice: number;
  image: string;
  material: string;
  hasGlass: boolean;
  colors: string[];
  texture: string;
}

export interface ConfiguratorState {
  doorModel?: DoorModel;
  color: string;
  edge: string;
  handle: string;
  glass: string;
  frameType: string;
}

export interface CartItem {
  id: string;
  doorModel: DoorModel;
  configuration: ConfiguratorState;
  quantity: number;
  price: number;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedDoor, setSelectedDoor] = useState<DoorModel | undefined>();
  const [configuratorState, setConfiguratorState] = useState<ConfiguratorState>({
    color: 'Дуб натуральный',
    edge: 'Стандартная',
    handle: 'Хром матовый',
    glass: 'Без стекла',
    frameType: 'Стандартная коробка',
  });
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const navigateTo = (page: Page, door?: DoorModel) => {
    setCurrentPage(page);
    if (door) {
      setSelectedDoor(door);
      setConfiguratorState({
        ...configuratorState,
        doorModel: door,
      });
    }
    window.scrollTo(0, 0);
  };

  const addToCart = (item: Omit<CartItem, 'id'>) => {
    const newItem: CartItem = {
      ...item,
      id: `${item.doorModel.id}-${Date.now()}-${Math.random()}`,
    };
    setCartItems([...cartItems, newItem]);
  };

  const updateCartItemQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const removeFromCart = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header 
        currentPage={currentPage} 
        onNavigate={navigateTo}
        cartItemsCount={cartItems.length}
      />
      
      <main className="flex-1">
        {currentPage === 'home' && <Home onNavigate={navigateTo} />}
        {currentPage === 'catalog' && <Catalog onNavigate={navigateTo} addToCart={addToCart} />}
        {currentPage === 'configurator' && (
          <Configurator 
            state={configuratorState} 
            setState={setConfiguratorState}
            onNavigate={navigateTo}
            addToCart={addToCart}
          />
        )}
        {currentPage === 'product' && selectedDoor && (
          <ProductPage door={selectedDoor} onNavigate={navigateTo} />
        )}
        {currentPage === 'stands' && <StandsMap onNavigate={navigateTo} />}
        {currentPage === 'cart' && (
          <Cart 
            items={cartItems}
            onNavigate={navigateTo}
            updateQuantity={updateCartItemQuantity}
            removeItem={removeFromCart}
          />
        )}
        {currentPage === 'checkout' && (
          <Checkout 
            cartItems={cartItems}
            onNavigate={navigateTo}
            clearCart={clearCart}
          />
        )}
      </main>

      <Footer onNavigate={navigateTo} />
    </div>
  );
}