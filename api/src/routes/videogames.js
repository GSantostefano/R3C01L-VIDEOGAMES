const { Router } = require('express');

const getAllVideogames = require('../handlers/getVideogamesHandler');
const getVideogameByIdHandler= require('../handlers/getVideogameByIdHandler');
const postVideogame = require('../handlers/postVideogameHandler');

const gamesRoutes = Router();

//Rutas
gamesRoutes.get('/', getAllVideogames);

gamesRoutes.get('/id/:idVideogame', getVideogameByIdHandler);

gamesRoutes.post('/create', postVideogame);

module.exports = gamesRoutes;