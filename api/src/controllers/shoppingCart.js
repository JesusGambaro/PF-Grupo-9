const { Sequelize, Op } = require("sequelize")
const { ShoppingCartItem, Product, Stock, Image } = require("../db.js")
const { sendError } = require("../helpers/error.js")
const { verifyToken } = require("../helpers/verify.js")

module.exports = {
  getCart: async (req, res) => {
    try {
      const decodedToken = await verifyToken(req, res)
      const sameUserCartItems = await ShoppingCartItem.findAll({
        where: {
          userId: decodedToken.id,
          ordered: false,
        },
        include: {
          model: Product,
          required: true,
          include: [
            { model: Image },
            {
              model: Stock,
              where: { size: { [Op.col]: "shoppingCartItem.size" } },
            },
          ],
        },
        order: [
          ["id", "DESC"],
          ["product", "images", "id", "ASC"],
        ],
      })
      let totalFootwear = 0
      sameUserCartItems.forEach((item) => {
        totalFootwear += item.amount
      })
      let total = 0
      sameUserCartItems.forEach((item) => {
        total += item.product.finalPrice * item.amount
      })
      res.send({ sameUserCartItems, total, totalFootwear })
    } catch (error) {
      sendError(res, error)
    }
  },

  deleteCart: async (req, res) => {
    try {
      const { id } = req.params

      const decodedToken = await verifyToken(req, res)
      const userId = decodedToken.id

      const shoppingCart = await ShoppingCartItem.findOne({
        where: { id },
      })

      if (userId === shoppingCart.userId) {
        await ShoppingCartItem.destroy({
          where: { id },
        })
        return res.send({ msg: "Cart item deleted" })
      } else {
        return res.send({ msg: "Wrong credentials" })
      }
    } catch (error) {
      sendError(res, error)
    }
  },

  deleteAllCart: async (req, res) => {
    try {
      const decodedToken = await verifyToken(req, res)
      const userId = decodedToken.id
      await ShoppingCartItem.destroy({
        where: { userId, ordered: false },
      })
      res.send({ msg: "All Products removed" })
    } catch (error) {
      sendError(res, error)
    }
  },

  putCart: async (req, res) => {
    try {
      const { productId, amount, size } = req.body
      const decodedToken = await verifyToken(req, res)
      const userId = decodedToken.id
      const productSelected = await Product.findOne({
        where: { id: productId },
        include: { model: Stock, where: { size } },
      })
      if (productSelected?.stocks[0].amount >= amount) {
        const cartItem = await ShoppingCartItem.findOne({
          where: { productId, userId, size, ordered: false },
        })
        cartItem.amount = amount
        await cartItem.save()
        res.send({ msg: "Cart item amount was modified" })
      } else {
        res.send({
          msg: `Not enough stock, only ${productSelected?.stocks[0].amount} units`,
        })
      }
    } catch (error) {
      sendError(res, error)
    }
  },

  postCart: async (req, res) => {
    try {
      const { productId, size } = req.body
      const decodedToken = await verifyToken(req, res)
      const userId = decodedToken.id
      const productSelected = await Product.findOne({
        where: { id: productId },
        include: { model: Stock, where: { size } },
      })

      if (productSelected?.stocks[0].amount > 0) {
        const [cartItem] = await ShoppingCartItem.findOrCreate({
          where: { productId, userId, size, ordered: false },
        })
        if (cartItem.amount < productSelected?.stocks[0].amount) {
          cartItem.amount++
          await cartItem.save()
        }

        res.send(cartItem)
      } else {
        res.send({ msg: "No Stock" })
      }
    } catch (error) {
      sendError(res, error)
    }
  },
}
