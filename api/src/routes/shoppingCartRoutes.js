const {Router} = require("express");
const {getCart} = require("../controllers/shoppingCart.js");

const router = Router();

// router.get("/cart", getCart);
// router.delete("/cart", deleteCart);
// router.put("/cart", putCart);
// router.post("/cart", postCart);

router.route('/cart')
     .get(getCart)
     .delete(deleteCart)
     .put(putCart)
     .post(postCart);

module.exports = router;