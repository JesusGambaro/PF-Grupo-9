const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  sequelize.define("shoppingCart", {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
    },

    telephoneNum: {
      type: DataTypes.INTEGER,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      default: false,
      allowNull: false,
    },
  })
}