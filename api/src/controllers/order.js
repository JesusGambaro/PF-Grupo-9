const { Order, Product, Stock } = require("../db.js")
const { Op } = require("sequelize")
const moment = require("moment")
const { sendError } = require("../helpers/error.js")

module.exports = {
  getOrders: async ( req, res ) => {
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

  postOrder: async ( req, res ) => {
    const {productId, size} = req.body;
    
    try {      
      const productSelected = await Product.findOne({
        where: {id: productId}, include: {model: Stock, where: {size}}
      });

      if(productSelected?.stocks[0].amount>0){
        await Order.create(req.body)
        res.send({ msg: "Order created" })
      }else{
        res.send({msg: 'No Stock'});
      }               
    } catch (error) {
      sendError(res, error)
    }
  },

  putOrder: async ( req, res ) => {
    const { id } = req.params
    try {
      const order = await Order.findOne({
        where: {
          id
        }
      })
      order.delivered = req.body.delivered;
      await order.save();
      res.send({ msg: "Order updated" })
    } catch (error) {
      sendError(res, error)
    }
  },

  deleteOrder: async ( req, res ) => {
    const { id } = req.params
    try {
      await Order.destroy({
        where: { id },
      })
      res.send({ msg: "Order deleted" });
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
