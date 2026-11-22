import { useEffect, useState } from 'react';
import { MapPin, Shuffle } from 'lucide-react';

export default function ShuffleModal({ pool, onFinish }) {
  const [previewItem, setPreviewItem] = useState(pool[0]);

  useEffect(() => {
    let elapsed = 0;
    const duration = 1600;
    const intervalTime = 90;

    const timer = setInterval(() => {
      elapsed += intervalTime;
      const randomIndex = Math.floor(Math.random() * pool.length);
      setPreviewItem(pool[randomIndex]);

      if (elapsed >= duration) {
        clearInterval(timer);
        const winner = pool[Math.floor(Math.random() * pool.length)];
        onFinish(winner);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [pool, onFinish]);

  if (!previewItem) return null;

  return (
    <div className="modal-backdrop">
      <div className="shuffle-card">
        <div className="shuffle-header">
          <Shuffle size={16} className="spin-icon" />
          <span>Seleccionando destino...</span>
        </div>

        <div className="shuffle-preview">
          <img src={previewItem.image} alt={previewItem.name} className="shuffle-img" />
          <div className="shuffle-info">
            <h4>{previewItem.name}</h4>
            <p>
              <MapPin size={13} />
              <span>{previewItem.district}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}