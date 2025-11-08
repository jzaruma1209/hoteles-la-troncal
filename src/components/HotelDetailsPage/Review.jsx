import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import StarRating from "../shared/StarRating";
import "./styles/Review.css";

const Reviews = ({ hotelId }) => {
  const [visibleComments, setVisibleComments] = useState(5);
  const [reviewsHotel, getReviewsHotel] = useFetch();

  useEffect(() => {
    const url = `https://bookapp-psql-production.vercel.app/api/v1/reviews/hotel/${hotelId}`;
    getReviewsHotel(url);
  }, [hotelId]);

  console.log(reviewsHotel);

  const handleReviews = () => {
    setVisibleComments((prevCount) => prevCount + 5);
  };

  return (
    <div className="reviews">
      <h3 className="reviews__title">Comments</h3>
      <div className="reviews__container">
        {reviewsHotel?.slice(0, visibleComments).map((review) => (
          <ul key={review.id} className="review__item">
            <li className="review__user">{review.user?.firstName || 'Usuario'}</li>
            <li className="review__rating">
              <StarRating
                rating={review.rating}
                readonly={true}
                size="small"
                showValue={false}
                showText={false}
              />
              <span className="review__rating-number">{review.rating}</span>
            </li>
            <li className="review__comment">{review.comment}</li>
          </ul>
        ))}
      </div>
      {visibleComments < reviewsHotel?.length && (
        <button className="reviews__button" onClick={handleReviews}>
          See More ...
        </button>
      )}
    </div>
  );
};

export default Reviews;
