const {
  userSingUp,
  userSingIn,
  forgotPassword,
  changePassword,
  changeForgottenPassword,
  getAllUsers,
  deleteUser,
  getRole,
  changeUsersRole
} = require("../controllers/user")
const {
  verifyTokenAdmin,
  verifyTokenUserOrAdmin,
} = require("../middlewares/auth")

const router = require("express").Router()

router.post("/signUp", userSingUp)
router.post("/signIn", userSingIn)
router.post("/forgot-password", forgotPassword)
router.post("/forgot-password/:token", changeForgottenPassword)
router.post("/change-password", changePassword)
router.get("/allUsers", verifyTokenAdmin, getAllUsers)
router.delete("/deleteUser", verifyTokenAdmin, deleteUser)
router.get("/role", verifyTokenUserOrAdmin, getRole)
router.put("/changeAdminState",verifyTokenAdmin, changeUsersRole)

module.exports = router
