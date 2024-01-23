const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { saleService } = require('../../../src/services');
const { saleController } = require('../../../src/controllers');

const { saleFromServiceSuccessful, salesFromServiceSuccessful, saleFromModel, salesFromModel } = require('../mock/sales.mock');

describe('Realizando testes - SALE CONTROLLER', function () {
  it('Listar todos as vendas - status 200', async function () {
    sinon.stub(saleService, 'findAll').resolves(salesFromServiceSuccessful);
    const req = {
      params: { },
      body: { },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await saleController.findAll(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesFromModel);
  });

  it('Retornar venda com id - status 200', async function () {
    sinon.stub(saleService, 'findById').resolves(saleFromServiceSuccessful);
    const req = {
      params: { id: 1 },
      body: { },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await saleController.findById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(saleFromModel);
  });

  it('Não retornar venda com id errado - status 404', async function () {
    sinon.stub(saleController, 'findById').resolves(undefined);
    const req = {
      params: { id: 1000 },
      body: { },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await saleController.findById(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(sinon.match.has('Sale not found'));
  });

  afterEach(function () {
    sinon.restore();
  });
});