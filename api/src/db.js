const { Sequelize } = require("sequelize")
const fs = require("fs")
const path = require("path")
require("dotenv").config()
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env
// const sequelize = new Sequelize(
//   `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/pfshoes`,
//   {
//     logging: false,
//     native: false,
//   }
// )
let sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: 5432,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            // Ref.: https://github.com/brianc/node-postgres/issues/2009
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/pfshoes`, {
        logging: false,
        native: false,
      })
const basename = path.basename(__filename)

const modelDefiners = []

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)))
  })

modelDefiners.forEach((model) => model(sequelize))

let entries = Object.entries(sequelize.models)
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
])
sequelize.models = Object.fromEntries(capsEntries)

const {
  Product,
  Image,
  Stock,
  Order,
  ShoppingCartItem,
  User,
  FavoriteItem,
  Payment,
  Review,
} = sequelize.models

Product.hasMany(Image)
Image.belongsTo(Product)
Product.hasMany(Stock)
Stock.belongsTo(Product)

User.hasMany(ShoppingCartItem)
ShoppingCartItem.belongsTo(User)
User.hasMany(Order)
Order.belongsTo(User)
Order.hasOne(Payment)
Payment.belongsTo(Order)

Product.hasMany(ShoppingCartItem)
ShoppingCartItem.belongsTo(Product)
Order.hasMany(ShoppingCartItem)
ShoppingCartItem.belongsTo(Order)

User.hasMany(FavoriteItem)
FavoriteItem.belongsTo(User)
Product.hasMany(FavoriteItem)
FavoriteItem.belongsTo(Product)

User.hasMany(Review)
Review.belongsTo(User)
Product.belongsToMany(Review, { through: "SameModelProductsReview" })
Review.belongsToMany(Product, { through: "SameModelProductsReview" })

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
}
