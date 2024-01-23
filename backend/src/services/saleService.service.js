const { saleModel } = require('../models');
const schema = require('./validations/validationsInputValues');

const findAllSales = async () => {
  const sales = await saleModel.findAll();
  return { status: 'SUCCESSFUL', data: sales };
};

const findSaleById = async (saleId) => {
  const sale = await saleModel.findById(saleId);
  if (!sale || sale.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }
  return { status: 'SUCCESSFUL', data: sale };
};

const inserNewSale = async (saleData) => {
  const error = await schema.validateNewSale(saleData);
  if (error) return { status: error.status, data: { message: error.message } };

  const newSale = await saleModel.createSale(saleData);
  return { status: 'CREATED', data: newSale };
};

module.exports = {
  findAllSales,
  findSaleById,
  inserNewSale,
};