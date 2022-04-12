const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
    sequelize.define('image', {
        url: {
            type: DataTypes.STRING,
            defaultValue: "https://prints.ultracoloringpages.com/a0a8dc73db628bb36989edb4aa96619b.png",
        },
    });
};


// id (PK)
// url
// Stock_ID(FK)