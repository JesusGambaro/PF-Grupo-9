const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Se hace la conexion a la BD.
const sequelize = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/pfshoes`, {
     logging: false,
     native: false
});

const basename = path.basename(__filename);

// modelDefiners Almacena los modelos
const modelDefiners = [];

// Se leen los archivos de la carpeta Models 
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
});

// Se inyecta la conexion a los modelos
modelDefiners.forEach(model => model(sequelize));

// Capitalizamos los nombres de los modelos
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// Se hace destructuring para los modelos para relacionarlos.
const {Product, Image} = sequelize.models;

// Se asignan las relaciones M:N

Product.hasMany(Image);
Image.belongsTo(Product);


module.exports = {
     ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
     conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
