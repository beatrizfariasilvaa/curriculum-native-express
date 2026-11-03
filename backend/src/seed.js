import models from "./models/index.js";

const criarTecnologias = async (nomes) => {
  const tecnologias = await models.Tecnologia.bulkCreate(nomes.map((nome) => ({ nome })));
  const porNome = {};
  tecnologias.forEach((t) => {
    porNome[t.nome] = t;
  });
  return porNome;
};

const criarPessoa = async (dados, projetos, tec) => {
  const pessoa = await models.Pessoa.create(dados, {
    include: [models.ExperienciaAcademica, models.ExperienciaProfissional],
  });

  for (const { tecnologias, ...projeto } of projetos) {
    const criado = await models.Projeto.create({ ...projeto, pessoaId: pessoa.id });
    await criado.setTecnologias(tecnologias.map((nome) => tec[nome]));
  }

  return pessoa;
};

const seed = async () => {
  const tec = await criarTecnologias([
    "Angular", "Docker", "Expo", "Express", "FastAPI", "Node.js",
    "Pandas", "PostgreSQL", "Python", "React", "React Native",
    "Spring Boot", "TypeScript", "XGBoost",
  ]);

  await criarPessoa(
    {
      nome: "Beatriz Farias Silva",
      titulo: "AI Engineer Intern",
      resumo: "AI Engineer Intern em Recife. Construo sistemas web de ponta a ponta com Inteligência Artificial e estudo Ciência de Dados.",
      email: "beatriz.silva@unicap.br",
      cidade: "Recife, PE",
      github: "https://github.com/beatrizfariasilva",
      linkedin: "https://www.linkedin.com/in/beatrizfariasilva",
      fotoUrl: null,
      experienciasAcademicas: [
        {
          instituicao: "Universidade Católica de Pernambuco (UNICAP)",
          curso: "Sistemas para Internet",
          nivel: "Graduação",
          inicio: "2025-02-01",
          fim: null,
          descricao: "Bolsista do programa Embarque Digital.",
        },
        {
          instituicao: "Porto Digital · Globo (Rio de Janeiro)",
          curso: "Residência em Tecnologia",
          nivel: null,
          inicio: "2025-08-01",
          fim: "2025-12-15",
          descricao: "Residência do programa Embarque Digital.",
        },
        {
          instituicao: "Porto Digital · Beyond",
          curso: "Residência em Tecnologia",
          nivel: null,
          inicio: "2025-02-01",
          fim: "2025-06-30",
          descricao: "Residência do programa Embarque Digital.",
        },
      ],
      experienciasProfissionais: [
        {
          empresa: "Safe Soluções Tecnológicas",
          cargo: "Desenvolvedora Fullstack Júnior",
          inicio: "2026-03-01",
          fim: "2026-07-01",
          descricao:
            "Desenvolvimento, como dev única, de um sistema interno de gestão de serviços de campo (ordens de serviço, painéis Kanban, cotações).",
        },
        {
          empresa: "Fundação Antônio dos Santos Abranches",
          cargo: "AI Engineer Intern",
          inicio: "2026-08-01",
          fim: null,
          descricao:
            "Desenvolvimento de sistemas web completos com Inteligência Artificial para a Universidade Católica de Pernambuco",
        }
      ],
    },
    [
      {
        nome: "Sistema de Gestão de Serviços de Campo",
        descricao: "Sistema interno que substitui planilhas e ERP no controle de ordens de serviço.",
        link: null,
        tecnologias: ["Python", "FastAPI", "PostgreSQL", "React"],
      },
      {
        nome: "Análise do ITBI do Recife",
        descricao: "Regressão sobre transações imobiliárias de 2025 para achar padrões de preço por bairro.",
        link: null,
        tecnologias: ["Python", "Pandas", "XGBoost", "FastAPI", "Docker"],
      },
    ],
    tec,
  );

  await criarPessoa(
    {
      nome: "Minerva Andrade",
      titulo: "Desenvolvedor Mobile",
      resumo: "Pessoa fictícia, criada para demonstrar a API com um segundo currículo.",
      email: "Minerva.andrade@exemplo.com",
      cidade: "Olinda, PE",
      github: "https://github.com/exemplo",
      linkedin: null,
      fotoUrl: null,
      experienciasAcademicas: [
        {
          instituicao: "Instituto Federal de Pernambuco (IFPE)",
          curso: "Análise e Desenvolvimento de Sistemas",
          nivel: "Graduação",
          inicio: "2021-02-01",
          fim: "2023-12-20",
          descricao: null,
        },
      ],
      experienciasProfissionais: [
        {
          empresa: "Agência Mangue Apps",
          cargo: "Desenvolvedora React Native",
          inicio: "2024-01-15",
          fim: null,
          descricao: "Apps de delivery e fidelidade para comércios locais.",
        },
        {
          empresa: "Agência Mangue Apps",
          cargo: "Estagiária de Front-end",
          inicio: "2023-03-01",
          fim: "2023-12-31",
          descricao: null,
        },
      ],
    },
    [
      {
        nome: "Cardápio Digital",
        descricao: "App de cardápio com pedidos pelo celular.",
        link: "https://github.com/exemplo/cardapio",
        tecnologias: ["React Native", "Expo", "TypeScript"],
      },
      {
        nome: "Painel de Pedidos",
        descricao: "Painel web que recebe os pedidos do app em tempo real.",
        link: null,
        tecnologias: ["Angular", "Spring Boot", "PostgreSQL"],
      },
    ],
    tec,
  );
};

export default seed;
