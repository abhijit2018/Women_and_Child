import { useState, useEffect } from "react";
import "./Carousel.css";

export interface CarouselImage {
  src: string;
  alt: string;
}

interface CarouselProps {
  images: CarouselImage[];
  intervalMs?: number;
}

function Carousel({
  images,
  intervalMs = 3000,
}: CarouselProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [images.length, intervalMs]);

  const next = () =>
    setCurrent((prev) => (prev + 1) % images.length);

  const prev = () =>
    setCurrent((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );

  if (!images.length) return null;

  return (
    <div className="carousel">

      {images.map((image, index) => (
        <div
          key={image.src}
          className={`carousel__slide ${
            index === current ? "active" : ""
          }`}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="carousel__image"
          />
        </div>
      ))}

      {images.length > 1 && (
        <>
          <button
            className="carousel__arrow carousel__arrow--left"
            onClick={prev}
          >
            &#10094;
          </button>

          <button
            className="carousel__arrow carousel__arrow--right"
            onClick={next}
          >
            &#10095;
          </button>

          <div className="carousel__dots">
            {images.map((_, index) => (
              <button
                key={index}
                className={`carousel__dot ${
                  current === index ? "active" : ""
                }`}
                onClick={() => setCurrent(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Carousel;