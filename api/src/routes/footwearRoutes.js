const { Router } = require("express")
const { Op } = require("sequelize")
const { Product, Image, Stock } = require("../db.js")

const router = Router()

router.get("/", async (req, res) => {
  const { footwear } = req.query
  try {
    const allFootwears = await Product.findAll({
      attributes: { exclude: "description" },
      include: [
        {
          model: Image,
        },
        {
          model: Stock,
          where: {
            amount: { [Op.gt]: 0 },
          },
        },
      ],
    })
    if (footwear) {
      const footwearsSearched = await Product.findAll({
        where: {
          model: { [Op.iLike]: `%${footwear}%` },
        },
        include: [
          {
            model: Image,
          },
          {
            model: Stock,
            where: {
              amount: { [Op.gt]: 0 },
            },
          },
        ],
      })

      return res.send(footwearsSearched)
    }
    return res.send(allFootwears)
  } catch (error) {
    console.log(error)
    res.status(404).send({ msg: error.message })
  }
})
// Ruta que retorna el modelo de calzado pasado por params.id

// Provisional, hay que probarla.
router.get("/allGenders", async (req, res) => {
  try {
    const genders = await Product.findAll({
      attributes: ["gender"],
      group: ["gender"],
    })
    res.send(genders ? genders : [])
  } catch (error) {
    console.log(error)
    res.status(404).send({ msg: error.message })
  }
})

router.get("/allCategories", async (req, res) => {
  try {
    const allCategories = await Product.findAll({
      attributes: ["category"],
      group: ["category"],
    })
    res.send(allCategories)
  } catch (error) {
    console.log(error)
    res.status(404).send({ msg: error.message })
  }
})

router.get("/sales", async (req, res) => {
  try {
    const carouselSale = await Product.findAll({
      limit: 4,
      where: {
        sale: { [Op.gt]: 0 },
      },
      include: {
        model: Image,
      },
    })

    res.send(carouselSale)
  } catch (error) {
    console.log(error)
    res.status(404).send({ msg: error.message })
  }
})
router.get("/detail/:model", async (req, res) => {
  const { model } = req.params
  const prueba = await Product.findAll({
    where: {
      model: {
        [Op.eq]: model,
      },
    },
    include: [
      {
        model: Image,
      },
      {
        model: Stock,
        where: {
          amount: { [Op.gt]: 0 },
        },
      },
    ],
  })
  res.send(prueba)
})
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params
    // footwear es el calzado encontrado, findByPk retorna el coincidente con el id
    const footwear = await Product.findOne({
      where: {
        id: { [Op.eq]: id },
      },
      include: [
        {
          model: Image,
        },
        {
          model: Stock,
          where: {
            amount: { [Op.gt]: 0 },
          },
        },
      ],
    })
    // Retorna el coincidente. Si no existe, retorna un array vacio
    res.send(footwear)
  } catch (error) {
    console.log(error)
    res.status(404).send({ msg: error.message })
  }
})
router.post("/", async (req, res) => {
  try {
    const {
      model,
      brand,
      category,
      gender,
      price,
      description,
      sale,
      size,
      amount,
      color,
      addedImages,
    } = req.body
    let product = await Product.create({
      model,
      brand,
      category,
      gender,
      price,
      description,
      sale,
      size,
      amount,
      color,
    })

    addedImages.length > 0 &&
      addedImages.map(async (image) => {
        let imageProduct = await Image.create({ url: image })
        await product.addImage(imageProduct)
      })
    res.send("Product with its images created!")
  } catch (error) {
    console.log(error)
    res.status(404).send({ msg: error.message })
  }
})
module.exports = router
