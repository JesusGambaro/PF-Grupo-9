const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  sequelize.define("product", {
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        between1And5(value) {
          if (parseInt(value) < 1 || parseInt(value) > 100000) {
            throw new Error("Only numbers between 1 and 100000 are allowed.")
          }
        },
      },
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    sale: {
      type: DataTypes.INTEGER,
      validate: {
        between1And5(value) {
          if (parseInt(value) < 0 || parseInt(value) > 99) {
            throw new Error("Only numbers between 0 and 99 are allowed.")
          }
        },
      },
      allowNull: false,
      defaultValue: 0,
    },

    color: {
      type: DataTypes.ENUM(
        "Black",
        "White",
        "Brown",
        "Purple",
        "Orange",
        "Red",
        "Blue",
        "Green",
        "Yellow",
        "Gray",
        "Beige",
        "Pink"
      ),
      allowNull: false,
    },
    brand: {
      type: DataTypes.ENUM(
        "Nike",
        "Adidas",
        "Jordan",
        "Puma",
        "New Balance",
        "Reebok",
        "Converse"
      ),
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM("Female", "Male", "Unisex", "Kids"),
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM("Urban", "Sport", "Elegant", "Running", "Others"),
      allowNull: false,
    },
  })
}
