const { User } = require("../db.js")
const bcrypt = require("bcryptjs")
const { generateToken } = require("../helpers/token.js")
const { Op } = require("sequelize")
const { sendError } = require("../helpers/error.js")
const { verifyToken } = require("../helpers/verify.js")

module.exports = {
  userSingUp: async (req, res) => {
    try {
      const { body } = req
      const { userName, email, password } = body
      if(password.length < 4){
        throw new Error("Paasword must have more than 4 characters")
      }
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(password, saltRounds)
      const user = await User.findOne({
        where: {
          email,
        },
      })
      if (user) return res.status(200).send({ status: false })
      const newUser = await User.create({
        email,
        userName,
        password: passwordHash,
      })
      return res.status(201).send({ status: true })
    } catch (error) {
      sendError(res, error)
    }
  },

  userSingIn: async (req, res) => {
    try {
      const { email, password } = req.body
      const user = await User.findOne({
        where: { email },
      })
      const correctPassword =
        user === null ? false : await bcrypt.compare(password, user.password)
      if (!correctPassword)
        return res.status(200).send({ error: "Invalid email or password" })
      const token = generateToken({ id: user.id, isAdmin: user.isAdmin })
      return res.status(200).send({ token, admin: user.isAdmin })
    } catch (error) {
      sendError(res, error)
    }
  },

  changePassword: async(req,res) => {
    try {
      const { email, password, newPassword } = req.body;
      const user = await User.findOne({
        where: { email },
      })
      const correctPassword =
        user === null ? false : await bcrypt.compare(password, user.password)
      if (!correctPassword)
        return res.status(200).send({ error: "Invalid password" });

      if(newPassword.length < 4){
        throw new Error("Password must have more than 4 characters")
      }
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      user.password = passwordHash;
      user.save();

      return res.status(201).send({ status: true })

    } catch (error) {
      sendError(res, error)
    }
  },

  getRole: async (req, res) => {
    try {
      const decodedToken = await verifyToken(req, res)
      if (decodedToken) res.status(200).send({ admin: decodedToken.isAdmin })
    } catch (error) {
      sendError(res, error)
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
      sendError(res, error)
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { id } = req.body
      const removedUser = await User.destroy({
        where: { id },
      })
      if (removedUser) return res.send({ msg: `User ${id} removed` })
      return res.status(400).send({
        error: `User ${id} doesnt exist`,
      })
    } catch (error) {
      sendError(res, error)
    }
  },
  changeUsersRole: async (req, res) => {
    try {
      // const { id } = req.body
      // const removedUser = await User.destroy({
      //   where: { id },
      // })
      // if (removedUser) return res.send({ msg: `User ${id} removed` })
      // return res.status(400).send({
      //   error: `User ${id} doesnt exist`,
      // })
    } catch (error) {
      // sendError(res, error)
    }
  },
}
