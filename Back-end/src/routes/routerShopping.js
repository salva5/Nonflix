const { Router } = require('express');

const { createOrder, success, failure, purchasedMovies} = require("../controllers/controllerShopping")

const routerShopping = Router();


routerShopping.post('/create-order', createOrder)
routerShopping.get("/success", success)
routerShopping.get("/failure", failure)
routerShopping.get("/purchasedMovies", purchasedMovies)





module.exports = routerShopping