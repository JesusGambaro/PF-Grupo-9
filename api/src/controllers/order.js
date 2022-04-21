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

  postOrder: async (req, res) => {
    try {
      const { telephoneNum, delivered, address, userId } = req.body
      const allShoppingCarts = await ShoppingCartItem.findOne({
        where: { userId },
      })
      console.log(allShoppingCarts)
      const orderCreated = await Order.create({
        telephoneNum,
        delivered,
        address,
      })
      await orderCreated.addShoppingCartItem(allShoppingCarts)
      const order = await Order.findOne({
        where: orderCreated,
        include: {
          model: ShoppingCartItem,
        },
      })
      return res.send(order)
      res.send({ msg: "Order created" })
    } catch (error) {
      sendError(res, error)
    }
  },

  putOrder: async () => {
    const { id } = req.params
    try {
      const order = Order.findOne({
        where: {
          id,
        },
      })

      order.delivered = req.body.delivered
      order.save()
      res.send({ msg: "Order updated" })
    } catch (error) {
      sendError(res, error)
    }
  },

  deleteOrder: async () => {
    const { id } = req.params
    try {
      Order.destroy({
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
      })
      res.send(lastOrders)
    } catch (error) {
      sendError(res, error)
    }
  },
}
