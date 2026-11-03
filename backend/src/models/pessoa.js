
const getPessoaModel = (sequelize, { DataTypes }) => {
    const Pessoa = sequelize.define("pessoa", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: true},
        },
        titulo: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: true},
        },
        resumo: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: { isEmail: true},
        },
        cidade: {
            type: DataTypes.STRING,
        },
        github: {
            type: DataTypes.STRING,
        },
        linkedin: {
            type: DataTypes.STRING,
        },
        fotoUrl: {
            type: DataTypes.STRING,
            validate: { isUrl: true },
        },
    });
    Pessoa.associate = (models) => {
    Pessoa.hasMany(models.ExperienciaAcademica, { foreignKey: "pessoaId", onDelete: "CASCADE" });
    Pessoa.hasMany(models.ExperienciaProfissional, { foreignKey: "pessoaId", onDelete: "CASCADE" });
    Pessoa.hasMany(models.Projeto, { foreignKey: "pessoaId", onDelete: "CASCADE" });
    };
    
    return Pessoa;
};

export default getPessoaModel;