const { addNewProductSchema, saleSchema } = require('./schemas');
const { productModel } = require('../../models');

const validateNewProduct = (keysObjectToValidate) => {
  const { error } = addNewProductSchema.validate(keysObjectToValidate);
  if (error) return { status: 'INVALID_VALUE', message: error.message };
};

const validateNewSale = async (sales) => {
  const validations = await Promise.all(
    sales.map(async (sale) => {
      const { error } = saleSchema.validate(sale);

      if (error) {
        return { status: 400, message: error.details[0].message };
      }

      const product = await productModel.findById(sale.productId);
      if (!product) {
        return { status: 404, message: 'Product not found' };
      }

      return null; // Retorna null se a validação foi bem-sucedida
    }),
  );

  const firstError = validations.find((result) => result !== null);

  return firstError || null; // Retorna o primeiro erro encontrado ou null se todas as validações foram bem-sucedidas
};
module.exports = {
  validateNewProduct,
  validateNewSale,
};