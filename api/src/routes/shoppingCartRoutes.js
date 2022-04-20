const {Router} = require("express");
const {getCart, deleteCart, putCart, postCart} = require("../controllers/shoppingCart.js");

const router = Router();

// router.get("/cart", getCart);
// router.delete("/cart", deleteCart);
// router.put("/cart", putCart);
// router.post("/cart", postCart);
router.route('/')
  .get(getCart)
  .delete(deleteCart)
  .put(putCart)
  .post(postCart);

module.exports = router;