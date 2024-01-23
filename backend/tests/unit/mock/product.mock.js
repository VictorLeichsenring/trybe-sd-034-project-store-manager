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

const productFromDB = {
  id: 1,
  name: 'Martelo de Thor',
};

const productFromModel = {
  id: 1,
  name: 'Martelo de Thor',
};

const productFromServiceSuccessful = {
  status: 'SUCCESSFULL',
  data: productFromDB,
};

const productsFromServiceSuccessful = {
  status: 'SUCCESSFULL',
  data: productsFromDB,
};

module.exports = {
  productFromDB,
  productFromModel,
  productFromServiceSuccessful,
  productsFromDB,
  productsFromModel,
  productsFromServiceSuccessful,
};