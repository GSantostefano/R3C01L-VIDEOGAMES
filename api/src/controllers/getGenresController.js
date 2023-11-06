// Esta función se utiliza para obtener los géneros de videojuegos desde la API de Rawg, 
// almacenarlos en una base de datos si la tabla de géneros está vacía y 
//luego devolver los nombres de los géneros almacenados en la base de datos. 
// Esto es útil para asegurarse de que siempre tengas una lista actualizada de géneros disponibles en tu base de datos para utilizar en tu aplicación.


const axios = require("axios");
require("dotenv").config();
const URL = `${process.env.API_URL}/genres?key=${process.env.API_KEY}`;
const { Genre } = require("../db");

const allGenres = async () => {
  const response = await axios.get(URL);
// array con todos los géneros
  const data = response.data.results;
  const nameGenres = data?.map(n => n.name);

// verifica que la tabla Genres esté vacía
  const genreCount = await Genre.count();
  if (genreCount === 0) {
    const genreData = nameGenres.map(name => ({ name }))
    await Genre.bulkCreate(genreData);
  }
  
  const genresFromDatabase = await Genre.findAll(
    {
      attributes: ['name'],
    }
  );
  const genreNamesFromDatabase = genresFromDatabase.map(genres => (genres));

  return genreNamesFromDatabase;
}
module.exports = allGenres;


