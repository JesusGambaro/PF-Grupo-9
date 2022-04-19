const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  sequelize.define("order", {
    delivered: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
  })
}