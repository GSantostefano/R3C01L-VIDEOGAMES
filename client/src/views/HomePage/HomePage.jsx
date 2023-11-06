import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames, setCurrentPage } from "../../redux/actions/actions";
import style from "./HomePage.module.css";
import Cards from "../../components/cards/Cards";
import PageIndex from "../../components/PageIndex/PageIndex";
import Nav from "../../components/Nav/Nav";

function Home() {
  const dispatch = useDispatch();
  const videogames = useSelector((state) => state.videogames);
  const currentPage = useSelector((state) => state.currentPage);
  const videogamesPerPage = useSelector((state) => state.videogamesPerPage);
  const totalPages = Math.ceil(videogames.length / videogamesPerPage);

  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (initialLoad) {
      dispatch(getVideogames()).then(() => {
        setInitialLoad(false); // Establece initialLoad en false después de la carga inicial
      });
    }
  }, [dispatch, initialLoad]);
  

  const indexOfLastVideogame = currentPage * videogamesPerPage;
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
  const currentVideogames = videogames.slice(indexOfFirstVideogame, indexOfLastVideogame);

  const paginate = (pageNumber) => {
    if (videogames.length > 0) {
      dispatch(setCurrentPage(pageNumber));
    }
  };

  const startPage = (currentPage - 1) * videogamesPerPage;
  const endPage = startPage + videogamesPerPage;
  const currentVideogamesForPagination = videogames.slice(startPage, endPage);

  const PreviousPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  const NextPage = () => {
    const totalPages = Math.ceil(videogames.length / videogamesPerPage);
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  return (
    <div>
      <Nav />
      <div>
      <PageIndex
          totalPages={Math.ceil(videogames.length / videogamesPerPage)}
          currentPage={currentPage}
          onPageChange={paginate}
        />
      </div>

      <div>
      <Cards videogames={currentVideogames} />
      </div>

      <div className={style.botones}>
      <button onClick={PreviousPage} disabled={currentPage === 1}>
          Anterior
      </button>

        <div className={style.pageNum}>{currentPage}</div>

        <button onClick={NextPage} disabled={currentPage >= totalPages}>
            Siguiente
          </button>
      </div>
    </div>
  );
}

export default Home;
