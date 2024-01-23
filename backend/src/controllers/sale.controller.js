const { saleService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const findAll = async (_req, res) => {
  const { status, data } = await saleService.findAllSales();
  return res.status(mapStatusHTTP(status)).json(data);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await saleService.findSaleById(id);
  return res.status(mapStatusHTTP(status)).json(data);
};

const createSale = async (req, res) => {
  const saleData = req.body;
  const { status, data } = await saleService.inserNewSale(saleData);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  findAll,
  findById,
  createSale,
};