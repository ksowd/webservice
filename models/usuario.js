const { sequelize, Sequelize } = require("./index");

sequelize.define("usuario", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  email: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  senha: {
    type: Sequelize.STRING(90),
    allowNull: false
  },
  endereco: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  cnpj: {
    type: Sequelize.STRING(14),
    allowNull: false
  },
  telefone: {
    type: Sequelize.STRING(11),
    allowNull: false
  },
  cidade: {
    type: Sequelize.STRING(40),
    allowNull: false
  },
  estado: {
    type: Sequelize.STRING(2),
    allowNull: false
  }
});
