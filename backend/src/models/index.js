import Sequelize from "sequelize";
import pg from "pg";
import getPessoaModel from "./pessoa.js";
import getExperienciaAcademicaModel from "./experienciaAcademica.js";
import getExperienciaProfissionalModel from "./experienciaProfissional.js";
import getProjetoModel from "./projeto.js";
import getTecnologiaModel from "./tecnologia.js";

const sequelize=new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    dialectModule: pg
});

const models={
    Pessoa: getPessoaModel(sequelize, Sequelize),
    ExperienciaAcademica: getExperienciaAcademicaModel(sequelize, Sequelize),
    ExperienciaProfissional: getExperienciaProfissionalModel(sequelize, Sequelize),
    Projeto: getProjetoModel(sequelize, Sequelize),
    Tecnologia: getTecnologiaModel(sequelize, Sequelize),
};

export { sequelize };
export default models;