module.exports = (sequelize, types) =>
  sequelize.define("usuario", {
    id: {
      type: types.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: types.STRING(100),
      allowNull: false
    },
    email: {
      type: types.STRING(50),
      allowNull: false
    },
    senha: {
      type: types.STRING(90),
      allowNull: false
    },
    endereco: {
      type: types.STRING(100),
      allowNull: false
    },
    cnpj: {
      type: types.STRING(14),
      allowNull: false
    },
    telefone: {
      type: types.STRING(11),
      allowNull: false
    },
    cidade: {
      type: types.STRING(40),
      allowNull: false
    },
    estado: {
      type: types.STRING(2),
      allowNull: false
    }
  });
