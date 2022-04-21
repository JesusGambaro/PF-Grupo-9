const { Router } = require("express")
const {
  getOrders,
  postOrder,
  putOrder,
  deleteOrder,
  getLastSevenDaysOrders,
} = require("../controllers/order.js")
const { verifyToken } = require("../middlewares/auth.js")

const router = Router()

router
  .route("/")
  .get(verifyToken, getOrders)
  .post(verifyToken, postOrder)
  .put(verifyToken, putOrder)
  .delete(verifyToken, deleteOrder)
router.get("/ByDate", verifyToken, getLastSevenDaysOrders)

module.exports = router