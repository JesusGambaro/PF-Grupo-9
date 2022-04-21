const { Router } = require("express")
const {
  getCart,
  deleteCart,
  putCart,
  postCart,
} = require("../controllers/shoppingCart.js")
const { verifyToken } = require("../middlewares/auth.js")

const router = Router()
router
  .route("/")
  .get(verifyToken, getCart)
  .delete(verifyToken, deleteCart)
  .put(verifyToken, putCart)
  .post(verifyToken, postCart)

module.exports = router
