// const camelize = require('camelize');
const connection = require('./connection');
const {
  getFormattedColumnNames,
  getFormattedPlaceholders,
} = require('../utils/generateFormattedQuery');

const findAll = async () => {
  const [products] = await connection.execute('SELECT * FROM products ORDER BY id ASC');
  return products;
};

const findById = async (productId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [productId],
  );
  return product;
};

const insert = async (product) => {
  const columns = getFormattedColumnNames(product);
  const placeholders = getFormattedPlaceholders(product);
  const query = `INSERT INTO products (${columns}) VALUE (${placeholders});`;

  const [{ insertId }] = await connection.execute(query, [...Object.values(product)]);

  return insertId;
};

const update = async (product) => {
  const { id, productInfo } = product;

  // Substitui valores indefinidos por null
  const sanitizedProductInfo = Object.fromEntries(
    Object.entries(productInfo).map(([key, value]) => [key, value !== undefined ? value : null])
  );

  const setClause = Object.keys(sanitizedProductInfo)
    .map((key) => `${key} = ?`)
    .join(', ');

  const query = `UPDATE products SET ${setClause} WHERE id = ?;`;
  
  // Cria um array com os valores
  const values = [...Object.values(sanitizedProductInfo), id];

  await connection.execute(query, values);
  return id;
};

module.exports = {
  findAll,
  findById,
  insert,
  update,
};