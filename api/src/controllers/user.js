const { User } = require("../db.js")
const bcrypt = require("bcryptjs")
const { generateToken } = require("../helpers/token.js")
const { Op } = require("sequelize")

module.exports = {
  userSingUp: async (req, res) => {
    try {
      const { body } = req
      const { userName, email, password } = body
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(password, saltRounds)
      const user = await User.findOne({
        where: {
          email,
        },
      })
      if (user) return res.status(406).send("Existing email")
      const newUser = await User.create({ ...body, password: passwordHash })
      const token = generateToken({ id: newUser.id })
      return res.status(201).send({ token })
    } catch (error) {
      console.log(error)
      res.status(500).send({ msg: error.message })
    }
  },
  userSingIn: async (req, res) => {
    try {
      const { email, password } = req.body
      const user = await User.findOne({
        where: { email },
      })
      const correctPassword =
        user === null ? false : bcrypt.compare(password, user.password)
      if (!correctPassword)
        return res.status(401).send({ msg: "Invalid email or password" })
      const token = generateToken({ id: user.id })
      return res.status(200).send({ token })
    } catch (error) {
      console.log(error)
      res.status(404).send({ msg: error.message })
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const { email } = req.query
      if (email) {
        const usuarioSearched = await User.findAll({
          where: {
            email: { [Op.iLike]: `%${email}%` },
          },
        })

        return res.status(302).send(usuarioSearched)
      }
      const allUsers = await User.findAll()
      return res.status(200).send(allUsers)
    } catch (error) {
      console.log(error)
      res.status(404).send({ msg: error.message })
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { id } = req.body
      const removedUser = await User.destroy({
        where: { id },
      })
      if (removedUser) return res.send({ msg: `User ${id} removed` })
      return res.status(400).send({ msg: `User ${id} already removed` })
    } catch (error) {
      console.log(error)
      res.status(404).send({ msg: error.message })
    }
  },
}
