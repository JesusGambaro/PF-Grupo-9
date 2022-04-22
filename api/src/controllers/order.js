const { Order, ShoppingCartItem } = require("../db.js")
const { Op } = require("sequelize")
const moment = require("moment")
const { sendError } = require("../helpers/error.js")

module.exports = {
  getOrders: async (req, res) => {
    const { order } = req.query
    try {
      if (order) {
        const orderSearched = await Order.findOne({
          where: {
            id: order,
          },
        })
        res.send(orderSearched)
      } else {
        const allOrders = await Order.findAll({
          include: { model: ShoppingCartItem },
        })
        res.send(allOrders)
      }
    } catch (error) {
      sendError(res, error)
    }
  },
  getOrdersUser: async (req, res) => {}, // falta de hacer?
  postOrder: async (req, res) => {
    try {
      const { telephoneNum, delivered, address, userId } = req.body // para qué pasa delivered?. No sería false por default?.
      const allShoppingCarts = await ShoppingCartItem.findAll({
        where: { userId, ordered: false }, // Le agregué ordered:false.
      })
      const orderCreated = await Order.create({
        telephoneNum,
        delivered,
        address,
      })
      await orderCreated.addShoppingCartItems(allShoppingCarts)
      const order = await Order.findOne({  
        where: orderCreated,
        include: {
          model: ShoppingCartItem,
        },
      })
      return res.send({ msg: "Order created" }) //no debería responder con "order"?. Sino para qué hace el includ?
    } catch (error) {
      console.log(error)
    }
  },

  putOrder: async (req, res) => {
    const { id } = req.params //debería recibir por query me parece..
    const { delivered } = req.body //
    try {
      const order = await Order.findOne({
        where: {
          id,
        },
      })
      order.delivered = req.body.delivered
      await order.save()
      res.send({ msg: "Order updated" })
    } catch (error) {
      sendError(res, error)
    }
  },

  deleteOrder: async (req, res) => {
    const { id } = req.params //debería ser por query me parece.
    //deberíamos buscar todos los cartItems relacionados a esta order y pasarles el estado a ordered:false.
    try {
      await Order.destroy({
        where: { id },
      })
      res.send({ msg: "Order deleted" })
    } catch (error) {
      sendError(res, error)
    }
  },

  getLastSevenDaysOrders: async (req, res) => {
    try {
      const lastOrders = await Order.findAll({
        where: {
          createdAt: {
            [Op.gte]: moment().subtract(7, "days").toDate(),
          },
        },
        include: {
          model: ShoppingCartItem,
        },
      })
      res.send(lastOrders)
    } catch (error) {
      sendError(res, error)
    }
  },
}
