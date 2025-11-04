import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHotelsThunk } from "../store/slices/products.slice";
import HotelCard from "../components/Home/HotelCard";
import "./styles/HomePage.css"; //
import FilterByName from "../components/Home/FilterByName";
import FilterByCity from "../components/Home/FilterByCity";
import FilterByPrice from "../components/Home/FilterByPrice";
const homePage = () => {
  const [nameFiltered, setNameFiltered] = useState("");
  const [priceFiltered, setPriceFiltered] = useState({
    from: 0,
    to: Infinity,
  });
  const products = useSelector((states) => states.products);
  const dispatch = useDispatch();

  useEffect(() => {
    const url = "https://hotels-api.academlo.tech/hotels"; // URL corregida
    dispatch(getHotelsThunk(url));
  }, []);

  const callbackFilter = (hotel) => {
    // Filter by Name
    const filterName = hotel.name.toLowerCase().includes(nameFiltered);
    // Filter by Price
    const price = hotel.price;
    const filterByPrice =
      price >= priceFiltered.from && price <= priceFiltered.to;

    return filterName && filterByPrice;
  };

  console.log(products);

  if (!products) {
    return <div>Cargando hoteles...</div>;
  }

  return (
    <section className="home">
      {/* Barra de búsqueda arriba */}
      <div>
        <FilterByName setNameFiltered={setNameFiltered} />
      </div>

      {/* Layout de dos columnas: Main + Sidebar */}
      <div className="home__content">
        {/* Contenido principal - Hoteles */}
        <main className="home__main">
          <div className="hotels__container flex-container">
            {products.length === 0 ? (
              <div>No hay hoteles disponibles.</div>
            ) : (
              products
                .filter(callbackFilter)
                .slice(0, 10)
                .map((hotel) => <HotelCard key={hotel.id} hotel={hotel} />)
            )}
          </div>
        </main>

        {/* Sidebar derecho - Filtros */}
        <aside className="home__sidebar">
          <h3>Filters</h3>
          <FilterByPrice setPriceFiltered={setPriceFiltered} />
          <FilterByCity
            setNameFiltered={setNameFiltered}
            setPriceFiltered={setPriceFiltered}
          />
        </aside>
      </div>
    </section>
  );
};

export default homePage;
