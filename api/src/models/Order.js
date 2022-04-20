const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  sequelize.define("order", {
    delivered: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    address: {
        type: DataTypes.TEXT,
      },
      telephoneNum: {
        type: DataTypes.INTEGER,
      },
  })
}