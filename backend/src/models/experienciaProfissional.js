const getExperienciaProfissionalModel = (sequelize, { DataTypes }) => {
  const ExperienciaProfissional = sequelize.define(
    "experienciaProfissional",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      empresa: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      cargo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      inicio: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      fim: {
        type: DataTypes.DATEONLY, 
      },
      descricao: {
        type: DataTypes.TEXT,
      },
      pessoaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "experiencias_profissionais",
      name: { singular: "experienciaProfissional", plural: "experienciasProfissionais" },
    },
  );

  return ExperienciaProfissional;
};

export default getExperienciaProfissionalModel;