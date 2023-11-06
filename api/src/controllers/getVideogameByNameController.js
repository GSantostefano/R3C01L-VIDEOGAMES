const axios = require("axios");
require("dotenv").config(); // Cargar variables de entorno desde el archivo .env
const { Op } = require("sequelize"); // Importar el operador "Op" para consultas de Sequelize
const { Videogame } = require("../db"); // Importar el modelo de Videogame desde el archivo db.js

const getVideogameByNameController = async (nameSolicitado) => {
  // Obtener las variables de entorno VG_URL y API_KEY desde el archivo .env
  const { VG_URL, API_KEY } = process.env;

  // Construir la URL de la API de videojuegos utilizando las variables de entorno
  const url = `${VG_URL}?search=${nameSolicitado}&key=${API_KEY}`;

  // Realizar una solicitud GET a la URL de la API utilizando Axios
  const response = await axios.get(url);

  // Mapear los resultados de la API a un formato deseado
  const arrayResultApi = response.data.results.map((vg) => {
    const { id, name, released, background_image, rating, platforms, description } = vg;
    
    const formattedPlatforms = platforms.map((plat) => plat.name);
    
    return {
      id,
      name,
      released,
      image: background_image,
      rating,
      platforms: formattedPlatforms,
      description,
    };
  });

  // Realizar una consulta a la base de datos usando Sequelize para buscar videojuegos que coincidan con el nombre solicitado
  const DBVideogames = await Videogame.findAll({
    where: {
      name: { [Op.iLike]: `%${nameSolicitado}%` }, // Realiza una búsqueda insensible a mayúsculas/minúsculas
    },
  });

  // Combinar los resultados de la API y la base de datos en un solo arreglo
  const allVideogames = DBVideogames.concat(arrayResultApi);

  // Comprobar si no se encontraron videojuegos con el nombre solicitado
  if (allVideogames.length === 0) {
    return console.error("No videogames with this name were found");
  } else {
    // Devolver los primeros 15 videojuegos encontrados
    return allVideogames.slice(0, 1);
  }
};

module.exports = getVideogameByNameController;
