// const { Videogame, Genre } = require("../db");
// const axios = require("axios");
// const { Op } = require("sequelize");

// const postVideogame = async ({
//     name,
//     description,
//     platforms,
//     image,
//     released,
//     genres,
//     rating,
// }) => {
//     return await Videogame.findOrCreate({
//         where: { name: { [Op.iLike]: `%${name}%` } },
//         defaults: {
//             name,
//             description,
//             platforms,
//             image,
//             released,
//             genres,
//             rating,
//         },
//     });
//     //! deberia agregar un throw error si el juego ya esta
// };
// module.exports = postVideogame;
const { Videogame, Genre } = require("../db");
const axios = require("axios");
const { Op } = require("sequelize");

const postVideogame = async ({
    name,
    description,
    platforms,
    image,
    released,
    genres,
    rating,
}) => {
    try {
        // Buscar si el videojuego ya existe en la base de datos por su nombre
        const existingVideogame = await Videogame.findOne({
            where: { name: { [Op.iLike]: `%${name}%` } },
        });

        if (existingVideogame) {
            throw new Error('El videojuego ya existe en la base de datos.');
        }

        // Crear el videojuego en la base de datos
        const createdVideogame = await Videogame.create({
            name,
            description,
            platforms,
            image,
            released,
            rating,
        });

        // Asociar los géneros al videojuego
        if (genres && genres.length > 0) {
            const genreRecords = await Genre.findAll({
                where: { name: { [Op.in]: genres } },
            });

            // Asociar los géneros al videojuego creado
            await createdVideogame.addGenres(genreRecords);
        }

        return createdVideogame;
    } catch (error) {
        throw error;
    }
};

module.exports = postVideogame;