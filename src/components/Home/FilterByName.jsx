import { useRef } from "react";
import "./styles/FilterByName.css";

const FilterByName = ({ setNameFiltered }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    setNameFiltered(inputSearch.current.value.trim().toLowerCase());
  };

  const inputSearch = useRef();

  return (
    <div className="filter-container">
      <form className="filter-form" onSubmit={handleSubmit}>
        <input
          ref={inputSearch}
          type="text"
          className="filter-input"
          placeholder="Search hotels by name..."
          autoComplete="off"
        />
        <button type="submit" className="filter-button">
          <i className="bx bx-search"></i>
          Search
        </button>
      </form>
    </div>
  );
};

export default FilterByName;
