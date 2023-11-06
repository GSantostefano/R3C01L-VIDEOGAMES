import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getVideogameName, getVideogames } from "../../redux/actions/actions";
import style from "./SearchBar.module.css";
import { Link } from "react-router-dom";
import {useLocation} from "react-router-dom";


const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setNombre] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name) {
      return setError("Ingrese un nombre válido");
    } else {
      dispatch(getVideogameName(name));
      setNombre(""); // Restablecer el valor del input a una cadena vacía
    }
  };

  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);

  const handleChange = (event) => {
    event.preventDefault();
    setNombre(event.target.value);
  };

  const handleClear = (event) => {
    event.preventDefault();
    dispatch(getVideogames());
    setNombre(""); // Restablecer el valor del input a una cadena vacía
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  
  return (
    <div>

      <div className={style.content}>
        <input
          type="text"
          placeholder="BUSCAR..."
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          value={name}
          className={style.input}
        />
        <button className={style.btnBuscar} type="submit" onClick={handleSubmit}>
          BUSCAR VIDEOGAMES
        </button>
        <button className={style.btnBuscar} onClick={handleClear}>
          RESET
        </button>
      </div>
    </div>
  );
  
};

export default SearchBar;
