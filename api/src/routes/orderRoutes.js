const { Router } = require('express');
const {getOrders, postOrder, putOrder, deleteOrder, getLastSevenDaysOrders} = require('../controllers/order.js');

const router = Router();

router.route('/')
     .get(getOrders)
     .post(postOrder)
     .put(putOrder)
     .delete(deleteOrder);
router.get("/ByDate", getLastSevenDaysOrders);
     
module.exports = router;