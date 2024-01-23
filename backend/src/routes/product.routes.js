const route = require('express').Router();
const { productController } = require('../controllers');
const validateProductFields = require('../middlewares/validateProductFields');

route.get('/products', productController.findAllProducts);
route.get('/product/:id', productController.findProductById);
route.post(
  '/products',
  validateProductFields,
  productController.createProduct,
);

module.exports = route;