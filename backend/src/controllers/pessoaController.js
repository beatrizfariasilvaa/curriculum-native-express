import { pessoaService } from "../services/index.js";
import { AppError } from "../utils/index.js";

const lerCampos = (body) => {
  const { nome, titulo, resumo, email, cidade, github, linkedin, fotoUrl } = body || {};
  return { nome, titulo, resumo, email, cidade, github, linkedin, fotoUrl };
};

const getPessoa = async (req, res) => {
  const pessoa = await pessoaService.getPessoaById(req.params.pessoaId);
  if (!pessoa) {
    throw new AppError("Pessoa não encontrada.", 404);
  } else {
    console.log(`Pessoa de id ${pessoa} encontrada com sucesso.`);
    return res.status(200).send(pessoa);
  }
};

const getPessoas = async (req, res) => {
  const pessoas = await pessoaService.getAllPessoas();
  console.log(`Listagem de todas pessoas retornada com sucesso.`);
  return res.status(200).send(pessoas);
};


const createPessoa = async (req, res) => {
  const pessoa = await pessoaService.createPessoa(lerCampos(req.body));
  console.log(`Pessoa de id ${pessoa} criada com sucesso.`);
  return res.status(201).send(pessoa);
};

const updatePessoa = async (req, res) => {
  const pessoa = await pessoaService.updatePessoa(req.params.pessoaId, lerCampos(req.body));
  if (!pessoa) {
    throw new AppError("Pessoa não encontrada.", 404);
  }
  return res.status(200).send(pessoa);
};

const deletePessoa = async (req, res) => {
  const apagou = await pessoaService.deletePessoa(req.params.pessoaId);
  if (!apagou) {
    throw new AppError("Pessoa não encontrada.", 404);
  }
  return res.status(204).send();
};

export default {
  getPessoas,
  getPessoa,
  createPessoa,
  updatePessoa,
  deletePessoa,
};