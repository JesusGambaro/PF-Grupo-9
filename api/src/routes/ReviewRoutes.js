const { Router } = require("express")
const { postReview } = require("../controllers/reviews.js")
const { verifyTokenUserOrAdmin } = require("../middlewares/auth.js")

const router = Router()

router.post("/", verifyTokenUserOrAdmin, postReview)

module.exports = router
