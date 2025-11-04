import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCrud from "../hooks/useCrud";
import "./styles/ReservationsPage.css";
import BookCard from "../components/ReservationPage/BookCard";
import FormReviews from "../components/ReservationPage/FormReviews";
import { useForm } from "react-hook-form";

const ReservationsPage = () => {
  const [reservations, getReservations, , deleteReservation] = useCrud();
  const [bookSelected, setBookSelected] = useState();
  const [formIsOpen, setFormIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const url = "https://hotels-api.academlo.tech/bookings";
    const token = localStorage.getItem("token");

    if (token) {
      getReservations(url, token);
    } else {
      console.error("No token found in localStorage");
    }
  }, []);

  console.log(reservations);

  return (
    <section className="reservations flex-container">
      <h2 className="reservations__title">Reservations</h2>
      {formIsOpen && bookSelected && (
        <FormReviews
          formIsOpen={formIsOpen}
          setFormIsOpen={setFormIsOpen}
          bookSelected={bookSelected}
          setBookSelected={setBookSelected}
        />
      )}
      <div className="reservations__container flex-container">
        {reservations && reservations.length === 0 ? (
          <div className="no-reservations">
            <div className="no-reservations__icon">🏨</div>
            <h3 className="no-reservations__title">You have no reservations</h3>
            <p className="no-reservations__message">
              You haven't made a reservation yet! Explore our selection of
              hotels and find the perfect place for your next adventure.
            </p>
            <button
              className="no-reservations__btn"
              onClick={() => navigate("/")}
            >
              explore hotels
            </button>
          </div>
        ) : (
          reservations?.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              deleteReservation={deleteReservation}
              setBookSelected={setBookSelected}
              setFormIsOpen={setFormIsOpen}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default ReservationsPage;
