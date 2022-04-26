const { Router } = require("express")
const {
    postFavoriteItem,
    getAllFavoriteItems,
    deleteOneFavoriteItem,
    deleteAllFavoriteItems,

} = require("../controllers/favoriteItem.js")
const { verifyTokenUserOrAdmin } = require("../middlewares/auth.js")

const router = Router()

router.post("/", verifyTokenUserOrAdmin, postFavoriteItem);
router.get("/", verifyTokenUserOrAdmin, getAllFavoriteItems);
router.delete("/deleteAll", verifyTokenUserOrAdmin, deleteAllFavoriteItems);
router.delete("/:id", verifyTokenUserOrAdmin, deleteOneFavoriteItem);


module.exports = router