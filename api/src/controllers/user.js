const { User } = require("../db.js");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../helpers/token.js");
const { Op } = require("sequelize");
const { sendError } = require("../helpers/error.js");
const { verifyToken } = require("../helpers/verify.js");
const { simpleToken } = require("../helpers/simpleToken.js");
const { generatePassword } = require("../helpers/generatePassword.js");
const { emailForgotPassword } = require("../helpers/emailForgotPassword.js");

module.exports = {
  userSingUp: async (req, res) => {
    try {
      const { body } = req;
      const { userName, email, password } = body;
      if (password.length < 4) {
        throw new Error("Paasword must have more than 4 characters");
      }
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);
      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (user) return res.status(200).send({ status: false });
      const newUser = await User.create({
        email,
        userName,
        password: passwordHash,
      });
      return res.status(201).send({ status: true });
    } catch (error) {
      sendError(res, error);
    }
  },

  userSingIn: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: { email },
      });
      const correctPassword =
        user === null ? false : await bcrypt.compare(password, user.password);
      if (!correctPassword)
        return res.status(200).send({ error: "Invalid email or password" });
      const token = generateToken({ id: user.id, isAdmin: user.isAdmin });
      return res.status(200).send({ token, admin: user.isAdmin });
    } catch (error) {
      sendError(res, error);
    }
  },

  userSingUpOrSingInGoogle: async (req, res) => {
    const { email, username } = req.body;
    try {
      const user = await User.findOne({
        where: { email },
      });
      if (user) {
        const token = generateToken({ id: user.id, isAdmin: user.isAdmin });
        return res.status(200).send({ token, admin: user.isAdmin });
      }
      const passwordHash = await bcrypt.hash(generatePassword(), 10);
      const newUser = await User.create({
        email,
        userName: username,
        password: passwordHash,
      });
      const token = generateToken({ id: newUser.id, isAdmin: newUser.isAdmin });
      return res.status(200).send({ token, admin: newUser.isAdmin });
    } catch (error) {}
  },

  forgotPassword: async (req, res) => {
    const { email } = req.body;

    try {
      const userExists = await User.findOne({ where: { email } });
      if (!userExists) {
        return  res.send({ status: false });
      }
      userExists.token = simpleToken(); // Agregar token al modelo User? y una funcion que genere un Token
      await userExists.save();
      
      await emailForgotPassword({
        email,
        name: userExists.userName,
        token: userExists.token,
      });

      res.send({ status: true });
    } catch (error) {
      sendError(res, error);
    }
  },

  changeForgottenPassword: async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    try {
      const user = await User.findOne({ where: { token } });

      if (!user) {
        return res.status(201).send({ status: false });
      }

      user.token = null;
      user.password = password;

      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      user.password = passwordHash;
      user.save();

      return res.status(201).send({ status: true });
    } catch (error) {
      sendError(res, error);
    }
  },

  changePassword: async (req, res) => {
    try {
      const { email, password, newPassword } = req.body;
      const user = await User.findOne({
        where: { email },
      });
      const correctPassword =
        user === null ? false : await bcrypt.compare(password, user.password);
      if (!correctPassword)
        return res.status(200).send({ error: "Invalid password" });

      if (newPassword.length < 4) {
        throw new Error("Password must have more than 4 characters");
      }
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(newPassword, saltRounds);

      user.password = passwordHash;
      user.save();

      return res.status(201).send({ status: true });
    } catch (error) {
      sendError(res, error);
    }
  },

  getRole: async (req, res) => {
    try {
      const decodedToken = await verifyToken(req, res);
      if (decodedToken) res.status(200).send({ admin: decodedToken.isAdmin });
    } catch (error) {
      sendError(res, error);
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const { search = "", isAdmin } = req.query;
      if (isAdmin) {
        const usuarioSearched = await User.findAll({
          where: {
            [Op.or]: {
              email: { [Op.iLike]: `${search}%` },
              userName: { [Op.iLike]: `${search}%` },
            },
            isAdmin,
          },
        });

        return res.status(200).send(usuarioSearched);
      }
      if (search.length) {
        const usuarioSearched = await User.findAll({
          where: {
            [Op.or]: {
              email: { [Op.iLike]: `${search}%` },
              userName: { [Op.iLike]: `${search}%` },
            },
          },
        });

        return res.status(200).send(usuarioSearched);
      }
      const allUsers = await User.findAll();
      return res.status(200).send(allUsers);
    } catch (error) {
      sendError(res, error);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { email } = req.params;
      const removedUser = await User.destroy({
        where: { email },
      });
      if (removedUser) return res.send({ msg: `User ${email} removed` });
      return res.status(400).send({
        error: `User ${email} doesnt exist`,
      });
    } catch (error) {
      sendError(res, error);
    }
  },
  changeUsersRole: async (req, res) => {
    try {
      const { email, adminState } = req.body;
      const foundUser = await User.findOne({
        where: { email },
      });
      if (foundUser) {
        foundUser.isAdmin = adminState;
        foundUser.save();
        return res.send(
          `${email} was changed to ${adminState ? "Admin" : "User"}`
        );
      } else {
        return res.send("The email passed was not found");
      }
    } catch (error) {
      return sendError(res, error);
    }
  },
  getUserName: async (req, res) => {
    try {
      const decodedToken = await verifyToken(req, res)
      const id = decodedToken.id
      const userName = await User.findByPk(id, { attributes: ["userName","email"] })
      res.send(userName)
    } catch (error) {
      sendError(res, error);
    }
  },
};
