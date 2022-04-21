const jwt = require("jsonwebtoken")
const { User } = require("../db.js")
const { sendError } = require("../helpers/error.js")

module.exports = {
  verifyToken: async (req, res, next) => {
    try {
      const authorization = req.get("Authorization") // = a req.headers.authorization ; este .get es gracias a express
      const token = authorization.toLowerCase().startsWith("bearer")
        ? authorization.substring(7)
        : null
      const decodedToken = jwt.verify(token, process.env.SECRET)
      const userOrAdmin = await User.findOne({
        where: { id: decodedToken.id, isAdmin: decodedToken.isAdmin },
      })
      return userOrAdmin
    } catch (error) {
      sendError(res, error, "Invalid token")
    }
  },
  verifyTokenUserOrAdmin: async (req, res, next) => {
    try {
      const userOrAdmin = await verifyToken(req, res)
      console.log(userOrAdmin)
      if (userOrAdmin) return next()
      return res.status(401).send({ error: "Invalid access" })
    } catch (error) {
      sendError(res, error, "Invalid token")
    }
  },
  verifyTokenAdmin: async (req, res, next) => {
    try {
      const userOrAdmin = await verifyToken(req, res)
      if (userOrAdmin.isAdmin) return next()
      return res.status(401).send({ error: "Invalid access" })
    } catch (error) {
      sendError(res, error, "Invalid token")
    }
  },
}
