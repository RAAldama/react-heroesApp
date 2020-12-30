import React, { useMemo } from "react";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import HeroCard from "../heroes/HeroCard";
import { getHeroByName } from "../../selectors/getHeroByName";

const SearchScreen = ({ history }) => {
  const location = useLocation();
  const { q = "" } = queryString.parse(location.search);

  const [formValues, handleInputChange] = useForm({ hero: q });
  const { hero } = formValues;

  const heroesFiltered = useMemo(() => getHeroByName(q), [q]);

  const handleSearch = (e) => {
    e.preventDefault();
    history.push(`?q=${hero}`);
  };

  return (
    <div>
      <h1>Search!</h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <h4>Busqueda</h4>
          <hr />

          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder0="Search a hero!"
              className="form-control"
              name="hero"
              value={hero}
              onChange={handleInputChange}
            />

            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-outline-info mt-1 btn-block"
              >
                Agregar
              </button>
            </div>
          </form>
        </div>

        <div className="col-7">
          <h4>Heroes encontrados</h4>
          <hr />

          {q === "" && (
            <div className="alert alert-info">¡Busca tu heroe favorito!</div>
          )}

        {(q !== "" && heroesFiltered.length === 0) && (
            <div className="alert alert-danger">No existe un heroe en la base con el nombre {q}</div>
          )}

          {heroesFiltered.map((hero) => (
            <HeroCard key={hero.id} {...hero} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchScreen;
