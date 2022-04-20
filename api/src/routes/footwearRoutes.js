const { Router } = require("express")
const { Op, Sequelize, where } = require("sequelize")
const { getAllFootwear, getAllGenders, getAllCategories, getAllSales, getProductById, getAllProductsSameModel, postNewProduct, editProduct, deleteProduct } = require("../controllers/footwear.js")
const { Product, Image, Stock } = require("../db.js")

const router = Router();

router.get("/", getAllFootwear);
router.get("/allGenders", getAllGenders)
router.get("/allCategories", getAllCategories)
router.get("/sales", getAllSales)
router.get("/detail/:model", getAllProductsSameModel)
router.get("/:id", getProductById)
router.post("/", postNewProduct)
router.put("/:id", editProduct)
router.delete("/:id", deleteProduct)

module.exports = router
