import { X, MapPin, Navigation, RefreshCw } from 'lucide-react';

export default function DetailModal({ restaurant, isRandomResult, onClose, onReroll }) {
  if (!restaurant) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="detail-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close" onClick={onClose} aria-label="Cerrar">
          <X size={18} />
        </button>

        <div className="modal-image-container">
          <img src={restaurant.image} alt={restaurant.name} className="modal-image" />
        </div>

        <div className="modal-body">
          <div className="modal-meta">
            <MapPin size={14} />
            <span>{restaurant.district}</span>
          </div>

          <h2 className="modal-title">{restaurant.name}</h2>

          <div className="modal-actions">
            <a
              href={restaurant.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-maps"
            >
              <Navigation size={16} />
              <span>Ir al restaurante</span>
            </a>

            {isRandomResult && (
              <button type="button" className="btn-secondary" onClick={onReroll}>
                <RefreshCw size={15} />
                <span>Elegir otro al azar</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}