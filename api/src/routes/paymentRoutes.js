const { Router } = require("express")
const { verifyTokenUserOrAdmin } = require("../middlewares/auth.js")

const router = Router()

router.post("/")

module.exports = router
