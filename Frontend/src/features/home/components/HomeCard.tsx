// src/features/home/components/HomeCard.tsx

import { HomeCard as HomeCardType } from "../homeTypes";
import {
  getImageUrl,
  truncateText,
} from "../utils/homeHelpers";

interface Props {
  card: HomeCardType;
}

const HomeCard = ({ card }: Props) => {
  return (
    <div className="card h-100 shadow-sm border-0">
      <img
        src={getImageUrl(card.image)}
        alt={card.title}
        className="card-img-top"
        style={{
          height: 220,
          objectFit: "cover",
        }}
      />

      <div className="card-body">
        <h5>{card.title}</h5>

        <p>{truncateText(card.description, 120)}</p>

        <button className="btn btn-primary">
          Read More
        </button>
      </div>
    </div>
  );
};

export default HomeCard;