const productsFromModel = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
];

const productsFromDB = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
];

const productFromModel = {
  id: 1,
  name: 'Martelo de Thor',
};
const productFromDB = {
  id: 1,
  name: 'Martelo de Thor',
};

const productFromServiceSuccessful = {
  status: 'SUCCESSFUL',
  data: productFromModel,
};

const productFromServiceInvalid = {
  status: 'NOT_FOUND',
  data: { message: 'Product not found' },
};

const productsFromServiceSuccessful = {
  status: 'SUCCESSFUL',
  data: productsFromModel,
};

module.exports = {
  productsFromDB,
  productFromDB,
  productFromModel,
  productFromServiceSuccessful,
  productFromServiceInvalid,
  productsFromModel,
  productsFromServiceSuccessful,
};