const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productService } = require('../../../src/services');
const { productController } = require('../../../src/controllers');

const { 
  productFromServiceSuccessful,
  productsFromServiceSuccessful,
  productFromServiceInvalid,
  productsFromModel,
  productFromModel,
} = require('../mock/product.mock');

describe('Realizando testes - PRODUCT CONTROLLER', function () {
  it('Listar todos os produtos - status 200', async function () {
    sinon.stub(productService, 'findAll').resolves(productsFromServiceSuccessful);
    const req = {
      params: { },
      body: { },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await productController.findAllProducts(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsFromModel);
  });

  it('Retornar produto com id - status 200', async function () {
    sinon.stub(productService, 'findById').resolves(productFromServiceSuccessful);
    const req = {
      params: { id: 1 },
      body: { },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productController.findProductById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productFromModel);
  });

  it('Não retornar produto com id errado - status 404', async function () {
    sinon.stub(productService, 'findById').resolves(productFromServiceInvalid);
    const req = {
      params: { id: 1000 },
      body: { },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productController.findProductById(req, res);
    expect(res.status).to.have.been.calledWith(404);
  });

  afterEach(function () {
    sinon.restore();
  });
});