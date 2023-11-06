const { DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    
    sequelize.define('Genre',{
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allownull:false,
    },
},
{timestamps:false,
});
};//exportamos una funciion con la definicion del objeto




//https://api.rawg.io/docs/#tag/genres
//BOOTCAMP BASES DE DATOS ORM

