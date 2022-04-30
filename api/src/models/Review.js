const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  sequelize.define("review", {
    description: {
      type: DataTypes.TEXT,
    },
    rating: {
      type: DataTypes.FLOAT,
      validate: {
        between1And5(value) {
          if (parseInt(value) < 1 || parseInt(value) > 5) {
            throw new Error("Only numbers between 1 and 5 are allowed.")
          }
        },
      },
      allowNull: false,
    },
  })
}
