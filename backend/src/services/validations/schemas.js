const Joi = require('joi');

const addNewProductSchema = Joi.object({
  name: Joi.string().min(5),
});

const updateProductSchema = Joi.object({
  name: Joi.string().min(5),
});

const saleSchema = Joi.object({
  productId: Joi.number().required(),
  quantity: Joi.number().integer().min(1).required(),
});

const addNewSaleSchema = Joi.array().items(saleSchema);

module.exports = {
  addNewProductSchema,
  updateProductSchema,
  saleSchema,
  addNewSaleSchema,
};