const { Router } = require("express")
const {
  getCart,
  deleteCart,
  putCart,
  postCart,
  deleteAllCart,
} = require("../controllers/shoppingCart.js")
const { verifyTokenUserOrAdmin } = require("../middlewares/auth.js")

const router = Router()

router
  .route("/")
  .get(verifyTokenUserOrAdmin, getCart)
  .put(verifyTokenUserOrAdmin, putCart)
  .post(verifyTokenUserOrAdmin, postCart)
router.delete("/deleteCart/:id", verifyTokenUserOrAdmin, deleteCart)
router.delete("/deleteAllCart", verifyTokenUserOrAdmin, deleteAllCart)

module.exports = router
