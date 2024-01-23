const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const [sales] = await connection.execute(
    'SELECT sp.sale_id, s.date, sp.product_id, sp.quantity '
    + 'FROM sales_products sp '
    + 'JOIN sales s ON sp.sale_id = s.id '
    + 'ORDER BY sp.sale_id, sp.product_id',
  );
  return camelize(sales);
};

const findById = async (saleId) => {
  const [sale] = await connection.execute(
    'SELECT s.date AS date, sp.product_id AS productId, sp.quantity AS quantity '
    + 'FROM sales_products sp '
    + 'JOIN sales s ON sp.sale_id = s.id '
    + 'WHERE sp.sale_id = ? '
    + 'ORDER BY s.date',
    [saleId],
  );

  return camelize(sale);
};

const insertSale = async () => {
  const [result] = await connection.execute('INSERT INTO sales () VALUES ()');
  return result.insertId;
};
const insertProductInSale = async (saleId, productId, quantity) => {
  await connection.execute(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, productId, quantity],
  );
};
const createSale = async (products) => {
  const saleId = await insertSale();
  await Promise.all(
    products.map(async (product) => {
      const { productId, quantity } = product;
      await insertProductInSale(saleId, productId, quantity);
    }),
  );
  return {
    id: saleId,
    itemsSold: products.map((product) => ({
      productId: product.productId,
      quantity: product.quantity,
    })),
  };
};

module.exports = {
  findAll,
  findById,
  createSale,
};