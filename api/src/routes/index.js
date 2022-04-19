const { Router } = require("express")
const footwear = require("./footwearRoutes.js")
const cartRoutes = require("./shoppingCartRoutes.js")

const router = Router()

router.use("/allFootwear/", footwear)
router.use("/cart/", cartRoutes)

module.exports = router

