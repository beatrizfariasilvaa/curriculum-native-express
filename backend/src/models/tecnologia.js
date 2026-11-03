const getTecnologiaModel = (sequelize, { DataTypes }) => {
  const Tecnologia = sequelize.define(
    "tecnologia",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nome: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: { notEmpty: true },
      },
    },
    {
      tableName: "tecnologias",
      name: { singular: "tecnologia", plural: "tecnologias" },
    },
  );
  
  Tecnologia.associate = (models) => {
    Tecnologia.belongsToMany(models.Projeto, {
      through: "projeto_tecnologias",
      foreignKey: "tecnologiaId",
      otherKey: "projetoId",
    });
  };

  return Tecnologia;
};

export default getTecnologiaModel;