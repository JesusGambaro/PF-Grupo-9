const jwt = require("jsonwebtoken")

module.exports = {
  generateToken: (id = {}) => {
    const token = jwt.sign(id, process.env.SECRET, {
      expiresIn: 60 * 60 * 24 * 7,
    })
    return token
  },
}
