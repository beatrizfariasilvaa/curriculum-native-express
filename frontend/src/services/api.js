import { API_URL, PESSOA_ID } from "../constants/config";

async function buscar(caminho) {
  const resposta = await fetch(`${API_URL}${caminho}`);
  if (!resposta.ok) {
    throw new Error(`A API respondeu ${resposta.status} em ${caminho}`);
  }
  return await resposta.json();
}

export const getCurriculo = () => buscar(`/pessoas/${PESSOA_ID}/curriculo`);
export const getAcademicas = () => buscar(`/academicas?pessoaId=${PESSOA_ID}`);
export const getProfissionais = () => buscar(`/profissionais?pessoaId=${PESSOA_ID}`);
export const getProjetos = () => buscar(`/projetos?pessoaId=${PESSOA_ID}`);