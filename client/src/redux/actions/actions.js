import axios from "axios";
import {
  GET_VIDEOGAMES,
  GET_VIDEOGAME_NAME,
  GET_VIDEOGAMES_ID,
  GET_GENRES,
  POST_VIDEOGAMES,
  FILTER,
  ORDER,
  FILTER_BY_GENRES,
  FILTER_RATING,
  PAGE,
  SET_CURRENT_PAGE,
  SET_VIDEOGAMES_PER_PAGE,
  UPDATE_FILTERS,
} from "./actions_types";



export const updateFilters = (filters) => {
  console.log("filters", filters);
 return{
  type: UPDATE_FILTERS,
  payload: filters,
}};

export const getVideogames = () => {
  return async (dispatch) => {
    const { data } = await axios.get("http://localhost:3001/videogames");
    dispatch({
      type: GET_VIDEOGAMES,
      payload: data,
    });
  };
};

export const getVideogameName = (name) => {
  return async (dispatch) => {
    const { data } = await axios.get(
      `http://localhost:3001/videogames?name=${name}`
    );
    dispatch({
      type: GET_VIDEOGAME_NAME,
      payload: data,
    });
  };
};

export const getVideogamesId = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`http://localhost:3001/videogames/id/${id}`);
    dispatch({
      type: GET_VIDEOGAMES_ID,
      payload: data,
    });
  };
};

export const getGenres = () => {
  return async (dispatch) => {
    try {
      const apiData = await axios.get('http://localhost:3001/genres');
      const genres = apiData.data;
      dispatch({
        type: GET_GENRES,
        payload: genres,
      })
    } catch (error) {
      console.log(error.message, 'error en géneros');
    }
  }
}


export const filterByGenres = (payload) => {
  return {
    type: FILTER_BY_GENRES,
    payload: payload,
  };
};

export const createVideogames = (videogame) => {
  return async (dispatch) => {
    const { data } = await axios.post(
      "http://localhost:3001/videogames",
      videogame
    );
    return {
      type: POST_VIDEOGAMES,
      payload: data,
    };
  };
};

export const filterVideogame = (filter) => {
  return {
    type: FILTER,
    payload: filter,
  };
};

export const orderVideogames = (order) => {
  return {
    type: ORDER,
    payload: order,
  };
};

export function filterByRating(payload) {
  return {
      type: FILTER_RATING,
      payload: payload
  }
}

export const setPage = (page) =>{
  return {
    type: PAGE,
    payload: page
  }
}

export const setCurrentPage = (page) => ({
  type: SET_CURRENT_PAGE,
  payload: page,
});

export const setVideogamesPerPage = (perPage) => ({
  type: SET_VIDEOGAMES_PER_PAGE,
  payload: perPage,
});
//////////////////