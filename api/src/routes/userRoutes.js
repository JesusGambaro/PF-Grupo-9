const {
  userSingUp,
  userSingIn,
  getAllUsers,
  deleteUser,
  getRole,
} = require("../controllers/user")
const {
  verifyTokenAdmin,
  verifyTokenUserOrAdmin,
} = require("../middlewares/auth")

const router = require("express").Router()

router.post("/signUp", userSingUp)
router.post("/signIn", userSingIn)
router.get("/allUsers", verifyTokenAdmin, getAllUsers)
router.delete("/deleteUser", verifyTokenAdmin, deleteUser)
router.get("/role", verifyTokenUserOrAdmin, getRole)

module.exports = router
