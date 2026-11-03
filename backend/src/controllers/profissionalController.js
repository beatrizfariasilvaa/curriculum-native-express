import { profissionalService } from "../services/index.js";
import { AppError } from "../utils/index.js";

const lerCampos = (body) => {
  const { empresa, cargo, inicio, fim, descricao, pessoaId } = body || {};
  return { empresa, cargo, inicio, fim, descricao, pessoaId };
};

const getProfissionais = async (req, res) => {
  const lista = await profissionalService.getProfissionais({ pessoaId: req.query.pessoaId });
  return res.status(200).send(lista);
};

const getProfissional = async (req, res) => {
  const registro = await profissionalService.getProfissionalById(req.params.profissionalId);
  if (!registro) {
    throw new AppError("Experiência profissional não encontrada.", 404);
  }
  return res.status(200).send(registro);
};

const createProfissional = async (req, res) => {
  const registro = await profissionalService.createProfissional(lerCampos(req.body));
  return res.status(201).send(registro);
};

const updateProfissional = async (req, res) => {
  const registro = await profissionalService.updateProfissional(req.params.profissionalId, lerCampos(req.body));
  if (!registro) {
    throw new AppError("Experiência profissional não encontrada.", 404);
  }
  return res.status(200).send(registro);
};

const deleteProfissional = async (req, res) => {
  const apagou = await profissionalService.deleteProfissional(req.params.profissionalId);
  if (!apagou) {
    throw new AppError("Experiência profissional não encontrada.", 404);
  }
  return res.status(204).send();
};

export default {
  getProfissionais,
  getProfissional,
  createProfissional,
  updateProfissional,
  deleteProfissional,
};