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
} = require("../controllers/order.js")
const {
  verifyTokenUserOrAdmin,
  verifyTokenAdmin,
} = require("../middlewares/auth.js")

const router = Router()

// router
//   .route("/")
//   .get(verifyTokenUserOrAdmin, getOrders)
//   .post(verifyTokenUserOrAdmin, postOrder)
// router.get("/userOrders/:userId", getOrdersUser)
// router.put("/:id", verifyTokenAdmin, putOrder)
// router.delete("/:id", verifyTokenAdmin, deleteOrder)
// router.get("/ByDate", verifyTokenAdmin, getLastSevenDaysOrders)
// router.get("/totalGain", getTotalGain)

router.route("/").get(getOrders).post(postOrder)
router.get("/userOrders/:userId", getOrdersUser)
router.put("/:id", putOrder)
router.delete("/:id", deleteOrder)
router.get("/ByDate", getLastSevenDaysOrders)
router.get("/totalGain", getTotalGain)
router.get("/totalOrders", getTotalOrders)

module.exports = router
