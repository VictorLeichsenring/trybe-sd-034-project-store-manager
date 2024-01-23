const checkRequiredFields = require('../utils/checkRequiredFields');

const validateSaleFields = async (req, res, next) => {
  const { body } = req;
  const sales = body;

  // Verificar se 'sales' é uma array e possui elementos
  if (!Array.isArray(sales) || sales.length === 0) {
    return res.status(400).json({ message: 'A requisição deve conter uma array de vendas.' });
  }

  // Definir a função de validação para uma venda
  const validateSale = async (sale) => {
    const requiredFields = ['productId', 'quantity'];
    const error = checkRequiredFields(sale, requiredFields);
    
    if (error) {
      throw new Error(error);
    }
  };

  try {
    // Usar Promise.all para aguardar a conclusão de todas as validações
    await Promise.all(sales.map(validateSale));
    return next();
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = validateSaleFields;