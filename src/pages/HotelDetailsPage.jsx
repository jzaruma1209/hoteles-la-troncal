import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useEffect } from "react";
import StartGenerator from "../components/shared/StartGenerator";
import OtherHotels from "../components/HotelDetailsPage/OtherHotels";
import HotelMap from "../components/HotelDetailsPage/HotelMap";
import FormReservation from "../components/HotelDetailsPage/FormReservation";
import Review from "../components/HotelDetailsPage/Review";
import SliderImgHotel from "../components/HotelDetailsPage/SliderImgHotel";
import "./styles/HotelDetailsPage.css";

const HotelDetailsPage = () => {
  const { id } = useParams();
  const [hotel, getHotel] = useFetch();

  useEffect(() => {
    const url = `https://hotels-api.academlo.tech/hotels/${id}`;
    getHotel(url);
  }, [id]);

  console.log(hotel);

  return (
    <div className="hotel-details-container">
      <section className="hotel-details">
        {/* Breadcrumb Navigation */}
        <div className="hotel-details__breadcrumb">
          <div className="breadcrumb-container">
            <a href="/" className="breadcrumb-link">
              <i className="bx bx-chevron-left"></i>
              Ver todas las propiedades
            </a>
          </div>
        </div>

        {/* Hotel Image Gallery & Map */}
        <div className="hotel-details__image-section">
          <div className="hotel-details__slider-container">
            <SliderImgHotel hotel={hotel} />
          </div>
          <div className="hotel-details__map-preview">
            <div className="map-preview__header">
              <h3 className="map-preview__title">Ubicación</h3>
              <span className="map-preview__address">
                {hotel?.address}, {hotel?.city?.name}
              </span>
            </div>
            <div className="map-preview__container">
              {hotel && <HotelMap lat={hotel?.lat} lon={hotel?.lon} />}
            </div>
          </div>
        </div>

        {/* Hotel Main Info */}
        <div className="hotel-details__main-content">
          {/* Left Content */}
          <div className="hotel-details__left-content">
            {/* Hotel Header */}
            <header className="hotel-details__header">
              <div className="hotel-details__header-top">
                <h1 className="hotel-details__title">{hotel?.name}</h1>
                <div className="hotel-details__actions">
                  <button className="action-btn">
                    <i className="bx bx-share-alt"></i>
                    Compartir
                  </button>
                  <button className="action-btn action-btn--favorite">
                    <i className="bx bx-heart"></i>
                    Guardar
                  </button>
                </div>
              </div>

              {/* Rating */}
              <div className="hotel-details__rating-section">
                <div className="hotel-details__rating-container">
                  {hotel?.rating && <StartGenerator rating={hotel.rating} />}
                  <span className="hotel-details__rating-value">
                    {hotel?.rating}
                  </span>
                  <span className="hotel-details__rating-label">
                    Excepcional
                  </span>
                  <span className="hotel-details__reviews-count">
                    Ver las 1,004 opiniones
                  </span>
                </div>
              </div>

              {/* Location */}
              <div className="hotel-details__location">
                <i className="bx bx-map hotel-details__location-icon"></i>
                <address className="hotel-details__address">
                  {hotel?.address}, {hotel?.city.name}, {hotel?.city.country}
                </address>
                <a href="#map" className="hotel-details__location-link">
                  Excelente ubicación - Ver el mapa
                </a>
              </div>
            </header>

            {/* Hotel Amenities */}
            <div className="hotel-details__amenities">
              <h3 className="amenities__title">Información de la propiedad</h3>
              <div className="amenities__grid">
                <div className="amenity-item">
                  <i className="bx bx-wifi amenity-icon"></i>
                  <span>Desayuno incluido</span>
                </div>
                <div className="amenity-item">
                  <i className="bx bx-car amenity-icon"></i>
                  <span>Gimnasio</span>
                </div>
                <div className="amenity-item">
                  <i className="bx bx-dumbbell amenity-icon"></i>
                  <span>Para no fumadores</span>
                </div>
                <div className="amenity-item">
                  <i className="bx bx-wifi amenity-icon"></i>
                  <span>Acepta mascotas</span>
                </div>
                <div className="amenity-item">
                  <i className="bx bx-swim amenity-icon"></i>
                  <span>Alberca</span>
                </div>
                <div className="amenity-item">
                  <i className="bx bx-building amenity-icon"></i>
                  <span>Lavandería</span>
                </div>
              </div>
              <button className="amenities__see-more">
                Ver todos los detalles de la propiedad
                <i className="bx bx-chevron-right"></i>
              </button>
            </div>

            {/* Hotel Description */}
            <div className="hotel-details__description">
              <p className="hotel-details__description-text">
                {hotel?.description}
              </p>
            </div>

            {/* Map Section */}
            <div className="hotel-details__map-section" id="map">
              <h3 className="map-section__title">Explora la zona</h3>
              {hotel && <HotelMap lat={hotel?.lat} lon={hotel?.lon} />}
            </div>
          </div>

          {/* Right Content - Reservation Form */}
          <div className="hotel-details__right-content">
            <section className="hotel-details__form-section">
              <FormReservation hotelId={hotel?.id} />
            </section>
          </div>
        </div>
        <div className="hotel-details__reviews-section">
          <Review hotelId={hotel?.id} />
        </div>

        <div className="hotel-details__other-hotels">
          <OtherHotels city={hotel?.city} id={hotel?.id} />
        </div>
      </section>
    </div>
  );
};

export default HotelDetailsPage;
