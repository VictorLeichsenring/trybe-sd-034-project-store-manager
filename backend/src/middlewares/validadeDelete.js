const { productModel } = require('../models');

const validadeExist = async (req, res, next) => {
  const { id } = req.params;
  const product = await productModel.findById(id);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  next();
};
module.exports = {
  validadeExist,
};