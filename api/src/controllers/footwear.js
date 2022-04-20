const { Op,  Sequelize, where } = require("sequelize")
const { Product, Image, Stock, Order, ShoppingCartItem } = require("../db.js")

module.exports = {
  getAllFootwear: async (req, res) => {
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
            [Op.or]: [
              { model: { [Op.iLike]: `%${footwear}%` } },
              Sequelize.where(
                Sequelize.cast(Sequelize.col("brand"), "varchar"),
                {
                  [Op.iLike]: `%${footwear}%`,
                }
              ),
            ],
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
  },

  getAllGenders: async (req, res) => {
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
  },

  getAllCategories: async (req, res) => {
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
  },

  getAllSales: async (req, res) => {
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
  },

  getAllProductsSameModel: async (req, res) => {
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
  },

  getProductById: async (req, res) => {
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
  },

  postNewProduct: async (req, res) => {
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
  },

  editProduct: async (req, res) =>{
    try {
      const {model, brand, category, gender, price, description, sale, color, size, amount, images} = req.body;
      const {id} = req.params;

      const product = await Product.findOne({
        where: {id}
      })

      if(model){
        product.model = model;
        await product.save();
      } 
      if(brand){
        product.brand = brand;
        await product.save();
      } 
      if(category){
        product.category = category;
        await product.save();
      } 
      if(gender){
        product.gender = gender;
        await product.save();
      } 
      if(price){
        product.price = price;
        await product.save();
      } 
      if(description){
        product.description = description;
        await product.save();
      } 
      if(sale){
        product.sale = sale;
        await product.save();
      } 
      if(color){
        product.color = color;
        await product.save();
      } 
      if(size && amount){
        const stockPerModel = await Stock.findAll({
          where: { productId: product.id}  
        });
        stockPerModel.map((stockPerSize)=>{
          if(stockPerSize.size === size){
            stockPerSize.amount = amount;
            stockPerSize.save();
          }
        })
      }
      if(images){
      //definir con el front cómo va a ser el form para editar.
      }

      res.send("calzado editado");
    } catch (error) {
      console.log(error);
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const {id} = req.params;
      const product = await Product.findOne({ id })
      if(product){
        // eliminar todas las imagenes relacionadas al producto.
        const imageProduct = await Image.findAll({
          where:{productId: id}
        })
        imageProduct && imageProduct.map(async (imageItem)=>{
          await imageItem.destroy();
        })

        // eliminar todo el stock relacionado al producto. ordenes, cartItems.
        const stockProduct = await Stock.findAll({
          where:{productId: id}
        })
        stockProduct && stockProduct.map(async (stockItem)=>{
          await stockItem.destroy();
        })
        
        // eliminar todas las ordenes relacionadas al producto.
        const orderProduct = await Order.findAll({
          where:{productId: id}
        })
        orderProduct && orderProduct.map(async (oderItem)=>{
          await oderItem.destroy();
        })

        // eliminar todos los cart items relacionados al producto.
        const cartProduct = await ShoppingCartItem.findAll({
          where:{productId: id}
        })
        cartProduct && cartProduct.map(async (cartItem)=>{
          await cartItem.destroy();
        })
        product.destroy()
      }
      res.send("product destroyed");
    } catch (error) {
      console.log(error);
    }
  },
}

