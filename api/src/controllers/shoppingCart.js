const { ShoppingCartItem, Product, Stock } = require("../db.js")
const { sendError } = require("../helpers/error.js")

module.exports = {
  getCart: async (req, res) => {
    const { userId } = req.body
    try {
      const sameUserCartItems = await ShoppingCartItem.findAll({
        where: {
          userId,
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
    const { productId, userId, size } = req.body
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
    
    // IMPORTANTE: NO DEBEMOS BORAR TODOS LOS CART ITEMS, SINO PASARLOS A ORDERED:TRUE

    // const { userId } = req.body
    // try {
    //   await ShoppingCartItem.destroy({
    //     where: { userId },
    //   })
    //   res.send({ msg: "All Products removed" })
    // } catch (error) {
    //   sendError(res, error)
    // }
  },

  putCart: async (req, res) => {
    const { productId, userId, amount, size } = req.body
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
    const { productId, userId, size } = req.body
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
