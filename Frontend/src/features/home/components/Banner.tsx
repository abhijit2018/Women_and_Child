// src/features/home/components/Banner.tsx

import useHome from "../hooks/useHome";
import { getImageUrl } from "../utils/homeHelpers";

const Banner = () => {
  const { banners } = useHome();

  return (
    <section className="container mb-5">
      <div className="row">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="col-lg-6 mb-4"
          >
            <div className="card shadow-sm border-0">
              <img
                src={getImageUrl(banner.image)}
                alt={banner.title}
                className="card-img-top"
                style={{
                  height: 250,
                  objectFit: "cover",
                }}
              />

              <div className="card-body text-center">
                <h3>{banner.title}</h3>

                <p>{banner.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Banner;