import { projetoService } from "../services/index.js";
import { AppError } from "../utils/index.js";

const lerCampos = (body) => {
  const { nome, descricao, link, pessoaId } = body || {};
  return { nome, descricao, link, pessoaId };
};

const getProjetos = async (req, res) => {
  const projetos = await projetoService.getProjetos({ pessoaId: req.query.pessoaId });
  return res.status(200).send(projetos);
};

const getProjeto = async (req, res) => {
  const projeto = await projetoService.getProjetoById(req.params.projetoId);
  if (!projeto) {
    throw new AppError("Projeto não encontrado.", 404);
  }
  return res.status(200).send(projeto);
};

const createProjeto = async (req, res) => {
  const projeto = await projetoService.createProjeto(lerCampos(req.body));
  return res.status(201).send(projeto);
};

const updateProjeto = async (req, res) => {
  const projeto = await projetoService.updateProjeto(req.params.projetoId, lerCampos(req.body));
  if (!projeto) {
    throw new AppError("Projeto não encontrado.", 404);
  }
  return res.status(200).send(projeto);
};

const deleteProjeto = async (req, res) => {
  const apagou = await projetoService.deleteProjeto(req.params.projetoId);
  if (!apagou) {
    throw new AppError("Projeto não encontrado.", 404);
  }
  return res.status(204).send();
};

const addTecnologia = async (req, res) => {
  const { projetoId, tecnologiaId } = req.params;
  const projeto = await projetoService.addTecnologia(projetoId, tecnologiaId);
  return res.status(201).send(projeto);
};

const removeTecnologia = async (req, res) => {
  const { projetoId, tecnologiaId } = req.params;
  await projetoService.removeTecnologia(projetoId, tecnologiaId);
  return res.status(204).send();
};

export default {
  getProjetos,
  getProjeto,
  createProjeto,
  updateProjeto,
  deleteProjeto,
  addTecnologia,
  removeTecnologia
};