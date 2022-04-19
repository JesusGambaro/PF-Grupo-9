const { Router } = require("express")
const footwear = require("./footwearRoutes.js")

const router = Router()

router.use("/allFootwear/", footwear)
module.exports = router
