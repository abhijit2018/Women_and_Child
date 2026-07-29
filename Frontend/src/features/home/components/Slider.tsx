// src/features/home/components/Slider.tsx

import useHome from "../hooks/useHome";
import { getImageUrl } from "../utils/homeHelpers";

const Slider = () => {
  const { sliders, loading } = useHome();

  if (loading) {
    return (
      <div className="container text-center py-5">
        <h4>Loading Slider...</h4>
      </div>
    );
  }

  if (sliders.length === 0) {
    return null;
  }

  return (
    <div
      id="homeSlider"
      className="carousel slide mb-5"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        {sliders.map((slide, index) => (
          <div
            key={slide.id}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            <img
              src={getImageUrl(slide.image)}
              className="d-block w-100"
              alt={slide.title}
              style={{
                height: "500px",
                objectFit: "cover",
              }}
            />

            <div className="carousel-caption">
              <h2>{slide.title}</h2>
              <p>{slide.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#homeSlider"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon"></span>
      </button>

      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#homeSlider"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon"></span>
      </button>
    </div>
  );
};

export default Slider;