const { productModel } = require('../models');
const { productService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const findAllProducts = async (_req, res) => {
  const { status, data } = await productService.findAll();

  return res.status(mapStatusHTTP(status)).json(data);
};

const findProductById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productService.findById(id);
  return res.status(mapStatusHTTP(status)).json(data);
};

const createProduct = async (req, res) => {
  const productData = req.body;

  const { status, data } = await productService.insertProduct(productData);
  return res.status(mapStatusHTTP(status)).json(data);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const productInfo = req.body;
  const productData = { id, productInfo };
  
  const { status, data } = await productService.updateProduct(productData);
  
  return res.status(mapStatusHTTP(status)).json(data);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const result = await productModel.remove(id);
  res.status(204).send(result);
};

module.exports = {
  findAllProducts,
  findProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};