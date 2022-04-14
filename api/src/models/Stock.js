const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  sequelize.define("stock", {
    size: {
      type: DataTypes.FLOAT,
      validate: {
        between1And5(value) {
          if (parseInt(value) < 3 || parseInt(value) > 50) {
            throw new Error("Only numbers between 3 and 50 are allowed.")
          }
        },
      },
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      validate: {
        between1And5(value) {
          if (parseInt(value) < 0 || parseInt(value) > 100000) {
            throw new Error("Only numbers between 0 and 100.000 are allowed.")
          }
        },
      },
      allowNull: false,
    },
  })
}
