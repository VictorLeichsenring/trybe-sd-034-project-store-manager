const route = require('express').Router();
const { productController } = require('../controllers');

route.get('/products', productController.findAll);
route.get('/product/:id', productController.findById);

module.exports = route;