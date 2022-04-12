const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
    sequelize.define('stock', {
        
        size: {
            type: DataTypes.INTEGER,
            validate: {
                between1And5(value){
                    if(parseInt(value) < 1 || parseInt(value) > 50){
                        throw new Error("Only numbers between 1 and 50 are allowed.")
                    }
                }
            },
            allowNull: false,
        },
        amount: {
            type: DataTypes.INTEGER,
            validate: {
                between1And5(value){
                    if(parseInt(value) < 0 || parseInt(value) > 1000000){
                        throw new Error("Only numbers between 0 and 1000000 are allowed.")
                    }
                }
            },
            allowNull: false,
        },
        
    });
};

// ID (PK)
// size
// amount
// Colour_ID(FK)
// Model_ID(FK)
// Image_ID(FK)