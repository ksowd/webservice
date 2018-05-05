module.exports =  (sequelize, types) => {
    
    function associate(models){
        const {
            tipo_negocio,
            produto,
            usuario,
            anuncio
        } = models;

        anuncio.belongsTo(produto,{
            foreignKey: 'produto_id',
        });
        console.log(models)
        anuncio.belongsTo(tipo_negocio,{
            foreignKey: 'tipo_negocio_id',            
        });
        anuncio.belongsTo(usuario,{
            foreignKey: 'usuario_id', 
        });

    }

    let Model =  sequelize.define("anuncio", {
        id: {
            type: types.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        ativo:  types.BOOLEAN,
        descricao: types.STRING(200)
      })
      
      Model.associate = associate;
      return Model;
};

