const route = require('express').Router();
const { productController } = require('../controllers');

route.get('/products', productController.findAllProducts);
route.get('/product/:id', productController.findProductById);
route.post('/products', productController.createProduct);

module.exports = route;