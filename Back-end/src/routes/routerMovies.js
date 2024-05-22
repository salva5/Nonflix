const { Router } = require('express');
const { getMovies } = require('../controllers/getMovies');
const { getByName } = require('../controllers/getByName');
const { getDetail } = require('../controllers/getDetail');
const { getFilterGenre } = require('../controllers/getFilterGenre');


 const { getFilterYear, getFilterLanguage, filters } = require('../controllers/getFilters');
const { getGenre } = require('../controllers/getGenre');
const { postMovies } = require('../controllers/postMovies');
const { getFavs } = require('../controllers/getFavs');
const { postFav } = require('../controllers/postFav');
const { deleteFav } = require('../controllers/deleteFav');
const { putMovie } = require('../controllers/putMovie');
const { postReview } = require('../controllers/postReview');
const { putDisabled } = require('../controllers/PutDisabled');
const { getOrders } = require('../controllers/getOrders');



const routerMovies = Router();

routerMovies.get("/", getMovies)
routerMovies.get("/orders", getOrders)
routerMovies.post("/", postMovies)
routerMovies.post("/review", postReview)
routerMovies.put("/update/:id",  putMovie)
routerMovies.get("/filters", filters)
routerMovies.get('/genres', getGenre) //ruta para obtener la tabla de generos
routerMovies.get("/filter/genre", getFilterGenre) // ruta para filtrar por genero
routerMovies.get("/name", getByName)
routerMovies.get("/fav", getFavs)
routerMovies.post("/fav", postFav)
routerMovies.delete("/fav", deleteFav)
routerMovies.get("/:id", getDetail)
routerMovies.get("/filters", filters )
routerMovies.put("/disabled", putDisabled )


module.exports = routerMovies