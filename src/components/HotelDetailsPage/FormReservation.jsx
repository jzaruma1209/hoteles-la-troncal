import { useForm } from "react-hook-form";
import useCrud from "../../hooks/useCrud";
import { useNavigate } from "react-router-dom";
import "./styles/FormReservation.css";

const FormReservations = ({ hotelId }) => {
  const { reset, handleSubmit, register } = useForm();
  const [, getData, postData] = useCrud();
  const navigate = useNavigate();

  const submit = (data) => {
    const url = "https://hotels-api.academlo.tech/bookings";
    const objData = { ...data, hotelId };

    postData(url, objData, true);
    reset({
      checkIn: "",
      checkOut: "",
    });
    navigate("/reservations");
  };

  return (
    <form className="form-reservation" onSubmit={handleSubmit(submit)}>
      <h3 className="form-reservation__title">Make your reservation here:</h3>
      <label className="form-reservation__field">
        <span className="form-reservation__label">Check-in</span>
        <input
          className="form-reservation__input"
          {...register("checkIn")}
          type="date"
        />
      </label>
      <label className="form-reservation__field">
        <span className="form-reservation__label">Check-out</span>
        <input
          className="form-reservation__input"
          {...register("checkOut")}
          type="date"
        />
      </label>
      <button className="form-reservation__button" type="submit">
        Reserve a Room
      </button>
    </form>
  );
};

export default FormReservations;
