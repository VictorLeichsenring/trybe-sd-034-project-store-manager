const route = require('express').Router();
const { saleController } = require('../controllers');

route.get('/sales', saleController.findAll);
route.get('/sales/:id', saleController.findById);
route.post(
  '/products',
  saleController.createSale,
);

module.exports = route;