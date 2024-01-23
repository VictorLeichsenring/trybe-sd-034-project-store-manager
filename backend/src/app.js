const express = require('express');
// const connection = require('./models/connection');
// const { productModel } = require('./models');
// const { productService } = require('./services');
// const { productController } = require('./controllers');
const { saleController } = require('./controllers');
const { productRoutes, saleRoutes } = require('./routes');

const app = express();

app.use(express.json());
app.use('/products', productRoutes);
app.use('/sales', saleRoutes);

// app.get('/products/:id', async (_req, res) => {
//   const response = await productController.findById;
//   res.json({ status: 'SUCCESSFUL GET', data: response });
// });

// app.get('/products', async (_req, res) => {
//   const response = await productController.findAll();
//   res.json({ status: 'SUCCESSFUL GET', data: response });
// });

app.get('/sales', async (_req, res) => {
  const response = await saleController.findAll();
  res.json({ status: 'SUCCESSFUL GET', data: response });
});

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

module.exports = app;
