const { Op, Sequelize } = require("sequelize")
const {
  Product,
  Image,
  Stock,
  ShoppingCartItem,
  FavoriteItem,
  Review,
} = require("../db.js")
const { sendError } = require("../helpers/error.js")
const cloudinary = require("../helpers/cloudinary.js")

module.exports = {
  getAllFootwear: async (req, res) => {
    const { footwear } = req.query
    try {
      if (footwear) {
        const footwearsSearched = await Product.findAll({
          where: {
            [Op.or]: [
              { model: { [Op.iLike]: `%${footwear}%` } },
              Sequelize.where(
                Sequelize.cast(Sequelize.col("brand"), "varchar"),
                {
                  [Op.iLike]: `%${footwear}%`,
                }
              ),
            ],
          },
          include: [
            {
              model: Image,
            },
            {
              model: Stock,
              where: {
                amount: { [Op.gt]: 0 },
              },
            },
          ],
          order: [
            ["id", "ASC"],
            ["images", "id", "ASC"],
          ],
        })
        return res.send(footwearsSearched)
      }
      const allFootwears = await Product.findAll({
        attributes: { exclude: "description" },
        include: [
          {
            model: Image,
          },
          {
            model: Stock,
            where: {
              amount: { [Op.gt]: 0 },
            },
          },
        ],
        order: [
          ["id", "ASC"],
          ["images", "id", "ASC"],
        ],
      })
      return res.send(allFootwears)
    } catch (error) {
      sendError(res, error)
    }
  },

  getAllFootwearForAdmin: async (req, res) => {
    const { footwear } = req.query
    try {
      if (footwear) {
        const footwearsSearched = await Product.findAll({
          where: {
            [Op.or]: [
              { model: { [Op.iLike]: `%${footwear}%` } },
              Sequelize.where(
                Sequelize.cast(Sequelize.col("brand"), "varchar"),
                {
                  [Op.iLike]: `%${footwear}%`,
                }
              ),
            ],
          },
          include: [{ model: Image }, { model: Stock }],
          order: [
            ["id", "ASC"],
            ["images", "id", "ASC"],
          ],
        })

        return res.send(footwearsSearched)
      }
      const allFootwears = await Product.findAll({
        attributes: { exclude: "description" },
        include: [{ model: Image }, { model: Stock }],
        order: [
          ["id", "ASC"],
          ["images", "id", "ASC"],
        ],
      })
      return res.send(allFootwears)
    } catch (error) {
      sendError(res, error)
    }
  },

  getAllGenders: async (req, res) => {
    try {
      const genders = await Product.findAll({
        attributes: ["gender"],
        group: ["gender"],
      })
      res.send(genders ? genders : [])
    } catch (error) {
      sendError(res, error)
    }
  },

  getAllCategories: async (req, res) => {
    try {
      const allCategories = await Product.findAll({
        attributes: ["category"],
        group: ["category"],
      })
      res.send(allCategories)
    } catch (error) {
      sendError(res, error)
    }
  },

  getAllSales: async (req, res) => {
    try {
      const carouselSale = await Product.findAll({
        limit: 6,
        where: {
          sale: { [Op.gt]: 0 },
        },
        include: [
          {
            model: Image,
          },
          {
            model: Stock,
            where: {
              amount: { [Op.gt]: 0 },
            },
          },
        ],
        order: [
          ["id", "ASC"],
          ["images", "id", "ASC"],
        ],
      })

      res.send(carouselSale)
    } catch (error) {
      sendError(res, error)
    }
  },

  getAllProductsSameModel: async (req, res) => {
    try {
      const { model } = req.params
      const productsSearched = await Product.findAll({
        where: {
          model: {
            [Op.eq]: model,
          },
        },
        include: [
          {
            model: Image,
          },
          {
            model: Stock,
          },
          {
            model: Review,
            through: { attributes: [] },
          },
        ],
        order: [
          ["id", "ASC"],
          ["images", "id", "ASC"],
        ],
      })
      res.status(200).send(productsSearched)
    } catch (error) {
      sendError(res, error)
    }
  },

  getAllProductsSameModelForAdmin: async (req, res) => {
    try {
      const { model } = req.params
      const productsSearched = await Product.findAll({
        where: {
          model: {
            [Op.eq]: model,
          },
        },
        include: [{ model: Image }, { model: Stock }],
        order: [
          ["id", "ASC"],
          ["images", "id", "ASC"],
        ],
      })
      res.status(200).send(productsSearched)
    } catch (error) {
      sendError(res, error)
    }
  },

  getProductById: async (req, res) => {
    try {
      const { id } = req.params
      const footwear = await Product.findOne({
        where: {
          id: { [Op.eq]: id },
        },
        include: [
          {
            model: Image,
          },
          {
            model: Stock,
          },
          {
            model: Review,
            through: { attributes: [] },
          },
        ],
        order: [
          ["id", "ASC"],
          ["images", "id", "ASC"],
        ],
      })
      res.send(footwear)
    } catch (error) {
      sendError(res, error)
    }
  },

  getProductByIdForAdmin: async (req, res) => {
    try {
      const { id } = req.params
      const footwear = await Product.findOne({
        where: {
          id: { [Op.eq]: id },
        },
        include: [{ model: Image }, { model: Stock }],
        order: [
          ["id", "ASC"],
          ["images", "id", "ASC"],
        ],
      })
      res.send(footwear)
    } catch (error) {
      sendError(res, error)
    }
  },

  postNewProduct: async (req, res) => {
    try {
      const {
        model,
        brand,
        category,
        gender,
        price,
        description,
        sale,
        color,
        stock,
      } = req.body

      // const model = "Harmoso3"
      // const brand = "New Balance"
      // const category = "Elegant"
      // const gender = "Male"
      // const price = 34000
      // const description = "Zapato fachero"
      // const sale = 0
      // const color = "Yellow"
      // const stock = [{size: 10, amount: 100}, {size:12, amount: 200}]

      const imgFiles = req.files
      
      const foundProduct = await Product.findOne({
        where: { model, brand, color },
      })

      if (foundProduct) return res.send({ msg: "This product already exist" })
      let product = await Product.create({
        model,
        brand,
        category,
        gender,
        price,
        description,
        sale,
        color,
      })

      if (Object.keys(imgFiles).length !== 0) {
        Object.entries(imgFiles).forEach(async ([key, imgFile]) => {
          const urlImg = await cloudinary(imgFile.tempFilePath)
          let imageProduct = await Image.create({ url: urlImg.secure_url })
          await product.addImage(imageProduct)
        })
      }

      stock.length > 0 &&
        stock.map(async (amountAndSize) => {
          let stockProduct = await Stock.create({
            size: amountAndSize.size,
            amount: amountAndSize.amount,
          })
          await product.addStock(stockProduct)
        })

      return res.send("Product with its images created!")
    } catch (error) {
      sendError(res, error)
    }
  },

  editProduct: async (req, res) => {
    try {
      const {
        model,
        brand,
        category,
        gender,
        price,
        description,
        sale,
        color,
        stock,
      } = req.body
      // console.log("req.body", req.body)
      // const model = "Harmoso3"
      // const brand = "New Balance"
      // const category = "Elegant"
      // const gender = "Male"
      // const price = 34000
      // const description = "Zapato fachero"
      // const sale = 0
      // const color = "Yellow"
      // const stock = [{size: 10, amount: 10000}, {size:12, amount: 20000}]

      const { id } = req.params
      const imgFiles = req.files

      const product = await Product.findOne({
        where: { id },
      })

      if (model) {
        product.model = model
        await product.save()
      }
      if (brand) {
        product.brand = brand
        await product.save()
      }
      if (category) {
        product.category = category
        await product.save()
      }
      if (gender) {
        product.gender = gender
        await product.save()
      }
      if (price) {
        product.price = price
        await product.save()
      }
      if (description) {
        product.description = description
        await product.save()
      }
      if (sale) {
        product.sale = sale
        await product.save()
      }
      if (color) {
        product.color = color
        await product.save()
      }
      if (stock.length > 0) {
        await Stock.destroy({
          where: { productId: product.id },
        })
        stock.map(async (amountAndSize) => {
          let stockProduct = await Stock.create({
            size: parseInt(amountAndSize.size),
            amount: parseInt(amountAndSize.amount),
          })
          await product.addStock(stockProduct)
        })
      }

      if (Object.keys(imgFiles).length !== 0) {
        const productImages = await Image.destroy({
          where: { productId: id },
        })
        Object.entries(imgFiles).forEach(async ([key, imgFile]) => {
          const urlImg = await cloudinary(imgFile.tempFilePath)
          let imageProduct = await Image.create({ url: urlImg.secure_url })
          await product.addImage(imageProduct)
        })
      }

      res.send("calzado editado")
    } catch (error) {
      sendError(res, error)
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params
      const product = await Product.findOne({ id })
      if (product) {
        // eliminar todas las imagenes relacionadas al producto.
        const imageProduct = await Image.findAll({
          where: { productId: id },
        })
        imageProduct &&
          imageProduct.map(async (imageItem) => {
            await imageItem.destroy()
          })

        // eliminar todo el stock relacionado al producto. ordenes, cartItems.
        const stockProduct = await Stock.findAll({
          where: { productId: id },
        })
        stockProduct &&
          stockProduct.map(async (stockItem) => {
            await stockItem.destroy()
          })

        // eliminar todos los cart items relacionados al producto.
        const cartProduct = await ShoppingCartItem.findAll({
          where: { productId: id },
        })
        cartProduct &&
          cartProduct.map(async (cartItem) => {
            await cartItem.destroy()
          })

        // eliminar todos los favorite items relacionados al producto.
        const favoriteItem = await FavoriteItem.findAll({
          where: { productId: id },
        })
        favoriteItem &&
          favoriteItem.map(async (favItem) => {
            await favItem.destroy()
          })

        // Finalmente elimimnar el producto.
        product.destroy()
      }
      res.send("product destroyed")
    } catch (error) {
      sendError(res, error)
    }
  },
}