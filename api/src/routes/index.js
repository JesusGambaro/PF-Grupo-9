const { Router } = require("express")
const footwear = require("./footwearRoutes.js")
const user = require("./userRoutes.js")
const cartRoutes = require("./shoppingCartRoutes.js")
const orderRoutes = require("./orderRoutes.js")
const favoriteItemRoutes = require("./favoriteItemRoutes.js")
const reviewRoutes = require("./ReviewRoutes")

const router = Router()

router.use("/allFootwear/", footwear)
router.use("/user/", user)
router.use("/cart/", cartRoutes)
router.use("/orders/", orderRoutes)
router.use("/favorite/", favoriteItemRoutes)
router.use("/review/", reviewRoutes)

module.exports = router
