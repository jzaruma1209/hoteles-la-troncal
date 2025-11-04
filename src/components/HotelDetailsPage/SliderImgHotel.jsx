import { useState } from "react";
import "./styles/SliderImgHotel.css";

const SliderImgHotel = ({ hotel }) => {
  const [imgSelected, setImgSelected] = useState(0);

  // Si no hay imágenes, no renderizar nada
  if (!hotel?.images || hotel.images.length === 0) {
    return <div>No hay imágenes disponibles</div>;
  }

  const handlePrev = () => {
    if (imgSelected > 0) {
      setImgSelected(imgSelected - 1);
    } else {
      // Si está en la primera imagen (0), ir a la última
      setImgSelected(hotel?.images?.length - 1);
    }
  };

  const handleNext = () => {
    const lengthImgs = hotel?.images?.length - 1;
    if (imgSelected < lengthImgs) {
      setImgSelected(imgSelected + 1);
    } else {
      // Si está en la última imagen, volver a la primera (0)
      setImgSelected(0);
    }
  };

  const objStyle = {
    transform: `translateX(-${imgSelected * 100}%)`,
  };

  return (
    <div className="slider flex-container">
      <i
        className="bx bxs-chevron-left slider__btn slider__btn--prev flex-container"
        onClick={handlePrev}
      ></i>
      <div className="slider__container" style={objStyle}>
        {hotel?.images?.map((image, index) => (
          <div className="slider__img-container" key={index}>
            <img className="slider__img" src={image.url} alt={hotel?.name} />
          </div>
        ))}
      </div>
      <i
        className="bx bxs-chevron-right slider__btn slider__btn--next flex-container"
        onClick={handleNext}
      ></i>
    </div>
  );
};

export default SliderImgHotel;
