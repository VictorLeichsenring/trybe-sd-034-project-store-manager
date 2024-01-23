// const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const [sales] = await connection.execute(
    'SELECT * FROM sales_products ORDER BY sale_id, product_id',
  );
  return sales;
};

const findById = async (saleId) => {
  const [sale] = await connection.execute(
    'SELECT * FROM sales_products WHERE sale_id = ? ORDER BY sale_id, product_id',
    [saleId],
  );

  return sale;
};

module.exports = {
  findAll,
  findById,
};