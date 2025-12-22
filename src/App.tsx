import { useState } from 'react';
import { Home } from './components/Home';
import { Catalog } from './components/Catalog';
import { Configurator } from './components/Configurator';
import { ProductPage } from './components/ProductPage';
import { StandsMap } from './components/StandsMap';
import { Checkout } from './components/Checkout';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

type Page = 'home' | 'catalog' | 'configurator' | 'product' | 'stands' | 'checkout';

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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header currentPage={currentPage} onNavigate={navigateTo} />
      
      <main className="flex-1">
        {currentPage === 'home' && <Home onNavigate={navigateTo} />}
        {currentPage === 'catalog' && <Catalog onNavigate={navigateTo} />}
        {currentPage === 'configurator' && (
          <Configurator 
            state={configuratorState} 
            setState={setConfiguratorState}
            onNavigate={navigateTo}
          />
        )}
        {currentPage === 'product' && selectedDoor && (
          <ProductPage door={selectedDoor} onNavigate={navigateTo} />
        )}
        {currentPage === 'stands' && <StandsMap onNavigate={navigateTo} />}
        {currentPage === 'checkout' && (
          <Checkout 
            state={configuratorState}
            onNavigate={navigateTo}
          />
        )}
      </main>

      <Footer onNavigate={navigateTo} />
    </div>
  );
}