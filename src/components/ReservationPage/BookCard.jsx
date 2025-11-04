import "./BookCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const BookCard = ({
  book,
  deleteReservation,
  setBookSelected,
  setFormIsOpen,
}) => {
  const initialDate = new Date(book.checkIn).getTime();
  const finalDate = new Date(book.checkOut).getTime();
  const reservationDays = (finalDate - initialDate) / (1000 * 3600 * 24);

  const handleDelete = () => {
    const url = `https://hotels-api.academlo.tech/bookings/${book.id}`;
    deleteReservation(url, book.id, true); // true para withToken
  };

  const handleReview = () => {
    setBookSelected(book);
    setFormIsOpen(true);
  };

  return (
    <article className="book-card">
      <header className="book-card__header">
        <img
          src={book.hotel.images[0].url}
          alt={book.hotel.name}
          className="book-card__image"
        />
      </header>
      <section className="book-card__body">
        <div className="book-card__header-info">
          <h3 className="book-card__title">{book.hotel.name}</h3>
          <div className="book-card__location">
            📍 {book.hotel.city.name}, {book.hotel.city.country}
          </div>
          <button onClick={handleReview} className="book-card__review-btn">
            RATE & REVIEW
            <FontAwesomeIcon
              icon={faStar}
              style={{ color: "#FFD43B" }}
              className="review-star"
            />
          </button>
        </div>

        <div className="book-card__pricing">
          <div className="book-card__calculation">
            <span className="book-card__calculation-text">
              {reservationDays} days × ${book.hotel.price} per night
            </span>
          </div>

          <div className="book-card__divider"></div>

          <div className="book-card__total">
            <span className="book-card__total-label">Total Price</span>
            <span className="book-card__total-value">
              ${(book.hotel.price * reservationDays).toFixed(2)}
            </span>
          </div>
        </div>

        <button className="book-card__delete-btn" onClick={handleDelete}>
          🗑️
        </button>
      </section>
    </article>
  );
};

export default BookCard;
