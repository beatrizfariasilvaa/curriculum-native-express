const getExperienciaAcademicaModel = (sequelize, { DataTypes }) => {
  const ExperienciaAcademica = sequelize.define(
    "experienciaAcademica", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        instituicao: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: true},
        },
        curso: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: true},
        },
        nivel: {
            type: DataTypes.STRING,
        },
        inicio: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        fim: {
            type: DataTypes.DATEONLY,
        },
        descricao: {
            type: DataTypes.STRING,
        },
        pessoaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "experiencias_academicas",
      name: { singular: "experienciaAcademica", plural: "experienciasAcademicas" },
    },
  ); 
  ExperienciaAcademica.associate = (models) => {
    ExperienciaAcademica.belongsTo(models.Pessoa, { foreignKey: "pessoaId" });
  }; return ExperienciaAcademica;
};

export default getExperienciaAcademicaModel;