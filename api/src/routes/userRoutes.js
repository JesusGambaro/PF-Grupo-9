const {
  userSingUp,
  userSingIn,
  getAllUsers,
  deleteUser,
} = require("../controllers/user")
const { verifyTokenAdmin } = require("../middlewares/auth")

const router = require("express").Router()

router.post("/signUp", userSingUp)
router.post("/signIn", userSingIn)
router.get("/allUsers", verifyTokenAdmin, getAllUsers)
router.delete("/deleteUser", verifyTokenAdmin, deleteUser)

module.exports = router
