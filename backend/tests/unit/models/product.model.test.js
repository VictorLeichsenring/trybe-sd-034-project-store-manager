const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productModel } = require('../../../src/models');

const { 
  productFromDB,
  productsFromDB,
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

  it('Inserir um produto no banco de dados', async function () {
    const insertId = 123; // Substitua pelo valor que você espera como resultado da inserção
    sinon.stub(connection, 'execute').resolves([{ insertId }]);
    
    const inputData = { name: 'produto' };
    const modelResponse = await productModel.insert(inputData);

    expect(modelResponse).to.be.a('number'); // Supondo que você está retornando o ID da inserção
    expect(modelResponse).to.be.equal(insertId);
  });

  it('Atualizar um produto no banco de dados', async function () {
    const updateResult = {
      affectedRows: 1, // O número de linhas afetadas pela atualização
    };
    sinon.stub(connection, 'execute').resolves([updateResult]);

    const inputData = {
      id: 1,
      productInfo: {
        name: 'Novo Nome do Produto',
        // Adicione outras propriedades do produto, se necessário
      },
    };

    await productModel.update(inputData);
    const espera = true;
    // Fazer asserções sobre a chamada ao banco de dados
    expect(connection.execute.calledOnce).to.be.equal(espera);
    expect(connection.execute.firstCall.args[0]).to.include('UPDATE products');
    expect(connection.execute.firstCall.args[1]).to.deep.equal([
      inputData.productInfo.name,
      inputData.id,
    ]);

    // Fazer asserções sobre o resultado da atualização
    expect(updateResult.affectedRows).to.equal(1);
  });

  it('Remover um produto do banco de dados', async function () {
    const deleteResult = {
      affectedRows: 1, // O número de linhas afetadas pela exclusão
    };
    sinon.stub(connection, 'execute').resolves([deleteResult]);

    const productIdToRemove = 1;

    const result = await productModel.remove(productIdToRemove);
    const espera = true;
    // Fazer asserções sobre a chamada ao banco de dados
    expect(connection.execute.calledOnce).to.be.equal(espera);
    expect(connection.execute.firstCall.args[0]).to.include('DELETE FROM StoreManager.products WHERE id = ?');
    expect(connection.execute.firstCall.args[1]).to.deep.equal([productIdToRemove]);

    // Fazer asserções sobre o resultado da exclusão
    expect(result).to.deep.equal(deleteResult);
  });

  afterEach(function () {
    sinon.restore();
  });
});