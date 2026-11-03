import models from "../models/index.js";

const getAllPessoas = async () => {
  return await models.Pessoa.findAll({ order: [["id", "ASC"]] });
};

const getPessoaById = async (id) => {
  return await models.Pessoa.findByPk(id);
};

const createPessoa = async (dados) => {
  return await models.Pessoa.create(dados);
};

const updatePessoa = async (id, dados) => {
  const pessoa = await getPessoaById(id);
  if (!pessoa) {
    return null;
  }
  return await pessoa.update(dados);
};

const deletePessoa = async (id) => {
  const count = await models.Pessoa.destroy({ where: { id } });
  return count > 0;
};

export default {
  getAllPessoas,
  getPessoaById,
  createPessoa,
  updatePessoa,
  deletePessoa,
};