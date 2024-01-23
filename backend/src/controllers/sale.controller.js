const { saleService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const findAll = async (_req, res) => {
  const { status, data } = await saleService.findAll();
  return data;
  return res.status(mapStatusHTTP(status)).json(data);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await saleService.findById(id);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  findAll,
  findById,
};