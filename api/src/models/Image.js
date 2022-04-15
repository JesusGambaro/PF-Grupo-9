const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  sequelize.define("image", {
    url: {
      type: DataTypes.STRING,
      defaultValue:
        "https://prints.ultracoloringpages.com/a0a8dc73db628bb36989edb4aa96619b.png",
    },
  })
}
