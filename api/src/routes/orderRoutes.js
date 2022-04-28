const { Router } = require("express")
const {
  getOrders,
  postOrder,
  putOrder,
  deleteOrder,
  getLastSevenDaysOrders,
  getOrdersUser,
  getTotalGain,
  getTotalOrders,
  getOrderById,
  prueba,
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
router.get("/userOrders/", verifyTokenUserOrAdmin, getOrdersUser)
router.put("/", verifyTokenAdmin, putOrder)
router.delete("/:id", verifyTokenAdmin, deleteOrder)
router.get("/ByDate", verifyTokenAdmin, getLastSevenDaysOrders)
router.get("/totalGain", verifyTokenAdmin, getTotalGain)
router.get("/totalOrders", verifyTokenAdmin, getTotalOrders)

module.exports = router
