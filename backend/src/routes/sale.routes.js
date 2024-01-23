const route = require('express').Router();
const { saleController } = require('../controllers');

route.get('/sales', saleController.findAll);
route.get('/sales/:id', saleController.findById);

module.exports = route;