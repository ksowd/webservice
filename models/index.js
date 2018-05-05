"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var basename = path.basename(__filename);
var env = process.env.NODE_ENV || "development";
var config = require(__dirname + "/../config/config.json")[env];
var db = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  console.log(config);
  var sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      username: config.username,
      password: config.password,
      database: config.database,
      host: 'mysql642.umbler.com',
      dialect: 'mysql',
      port: '41890',
      define: {
        timestamps: false,
        freezeTableName: true
      }
    }
  );
}

sequelize
  .authenticate()
  .then(() => {
    console.log("Conectado no BD com sucesso.");
  })
  .catch(ex => {
    console.error("Erro ao se conectar no BD:", ex);
  });

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(file => {
    var model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
sequelize.sync();

module.exports = db;
