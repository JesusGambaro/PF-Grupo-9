const { Router } = require("express")
const {
  getCart,
  deleteCart,
  putCart,
  postCart,
  deleteAllCart
} = require("../controllers/shoppingCart.js")
const { verifyToken } = require("../middlewares/auth.js")

const router = Router()

router
  .route("/")
  .get(verifyToken, getCart)
  .delete(verifyToken, deleteCart)
  .put(verifyToken, putCart)
  .post(verifyToken, postCart)

router.delete('/allCart', verifyToken, deleteAllCart)

module.exports = router
