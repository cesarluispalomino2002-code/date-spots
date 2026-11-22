import { useState } from 'react';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';

export default function StoriesModal({ stories, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = stories[currentIndex];
  const isLast = currentIndex === stories.length - 1;

  const handleNext = () => {
    if (isLast) {
      onComplete();
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="stories-overlay">
      <div className="stories-container">
        {/* Barras de progreso estilo Stories */}
        <div className="stories-progress">
          {stories.map((story, idx) => (
            <div key={story.id} className="progress-track">
              <div
                className={`progress-fill ${
                  idx < currentIndex ? 'completed' : idx === currentIndex ? 'active' : ''
                }`}
              />
            </div>
          ))}
        </div>

        {/* Contenido */}
        <div className="story-content">
          <span className="story-tag">{current.tag}</span>
          <h2 className="story-title">{current.title}</h2>
          <p className="story-body">{current.body}</p>
        </div>

        {/* Controles */}
        <div className="story-actions">
          <button
            type="button"
            className="btn-ghost"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            style={{ opacity: currentIndex === 0 ? 0 : 1 }}
          >
            <ArrowLeft size={18} />
            <span>Anterior</span>
          </button>

          <button type="button" className="btn-primary" onClick={handleNext}>
            <span>{isLast ? 'Ver restaurantes' : 'Siguiente'}</span>
            {isLast ? <Check size={18} /> : <ArrowRight size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
}