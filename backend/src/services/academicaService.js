import models from "../models/index.js";

const getAcademicas = async ({ pessoaId }) => {
  return await models.ExperienciaAcademica.findAll({
    where: { ...(pessoaId && { pessoaId }) },
    order: [["inicio", "DESC"]],
  });
};

const getAcademicaById = async (id) => {
  return await models.ExperienciaAcademica.findByPk(id);
};

const createAcademica = async (dados) => {
  return await models.ExperienciaAcademica.create(dados);
};

const updateAcademica = async (id, dados) => {
  const registro = await getAcademicaById(id);
  if (!registro) {
    return null;
  }
  return await registro.update(dados);
};

const deleteAcademica = async (id) => {
  const count = await models.ExperienciaAcademica.destroy({ where: { id } });
  return count > 0;
};

export default {
  getAcademicas,
  getAcademicaById,
  createAcademica,
  updateAcademica,
  deleteAcademica,
};