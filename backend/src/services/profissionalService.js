import models from "../models/index.js";

const getProfissionais = async ({ pessoaId }) => {
  return await models.ExperienciaProfissional.findAll({
    where: { ...(pessoaId && { pessoaId }) },
    order: [["inicio", "DESC"]],
  });
};

const getProfissionalById = async (id) => {
  return await models.ExperienciaProfissional.findByPk(id);
};

const createProfissional = async (dados) => {
  return await models.ExperienciaProfissional.create(dados);
};

const updateProfissional = async (id, dados) => {
  const registro = await getProfissionalById(id);
  if (!registro) {
    return null;
  }
  return await registro.update(dados);
};

const deleteProfissional = async (id) => {
  const count = await models.ExperienciaProfissional.destroy({ where: { id } });
  return count > 0;
};

export default {
  getProfissionais,
  getProfissionalById,
  createProfissional,
  updateProfissional,
  deleteProfissional,
};