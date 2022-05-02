const {
  userSingUp,
  userSingIn,
  forgotPassword,
  changePassword,
  changeForgottenPassword,
  getAllUsers,
  deleteUser,
  getRole,
  changeUsersRole,
  getUserName,
  userSingUpOrSingInGoogle,
  getSuperAdmin,
} = require("../controllers/user")
const {
  verifyTokenAdmin,
  verifyTokenUserOrAdmin,
} = require("../middlewares/auth")

const router = require("express").Router()

router.post("/signUp", userSingUp)
router.post("/signIn", userSingIn)
router.post("/SingUpOrSingInGoogle", userSingUpOrSingInGoogle)
router.post("/forgot-password", forgotPassword)
router.post("/forgot-password/:token", changeForgottenPassword)
router.post("/change-password", verifyTokenUserOrAdmin, changePassword)
router.get("/userName", verifyTokenUserOrAdmin, getUserName)
router.get("/allUsers", verifyTokenAdmin, getAllUsers)
router.delete("/deleteUser/:email", verifyTokenAdmin, deleteUser)
router.get("/role", verifyTokenUserOrAdmin, getRole)
router.put("/changeAdminState", verifyTokenAdmin, changeUsersRole)
router.get("/superAdmin", verifyTokenAdmin, getSuperAdmin)
module.exports = router
