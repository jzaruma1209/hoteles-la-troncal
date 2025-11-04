import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useDispatch } from "react-redux";
import { getHotelsThunk } from "../../store/slices/products.slice";
import "./styles/FilterByCity.css";

const FilterByCity = ({ setNameFiltered, setPriceFiltered }) => {
  const [cities, getCities] = useFetch();
  const dispatch = useDispatch();

  useEffect(() => {
    const url = "https://hotels-api.academlo.tech/cities";
    getCities(url);
  }, []);

  const handleCities = (cityId) => {
    const url = `https://hotels-api.academlo.tech/hotels${
      cityId ? `?cityId=${cityId}` : ""
    }`;
    dispatch(getHotelsThunk(url));
    setNameFiltered("");
    setPriceFiltered({
      from: 0,
      to: Infinity,
    });
  };

  return (
    <article className="filter-by-city">
      <h3>Cities</h3>
      <ul>
        <li onClick={() => handleCities()}>All Cities</li>
        {cities?.map((city) => (
          <li onClick={() => handleCities(city.id)} key={city.id}>
            {city.name}
          </li>
        ))}
      </ul>
    </article>
  );
};

export default FilterByCity;
