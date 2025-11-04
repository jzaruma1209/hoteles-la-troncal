import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import HotelCard from "../Home/HotelCard";
import "./styles/OtherHotels.css";

const OtherHotels = ({ city }) => {
  const [hotelsByCity, getHotelsByCity, loading, error] = useFetch();
  const { id } = useParams();

  useEffect(() => {
    if (city) {
      const url = `https://hotels-api.academlo.tech/hotels?city=${city.id}`;
      getHotelsByCity(url);
    }
  }, [city]);

  const otherHotels =
    hotelsByCity?.results?.filter((hotel) => hotel.id !== parseInt(id)) || [];

  return (
    <section>
      <h3>
        Other Hotels in{" "}
        <span>
          {city?.name}, {city?.country}
        </span>
      </h3>
      <div className="other-hotels-container">
        {loading ? (
          <p>Loading other hotels...</p>
        ) : error ? (
          <p>Error loading hotels: {error}</p>
        ) : hotelsByCity ? (
          otherHotels.length > 0 ? (
            <div className="other-hotels-grid">
              {otherHotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          ) : (
            <div>
              <p>No other hotels found in this city.</p>
              <p>
                <small>
                  Total hotels in {city?.name}:{" "}
                  {hotelsByCity.results?.length || 0}
                </small>
              </p>
            </div>
          )
        ) : (
          <p>Waiting for city data...</p>
        )}
      </div>
    </section>
  );
};

export default OtherHotels;
