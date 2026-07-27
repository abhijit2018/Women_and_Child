import { useState, useEffect, useRef, useCallback } from 'react';
import './Carousel.css';

export interface CarouselImage {
  src: string;
  alt: string;
}

interface CarouselProps {
  images: CarouselImage[];
  intervalMs?: number;
}

/**
 * Auto-advancing carousel. Advances every `intervalMs` on its own;
 * any manual prev/next/dot click resets that timer, so it always
 * waits a full `intervalMs` after the last interaction before
 * auto-advancing again.
 */
function Carousel({ images, intervalMs = 3000 }: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback(
    (index: number) => {
      const total = images.length;
      setActiveIndex(((index % total) + total) % total);
    },
    [images.length]
  );

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  // Restart the auto-advance timer whenever the active slide changes,
  // whether that change came from auto-advance or a manual click.
  useEffect(() => {
    if (images.length <= 1) return undefined;
    timerRef.current = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, intervalMs);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeIndex, images.length, intervalMs]);

  function handleManualNav(action: () => void) {
    if (timerRef.current) clearTimeout(timerRef.current);
    action();
  }

  if (images.length === 0) return null;

  return (
    <div className="carousel">
      <div
        className="carousel__track"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {images.map((image) => (
          <div className="carousel__slide" key={image.src}>
            <img src={image.src} alt={image.alt} className="carousel__image" />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            className="carousel__nav carousel__nav--prev"
            onClick={() => handleManualNav(goPrev)}
            aria-label="Previous image"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path
                d="M10 3L5 8l5 5"
                stroke="currentColor"
                strokeWidth="1.8"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            className="carousel__nav carousel__nav--next"
            onClick={() => handleManualNav(goNext)}
            aria-label="Next image"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path
                d="M6 3l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.8"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="carousel__dots">
            {images.map((image, index) => (
              <button
                key={image.src}
                type="button"
                className={`carousel__dot ${index === activeIndex ? 'carousel__dot--active' : ''}`}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === activeIndex}
                onClick={() => handleManualNav(() => goTo(index))}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Carousel;
