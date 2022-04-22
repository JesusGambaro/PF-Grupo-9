const { DataTypes } = require("sequelize")
module.exports = (sequelize) => {
  sequelize.define("order", {
    delivered: {
      type: DataTypes.ENUM("undelivered", "delivered", "canceled", "completed"),
      defaultValue: "undelivered",
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    telephoneNum: {
      type: DataTypes.BIGINT,
    },
    total: {
      type: DataTypes.INTEGER,
    },
  })
}
