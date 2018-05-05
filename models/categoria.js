module.exports =  (sequelize, types) => {
    return sequelize.define("categoria", {
        id: {
            type: types.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        descricao: types.STRING(200)
      })
};

