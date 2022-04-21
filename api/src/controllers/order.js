const { Order } = require("../db.js")
const { Op } = require("sequelize")
const moment = require("moment")
const { sendError } = require("../helpers/error.js")

module.exports = {
  getOrders: async () => {
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
        const allOrders = await Order.findAll()
        res.send(allOrders)
      }
    } catch (error) {
      sendError(res, error)
    }
  },

  postOrder: async () => {
    try {
      await Order.create(req.body)
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
