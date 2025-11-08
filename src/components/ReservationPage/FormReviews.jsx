import React, { useState } from "react";
import "./FormReviews.css";
import useCrud from "../../hooks/useCrud";
import { useForm } from "react-hook-form";

const FormReviews = ({
  formIsOpen,
  setFormIsOpen,
  bookSelected,
  setBookSelected,
}) => {
  const [, , createReview] = useCrud();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      rating: 5,
      comment: "",
    },
  });

  const [selectedRating, setSelectedRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);

  const submitReview = (data) => {
    try {
      const url = "https://bookapp-psql-production.vercel.app/api/v1/reviews";

      const reviewData = {
        rating: parseInt(data.rating),
        comment: data.comment,
        hotelId: bookSelected.hotel.id,
      };

      createReview(url, reviewData, true); // true para withToken

      // Resetear formulario y estado
      reset({
        rating: 5,
        comment: "",
      });
      setSelectedRating(5);
      setHoverRating(0);

      setBookSelected();
      setFormIsOpen(false);
    } catch (error) {
      console.error("Error al enviar la reseña:", error);
    }
  };
  // Validación de seguridad para evitar errores
  if (!bookSelected || !bookSelected.checkIn || !bookSelected.checkOut) {
    return null;
  }

  const initialDate = new Date(bookSelected.checkIn).getTime();
  const finalDate = new Date(bookSelected.checkOut).getTime();
  const reservationDays = (finalDate - initialDate) / (1000 * 3600 * 24);

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      setFormIsOpen(false);
    }
  };

  const handleStarClick = (rating) => {
    setSelectedRating(rating);
    setValue("rating", rating);
  };

  const handleStarHover = (rating) => {
    setHoverRating(rating);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  const getRatingText = (rating) => {
    const texts = {
      1: "Poor",
      2: "Fair",
      3: "Good",
      4: "Very Good",
      5: "Excellent",
    };
    return texts[rating] || "No Rating";
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= (hoverRating || selectedRating);
      stars.push(
        <i
          key={i}
          className={`bx ${isFilled ? "bxs-star" : "bx-star"} star-icon ${
            isFilled ? "filled" : ""
          }`}
          onClick={() => handleStarClick(i)}
          onMouseEnter={() => handleStarHover(i)}
          onMouseLeave={handleStarLeave}
        />
      );
    }
    return stars;
  };

  return (
    <div className="form-popup" onClick={handleBackgroundClick}>
      <section className="form-popup__content">
        <i className="bx bx-x" onClick={() => setFormIsOpen(false)}></i>
        <h2>Rate your Reserve</h2>
        <article className="hotel-card">
          <header className="hotel-header">
            <img
              src={
                bookSelected?.hotel?.images?.[0]?.url ||
                "/placeholder-hotel.jpg"
              }
              alt={bookSelected?.hotel?.name || "Hotel"}
              className="hotel-image"
            />
          </header>
          <div className="hotel-info">
            <h3 className="hotel-name">
              {bookSelected?.hotel?.name || "Hotel Name"}
            </h3>
            <ul className="hotel-details">
              <li className="detail-item">
                <span>Location:</span>
                <span>
                  {bookSelected?.hotel?.city?.name || "Unknown"},{" "}
                  {bookSelected?.hotel?.city?.country || "Unknown"}
                </span>
              </li>
              <li className="detail-item">
                <span>Reservation Days:</span>
                <span>{reservationDays || 0} days</span>
              </li>
              <li className="detail-item">
                <span>Subtotal Price:</span>
                <span>
                  ${" "}
                  {(
                    (bookSelected?.hotel?.price || 0) * (reservationDays || 0)
                  ).toFixed(2)}
                </span>
              </li>
            </ul>
          </div>
        </article>
        <form className="review-form" onSubmit={handleSubmit(submitReview)}>
          <div className="form-group">
            <span className="label-text">Rating</span>
            <div className="star-rating-container">
              <div className="stars-wrapper">{renderStars()}</div>
              <div className="rating-display">
                <div className="rating-value">{selectedRating}.0</div>
                <div className="rating-text">
                  {getRatingText(selectedRating)}
                </div>
              </div>
            </div>
            {errors.rating && (
              <span className="error-message">Please select a rating</span>
            )}
          </div>

          <div className="form-group">
            <span className="label-text">Comments</span>
            <textarea
              placeholder="Write your review about this hotel..."
              rows="4"
              className="comment-textarea"
              {...register("comment", {
                required: "Comment is required",
                minLength: {
                  value: 10,
                  message: "Comment must be at least 10 characters",
                },
              })}
            />
            {errors.comment && (
              <span className="error-message">{errors.comment.message}</span>
            )}
          </div>

          <button type="submit" className="submit-btn">
            Submit Review
          </button>
        </form>
      </section>
    </div>
  );
};

export default FormReviews;
