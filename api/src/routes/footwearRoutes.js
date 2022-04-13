const { Router } = require("express");
const { Op } = require("sequelize");
const { Product, Image } = require("../db.js");

const router = Router();

router.get("/", async (req, res) => {
  const { footwear } = req.query;
  try {
    const allFootwears = await Product.findAll({
     attributes: { exclude: "description" },
     include: [{
          model: Image,
     }],
    });
    if (footwear) {
      const footwearsSearched = await Product.findAll({
        where: {
          model: { [Op.iLike]: `%${footwear}%` },
        },
      });

      return res.send(footwearsSearched);
    }
    return res.send(allFootwears);
  } catch (error) {
    console.log(error);
    res.status(404).send({ msg: error.message });
  }
});
// Ruta que retorna el modelo de calzado pasado por params.id

// Provisional, hay que probarla.
router.get("/allGenders", async (req, res) => {
  try {
    const genders = await Product.findAll({
      attributes: ["gender"],
      group: ["gender"],
    });
    res.json(genders ? genders : []);
  } catch (error) {
    console.log(error);
    res.status(404).send({ msg: error.message });
  }
});

router.get("/allCategories", async (req, res) => {
  try {
    let allCategories = await Product.findAll({
      attributes: ["category"],
      group: ["category"],
    });
    res.send(allCategories);
  } catch (error) {
    console.log(error);
    res.status(404).send({ msg: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // footwear es el calzado encontrado, findByPk retorna el coincidente con el id
    const footwear = await Product.findByPk(id);
    // Retorna el coincidente. Si no existe, retorna un array vacio
    res.json(footwear);
  } catch (error) {
    console.log(error);
    res.status(404).send({ msg: error.message });
  }
});
module.exports = router;
