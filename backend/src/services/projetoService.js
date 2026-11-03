import models from "../models/index.js";

const comTecnologias = {
  include: [{ model: models.Tecnologia, through: { attributes: [] } }],
};

const getProjetos = async ({ pessoaId }) => {
  return await models.Projeto.findAll({
    where: { ...(pessoaId && { pessoaId }) },
    ...comTecnologias,
    order: [["id", "ASC"]],
  });
};

const getProjetoById = async (id) => {
  return await models.Projeto.findByPk(id, comTecnologias);
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

const buscarParDoVinculo = async (projetoId, tecnologiaId) => {
  const projeto = await models.Projeto.findByPk(projetoId);
  if (!projeto) {
    throw new AppError("Projeto não encontrado.", 404);
  }
  const tecnologia = await models.Tecnologia.findByPk(tecnologiaId);
  if (!tecnologia) {
    throw new AppError("Tecnologia não encontrada.", 404);
  }
  return { projeto, tecnologia };
};

const addTecnologia = async (projetoId, tecnologiaId) => {
  const { projeto, tecnologia } = await buscarParDoVinculo(projetoId, tecnologiaId);
  await projeto.addTecnologia(tecnologia);
  return await getProjetoById(projetoId);
};

const removeTecnologia = async (projetoId, tecnologiaId) => {
  const { projeto, tecnologia } = await buscarParDoVinculo(projetoId, tecnologiaId);
  await projeto.removeTecnologia(tecnologia);
};

export default {
  getProjetos,
  getProjetoById,
  createProjeto,
  updateProjeto,
  deleteProjeto,
  addTecnologia,
  removeTecnologia
};