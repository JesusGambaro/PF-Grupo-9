const { Router } = require("express")
const {
  getOrders,
  postOrder,
  putOrder,
  deleteOrder,
  getLastSevenDaysOrders,
  getOrdersUser,
  getTotalGain,
} = require("../controllers/order.js")
const {
  verifyTokenUserOrAdmin,
  verifyTokenAdmin,
} = require("../middlewares/auth.js")

const router = Router()

router
  .route("/")
  .get(verifyTokenUserOrAdmin, getOrders)
  .post(verifyTokenUserOrAdmin, postOrder)
router.get("/userOrders/:userId", getOrdersUser)
router.put("/:id", verifyTokenAdmin, putOrder)
router.delete("/:id", verifyTokenAdmin, deleteOrder)
router.get("/ByDate", verifyTokenAdmin, getLastSevenDaysOrders)
router.get("/totalGain", getTotalGain)

module.exports = router
