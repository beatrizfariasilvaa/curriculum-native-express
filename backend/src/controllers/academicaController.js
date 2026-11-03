import { academicaService } from "../services/index.js";
import { AppError } from "../utils/index.js";

const lerCampos = (body) => {
  const { instituicao, curso, nivel, inicio, fim, descricao, pessoaId } = body || {};
  return { instituicao, curso, nivel, inicio, fim, descricao, pessoaId };
};

const getAcademicas = async (req, res) => {
  const lista = await academicaService.getAcademicas({ pessoaId: req.query.pessoaId });
  return res.status(200).send(lista);
};

const getAcademica = async (req, res) => {
  const registro = await academicaService.getAcademicaById(req.params.academicaId);
  if (!registro) {
    throw new AppError("Experiência acadêmica não encontrada.", 404);
  }
  return res.status(200).send(registro);
};

const createAcademica = async (req, res) => {
  const registro = await academicaService.createAcademica(lerCampos(req.body));
  return res.status(201).send(registro);
};

const updateAcademica = async (req, res) => {
  const registro = await academicaService.updateAcademica(req.params.academicaId, lerCampos(req.body));
  if (!registro) {
    throw new AppError("Experiência acadêmica não encontrada.", 404);
  }
  return res.status(200).send(registro);
};

const deleteAcademica = async (req, res) => {
  const apagou = await academicaService.deleteAcademica(req.params.academicaId);
  if (!apagou) {
    throw new AppError("Experiência acadêmica não encontrada.", 404);
  }
  return res.status(204).send();
};

export default {
  getAcademicas,
  getAcademica,
  createAcademica,
  updateAcademica,
  deleteAcademica,
};