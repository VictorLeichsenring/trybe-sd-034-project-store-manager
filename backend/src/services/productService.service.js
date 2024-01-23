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

const updateProduct = async (productObject) => {
  const error = await schema.validateUpdateProduct(productObject);
  if (error) return { status: error.status, data: { message: error.message } };

  await productModel.update(productObject);
  const UpdatedProduct = await productModel.findById(productObject.id);
  return { status: 'SUCCESSFUL', data: UpdatedProduct };
};

const removeProduct = async (id) => {
  await productModel.remove(id);
};

module.exports = {
  findAll,
  findById,
  insertProduct,
  updateProduct,
  removeProduct,
};