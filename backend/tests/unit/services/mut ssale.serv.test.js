const { expect } = require('chai');
const sinon = require('sinon');
const { saleModel } = require('../../../src/models');
const { saleService } = require('../../../src/services');

describe('Testes de Mutação - SaleService', function () {
  describe('findAllSales', function () {
    it('não deve modificar os dados', async function () {
      // Configurar stub para saleModel.findAll
      sinon.stub(saleModel, 'findAll').resolves([]);

      // Executar a função
      const result = await saleService.findAllSales();

      // Verificar que a função não modificou os dados
      expect(result).to.deep.equal({ status: 'SUCCESSFUL', data: [] });
    });
  });

  describe('findSaleById', function () {
    it('não deve modificar os dados', async function () {
      // Configurar stub para saleModel.findById
      sinon.stub(saleModel, 'findById').resolves([]);

      // Executar a função
      const result = await saleService.findSaleById(1);

      // Verificar que a função não modificou os dados
      expect(result).to.deep.equal({ status: 'NOT_FOUND', data: { message: 'Sale not found' } });
    });
  });

  // describe('inserNewSale', function () {
  //   it('não deve modificar os dados', async function () {
  //     // Configurar stub para schema.validateNewSale
  //     sinon.stub(schema, 'validateNewSale').resolves(null);

  //     // Configurar stub para saleModel.createSale
  //     sinon.stub(saleModel, 'createSale').resolves({ id: 1, products: [] });

  //     // Executar a função
  //     const result = await saleService.inserNewSale({ /* dados da venda */ });

  //     // Verificar que a função não modificou os dados
  //     expect(result).to.deep.equal({ status: 'CREATED', data: { id: 1, products: [] } });
  //   });
  // });

  afterEach(function () {
    sinon.restore();
  });
});
