const express = require('express');
const { productController } = require('../controllers');

const route = express.Router();

route.get('/products', productController.findAll);
route.get('/product/:id', productController.findById);

module.exports = route;