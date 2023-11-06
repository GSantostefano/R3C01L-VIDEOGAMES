import style from "./Cards.module.css";
import Card from "../card/Card";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getVideogames } from "../../redux/actions/actions";
import Loading from "../Loading/Loading"; 

const Cards = ({videogames}) => {

  const allVideogames = useSelector((state) => state.videogames);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // Agrega el estado loading

  useEffect(() => {
    if (allVideogames.length === 0) {
      dispatch(getVideogames())
        .then(() => {
          setLoading(false); // Cuando la carga se completa, establece loading en false
        });
    } else {
      setLoading(false); // Si ya hay datos en el estado, establece loading en false
    }
  }, [dispatch, allVideogames.length]);

  if (loading) {
    return <Loading />; // Muestra el componente Loading mientras se carga
  }

  return (
    <div className={style.grid}>
    {videogames.length === 0 ? (
      <div className={style.cartel}>
        No games found. Reloading All VIDEOGAMES....
      </div>
    ) : (
      videogames.map((videogame) => (
        <Card
          key={videogame.id}
          id={videogame.id}
          Genres={videogame.Genres||videogame.genres}
          rating={videogame.rating}
          name={videogame.name}
          image={videogame.image ? videogame.image : videogame.background_image}
        />
      ))
    )}
  </div>
    
  
  );
  
};

export default Cards;
