const { DataTypes } = require("sequelize")
module.exports = (sequelize) => {
  sequelize.define("order", {
    delivered: {
      type: DataTypes.ENUM("undelivered", "delivered", "canceled", "completed"),
      defaultValue: "undelivered",
    },
    telephoneNumber: {
      type: DataTypes.BIGINT,
    },
    total: {
      type: DataTypes.INTEGER,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
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
