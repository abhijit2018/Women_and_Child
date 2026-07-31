import "@/styles/QuoteCard.css";
import { Quote } from "lucide-react";

const QuoteCard = () => {
  return (
    <div className="quoteCard">
      <Quote className="quoteIcon" size={20} />

      <p className="quoteText">
        When women move forward,
        <br />
        <span>the nation moves forward.</span>
      </p>

      <p className="quoteAuthor">
        — National Commission for Women
      </p>

      <div className="quoteLine"></div>
    </div>
  );
};

export default QuoteCard;