const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  sequelize.define("shoppingCartItem", {
    amount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ordered: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  })
}
