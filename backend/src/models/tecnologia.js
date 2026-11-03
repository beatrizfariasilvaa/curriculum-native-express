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

  return Tecnologia;
};

export default getTecnologiaModel;