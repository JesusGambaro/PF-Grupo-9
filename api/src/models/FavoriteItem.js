const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  sequelize.define("favoriteItem", {
    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  })
}
