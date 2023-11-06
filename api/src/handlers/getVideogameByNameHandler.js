const getVideogameByNameController = require("../controllers/getVideogameByNameController");

const getVideogameByNameHandler = async (req, res) => {
    
    try {
        const { name } = req.query;
        const arrayResult = await getVideogameByNameController(name);
        res.status(200).json(arrayResult);
    } catch (error) {
        res.status(408).json({ error: error.message });
    }
};

module.exports = getVideogameByNameHandler;
