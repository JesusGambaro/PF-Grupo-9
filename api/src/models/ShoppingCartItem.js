const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  sequelize.define("shoppingCartItem", {
    amount: {
      type: DataTypes.INTEGER,
      default: 1,
    },
  })
}