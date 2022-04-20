const {
  userSingUp,
  userSingIn,
  getAllUsers,
  deleteUser,
} = require("../controllers/user")

const router = require("express").Router()

router.post("/signUp", userSingUp)
router.post("/signIn", userSingIn)
router.get("/allUsers", getAllUsers)
router.delete("/deleteUser", deleteUser)

module.exports = router
