const allDataGames = require("../controllers/getVideogamesController");
const getVideogameByNameController = require("../controllers/getVideogameByNameController");
const getAllVideogames = async (req, res) => {

  const {name} = req.query;

  try {
    
    
    const videogames = name? await getVideogameByNameController(name) : await allDataGames();
    res.status(200).json(videogames);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = getAllVideogames;
