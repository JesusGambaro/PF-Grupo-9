const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  sequelize.define("shoppingCartItem", {
    amount: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  })
}