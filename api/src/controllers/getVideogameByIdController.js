const { Videogame, Genre} = require ("../db");

const axios = require("axios");

require("dotenv").config();
const { VG_URL, API_KEY } = process.env;

const getVideogameByIdController = async(idVideogame) => {
    
    if (idVideogame.includes("-")) {
        console.log("searching DB...");
        const DBResponse = await Videogame.findByPk(idVideogame, {
            include: Genre,
        });
        if (DBResponse) {
            
            const videoGameData = {
                ...DBResponse.dataValues,
                genres: DBResponse.Genres.map((genre) => genre.name),
            };
            console.log("In BD...");
            return videoGameData;
        }
    }
    else {
        console.log("searching API...");
        const url = `${VG_URL}/${idVideogame}?key=${API_KEY}`;
        const ApiResponse = await axios.get(url);
        
        console.log("From API");
        return {
            ...ApiResponse.data,
            genres: ApiResponse.data.genres.map((genre) => genre.name),
        }

    }
}

module.exports = getVideogameByIdController;