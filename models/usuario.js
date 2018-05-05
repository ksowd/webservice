const bcrypt = require("bcryptjs");

module.exports = (sequelize, types) => {
  return sequelize.define("usuario", {
    id: {
      type: types.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: types.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: types.STRING(50),
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    senha: {
      type: types.STRING(120),
      allowNull: false,
      validate: {
        isLength(value) {
          if (value.length < 6)
            throw new Error("Senha precisa ter no mínimo 6 caracteres");
        }
      }
    },
    endereco: {
      type: types.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    cnpj: {
      type: types.STRING(14),
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    telefone: {
      type: types.STRING(11),
      allowNull: false,
      validate: {
        notEmpty: true,
        hasOnlyNumbers(value) {
          Array.from(value).map(i => {
            if (isNaN(parseInt(i, 10))) throw new Error("Caractere inválido");
          });
        }
      }
    },
    cidade: {
      type: types.STRING(40),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    estado: {
      type: types.STRING(2),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  });
};
