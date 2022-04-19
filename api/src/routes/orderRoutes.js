const { Router } = require('express');
const {getOrders, postOrder, putOrder, deleteOrder} = require('../controllers/order.js');

const router = Router();

router.route('/')
     .get(getOrders)
     .post(postOrder)
     .put(putOrder)
     .delete(deleteOrder);

module.exports = router;