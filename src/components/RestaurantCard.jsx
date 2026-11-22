import { MapPin, ArrowUpRight } from 'lucide-react';

export default function RestaurantCard({ restaurant, onSelect }) {
  return (
    <article className="restaurant-card" onClick={() => onSelect(restaurant)}>
      <div className="card-image-wrapper">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          loading="lazy"
          className="card-image"
        />
        <span className="district-badge">
          <MapPin size={12} />
          {restaurant.district}
        </span>
      </div>

      <div className="card-footer">
        <h3 className="card-title">{restaurant.name}</h3>
        <button
          type="button"
          className="btn-card-action"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(restaurant);
          }}
        >
          <span>Ver más</span>
          <ArrowUpRight size={15} />
        </button>
      </div>
    </article>
  );
}