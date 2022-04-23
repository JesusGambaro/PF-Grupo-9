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
          include: { model: Image },
        },
      })
      res.send(sameUserCartItems)
    } catch (error) {
      sendError(res, error)
    }
  },

  deleteCart: async (req, res) => {
    try {
      const { id } = req.params
      await ShoppingCartItem.destroy({
        where: { id },
      })
      return res.send({ msg: "Cart item deleted" })
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
          where: { productId, userId, size },
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
      console.log(userId, productId, size)
      const productSelected = await Product.findOne({
        where: { id: productId },
        include: { model: Stock, where: { size } },
      })

      if (productSelected?.stocks[0].amount > 0) {
        let [cartItem] = await ShoppingCartItem.findOrCreate({
          where: { productId, userId, size },
        })

        cartItem.amount++
        await cartItem.save()

        res.send(cartItem)
      } else {
        res.send({ msg: "No Stock" })
      }
    } catch (error) {
      sendError(res, error)
    }
  },
}
