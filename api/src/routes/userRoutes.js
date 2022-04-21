const {
  userSingUp,
  userSingIn,
  getAllUsers,
  deleteUser,
} = require("../controllers/user")
const { verifyToken } = require("../middlewares/auth")

const router = require("express").Router()

router.post("/signUp", userSingUp)
router.post("/signIn", userSingIn)
router.get("/allUsers", verifyToken, getAllUsers)
router.delete("/deleteUser", verifyToken, deleteUser)

module.exports = router
