const { productModel } = require('../models');
const schema = require('./validations/validationsInputValues');

const findAll = async () => {
  const products = await productModel.findAll();
  return { status: 'SUCCESSFUL', data: products };
};

const findById = async (productId) => {
  const product = await productModel.findById(productId);
  if (!product) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }
  return { status: 'SUCCESSFUL', data: product };
};

const insertProduct = async (productObject) => {
  const error = schema.validateNewProduct(productObject);
  if (error) return { status: error.status, data: { message: error.message } };

  const newProductId = await productModel.insert(productObject);
  const newProduct = await productModel.findById(newProductId);
  return { status: 'CREATED', data: newProduct };
};

module.exports = {
  findAll,
  findById,
  insertProduct,
};