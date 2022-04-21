
const { Router } = require("express")
const {
  getCart,
  deleteCart,
  putCart,
  postCart,
} = require("../controllers/shoppingCart.js")
const { verifyTokenUserOrAdmin } = require("../middlewares/auth.js")

const router = Router()
router
  .route("/")
  .get(verifyTokenUserOrAdmin, getCart)
  .delete(verifyTokenUserOrAdmin, deleteCart)
  .put(verifyTokenUserOrAdmin, putCart)
  .post(verifyTokenUserOrAdmin, postCart)

module.exports = router
