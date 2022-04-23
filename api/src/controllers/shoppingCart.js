const { ShoppingCartItem, Product, Stock } = require("../db.js")
const { sendError } = require("../helpers/error.js")
const jwt = require("jsonwebtoken")

module.exports = {
  getCart: async (req, res) => {
    const { token } = req.body
    const decodedToken = jwt.verify(token, process.env.SECRET)
    try {
      const sameUserCartItems = await ShoppingCartItem.findAll({
        where: {
          userId: decodedToken.id,
        },
        include: {
          model: Product,
        },
      })
      res.send(sameUserCartItems)
    } catch (error) {
      sendError(res, error)
    }
  },

  deleteCart: async (req, res) => {
    const { productId, token, size } = req.body
    const decodedToken = jwt.verify(token, process.env.SECRET)
    const userId = decodedToken.id;
    try {
      await ShoppingCartItem.destroy({
        where: { productId, userId, size },
      })
      res.send({ msg: "Cart item deleted" })
    } catch (error) {
      sendError(res, error)
    }
  },
  
  deleteAllCart: async (req, res) => {
    const { token } = req.body;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const userId = decodedToken.id;
    try {
      await ShoppingCartItem.destroy({
        where: { userId, ordered: false },
      })
      res.send({ msg: "All Products removed" })
    } catch (error) {
      sendError(res, error)
    }
  },

  putCart: async (req, res) => {
    const { productId, token, amount, size } = req.body
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const userId = decodedToken.id;
    try {
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
        res.send({ msg: `Not enough stock, only ${productSelected?.stocks[0].amount} units` })
      }
    } catch (error) {
      sendError(res, error)
    }
  },

  postCart: async (req, res) => {
    const { productId, token, size } = req.body;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const userId = decodedToken.id;
    
    try {
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
