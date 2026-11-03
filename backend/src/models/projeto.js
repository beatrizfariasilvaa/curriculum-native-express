const getProjetoModel = (sequelize, { DataTypes }) => {
  const Projeto = sequelize.define("projeto", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    descricao: {
      type: DataTypes.TEXT,
    },
    link: {
      type: DataTypes.STRING,
      validate: { isUrl: true },
    },
    pessoaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Projeto.associate = (models) => {
    Projeto.belongsTo(models.Pessoa, { foreignKey: "pessoaId" });
    Projeto.belongsToMany(models.Tecnologia, {
      through: "projeto_tecnologias",
      foreignKey: "projetoId",
      otherKey: "tecnologiaId",
    });
  };

  return Projeto;
};

export default getProjetoModel;