import React from "react";

const StartGenerator = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStars = !!(rating % 1);
  const emptyStars = 5 - fullStars - (halfStars ? 1 : 0);
  return (
    <div>
      {[...Array(fullStars)].map((_, i) => (
        <i key={i} className="bx bxs-star"></i>
      ))}
      {halfStars && <i className="bx bxs-star-half"></i>}
      {[...Array(emptyStars)].map((_, i) => (
        <i key={i} className="bx bx-star"></i>
      ))}
    </div>
  );
};

export default StartGenerator;
