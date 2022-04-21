const { Router } = require("express")
const {
  getOrders,
  postOrder,
  putOrder,
  deleteOrder,
  getLastSevenDaysOrders,
} = require("../controllers/order.js")
const {
  verifyTokenUserOrAdmin,
  verifyTokenAdmin,
} = require("../middlewares/auth.js")

const router = Router()

router
  .route("/")
  .get(verifyTokenUserOrAdmin, getOrders)
  .post(verifyTokenAdmin, postOrder)
  
router.put('/:id', verifyTokenAdmin, putOrder);
router.delete('/:id', verifyTokenAdmin, deleteOrder);
router.get("/ByDate", verifyTokenAdmin, getLastSevenDaysOrders)

module.exports = router
