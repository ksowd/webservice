module.exports =  (sequelize, types) => {
    
    function associate(models){
        const {
            tipo_negocio,
            categoria,
            usuario,
            anuncio
        } = models;

        anuncio.belongsTo(categoria,{
            foreignKey: 'categoria_id',
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
        ativo: {
            type: types.BOOLEAN,
            defaultValue: true,
        },
        nome: {
            type: types.STRING(200),
        },
        
        descricao: types.STRING(200)
     
    })
      
      Model.associate = associate;
      return Model;
};

