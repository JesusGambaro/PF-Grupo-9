const { Product, User, ShoppingCartItem } = require("../db.js")
const { sendError } = require("../helpers/error.js")

module.exports = {
  getCart: async (req, res) => {
    const { userId } = req.body
    try {
      const sameUserCartItems = await ShoppingCartItem.findAll({
        where: {
          userId,
        },
      })
      res.send(sameUserCartItems)
    } catch (error) {
      sendError(res, error)
    }
  },

  deleteCart: async (req, res) => {
    const { productId, userId, size } = req.body
    try {
      await ShoppingCartItem.destroy({
        where: { productId, userId, size },
      })
      res.send({ msg: "Product removed" })
    } catch (error) {
      sendError(res, error)
    }
  },

  putCart: async (req, res) => {
    const { productId, userId, amount, size } = req.body
    try {
      const product = await ShoppingCartItem.findOne({
        where: { productId, userId, size },
      })
      product.amount = amount;
      product.save();
      res.send({ msg: "Product modified" });
    } catch (error) {
      sendError(res, error)
    }
  },

  postCart: async (req, res) => {
    const { productId, userId, size } = req.body
    try {
      const cartItem = await ShoppingCartItem.findOne({
        where: { productId, userId, size },
      })
      if(cartItem){
        cartItem.amount += 1;
        cartItem.save()
      }else{
        await ShoppingCartItem.create({ productId, userId, size, amount: 1 })
      }

      res.send({ msg: "Cart Item created" })
    } catch (error) {
      sendError(res, error)
    }
  },
}

