const { Router } = require("express")
const footwear = require("./footwearRoutes.js")
const cartRoutes = require("./shoppingCartRoutes.js")
const orderRoutes = require("./orderRoutes.js")

const router = Router()

router.use("/allFootwear/", footwear)
router.use("/cart/", cartRoutes)
router.use("/orders/", orderRoutes)

module.exports = router

