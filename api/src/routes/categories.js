const { Router } = require("express");
const { Product } = require("../db");

// Importar todos los routers;

const router = Router();

router.get("/", async (req, res) => {
  let allCategories = await Product.findAll({
    attributes: ["category"],
    group: ["category"],
  });

  res.send(allCategories);
});

module.exports = router;
