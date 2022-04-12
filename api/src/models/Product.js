const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
    sequelize.define('product', {
        model: {
            type: DataTypes.STRING,
            allowNull: false, //defaultValue; autoIncrement; unique;
            unique: true,
        },
        price: {
            type: DataTypes.INTEGER,
            validate: {
                between1And5(value){
                    if(parseInt(value) < 1 || parseInt(value) > 1000000){
                        throw new Error("Only numbers between 1 and 1000000 are allowed.")
                    }
                }
            },
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            
        },
        sale: {
            type: DataTypes.INTEGER,
            validate: {
                between1And5(value){
                    if(parseInt(value) < 0 || parseInt(value) > 99){
                        throw new Error("Only numbers between 0 and 99 are allowed.")
                    }
                }
            },
            allowNull: false,
            defaultValue: 0,
        },
    });
};

// model
// Brand_ID(FK)
// Category_ID(FK)
// Gender_ID(FK)
// price
// description
// sale