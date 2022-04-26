const { DataTypes } = require("sequelize")
module.exports = (sequelize) => {
  sequelize.define("order", {
    delivered: {
      type: DataTypes.ENUM("undelivered", "delivered", "canceled", "completed"),
      defaultValue: "undelivered",
    },
    telephoneNum: {
      type: DataTypes.BIGINT,
    },
    total: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postalCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    floor: {
      type: DataTypes.INTEGER,
    },
    apartment: {
      type: DataTypes.STRING,
    },
    notes: {
      type: DataTypes.TEXT,
    },
  })
}
