import { useState, useMemo } from 'react';
import { Shuffle, HelpCircle, Search } from 'lucide-react';
import { ONBOARDING_STORIES, RESTAURANTS } from './data/restaurants';
import StoriesModal from './components/StoriesModal';
import RestaurantCard from './components/RestaurantCard';
import DetailModal from './components/DetailModal';
import ShuffleModal from './components/ShuffleModal';
import './App.css';

const STORAGE_KEY = 'date_spots_onboarding_seen_v1';

export default function App() {
  const [showStories, setShowStories] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) !== 'true';
  });

  const [selectedDistrict, setSelectedDistrict] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeRestaurant, setActiveRestaurant] = useState(null);
  const [isRandomResult, setIsRandomResult] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  // Extrae automáticamente todos los distritos únicos de tu lista
  const districts = useMemo(() => {
    const unique = Array.from(new Set(RESTAURANTS.map((r) => r.district))).sort();
    return ['Todos', ...unique];
  }, []);

  // Filtra los restaurantes según el distrito y búsqueda
  const filteredRestaurants = useMemo(() => {
    return RESTAURANTS.filter((item) => {
      const matchesDistrict =
        selectedDistrict === 'Todos' || item.district === selectedDistrict;
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase().trim());
      return matchesDistrict && matchesSearch;
    });
  }, [selectedDistrict, searchQuery]);

  const handleCompleteStories = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setShowStories(false);
  };

  const handleOpenManual = (restaurant) => {
    setIsRandomResult(false);
    setActiveRestaurant(restaurant);
  };

  const handleStartRandom = () => {
    if (filteredRestaurants.length === 0) return;
    setActiveRestaurant(null);
    setIsShuffling(true);
  };

  const handleFinishRandom = (winner) => {
    setIsShuffling(false);
    setIsRandomResult(true);
    setActiveRestaurant(winner);
  };

  return (
    <div className="app-shell">
      {showStories && (
        <StoriesModal
          stories={ONBOARDING_STORIES}
          onComplete={handleCompleteStories}
        />
      )}

      {/* Header sticky tipo SaaS */}
      <header className="app-header">
        <div className="header-top">
          <div>
            <span className="header-eyebrow">La Ruta del Sabor</span>
            <h1 className="header-title">Lugares para visitar</h1>
          </div>
          <button
            type="button"
            className="btn-icon-subtle"
            onClick={() => setShowStories(true)}
            aria-label="Ver introducción"
            title="Ver introducción"
          >
            <HelpCircle size={18} />
          </button>
        </div>

        {/* Buscador limpio */}
        <div className="search-box">
          <Search size={15} className="search-icon" />
          <input
            type="text"
            placeholder="Buscar restaurante..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Filtros horizontales por distrito */}
        <nav className="district-filters" aria-label="Filtrar por distrito">
          {districts.map((district) => (
            <button
              key={district}
              type="button"
              className={`filter-pill ${selectedDistrict === district ? 'active' : ''}`}
              onClick={() => setSelectedDistrict(district)}
            >
              {district}
            </button>
          ))}
        </nav>
      </header>

      {/* Contador sutil */}
      <main className="main-content">
        <div className="results-bar">
          <span>
            {filteredRestaurants.length}{' '}
            {filteredRestaurants.length === 1 ? 'opción disponible' : 'opciones disponibles'}
          </span>
          {selectedDistrict !== 'Todos' && <span>en {selectedDistrict}</span>}
        </div>

        <div className="cards-grid">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onSelect={handleOpenManual}
            />
          ))}
        </div>
      </main>

      {/* Barra inferior fija con botón Random */}
      <div className="bottom-dock">
        <button
          type="button"
          className="btn-random-dock"
          onClick={handleStartRandom}
          disabled={filteredRestaurants.length === 0}
        >
          <Shuffle size={18} />
          <span>
            {selectedDistrict === 'Todos'
              ? 'Elegir restaurante al azar'
              : `Al azar en ${selectedDistrict}`}
          </span>
        </button>
      </div>

      {/* Modal de transición rápida (Shuffle de cards) */}
      {isShuffling && (
        <ShuffleModal
          pool={filteredRestaurants}
          onFinish={handleFinishRandom}
        />
      )}

      {/* Modal de detalle (Manual o Ganador Random) */}
      <DetailModal
        restaurant={activeRestaurant}
        isRandomResult={isRandomResult}
        onClose={() => setActiveRestaurant(null)}
        onReroll={handleStartRandom}
      />
    </div>
  );
}