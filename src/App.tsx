import { useState } from 'react';
import { Home } from './components/Home';
import { CatalogNew } from './components/CatalogNew';
import { NewConfigurator } from './components/NewConfigurator';
import { ProductPage } from './components/ProductPage';
import { StandsMap } from './components/StandsMap';
import { Checkout } from './components/Checkout';
import { Cart } from './components/Cart';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AdminContentProvider } from './components/admin/AdminContentProvider';

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

export interface AiSelection {
  modelId: string;
  colorId: string;
  nonce: number;
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
  const [aiSelection, setAiSelection] = useState<AiSelection | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const navigateTo = (page: Page, door?: DoorModel, options?: { aiSelection?: AiSelection | null }) => {
    setCurrentPage(page);

    if (page === 'configurator' && !options?.aiSelection) {
      setAiSelection(null);
    }

    if (options?.aiSelection) {
      setAiSelection(options.aiSelection);
    }

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
    <AdminContentProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <Header 
          currentPage={currentPage} 
          onNavigate={navigateTo}
          cartItemsCount={cartItems.length}
        />
        
        <main className="flex-1">
          {currentPage === 'home' && <Home onNavigate={navigateTo} />}
          {currentPage === 'catalog' && (
            <CatalogNew 
              onNavigate={navigateTo}
              onConfigureModel={(selection) => {
                const selectionWithNonce: AiSelection = {
                  ...selection,
                  nonce: Date.now(),
                };
                navigateTo('configurator', undefined, { aiSelection: selectionWithNonce });
              }}
            />
          )}
          {currentPage === 'configurator' && (
            <NewConfigurator 
              onNavigate={navigateTo}
              addToCart={addToCart}
              aiSelection={aiSelection}
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
    </AdminContentProvider>
  );
}
