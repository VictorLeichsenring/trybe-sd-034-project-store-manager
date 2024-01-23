const route = require('express').Router();
const { productController } = require('../controllers');
const validateProductFields = require('../middlewares/validateProductFields');

route.get('/', productController.findAllProducts);
route.get('/:id', productController.findProductById);
route.post(
  '/',
  validateProductFields,
  productController.createProduct,
);
route.put(
  '/:id',
  validateProductFields,
  productController.updateProduct,
);
module.exports = route;