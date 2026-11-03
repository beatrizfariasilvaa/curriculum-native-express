import models from "../models/index.js";

const getAllTecnologias = async () => {
  return await models.Tecnologia.findAll({ order: [["nome", "ASC"]] });
};

const getTecnologiaById = async (id) => {
  return await models.Tecnologia.findByPk(id);
};

const createTecnologia = async (dados) => {
  return await models.Tecnologia.create(dados);
};

const updateTecnologia = async (id, dados) => {
  const tecnologia = await models.Tecnologia.findByPk(id);
  if (!tecnologia) {
    return null;
  }
  return await tecnologia.update(dados);
};

const deleteTecnologia = async (id) => {
  const count = await models.Tecnologia.destroy({ where: { id } });
  return count > 0;
};

export default {
  getAllTecnologias,
  getTecnologiaById,
  createTecnologia,
  updateTecnologia,
  deleteTecnologia,
};