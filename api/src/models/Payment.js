const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  sequelize.define("payment", {
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    paymentId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    funding: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cardBrand: {
      type: DataTypes.STRING,
    },
    last4: {
      type: DataTypes.INTEGER,
    },
  })
}
