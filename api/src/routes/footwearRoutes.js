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
  getProductByIdForAdmin,
  getAllFootwearForAdmin,
  getAllProductsSameModelForAdmin,
} = require("../controllers/footwear.js")
const { verifyTokenAdmin } = require("../middlewares/auth.js")

const router = Router()

router.get("/", getAllFootwear)
router.get("/allGenders", getAllGenders)
router.get("/allCategories", getAllCategories)
router.get("/sales", getAllSales)
router.get("/detail/:model", getAllProductsSameModel)
router.get("/allForAdmin", verifyTokenAdmin, getAllFootwearForAdmin)
router.get(
  "/sameModelForAdmin/:model",
  verifyTokenAdmin,
  getAllProductsSameModelForAdmin
)
router.get("/admin/:id", verifyTokenAdmin, getProductByIdForAdmin)
router.get("/:id", getProductById)
router.post("/", verifyTokenAdmin, postNewProduct)
router.put("/:id", verifyTokenAdmin, editProduct)
router.delete("/:id", verifyTokenAdmin, deleteProduct)

module.exports = router
