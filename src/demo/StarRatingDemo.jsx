import StarRating from "../components/shared/StarRating";
import "./styles/StarRatingDemo.css";

const StarRatingDemo = () => {
  const handleRatingChange = (rating) => {
    console.log("Rating seleccionado:", rating);
  };

  return (
    <div className="star-demo">
      <div className="star-demo__container">
        <h1 className="star-demo__title">⭐ Star Rating Component Demo</h1>

        <div className="star-demo__grid">
          {/* Interactivo Normal */}
          <div className="star-demo__item">
            <h3>Interactivo - Tamaño Medium</h3>
            <StarRating
              rating={0}
              onRatingChange={handleRatingChange}
              size="medium"
            />
          </div>

          {/* Tamaño Pequeño */}
          <div className="star-demo__item">
            <h3>Tamaño Small</h3>
            <StarRating
              rating={3}
              size="small"
              onRatingChange={handleRatingChange}
            />
          </div>

          {/* Tamaño Grande */}
          <div className="star-demo__item">
            <h3>Tamaño Large</h3>
            <StarRating
              rating={4}
              size="large"
              onRatingChange={handleRatingChange}
            />
          </div>

          {/* Solo lectura con diferentes ratings */}
          <div className="star-demo__item">
            <h3>Solo Lectura - 1 Estrella</h3>
            <StarRating rating={1} readonly={true} size="small" />
          </div>

          <div className="star-demo__item">
            <h3>Solo Lectura - 3 Estrellas</h3>
            <StarRating rating={3} readonly={true} size="small" />
          </div>

          <div className="star-demo__item">
            <h3>Solo Lectura - 4.5 Estrellas</h3>
            <StarRating rating={4.5} readonly={true} size="small" />
          </div>

          <div className="star-demo__item">
            <h3>Solo Lectura - 5 Estrellas</h3>
            <StarRating rating={5} readonly={true} size="small" />
          </div>

          {/* Solo estrellas sin texto */}
          <div className="star-demo__item">
            <h3>Solo Estrellas</h3>
            <StarRating
              rating={5}
              showValue={false}
              showText={false}
              onRatingChange={handleRatingChange}
            />
          </div>

          {/* Solo valor sin texto */}
          <div className="star-demo__item">
            <h3>Solo con Valor</h3>
            <StarRating
              rating={3.5}
              showText={false}
              onRatingChange={handleRatingChange}
            />
          </div>
        </div>

        <div className="star-demo__usage">
          <h3>📋 Cómo usar:</h3>
          <pre className="star-demo__code">
            {`// Básico
<StarRating />

// Con configuración interactiva
<StarRating 
  rating={4}
  size="large"
  onRatingChange={(rating) => console.log(rating)}
/>

// Solo lectura - muestra estrellas según el rating
<StarRating 
  rating={4.5}
  readonly={true}
  size="small"
/>

// Ejemplos de solo lectura con diferentes ratings:
<StarRating rating={1} readonly={true} />  // 1 estrella
<StarRating rating={3} readonly={true} />  // 3 estrellas  
<StarRating rating={5} readonly={true} />  // 5 estrellas`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default StarRatingDemo;
