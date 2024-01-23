const salesFromDB = [
  {
    saleId: 1,
    date: '2021-09-09T04:54:29.000Z',
    productId: 2,
    quantity: 2,
  },
  {
    saleId: 1,
    date: '2021-09-09T04:54:54.000Z',
    productId: 2,
    quantity: 2,
  },
];
const salesFromModel = [
  {
    saleId: 1,
    date: '2021-09-09T04:54:29.000Z',
    productId: 2,
    quantity: 2,
  },
  {
    saleId: 1,
    date: '2021-09-09T04:54:54.000Z',
    productId: 2,
    quantity: 2,
  },
];

const saleFromDB = [
  {
    date: '2021-09-09T04:54:29.000Z',
    productId: 2,
    quantity: 2,
  },
  {
    date: '2021-09-09T04:54:54.000Z',
    productId: 2,
    quantity: 2,
  },
];

const saleFromModel = [
  {
    date: '2021-09-09T04:54:29.000Z',
    productId: 2,
    quantity: 2,
  },
  {
    date: '2021-09-09T04:54:54.000Z',
    productId: 2,
    quantity: 2,
  },
];

const saleFromServiceSuccessful = {
  status: 'SUCCESSFUL',
  data: saleFromModel,
};

const saleFromServiceInvalid = {
  status: 'NOT_FOUND',
  data: { message: 'Sale not found' },
};

const salesFromServiceSuccessful = {
  status: 'SUCCESSFUL',
  data: salesFromModel,
};

const saleInserida = {
  id: 3,
  itemsSold: [
    {
      productId: 2,
      quantity: 1,
    },
    {
      productId: 3,
      quantity: 1,
    },
  ],
};

module.exports = {
  saleInserida,
  salesFromDB,
  saleFromDB,
  salesFromModel,
  saleFromModel,
  saleFromServiceSuccessful,
  saleFromServiceInvalid,
  salesFromServiceSuccessful,
};