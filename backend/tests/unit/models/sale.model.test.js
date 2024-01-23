const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { saleModel } = require('../../../src/models');

const {
  salesFromDB,
  saleFromDB,
  saleInserida,
} = require('../mock/sales.mock');

describe('Realizando testes - SALE MODEL', function () {
  it('Listar todos os produtos', async function () {
    sinon.stub(connection, 'execute').resolves([salesFromDB]);
    const modelResponse = await saleModel.findAll();
    expect(modelResponse).to.be.an('array');
    expect(modelResponse).to.be.deep.equal(salesFromDB);
  });

  it('Recuperando sale por id com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([saleFromDB]);
    const inputData = 1;
    const modelResponse = await saleModel.findAll(inputData);
    expect(modelResponse).to.be.an('array');
    expect(modelResponse).to.be.have.lengthOf(2);
    expect(modelResponse).to.be.deep.equal(saleFromDB);
  });

  it('sale por id com sucesso', async function () {
    // Stub para a função execute
    sinon.stub(connection, 'execute').resolves([saleFromDB]);

    const saleId = 2; // Suponha que seja o ID desejado

    const modelResponse = await saleModel.findById(saleId);

    // Verificações
    expect(modelResponse).to.be.an('array');
    expect(modelResponse).to.have.lengthOf(2); // Suponha que haja duas vendas para o ID fornecido
    // Verifique se os resultados correspondem aos dados simulados
    expect(modelResponse).to.be.deep.equal(saleFromDB);
  });

  it('Inserir sale', async function () {
    sinon.stub(connection, 'execute')
      .onFirstCall().resolves([{ insertId: 3 }]) // Resposta da primeira chamada
      .onSecondCall()
      .resolves(saleInserida); 
    const inputData = [
      {
        productId: 2,
        quantity: 1,
      },
      {
        productId: 3,
        quantity: 1,
      },
    ];
    const modelResponse = await saleModel.createSale(inputData);
    expect(modelResponse).to.be.an('object');
    expect(modelResponse).to.be.deep.equal(saleInserida);
  });

  afterEach(function () {
    sinon.restore();
  });
});