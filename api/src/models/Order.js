const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  sequelize.define("order", {
    size: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    delivered: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    telephoneNum: {
      type: DataTypes.INTEGER,
    },
  })
}