const { Router } = require("express");
const { Op } = require("sequelize");
// Cambiar por el nombre del Modelo
const { Product, Image } = require("../db.js");

const router = Router();

router.get("/", async (req, res) => {
  const { footwear } = req.query;
  try {
    const allFootwears = await Product.findAll({
      attributes: [{ exclude: description }],
      include: {
        model: Image,
        attributes: ["url"],
        through: {
          attributes: [],
        },
      },
    });
    if (footwear) {
      const footwearsSearched = await Product.findAll({
        where: {
          model: { [Op.iLike]: footwear },
        },
      });
      res.status(200).send(footwearsSearched);
    }
    res.send(allFootwears);
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});
// Ruta que retorna el modelo de calzado pasado por params.id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // footwear es el calzado encontrado, findByPk retorna el coincidente con el id
    const footwear = await Product.findByPk(id);
    // Retorna el coincidente. Si no existe, retorna un array vacio
    res.send(footwear);
  } catch (e) {
    const error = new Error("No existe el calzado");
    res.status(404).send({ msg: error.message });
  }
});

// Provisional, hay que probarla.
router.get("/allGenders", async (req, res) => {
  try {
    const genders = Product.findAll({
      attributes: [
        [sequelize.fn("DISTINCT", sequelize.col("gender")), "genders"],
      ],
    });
    res.send(genders ? genders : []);
  } catch (error) {}
});

module.exports = router;
