// src/features/home/components/FeaturedSection.tsx

import useHome from "../hooks/useHome";
import HomeCard from "./HomeCard";

const FeaturedSection = () => {
  const { featured, loading } = useHome();

  if (loading) {
    return (
      <div className="container text-center py-5">
        <h4>Loading Featured Products...</h4>
      </div>
    );
  }

  return (
    <section className="container my-5">
      <div className="text-center mb-5">
        <h2>Featured Products</h2>

        <p>Explore our latest featured items.</p>
      </div>

      <div className="row">
        {featured.map((item) => (
          <div
            key={item.id}
            className="col-lg-4 col-md-6 mb-4"
          >
            <HomeCard card={item} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedSection;