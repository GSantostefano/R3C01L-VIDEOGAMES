//este archivo:
//configuro funcionalidad express



const { Router } = require('express');//configuro enrutador que va a venir de express
//// Importar todos los routers;
//// Ejemplo: const authRouter = require('./auth.js');
const router = Router();// mi main router
const videogames = require("./videogames");
const genres = require("./genres");


//// Configurar los routers
////Ejemplo: router.use('/auth', authRouter);

router.use("/videogames",videogames);// mis ENDPONIT que tienen que ver con videogames ---->routes "./videogames"


router.use("/genres",genres);// mi ENDPONIT genres---->/routes "./genres"

module.exports = router;
