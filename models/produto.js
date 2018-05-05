module.exports =  (sequelize, types) => {
    let Model  =  sequelize.define("produto", {
        id: {
            type: types.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        descricao: types.STRING(200)
      })

      return Model
};

