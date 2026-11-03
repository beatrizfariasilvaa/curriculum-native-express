import { tecnologiaService } from "../services/index.js";
import { AppError } from "../utils/index.js";

const getTecnologias = async (req, res) => {
  const tecnologias = await tecnologiaService.getAllTecnologias();
  return res.status(200).send(tecnologias);
};

const getTecnologia = async (req, res) => {
  const tecnologia = await tecnologiaService.getTecnologiaById(req.params.tecnologiaId);
  if (!tecnologia) {
    throw new AppError("Tecnologia não encontrada.", 404);
  }
  return res.status(200).send(tecnologia);
};

const createTecnologia = async (req, res) => {
  const { nome } = req.body || {};
  const tecnologia = await tecnologiaService.createTecnologia({ nome });
  return res.status(201).send(tecnologia);
};

const updateTecnologia = async (req, res) => {
  const { nome } = req.body || {};
  const tecnologia = await tecnologiaService.updateTecnologia(req.params.tecnologiaId, { nome });
  if (!tecnologia) {
    throw new AppError("Tecnologia não encontrada.", 404);
  }
  return res.status(200).send(tecnologia);
};

const deleteTecnologia = async (req, res) => {
  const apagou = await tecnologiaService.deleteTecnologia(req.params.tecnologiaId);
  if (!apagou) {
    throw new AppError("Tecnologia não encontrada.", 404);
  }
  return res.status(204).send();
};

export default {
  getTecnologias,
  getTecnologia,
  createTecnologia,
  updateTecnologia,
  deleteTecnologia,
};