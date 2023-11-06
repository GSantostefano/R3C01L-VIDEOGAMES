import style from "./OrderFilter.module.css";
import { useDispatch, useSelector } from "react-redux";
import { filterVideogame,orderVideogames,filterByGenres,filterByRating,updateFilters } from "../../redux/actions/actions";
import { useState } from "react";
import { getGenres } from "../../redux/actions/actions";
import { useEffect } from "react";

const OrderFilter = () => {
  const dispatch = useDispatch();
  const [aux, setAux] = useState(false);
  // const [selectedGenre, setSelectedGenre] = useState(false);
  const genres = useSelector((state) => state.genres);
  const VideogamesALL = useSelector((state) => state.VideogamesALL);
  const VideogamesApi = useSelector((state) => state.VideogamesApi);
  const VideogamesDB = useSelector((state) => state.VideogamesDB);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);


  const handleFilter = (event) => {
    const filterValue = event.target.value;
    dispatch(filterVideogame(filterValue)); // Actualiza el filtro en el estado global
    dispatch(updateFilters(filterValue));
    // Actualiza las variables globales según la opción seleccionada



  };

  
  function handleSelectChange(event) {
    if (event.target.value === "ASC" || event.target.value === "DES") {
      dispatch(filterByRating(event.target.value));
    } else {
      dispatch(orderVideogames(event.target.value));
    
    }
  }


  const handleFilterGenres = (event) => {
    dispatch(filterByGenres(event.target.value))
    setAux(!aux);
  }
  return (
    <div className={style.container}>
    <p className={style.orden}>Ordenar y Filtrar:</p>
    <div  className={style.orden}>
        <div >
          <select onChange={handleSelectChange} className={style.option}>
          <option value="default" disabled>Order</option>
            <option value="AscendingAZ">Ascendente A-Z</option>
            <option value="DescendingZA">Descendente Z-A</option>
            <option value="ASC">Rating lowest</option>
            <option value="DES">Rating best</option>
          </select>
        </div>

        </div>
        <div>

        <select className={style.option} onChange={(e)=> handleFilterGenres(e)} defaultValue='default'>
        <option value="default" disabled>Filter by Genre</option>
        
        {
          genres?.map((genre) => (
            <option 
            key={genre.name} 
            value={genre.name}>
            {genre.name}
            </option>
        ))
        }
      </select>

 
    </div>


    <div className={style.labels}>
      <label htmlFor="allVideogames" className={style.label}>
        {" "}
        ALL
        <input
          type="radio"
          name="filter"
          id="allVideogames"
          value="All Videogames"
          onChange={handleFilter}
        />
      </label>


      <label htmlFor="api" className={style.label}>
        {" "}
        <span className={style.radio}>API</span>
        <input
          type="radio"
          name="filter"
          id="api"
          value="Api"
          onChange={handleFilter}
        />
      </label>
      <label  htmlFor="baseDeDatos" className={style.label}>
        {" "}
        DB
        <input
          type="radio"
          name="filter"
          id="baseDeDatos"
          value="BD"
          onChange={handleFilter}
        />
      </label >
    </div>
  
    
  </div>
  
  );
};

export default OrderFilter;
