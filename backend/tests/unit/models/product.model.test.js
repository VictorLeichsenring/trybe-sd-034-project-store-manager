const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productModel } = require('../../../src/models');

const { 
  productFromDB,
  productsFromDB,
  insertId,
} = require('../mock/product.mock');

describe('Realizando testes - PRODUCT MODEL', function () {
  it('Listar todos os produtos', async function () {
    sinon.stub(connection, 'execute').resolves([productsFromDB]);
    const modelResponse = await productModel.findAll();
    expect(modelResponse).to.be.an('array');
    expect(modelResponse).to.be.deep.equal(productsFromDB);
  });

  it('Recuperando produto por id com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([[productFromDB]]);
    const inputData = 1;
    const modelResponse = await productModel.findById(inputData);
    expect(modelResponse).to.be.an('object');
    expect(modelResponse).to.be.deep.equal(productFromDB);
  });

  // it('Inserir um produto no banco de dados', async function () {
  //   sinon.stub(connection, 'execute').resolves(insertId);
  //   const inputData = { name: 'produto' };
  //   const modelResponse = await productModel.insert(inputData);
  //   expect(modelResponse).to.be.a('object');
  // });

  afterEach(function () {
    sinon.restore();
  });
});