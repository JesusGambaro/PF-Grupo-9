const { Router } = require("express")
const {
  getAllFootwear,
  getAllGenders,
  getAllCategories,
  getAllSales,
  getProductById,
  getAllProductsSameModel,
  postNewProduct,
  editProduct,
  deleteProduct,
} = require("../controllers/footwear.js")
const { verifyToken } = require("../middlewares/auth.js")

const router = Router()

router.get("/", getAllFootwear)
router.get("/allGenders", getAllGenders)
router.get("/allCategories", getAllCategories)
router.get("/sales", getAllSales)
router.get("/detail/:model", getAllProductsSameModel)
router.get("/:id", getProductById)
router.post("/", verifyToken, postNewProduct)
router.put("/:id", verifyToken, editProduct)
router.delete("/:id", verifyToken, deleteProduct)

module.exports = router
