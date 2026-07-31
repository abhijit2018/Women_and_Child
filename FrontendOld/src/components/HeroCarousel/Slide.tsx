import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Slide.css';

export interface SlideImage {
  src: string;
  alt?: string;
}

interface SlideProps {
  images?: SlideImage[];
  intervalMs?: number;
  showArrows?: boolean;
  showDots?: boolean;
}

function Slide({
  images = [],
  intervalMs = 5000,
  showArrows = true,
  showDots = true,
}: SlideProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [images.length, intervalMs]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images.length) return null;

  return (
    <section className="carousel">
      {images.map((image, index) => (
        <div
          key={index}
          className={`carousel__slide ${current === index ? 'active' : ''}`}
        >
          <img
            src={image.src}
            alt={image.alt || ''}
            className="carousel__image"
          />
        </div>
      ))}

      {showArrows && images.length > 1 && (
        <>
          <button
            className="carousel__arrow carousel__arrow--left"
            onClick={prevSlide}
            aria-label="Previous Slide"
          >
            <ChevronLeft size={32} strokeWidth={2.2} />
          </button>

          <button
            className="carousel__arrow carousel__arrow--right"
            onClick={nextSlide}
            aria-label="Next Slide"
          >
            <ChevronRight size={32} strokeWidth={2.2} />
          </button>
        </>
      )}

      {showDots && images.length > 1 && (
        <div className="carousel__dots">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`carousel__dot ${current === index ? 'active' : ''}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default Slide;
