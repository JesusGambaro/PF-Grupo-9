const { Router } = require("express")
const footwear = require("./footwearRoutes.js")
const user = require("./userRoutes.js")

const router = Router()

router.use("/allFootwear/", footwear)
router.use("/user/", user)
module.exports = router
