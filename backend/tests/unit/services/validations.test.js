const { expect } = require('chai');
const sinon = require('sinon');
const { validateNewProduct, validateUpdateProduct } = require('../../../src/services/validations/validationsInputValues');
const { productModel } = require('../../../src/models');
const { addNewProductSchema, updateProductSchema } = require('../../../src/services/validations/schemas');

describe('Testes para as funções de validação', function () {
  describe('validateNewProduct', function () {
    it('Deve retornar erro se os dados do produto forem inválidos', function () {
      const keysObjectToValidate = { /* dados inválidos aqui */ };
      sinon.stub(addNewProductSchema, 'validate').returns({ error: { message: 'Mensagem de erro' } });

      const result = validateNewProduct(keysObjectToValidate);

      // Verifica se o resultado é um objeto de erro
      expect(result).to.deep.equal({ status: 'INVALID_VALUE', message: 'Mensagem de erro' });
    });

    it('Deve retornar nulo se os dados do produto forem válidos', function () {
      const keysObjectToValidate = { /* dados válidos aqui */ };
      sinon.stub(addNewProductSchema, 'validate').returns({ error: null });

      const result = validateNewProduct(keysObjectToValidate);
      const espera = undefined;
      // Verifica se o resultado é nulo (sem erro)
      expect(result).to.be.equal(espera);
    });
    afterEach(function () {
      // Restauração dos stubs específicos
      sinon.restore();
    });
  });

  describe('validateUpdateProduct', function () {
    it('Deve retornar erro se o produto não for encontrado', async function () {
      sinon.stub(productModel, 'findById').resolves({ /* produto válido simulado */ });
      sinon.stub(updateProductSchema, 'validate').returns({ error: { message: 'Mensagem de erro' } });

      const keysObjectToValidate = { id: 1, productInfo: { /* dados inválidos aqui */ } };
      const result = await validateUpdateProduct(keysObjectToValidate);

      // Verifica se o resultado é um objeto de erro
      expect(result).to.deep.equal({ status: 'INVALID_VALUE', message: 'Mensagem de erro' });

      // Restaurar os stubs
      sinon.restore();
    });

    // it('Deve retornar erro se os dados do produto forem inválidos', async function () {
    //   sinon.stub(productModel, 'findById').resolves({ /* produto válido simulado */ });

    //   const keysObjectToValidate = { id: 123, productInfo: { /* dados inválidos */ } };

    //   const result = await validateUpdateProduct(keysObjectToValidate);

    //   expect(result).to.deep.equal({ status: 'INVALID_VALUE', message: 'Mensagem de erro esperada' });

    //   sinon.restore();
    // });

    it('Deve retornar nulo se os dados do produto forem válidos', async function () {
      sinon.stub(productModel, 'findById').resolves({ /* produto válido simulado */ });
      sinon.stub(updateProductSchema, 'validate').returns({ error: null });

      const keysObjectToValidate = { id: 1, productInfo: { /* dados válidos aqui */ } };
      const result = await validateUpdateProduct(keysObjectToValidate);
      const espera = undefined;
      // Verifica se o resultado é nulo (sem erro)
      expect(result).to.be.equal(espera);

      // Restaurar os stubs
      sinon.restore();
    });

    afterEach(function () {
      // Restauração dos stubs específicos
      sinon.restore();
    });
  });

  describe('validateNewSale', function () {
    // it('Deve retornar erro se um produto não for encontrado na venda', async function () {
    //   sinon.stub(productModel, 'findById').resolves(null);

    //   const keysObjectToValidate = { id: 1, productInfo: { /* dados válidos ou inválidos */ } };
    //   const result = await validateUpdateProduct(keysObjectToValidate);

    //   // Verifica se o resultado é um objeto de erro
    //   expect(result).to.deep.equal({ status: 'NOT_FOUND', message: 'Product not found' });

    //   // Restaurar os stubs
    //   sinon.restore();
    // });

    // it('Deve retornar erro se a quantidade de venda for menor que 1', async function () {
    //   sinon.stub(productModel, 'findById').resolves({ /* produto válido simulado */ });

    //   const sales = [{ productId: 123, quantity: 0 }, { productId: 456, quantity: -1 }];

    //   const result = await validateNewSale(sales);

    //   expect(result).to.deep.equal({
    //     status: 'INVALID_VALUE',
    //     message: '"quantity" must be greater than or equal to 1',
    //   });

    //   sinon.restore();
    // });

    // it('Deve retornar nulo se todas as validações passarem', async function () {
    //   sinon.stub(productModel, 'findById').resolves({ /* produto válido simulado */ });

    //   const sales = [{ productId: 123, quantity: 2 }, { productId: 456, quantity: 1 }];

    //   const result = await validateNewSale(sales);

    //   expect(result).to.be.null;

    //   sinon.restore();
    // });

    // it('Deve retornar erro interno se ocorrer um erro durante a validação', async function () {
    //   sinon.stub(productModel, 'findById').rejects(new Error('Erro interno simulado'));

    //   const sales = [{ productId: 123, quantity: 2 }, { productId: 456, quantity: 1 }];

    //   const result = await validateNewSale(sales);

    //   expect(result).to.deep.equal({ status: 500, message: 'Internal Server Error' });

    //   sinon.restore();
    // });

    afterEach(function () {
      // Restauração dos stubs específicos
      sinon.restore();
    });
  });
});
