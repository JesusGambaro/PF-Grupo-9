const server = require("./src/app.js")
const { conn } = require("./src/db.js")
const { Stock, Product, Image } = require("./src/db.js")

// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
  const nikeShoe = await Product.create({
    model: "Air",
    brand: "Nike",
    category: "Urban",
    gender: "Male",
    price: 15000,
    description: "Nice shoe",
    sale: 0,
    color: "White",
  })
  const imageNike = await Image.create({
    url: "https://5.imimg.com/data5/RE/US/MY-49405442/594997-500x500.jpg",
  })
  const imageNike2 = await Image.create({
    url: "https://sneakernews.com/wp-content/uploads/2022/04/Nike-Air-Force-1-DM0211-100-4.jpg",
  })
  const imageNike3 = await Image.create({
    url: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/nqawpuyunirt3l50lgc8/air-force-1-shadow-shoes-38vS5x.png",
  })
  const imageNike4 = await Image.create({
    url: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/67b21dfe-c207-4c5f-9936-8efc660431fd/air-max-90-g-golf-shoe-sqQCLC.png",
  })

  nikeShoe.addImages([imageNike, imageNike2, imageNike3, imageNike4])
  const stockNike = await Stock.create({ size: 10, amount: 23 })
  nikeShoe.addStock(stockNike)

  const nikeShoeSize7 = await Product.create({
    model: "Air",
    brand: "Nike",
    category: "Urban",
    gender: "Male",
    price: 15000,
    description: "Nice shoe",
    sale: 0,
    color: "White",
  })
  const imageNikeSize7 = await Image.create({
    url: "https://5.imimg.com/data5/RE/US/MY-49405442/594997-500x500.jpg",
  })
  const stockNikeShoeSize7 = await Stock.create({ size: 10, amount: 0 })
  nikeShoeSize7.addImage(imageNikeSize7)
  nikeShoeSize7.addStock(stockNikeShoeSize7)

  const nikeShoeBlack = await Product.create({
    model: "Air",
    brand: "Nike",
    category: "Urban",
    gender: "Male",
    price: 15000,
    description: "Nice shoe",
    sale: 0,
    color: "Black",
  })
  const imageNikeBlack = await Image.create({
    url: "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dwfb2d9764/products/NI_314193-009/NI_314193-009-1.JPG",
  })
  const stockNikeShoeBlack = await Stock.create({ size: 10, amount: 32 })
  nikeShoeBlack.addStock(stockNikeShoeBlack)
  nikeShoeBlack.addImage(imageNikeBlack)

  const adidasShoeBlack = await Product.create({
    model: "Predator",
    brand: "Adidas",
    category: "Sport",
    gender: "Male",
    price: 25000,
    description: "Adidas shoe football",
    sale: 10,
    color: "Black",
  })
  const imageAdidasBlack = await Image.create({
    url: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/70ae150b4f51490d8d87ab2001505c1f_9366/Botines_de_futbol_Predator_20.3_cesped_natural_seco_Negro_EF1929_01_standard.jpg",
  })
  const stockShoeBlack39 = await Stock.create({ size: 39, amount: 0 })
  const stockShoeBlack40 = await Stock.create({ size: 40, amount: 23 })
  const stockShoeBlack41 = await Stock.create({ size: 41, amount: 23 })
  const stockShoeBlack42 = await Stock.create({ size: 42, amount: 22 })
  const stockShoeBlack43 = await Stock.create({ size: 43, amount: 25 })
  const stockShoeBlack44 = await Stock.create({ size: 44, amount: 20 })
  adidasShoeBlack.addStocks([
    stockShoeBlack39,
    stockShoeBlack40,
    stockShoeBlack41,
    stockShoeBlack42,
    stockShoeBlack43,
    stockShoeBlack44,
  ])
  adidasShoeBlack.addImage(imageAdidasBlack)

  server.listen(3001, () => {
    console.log("%s listening at 3001")
  })
})
