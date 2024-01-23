const { expect } = require('chai');
const sinon = require('sinon');
const { saleModel } = require('../../../src/models');
const { saleService } = require('../../../src/services');
const schema = require('../../../src/services/validations/validationsInputValues');
const { 
  saleFromModel,
  salesFromModel
  ,
} = require('../mock/sales.mock');

describe('Realizando testes - SALE SERVICE', function () {
  it('Listar todos os produtos', async function () {
    sinon.stub(saleModel, 'findAll').resolves(salesFromModel);

    const responseService = await saleService.findAllSales();
    expect(responseService.status).to.be.equal('SUCCESSFUL');
  });

  it('Listar todos um produto pelo seu id', async function () {
    sinon.stub(saleModel, 'findById').resolves(saleFromModel);
    const inputData = 1;
    const responseService = await saleService.findSaleById(inputData);
    expect(responseService.status).to.be.equal('SUCCESSFUL');
  });

  it('Retorna erro se não encontrar produto pelo seu id', async function () {
    sinon.stub(saleModel, 'findById').resolves(undefined);
    const inputData = 2;
    const responseService = await saleService.findSaleById(inputData);
    expect(responseService.status).to.be.equal('NOT_FOUND');
  });

  it('Deve inserir uma nova venda com sucesso', async function () {
    // Stub para schema.validateNewSale para simular validação bem-sucedida
    sinon.stub(schema, 'validateNewSale').resolves(null);

    // Stub para saleModel.createSale para simular criação bem-sucedida de venda
    sinon.stub(saleModel, 'createSale').resolves({ id: 1, itemsSold: [] });

    // Dados de venda simulados
    const saleData = { /* ... */ };

    const result = await saleService.inserNewSale(saleData);

    // Verificações
    expect(result).to.deep.equal({ status: 'CREATED', data: { id: 1, itemsSold: [] } });

    // Restaura os stubs
    sinon.restore();
  });

  afterEach(function () {
    sinon.restore();
  });
});