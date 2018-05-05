module.exports =  (sequelize, types) => {
    function associate() {

    }
    let Model =  sequelize.define("tipo_negocio", {
        id: {
            type: types.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        descricao: types.STRING(200)
      })

      Model.associate = associate;
      return Model;
};

