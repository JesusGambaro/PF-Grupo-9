const { sendError } = require("../helpers/error.js")
const { verifyToken } = require("../helpers/verify.js")

module.exports = {
  verifyTokenUserOrAdmin: async (req, res, next) => {
    try {
      const userOrAdmin = await verifyToken(req, res)
      if (userOrAdmin) return next()
      return res.status(401).send({ error: "Invalid access" })
    } catch (error) {
      sendError(res, error, "Invalid token")
    }
  },
  verifyTokenAdmin: async (req, res, next) => {
    try {
      const userOrAdmin = await verifyToken(req, res)
      if (userOrAdmin && userOrAdmin.isAdmin) return next()
      return res.status(401).send({ error: "Invalid access" })
    } catch (error) {
      sendError(res, error, "Invalid token")
    }
  },
}
