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

const insertId = 4;

const newProduct = {
  id: 8,
  name: 'banana',
};

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

const productUpdate = {
  id: 2,
  name: 'celular',
};

const productUpdateSucessful = {
  status: 'SUCCESSFUL',
  data: productUpdate,
};

const deleteSuccessful = {
  status: 204,
};

const productInsertFromServiceSuccessful = {
  status: 'CREATED',
  data: newProduct,
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
  productUpdateSucessful,
  deleteSuccessful,
  productsFromDB,
  newProduct,
  insertId,
  productFromDB,
  productFromModel,
  productFromServiceSuccessful,
  productInsertFromServiceSuccessful,
  productFromServiceInvalid,
  productsFromModel,
  productsFromServiceSuccessful,
};