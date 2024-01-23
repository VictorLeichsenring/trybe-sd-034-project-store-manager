const { addNewProductSchema, saleSchema, updateProductSchema } = require('./schemas');
const { productModel } = require('../../models');

const validateNewProduct = (keysObjectToValidate) => {
  const { error } = addNewProductSchema.validate(keysObjectToValidate);
  if (error) return { status: 'INVALID_VALUE', message: error.message };
};

const validateUpdateProduct = async (keysObjectToValidate) => {
  const product = await productModel.findById(keysObjectToValidate.id);
  if (!product) return { status: 'NOT_FOUND', message: 'Product not found' };

  const { error } = updateProductSchema.validate(keysObjectToValidate.productInfo);
  if (error) return { status: 'INVALID_VALUE', message: error.message };
};

const validateNewSale = async (sales) => {
  const validations = await Promise.all(
    sales.map(async (sale) => {
      try {
        const product = await productModel.findById(sale.productId);
        if (!product) return { status: 'NOT_FOUND', message: 'Product not found' };

        if (sale.quantity < 1) {
          return { 
            status: 'INVALID_VALUE',
            message: '"quantity" must be greater than or equal to 1', 
          }; 
        }

        return null;
      } catch (error) {
        return { status: 500, message: 'Internal Server Error' };
      }
    }),
  );

  return validations.find((result) => result !== null) || null;
};
module.exports = {
  validateNewProduct,
  validateUpdateProduct,
  validateNewSale,
};