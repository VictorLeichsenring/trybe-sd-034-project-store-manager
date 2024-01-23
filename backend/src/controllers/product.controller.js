const { productService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const findAllProducts = async (_req, res) => {
  const { status, data } = await productService.findAll();
  // return 'teste'
  return res.status(mapStatusHTTP(status)).json(data);
};

const findProductById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productService.findById(id);
  // return('teste')
  return res.status(mapStatusHTTP(status)).json(data);
};

const createProduct = async (req, res) => {
  const productData = req.body;

  const { status, data } = await productService.insertProduct(productData);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  findAllProducts,
  findProductById,
  createProduct,
};