// const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const [sales] = await connection.execute(
    'SELECT sp.sale_id, s.date, sp.product_id, sp.quantity '
      + 'FROM sales_products sp '
      + 'JOIN sales s ON sp.sale_id = s.id '
      + 'ORDER BY sp.sale_id, sp.product_id',
  );
  return sales;
};

const findById = async (saleId) => {
  const [sale] = await connection.execute(
    'SELECT s.date, sp.product_id, sp.quantity '
      + 'FROM sales_products sp '
      + 'JOIN sales s ON sp.sale_id = s.id '
      + 'WHERE sp.sale_id = ? '
      + 'ORDER BY s.date',
    [saleId],
  );

  return sale;
};

module.exports = {
  findAll,
  findById,
};