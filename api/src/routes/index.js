const { Router } = require("express");
const allCategories = require("./categories");
const footwearRoutes = require("./footwearRoutes.js");

const router = Router();

router.use("/allFootwear/", footwearRoutes);
router.use("/allCategories", allCategories);

module.exports = router;
