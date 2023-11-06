
const { Videogame, Genre } = require("../db");

const axios = require("axios");

require("dotenv").config();

const allDataGames = async () => {
    try {
        let allVideogamesArray = [];

        console.log("fetchingALL-controller", process.env.VG_URL);

        let pageNum = 1;

        while (allVideogamesArray.length < 100) {

            let page = `&page=${pageNum}`;
            const url = `${process.env.VG_URL}?key=${process.env.API_KEY}${page}`;

            const response = await axios.get(url);
            
            const { results, next } = response.data;

            allVideogamesArray = allVideogamesArray.concat(results);

            if (!next) {
                break;
            }

            pageNum++;
        }

        const DBVideogames = await Videogame.findAll({
            include: Genre,
        });

  
        const allVideogames = DBVideogames.concat(allVideogamesArray);



        return allVideogames;
    } catch (error) {

        console.error({ error: error.message });
    }
};

module.exports = allDataGames;