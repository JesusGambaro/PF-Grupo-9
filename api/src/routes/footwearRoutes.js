const { Router } = require("express")
const { Op, Sequelize, where } = require("sequelize")
const { getAllFootwear } = require("../controllers/footwear.js")
const { Product, Image, Stock } = require("../db.js")

const router = Router()

router.get("/", getAllFootwear)

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
      limit: 6,
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
      color,
      addedImages,
      stock
    } = req.body
    let product = await Product.create({
      model,
      brand,
      category,
      gender,
      price,
      description,
      sale,
      color,
    })

    addedImages.length > 0 &&
      addedImages.map(async (image) => {
        let imageProduct = await Image.create({ url: image })
        await product.addImage(imageProduct)
      })

      stock.length > 0 &&
      stock.map(async (amountAndSize) => {
        let stockProduct = await Stock.create({ size: amountAndSize.size , amount: amountAndSize.amount })
        await product.addStock(stockProduct)
     })


    res.send("Product with its images created!")
  } catch (error) {
    console.log(error)
    res.status(404).send({ msg: error.message })
  }
})
module.exports = router
