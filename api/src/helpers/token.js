const jwt = require("jsonwebtoken")

module.exports = {
  generateToken: (info) => {
    const token = jwt.sign(info, process.env.SECRET, {
      expiresIn: 60 * 60 * 24 * 7,
    })
    return token
  },
}
