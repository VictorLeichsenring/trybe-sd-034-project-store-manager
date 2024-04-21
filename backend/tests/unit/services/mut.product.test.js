const { expect } = require('chai');
const sinon = require('sinon');
const { productService } = require('../../../src/services');
const { productModel } = require('../../../src/models');
const { schema } = require('../../../src/services/validations/schemas');

describe('Testes de Mutabilidade - ProductService', function () {
  let sandbox;

  beforeEach(function () {
    sandbox = sinon.createSandbox();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('findAll não deve modificar os dados', async function () {
    const findAllStub = sandbox.stub(productModel, 'findAll').resolves([]);
    await productService.findAll();
    const espera = true;
    expect(findAllStub.calledOnce).to.be.equal(espera);
  });

  it('findById não deve modificar os dados', async function () {
    const productId = 1;
    const findByIdStub = sandbox.stub(productModel, 'findById').resolves(null);
    await productService.findById(productId);
    const espera = true;
    expect(findByIdStub.calledOnceWith(productId)).to.be.equal(espera);
  });

  it('insertProduct deve modificar os dados', async function () {
    const productObject = { name: 'Novo Produto' };
    const insertStub = sandbox.stub(productModel, 'insert').resolves(123);
    const findByIdStub = sandbox.stub(productModel, 'findById').resolves(productObject);

    const result = await productService.insertProduct(productObject);
    const espera = true;
    expect(insertStub.calledOnceWith(productObject)).to.be.equal(espera);
    expect(findByIdStub.calledOnceWith(123)).to.be.equal(espera);
    expect(result.status).to.equal('CREATED');
    expect(result.data).to.deep.equal(productObject);
  });

  it('updateProduct deve modificar os dados', async function () {
    const productObject = { id: 123, name: 'Produto Atualizado' };
    const updateStub = sandbox.stub(productModel, 'update').resolves();
    const findByIdStub = sandbox.stub(productModel, 'findById').resolves(productObject);

    const result = await productService.updateProduct(productObject);
    const espera = false;
    expect(updateStub.calledOnceWith(productObject)).to.be.equal(true);
    expect(findByIdStub.calledOnceWith(123)).to.be.equal(espera);
    expect(result.status).to.equal('SUCCESSFUL');
    expect(result.data).to.deep.equal(productObject);
  });

  it('removeProduct deve modificar os dados', async function () {
    const productId = 123;
    const removeStub = sandbox.stub(productModel, 'remove').resolves('Delete successful');

    const result = await productService.removeProduct(productId);
    const espera = true;
    expect(removeStub.calledOnceWith(productId)).to.be.equal(espera);
    expect(result).to.equal('Delete successful');
  });

  it('não deve modificar os dados existentes', async function () {
    // Configurar stub para schema.validateNewProduct
    const validateNewProductStub = sinon.stub(schema, 'validateNewProduct');
    validateNewProductStub.resolves(null); // Simulando validação bem-sucedida

    // Configurar stub para productModel.insert
    const insertStub = sinon.stub(productModel, 'insert');
    insertStub.resolves(123); // Simulando a inserção com um novo ID

    // Configurar stub para productModel.findById
    const findByIdStub = sinon.stub(productModel, 'findById');
    const newProductFromModel = { id: 123, name: 'Produto Novo' }; // Substitua pelos dados reais
    findByIdStub.resolves(newProductFromModel);

    // Executar a função
    const result = await productService.insertProduct({ name: 'Produto Novo' });

    // Verificar que a função não modificou os dados existentes
    expect(result).to.deep.equal({ status: 'CREATED', data: newProductFromModel });

    // Restaurar os stubs após o teste
    validateNewProductStub.restore();
    insertStub.restore();
    findByIdStub.restore();
  });
});
