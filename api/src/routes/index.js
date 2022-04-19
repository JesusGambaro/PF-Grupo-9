const { Router } = require("express")
const footwear = require("./footwear.js")

const router = Router()

router.use("/allFootwear/", footwear)
module.exports = router
