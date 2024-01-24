const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const { productService } = require('../../../src/services');
const { 
  productsFromModel,
  productFromModel,
} = require('../mock/product.mock');

describe('Realizando testes - PRODUCT SERVICE', function () {
  it('Listar todos os produtos', async function () {
    sinon.stub(productModel, 'findAll').resolves(productsFromModel);

    const responseService = await productService.findAll();
    expect(responseService.status).to.be.equal('SUCCESSFUL');
    expect(responseService.data).to.deep.equal(productsFromModel);
  });

  it('Listar todos um produto pelo seu id', async function () {
    sinon.stub(productModel, 'findById').resolves(productFromModel);
    const inputData = 1;
    const responseService = await productService.findById(inputData);
    expect(responseService.status).to.be.equal('SUCCESSFUL');
    expect(responseService.data).to.deep.equal(productFromModel);
  });

  it('Retorna erro se não encontrar produto pelo seu id', async function () {
    sinon.stub(productModel, 'findById').resolves(undefined);
    const inputData = 2;
    const responseService = await productService.findById(inputData);
    expect(responseService.status).to.be.equal('NOT_FOUND');
    expect(responseService.data).to.be.a('object');
  });

  afterEach(function () {
    sinon.restore();
  });
});