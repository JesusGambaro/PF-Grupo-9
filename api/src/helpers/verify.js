const jwt = require("jsonwebtoken")
const { User } = require("../db.js")
const { sendError } = require("../helpers/error.js")

module.exports = {
  verifyToken: async (req, res) => {
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
      console.log(error)
    }
  },
}
