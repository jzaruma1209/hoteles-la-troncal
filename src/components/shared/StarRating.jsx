import React, { useState } from "react";
import "./styles/StarRating.css";

const StarRating = ({
  rating = 0,
  onRatingChange,
  readonly = false,
  size = "medium",
  showValue = true,
  showText = true,
  maxStars = 5,
}) => {
  const [hoveredStar, setHoveredStar] = useState(null);

  const getRatingText = (value) => {
    if (value === 0) return "NO RATING";
    if (value <= 1) return "POOR";
    if (value <= 2) return "FAIR";
    if (value <= 3) return "GOOD";
    if (value <= 4) return "VERY GOOD";
    return "EXCELLENT";
  };

  const handleStarClick = (starValue) => {
    if (readonly || !onRatingChange) return;
    onRatingChange(starValue);
  };

  const handleStarHover = (starValue) => {
    if (readonly) return;
    setHoveredStar(starValue);
  };

  const handleStarLeave = () => {
    if (readonly) return;
    setHoveredStar(null);
  };

  const renderStars = () => {
    const stars = [];
    // En modo readonly, siempre usar el rating prop. En modo interactivo, usar hover o rating
    const displayRating = readonly ? rating : hoveredStar || rating;

    for (let i = 1; i <= maxStars; i++) {
      const isFilled = i <= displayRating;

      stars.push(
        <i
          key={i}
          className={`bx ${isFilled ? "bxs-star" : "bx-star"} star-icon ${
            isFilled ? "filled" : ""
          }`}
          onClick={() => handleStarClick(i)}
          onMouseEnter={() => handleStarHover(i)}
          onMouseLeave={handleStarLeave}
          role={readonly ? "presentation" : "button"}
          tabIndex={readonly ? -1 : 0}
          aria-label={`${i} ${i === 1 ? "estrella" : "estrellas"}`}
        />
      );
    }

    return stars;
  };

  // Construcción de clases CSS
  const containerClasses = [
    "star-rating-container",
    `star-rating--${size}`,
    readonly && "star-rating--readonly",
    !showValue && !showText && "star-rating--hide-both",
    !showValue && showText && "star-rating--hide-value",
    showValue && !showText && "star-rating--hide-text",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClasses}>
      <div className="stars-wrapper">{renderStars()}</div>

      {(showValue || showText) && (
        <div className="rating-display">
          {showValue && (
            <span className="rating-value">{rating.toFixed(1)}</span>
          )}
          {showText && (
            <span className="rating-text">{getRatingText(rating)}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default StarRating;
