const getVideogameByIdController = require("../controllers/getVideogameByIdController");

const getVideogameByIdHandler = async (req, res) => {
  try {
    const idVideogame = req.params.idVideogame;
    const genres = await getVideogameByIdController(idVideogame) 
    res.status(200).json(genres)
  } catch (error) {
    res.status(404).json({error: error.message})
  }
}

module.exports = getVideogameByIdHandler;