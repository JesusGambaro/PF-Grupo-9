const { Product, Image, Stock, FavoriteItem } = require("../db.js")
const { sendError } = require("../helpers/error.js")
const { verifyToken } = require("../helpers/verify.js")

module.exports = {
  postFavoriteItem: async (req, res) => {
    try {
      const { productId } = req.body
      const decodedToken = await verifyToken(req, res)
      const userId = decodedToken.id
      const productSelected = await Product.findOne({
        where: { id: productId },
        include: { model: Stock },
      })
      if (productSelected?.stocks.length) {
        let [favoriteItem] = await FavoriteItem.findOrCreate({
          where: { productId, userId },
        })

        return res.send(favoriteItem)
      } else {
        return res.send({
          Error: `The proctId (${productId}) was not found or stock 0.`,
        })
      }
    } catch (error) {
      sendError(res, error)
    }
  },

  getAllFavoriteItems: async (req, res) => {
    try {
      const decodedToken = await verifyToken(req, res)
      const sameUserFavorites = await FavoriteItem.findAll({
        where: {
          userId: decodedToken.id,
        },
        include: {
          model: Product,
          include: [{ model: Image }, { model: Stock }],
        },
        order: [
          ["id", "ASC"],
          ["product", "images", "id", "ASC"],
        ],
      })

      res.send(sameUserFavorites)
    } catch (error) {
      sendError(res, error)
    }
  },

  deleteOneFavoriteItem: async (req, res) => {
    try {
      const { id } = req.params
      const decodedToken = await verifyToken(req, res)
      const userId = decodedToken.id
      const favItem = await FavoriteItem.findOne({
        where: { userId },
        include: { model: Product, where: { id } },
      })
      const favItemId = await FavoriteItem.findOne({
        where: { id },
      })
      if (favItemId && userId === favItemId.userId) {
        await favItem.destroy()
        return res.send({ msg: "Favorite item deleted" })
      }
      if (favItem && userId === favItem.userId) {
        await favItem.destroy()
        return res.send({ msg: "Favorite item deleted" })
      }
      return res.send({ msg: "Wrong credentials" })
    } catch (error) {
      sendError(res, error)
    }
  },

  deleteAllFavoriteItems: async (req, res) => {
    try {
      const decodedToken = await verifyToken(req, res)
      const userId = decodedToken.id
      await FavoriteItem.destroy({
        where: { userId },
      })
      res.send({ msg: "All Favorite Items removed" })
    } catch (error) {
      sendError(res, error)
    }
  },
}
