const { expect } = require('chai');
const checkRequiredFields = require('../../../src/utils/checkRequiredFields');

describe('Testes para checkRequiredFields', function () {
  it('Deve retornar nulo se todos os campos obrigatórios estiverem presentes', function () {
    const receivedFields = { name: 'Produto', price: 20.0 };
    const requiredFields = ['name', 'price'];

    const result = checkRequiredFields(receivedFields, requiredFields);
    const espera = undefined;
    expect(result).to.be.equal(espera);
  });

  it('Deve retornar mensagem de erro se um campo obrigatório estiver ausente', function () {
    const receivedFields = { name: 'Produto' };
    const requiredFields = ['name', 'price'];

    const result = checkRequiredFields(receivedFields, requiredFields);

    expect(result).to.equal('"price" is required');
  });

  it('Deve retornar mensagem de erro se todos os campos obrigatórios estiverem ausentes', function () {
    const receivedFields = {};
    const requiredFields = ['name', 'price'];

    const result = checkRequiredFields(receivedFields, requiredFields);

    expect(result).to.equal('"name" is required');
  });

  it('Deve retornar nulo se não houver campos obrigatórios', function () {
    const receivedFields = { name: 'Produto', price: 20.0 };
    const requiredFields = [];

    const result = checkRequiredFields(receivedFields, requiredFields);

    const espera = undefined;
    expect(result).to.be.equal(espera);
  });

  it('Deve retornar nulo se não houver campos e nenhum campo obrigatório', function () {
    const receivedFields = {};
    const requiredFields = [];

    const result = checkRequiredFields(receivedFields, requiredFields);

    const espera = undefined;
    expect(result).to.be.equal(espera);
  });
});
