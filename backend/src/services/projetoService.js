import models from "../models/index.js";

const getProjetos = async ({ pessoaId }) => {
  return await models.Projeto.findAll({
    where: { ...(pessoaId && { pessoaId }) },
    order: [["id", "ASC"]],
  });
};

const getProjetoById = async (id) => {
  return await models.Projeto.findByPk(id);
};

const createProjeto = async (dados) => {
  return await models.Projeto.create(dados);
};

const updateProjeto = async (id, dados) => {
  const projeto = await models.Projeto.findByPk(id);
  if (!projeto) {
    return null;
  }
  return await projeto.update(dados);
};

const deleteProjeto = async (id) => {
  const count = await models.Projeto.destroy({ where: { id } });
  return count > 0;
};

export default {
  getProjetos,
  getProjetoById,
  createProjeto,
  updateProjeto,
  deleteProjeto,
};