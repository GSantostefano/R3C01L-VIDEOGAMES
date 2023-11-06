import {
    GET_VIDEOGAMES,
    GET_VIDEOGAME_NAME,
    GET_VIDEOGAMES_ID,
    GET_GENRES,
    POST_VIDEOGAMES,
    FILTER,
    ORDER,
    FILTER_BY_GENRES,
    PAGE,
    FILTER_RATING,
    UPDATE_FILTERS,
    /////////////////
    SET_CURRENT_PAGE,
    SET_VIDEOGAMES_PER_PAGE,
    //////////////////////
  } from "../actions/actions_types";
  
  const initialState = {
    videogames: [],
    videogamesCopy: [],
    videogamesOrigin: [],
    id: [],
    genres: [],
    plataforms:[],
    pageActual: 1,
    currentPage: 1,
    videogamesPerPage: 9,

    allVideogamesAPI: [],
    allVideogamesBD:[],

    VideogamesALL:true,
    VideogamesApi:true,
    VideogamesDB:true,
 
  };
  
  const rootReducer = (state = initialState, { type, payload }) => {

    switch (type) {
    case UPDATE_FILTERS:
      if (payload === "All Videogames") {
        return {...state,VideogamesALL: true, VideogamesApi: true, VideogamesDB: true }
      }else if (payload === "Api") {
        return{...state, VideogamesALL: false, VideogamesApi: true, VideogamesDB: false};
      }else if (payload === "BD") {
        return {...state, VideogamesALL: false, VideogamesApi: false, VideogamesDB: true };
      }


      case FILTER_BY_GENRES:
        const selectedGenre = payload;
        const auxAPI = state.allVideogamesAPI;
        const auxBD = state.allVideogamesBD;
        const auxALL = state.videogamesOrigin;
      
        let filteredVideoGames = [];
      
        if (state.VideogamesALL) {
          console.log("aca paso if 3");
          console.log("auxALL", auxALL);
      
          // Combinar resultados de API y BD
          filteredVideoGames = [...auxAPI, ...auxBD].filter((videogame) => {
            if (Array.isArray(videogame.genres) || Array.isArray(videogame.Genres)) {
              return (
                videogame.genres?.some((genre) => genre.name === selectedGenre) ||
                videogame.Genres?.some((genre) => genre.name === selectedGenre)
              );
            }
          });
        }else if (state.VideogamesDB) {
          console.log("aca paso if 2");
          console.log("auxBD", auxBD);
      
          filteredVideoGames = auxBD.filter((videogame) => {
            if (Array.isArray(videogame.Genres)) {
              return videogame.Genres.some((genre) => genre.name === selectedGenre);
            }
          });
        } else if (state.VideogamesApi) {
          console.log("aca paso if 1");
          console.log("auxAPI", auxAPI);
      
          filteredVideoGames = auxAPI.filter((videogame) => {
            if (Array.isArray(videogame.genres)) {
              return videogame.genres.some((genre) => genre.name === selectedGenre);
            }
          });
        } 
      
return {
  ...state,
  videogames: filteredVideoGames ?? [],
  currentPage: 1,
};


  case FILTER:
        
  if (payload === "Api") {
    const auxApi = state.videogamesCopy.filter(
      (videogame) => typeof videogame.id === "number"
    );
    
    return { ...state,videogames:auxApi, allVideogamesAPI: auxApi,currentPage: 1, };
  }
  else if (payload === "BD") {
    const auxBD = state.videogamesCopy.filter(
      (videogame) => typeof videogame.id === "string"
    );
    
    return { ...state,videogames: auxBD, allVideogamesBD: auxBD,currentPage: 1, };
  } else {
    return {
      ...state,
      videogames: state.videogamesCopy, 
      currentPage: 1,
    }};

      case SET_CURRENT_PAGE:
    return { ...state, currentPage: payload };
      case SET_VIDEOGAMES_PER_PAGE:
    return { ...state, videogamesPerPage: payload };
      case GET_VIDEOGAMES:
        return {
          ...state,
          videogames: payload,
          videogamesCopy: payload,
          videogamesOrigin: payload,
        };
      case GET_VIDEOGAME_NAME:
        state.videogamesCopy = payload;
        return {
          ...state,
          videogames: state.videogamesCopy,
          currentPage: 1,
        };
      case GET_VIDEOGAMES_ID:
        return {
          ...state,
          id: payload,
        };
      case GET_GENRES:
        return {
          ...state,
          genres: payload,
        };

      case POST_VIDEOGAMES:
        return {
          ...state,
        };

      case ORDER:

        if (payload === "AscendingAZ" || payload === "DescendingZA") {
          const alphabetic = [...state.videogames];
          const alphabeticCopy = [...state.videogamesCopy];
          return {
            ...state,
            videogames:
              payload === "AscendingAZ"
                ? alphabetic.sort((a, b) => a.name.localeCompare(b.name))
                : alphabetic.sort((a, b) => b.name.localeCompare(a.name)),
                currentPage: 1,
            videogamesCopy:
              payload === "AscendingAZ"
                ? alphabeticCopy.sort((a, b) => a.name.localeCompare(b.name))
                : alphabeticCopy.sort((a, b) => b.name.localeCompare(a.name)),
                currentPage: 1,
          };
        }

      case FILTER_RATING:
          const ratingToFilter = [...state.videogames]
          return {
            ...state,
            videogames:
              payload === "DES"
                ? ratingToFilter.sort((a, z) => z.rating - a.rating)
                : ratingToFilter.sort((a, z) => a.rating - z.rating),
                currentPage: 1,
            
          };
      case PAGE:
        return {
          ...state,
        pageActual: payload,
        };

      default:
        return { ...state };
    };
  };
  export default rootReducer;
  