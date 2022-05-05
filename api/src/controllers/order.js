const {
  Order,
  ShoppingCartItem,
  User,
  Product,
  Image,
  Payment,
  Stock,
} = require("../db.js")
const { Op, Sequelize } = require("sequelize")
const moment = require("moment")
const { sendError } = require("../helpers/error.js")
const { verifyToken } = require("../helpers/verify.js")
const Stripe = require("stripe")
const { emailOrder } = require("../helpers/email.js")
const { emailOrderDelivered } = require("../helpers/emailOrderDelivered.js")

const orderInclude = {
  include: [
    {
      model: ShoppingCartItem,
      include: { model: Product, include: { model: Image, limit: 1 } },
    },
    { model: User },
    { model: Payment },
  ],
  order: [["id", "DESC"]],
}

module.exports = {
  getOrders: async (req, res) => {
    const { email = "", delivered, order } = req.query
    try {
      if (order) {
        const orderById = await Order.findByPk(order, {
          include: [
            {
              model: ShoppingCartItem,
              include: { model: Product, include: { model: Image, limit: 1 } },
            },
            { model: User },
            { model: Payment },
          ],
          order: [["id", "DESC"]],
        })
        return res.send(orderById)
      }
      if (delivered) {
        const orderSearched = await Order.findAll({
          where: {
            [Op.or]: [
              Sequelize.where(
                Sequelize.cast(Sequelize.col("delivered"), "varchar"),
                {
                  [Op.iLike]: `${delivered}`,
                }
              ),
            ],
          },
          include: [
            {
              model: ShoppingCartItem,
              include: { model: Product, include: { model: Image, limit: 1 } },
            },
            { model: User, where: { email: { [Op.iLike]: `${email}%` } } },
            { model: Payment },
          ],
          order: [["id", "DESC"]],
        })
        return res.send(orderSearched)
      }
      if (email) {
        const orderSearchedEmail = await Order.findAll({
          include: [
            {
              model: ShoppingCartItem,
              include: { model: Product, include: { model: Image, limit: 1 } },
            },
            { model: User, where: { email: { [Op.iLike]: `${email}%` } } },
            { model: Payment },
          ],
          order: [["id", "DESC"]],
        })
        return res.send(orderSearchedEmail)
      }
      const allOrders = await Order.findAll(orderInclude)
      res.send(allOrders)
    } catch (error) {
      sendError(res, error)
    }
  },
  getOrdersUser: async (req, res) => {
    try {
      const decodedToken = await verifyToken(req, res)
      const userOrders = await Order.findAll({
        where: {
          userId: decodedToken.id,
        },
        include: [
          {
            model: ShoppingCartItem,
            include: { model: Product, include: { model: Image, limit: 1 } },
          },
          { model: User },
          { model: Payment },
        ],
        order: [["id", "DESC"]],
      })
      if (userOrders.length) {
        return res.send(userOrders)
      }
      const user = await User.findOne({ where: { id: decodedToken.id } })
      return res.send(user)
    } catch (error) {
      sendError(res, error)
    }
  },
  postOrder: async (req, res) => {
    const { order, paymentMethod, total } = req.body
    try {
      const {
        telephoneNumber,
        address,
        name,
        surname,
        country,
        city,
        postalCode,
        floor,
        apartment,
        notes,
      } = order
      const { id, card } = paymentMethod
      const { brand, funding, last4 } = card
      const stripe = new Stripe(process.env.STRIPEKEY)
      const decodedToken = await verifyToken(req, res)
      const userId = decodedToken.id
      const allShoppingCarts = await ShoppingCartItem.findAll({
        where: { userId, ordered: false },
        include: [
          {
            model: Product,
            required: true,
            include: {
              model: Stock,
              where: { size: { [Op.col]: "shoppingCartItem.size" } },
            },
          },
        ],
      })
      const finalTotal = total * 100
      const owner = await User.findOne({ where: { id: userId } })
      const payment = await stripe.paymentIntents.create({
        amount: finalTotal,
        currency: "USD", //ARS? MEX?
        description: "footwears",
        payment_method: id,
        confirm: true,
      })
      if (payment) {
        const orderCreated = await Order.create({
          telephoneNumber: parseInt(telephoneNumber),
          address,
          name,
          surname,
          country,
          city,
          postalCode,
          floor: floor ? parseInt(floor) : null,
          apartment,
          notes,
          total,
        })
        const orderPayment = await Payment.create({
          status: payment.status,
          paymentId: id,
          cardBrand: brand,
          funding,
          last4,
        })
        await orderCreated.addShoppingCartItems(allShoppingCarts)
        await orderCreated.setUser(owner)
        await orderCreated.setPayment(orderPayment)
        await ShoppingCartItem.update(
          { ordered: true },
          { where: { userId, ordered: false } }
        )
        emailOrder({ owner, orderCreated, id: userId, allShoppingCarts })
        res.send({ msg: "Order created, succesfull payment" })
        allShoppingCarts.forEach(async (item) => {
          const newStock = item.product.stocks[0].amount - item.amount
          const id = item.product.stocks[0].id
          await Stock.update({ amount: newStock }, { where: { id } })
        })
      }
    } catch (error) {
      console.log(error)
      if (error.raw) {
        return res.status(200).send({ error: error.raw.message })
      }
      return res.send(error)
    }
  },

  putOrder: async (req, res) => {
    const { delivered, id } = req.body
    try {
      const order = await Order.findOne({
        where: {
          id,
        },
        include: [
          { model: User },
          { model: ShoppingCartItem, include: { model: Product } },
        ],
      })
      order.delivered = delivered
      order.save()
      if (delivered === "delivered") {
        emailOrderDelivered(order)
        return res.send({ msg: "Order updated and  sent" })
      } else {
        return res.send({ msg: "Order updated" })
      }
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
        include: [
          {
            model: ShoppingCartItem,
            include: { model: Product, include: { model: Image, limit: 1 } },
          },
          { model: User },
          { model: Payment },
        ],
        order: [["id", "DESC"]],
      })
      res.send(lastOrders)
    } catch (error) {
      sendError(res, error)
    }
  },
  getTotalOrders: async (req, res) => {
    try {
      const totalOrders = await Order.findAll({
        attributes: ["id"],
        order: [["id", "DESC"]],
        limit: 1,
      })
      res.send(totalOrders)
    } catch (error) {
      sendError(res, error)
    }
  },
  getTotalGain: async (req, res) => {
    try {
      const totalGain = await Order.findAll({
        attributes: [
          [Sequelize.fn("SUM", Sequelize.col("total")), "totalGain"],
        ],
      })
      res.send(totalGain)
    } catch (error) {
      sendError(res, error)
    }
  },
}
