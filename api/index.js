const server = require("./src/app.js")
const bcrypt = require("bcryptjs")
const { conn } = require("./src/db.js")
const {
  Stock,
  Product,
  Image,
  Order,
  ShoppingCartItem,
  User,
  Payment,
  Review,
} = require("./src/db.js")

const prueba = async () => {
  const passwordHashadmin = await bcrypt.hash("adminpass", 10)
  const passwordHashRodolfo = await bcrypt.hash("rodolfopass", 10)
  const admin = await User.create({
    userName: "admin",
    email: "admin@gmail.com",
    password: passwordHashadmin,
    isAdmin: true,
  })
  const Rodolfo = await User.create({
    userName: "Rodolfo Altamira",
    email: "rodolfo@gmail.com",
    password: passwordHashRodolfo,
    isAdmin: false,
  })
  const review1 = await Review.create({
    description:
      "Im comfortable with this purchase but the color it's a little different",
    rating: 3,
  })
  const review2 = await Review.create({
    description: "I like it!",
    rating: 3,
  })
  const review3 = await Review.create({
    description: "It was a present for my brother. He loves it",
    rating: 4,
  })
  const review4 = await Review.create({
    description: "The best shoes I have ever seen. Good job!",
    rating: 5,
  })
  const review5 = await Review.create({
    description:
      "I had some issues with the shipment but the footwear is awesome",
    rating: 3.5,
  })
  const review6 = await Review.create({
    description: "Just not what I was looking for",
    rating: 2,
  })
  await Rodolfo.addReviews([
    review1,
    review2,
    review3,
    review4,
    review5,
    review6,
  ])
  const NikeKyrieInfinityPurple = await Product.create({
    model: "Kyrie Infinity",
    brand: "Nike",
    category: "Urban",
    gender: "Male",
    price: 200,
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    sale: 0,
    color: "Purple",
    rating: 3.5,
    ratingAmount: 2,
  })
  await NikeKyrieInfinityPurple.addReviews([review1, review3])
  const imageNikeKyrieInfinityPurple4 = await Image.create({
    url: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/d6f5179b-2c54-47ca-ab43-6a43200cae62/kyrie-infinity-basketball-shoes-LvzsVp.png",
  })
  const imageNikeKyrieInfinityPurple = await Image.create({
    url: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/fd9e6360-4422-4863-9ad3-20b265b29146/kyrie-infinity-basketball-shoes-LvzsVp.png",
  })
  const imageNikeKyrieInfinityPurple2 = await Image.create({
    url: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/389bc835-458d-4877-8534-66aae2923f8e/kyrie-infinity-basketball-shoes-LvzsVp.png",
  })
  const imageNikeKyrieInfinityPurple3 = await Image.create({
    url: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/a211de35-26d2-4432-8ea8-dd6d7e550357/kyrie-infinity-basketball-shoes-LvzsVp.png",
  })
  NikeKyrieInfinityPurple.addImages([
    imageNikeKyrieInfinityPurple,
    imageNikeKyrieInfinityPurple2,
    imageNikeKyrieInfinityPurple3,
    imageNikeKyrieInfinityPurple4,
  ])
  const stockNikeKyrieInfinityPurple10 = await Stock.create({
    size: 10,
    amount: 10,
  })
  const stockNikeKyrieInfinityPurple11 = await Stock.create({
    size: 11,
    amount: 11,
  })
  const stockNikeKyrieInfinityPurple12 = await Stock.create({
    size: 12,
    amount: 12,
  })
  NikeKyrieInfinityPurple.addStock([
    stockNikeKyrieInfinityPurple10,
    stockNikeKyrieInfinityPurple11,
    stockNikeKyrieInfinityPurple12,
  ])

  ///////////////////////

  const NikeKyrieInfinityBeige = await Product.create({
    model: "Kyrie Infinity",
    brand: "Nike",
    category: "Urban",
    gender: "Male",
    price: 200,
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    sale: 0,
    color: "Beige",
    rating: 3.5,
    ratingAmount: 2,
  })
  await NikeKyrieInfinityBeige.addReviews([review1, review3])
  const imageNikeKyrieInfinityBeige = await Image.create({
    url: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/66e00d01-9ba4-4676-8e8f-6f11e977a8a2/kyrie-infinity-n7-basketball-shoes-LvzsVp.png",
  })
  const imageNikeKyrieInfinityBeige2 = await Image.create({
    url: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/6dc84506-5e9d-4f2d-a9da-d2478885dec2/kyrie-infinity-n7-basketball-shoes-LvzsVp.png",
  })
  const imageNikeKyrieInfinityBeige3 = await Image.create({
    url: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/6989f9c1-174e-4fa9-a459-6580d58050aa/kyrie-infinity-n7-basketball-shoes-LvzsVp.png",
  })
  const imageNikeKyrieInfinityBeige4 = await Image.create({
    url: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/d76ff230-2d2a-4504-ab7f-ddb4ba357b85/kyrie-infinity-n7-basketball-shoes-LvzsVp.png",
  })
  NikeKyrieInfinityBeige.addImages([
    imageNikeKyrieInfinityBeige,
    imageNikeKyrieInfinityBeige2,
    imageNikeKyrieInfinityBeige3,
    imageNikeKyrieInfinityBeige4,
  ])
  const stockNikeKyrieInfinityBeige10 = await Stock.create({
    size: 10,
    amount: 20,
  })
  const stockNikeKyrieInfinityBeige11 = await Stock.create({
    size: 11,
    amount: 21,
  })
  const stockNikeKyrieInfinityBeige12 = await Stock.create({
    size: 12,
    amount: 22,
  })
  NikeKyrieInfinityBeige.addStock([
    stockNikeKyrieInfinityBeige10,
    stockNikeKyrieInfinityBeige11,
    stockNikeKyrieInfinityBeige12,
  ])

  ///////////////////////
  const NikeAirZoomAlphafly = await Product.create({
    model: "Air Zoom Pegasus",
    brand: "Nike",
    category: "Running",
    gender: "Male",
    price: 150,
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    sale: 10,
    color: "Red",
    rating: 5,
    ratingAmount: 1,
  })
  await NikeAirZoomAlphafly.addReview(review4)
  const imageNikeAirZoomAlphafly = await Image.create({
    url: "https://images.footlocker.com/is/image/EBFL2/M8061600_a2?wid=520&hei=520&fmt=png-alpha",
  })
  const imageNikeAirZoomAlphafly3 = await Image.create({
    url: "https://images.footlocker.com/is/image/EBFL2/M8061600_a4?wid=520&hei=520&fmt=png-alpha",
  })
  const imageNikeAirZoomAlphafly2 = await Image.create({
    url: "https://images.footlocker.com/is/image/EBFL2/M8061600_a3?wid=520&hei=520&fmt=png-alpha",
  })
  const imageNikeAirZoomAlphafly4 = await Image.create({
    url: "https://images.footlocker.com/is/image/EBFL2/M8061600_a1?wid=520&hei=520&fmt=png-alpha",
  })

  NikeAirZoomAlphafly.addImages([
    imageNikeAirZoomAlphafly,
    imageNikeAirZoomAlphafly2,
    imageNikeAirZoomAlphafly3,
    imageNikeAirZoomAlphafly4,
  ])
  const stockNike10 = await Stock.create({ size: 10, amount: 20 })
  const stockNike11 = await Stock.create({ size: 11, amount: 21 })
  const stockNike13 = await Stock.create({ size: 12, amount: 22 })
  NikeAirZoomAlphafly.addStock([stockNike10, stockNike11, stockNike13])

  ///////////////////////
  const adidasShoeWhite = await Product.create({
    model: "Forum Low",
    brand: "Adidas",
    category: "Urban",
    gender: "Male",
    price: 133,
    description: "Adidas shoe football",
    sale: 10,
    color: "White",
    rating: 4,
    ratingAmount: 1,
  })
  await adidasShoeWhite.addReview(review3)
  const imageAdidasWhite3 = await Image.create({
    url: "https://images.footlocker.com/is/image/EBFL2/FY7756_a2?wid=520&hei=520&fmt=png-alpha",
  })

  const imageAdidasWhite4 = await Image.create({
    url: "https://images.footlocker.com/is/image/EBFL2/FY7756_a1?wid=520&hei=520&fmt=png-alpha",
  })

  const imageAdidasWhite = await Image.create({
    url: "https://images.footlocker.com/is/image/EBFL2/FY7756_a3?wid=520&hei=520&fmt=png-alpha",
  })

  const imageAdidasWhite2 = await Image.create({
    url: "https://images.footlocker.com/is/image/EBFL2/FY7756_a4?wid=520&hei=520&fmt=png-alpha",
  })

  const stockShoeWhite39 = await Stock.create({ size: 39, amount: 0 })
  const stockShoeWhite40 = await Stock.create({ size: 40, amount: 23 })
  const stockShoeWhite41 = await Stock.create({ size: 41, amount: 23 })
  const stockShoeWhite42 = await Stock.create({ size: 42, amount: 22 })
  const stockShoeWhite43 = await Stock.create({ size: 43, amount: 25 })
  const stockShoeWhite44 = await Stock.create({ size: 44, amount: 20 })
  adidasShoeWhite.addStocks([
    stockShoeWhite39,
    stockShoeWhite40,
    stockShoeWhite41,
    stockShoeWhite42,
    stockShoeWhite43,
    stockShoeWhite44,
  ])
  adidasShoeWhite.addImage(imageAdidasWhite)
  adidasShoeWhite.addImage(imageAdidasWhite2)
  adidasShoeWhite.addImage(imageAdidasWhite3)
  adidasShoeWhite.addImage(imageAdidasWhite4)
  ////////////////////////////////////////////////

  const classicLeather = await Product.create({
    model: "Classic Leather",
    brand: "Reebok",
    category: "Running",
    gender: "Kids",
    price: 100,
    description:
      "Give your look a touch of classic style. This youth model comes with a smooth, supportive leather upper. The cushioned midsole offers comfort to your feet and the durable rubber outsole resists daily use.",
    sale: 10,
    color: "Black",
    rating: 3.5,
    ratingAmount: 2,
  })
  await classicLeather.addReviews([review2, review5])
  const imageClassicLeather1 = await Image.create({
    url: "https://images.footlocker.com/is/image/EBFL2/49798_a2?wid=520&hei=520&fmt=png-alpha",
  })
  const imageClassicLeather = await Image.create({
    url: "https://images.footlocker.com/is/image/EBFL2/49798_a4?wid=520&hei=520&fmt=png-alpha",
  })
  const imageClassicLeather2 = await Image.create({
    url: "https://images.footlocker.com/is/image/EBFL2/49798_a3?wid=520&hei=520&fmt=png-alpha",
  })
  const imageClassicLeather3 = await Image.create({
    url: "https://images.footlocker.com/is/image/EBFL2/49798_a1?wid=520&hei=520&fmt=png-alpha",
  })

  classicLeather.addImages([
    imageClassicLeather,
    imageClassicLeather1,
    imageClassicLeather2,
    imageClassicLeather3,
  ])
  const stockclassicLeather14 = await Stock.create({ size: 4, amount: 24 })
  const stockclassicLeather15 = await Stock.create({ size: 5, amount: 25 })
  const stockclassicLeather16 = await Stock.create({ size: 6, amount: 26 })
  classicLeather.addStock([
    stockclassicLeather14,
    stockclassicLeather15,
    stockclassicLeather16,
  ])

  //////////////////////////////////////////////

  const adidasSuperstar = await Product.create({
    model: "Superstar",
    brand: "Adidas",
    category: "Urban",
    gender: "Female",
    price: 140,
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    sale: 15,
    color: "White",
    rating: 4,
    ratingAmount: 1,
  })
  await adidasSuperstar.addReview(review3)
  const imageadidasSuperstar4 = await Image.create({
    url: "https://images.footlocker.com/is/image/EBFL2/FV3285_a2?wid=520&hei=520&fmt=png-alpha",
  })
  const imageadidasSuperstar = await Image.create({
    url: "https://images.footlocker.com/is/image/EBFL2/FV3285_a3?wid=520&hei=520&fmt=png-alpha",
  })
  const imageadidasSuperstar2 = await Image.create({
    url: "https://images.footlocker.com/is/image/EBFL2/FV3285_a4?wid=520&hei=520&fmt=png-alpha",
  })
  const imageadidasSuperstar3 = await Image.create({
    url: "https://images.footlocker.com/is/image/EBFL2/FV3285_a1?wid=520&hei=520&fmt=png-alpha",
  })

  adidasSuperstar.addImages([
    imageadidasSuperstar,
    imageadidasSuperstar2,
    imageadidasSuperstar3,
    imageadidasSuperstar4,
  ])
  const stockAdidasSuperstar10 = await Stock.create({ size: 10, amount: 20 })
  const stockAdidasSuperstar11 = await Stock.create({ size: 11, amount: 21 })
  const stockAdidasSuperstar12 = await Stock.create({ size: 12, amount: 22 })
  adidasSuperstar.addStock([
    stockAdidasSuperstar10,
    stockAdidasSuperstar11,
    stockAdidasSuperstar12,
  ])

  ////////////////////////////////////////////////
  const NikeKyrieInfinity = await Product.create({
    model: "Kyrie Infinity",
    brand: "Nike",
    category: "Urban",
    gender: "Male",
    price: 200,
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    sale: 0,
    color: "Green",
    rating: 3.5,
    ratingAmount: 2,
  })
  await NikeKyrieInfinity.addReviews([review1, review3])
  const imageNikeKyrieInfinity4 = await Image.create({
    url: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/31894742-692c-45d0-bba6-b034571c23b9/kyrie-infinity-basketball-shoes-LvzsVp.png",
  })
  const imageNikeKyrieInfinity = await Image.create({
    url: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/516cded5-91a4-48d8-8e5c-a2a2d31aff0b/kyrie-infinity-basketball-shoes-LvzsVp.png",
  })
  const imageNikeKyrieInfinity2 = await Image.create({
    url: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/1583433a-3f93-461f-803c-92d1c87d47a1/kyrie-infinity-basketball-shoes-LvzsVp.png",
  })
  const imageNikeKyrieInfinity3 = await Image.create({
    url: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/ce351403-5d20-4f84-8d01-ebd61a38c828/kyrie-infinity-basketball-shoes-LvzsVp.png",
  })
  NikeKyrieInfinity.addImages([
    imageNikeKyrieInfinity,
    imageNikeKyrieInfinity2,
    imageNikeKyrieInfinity3,
    imageNikeKyrieInfinity4,
  ])
  const stockNikeKyrieInfinity10 = await Stock.create({ size: 10, amount: 20 })
  const stockNikeKyrieInfinity11 = await Stock.create({ size: 11, amount: 21 })
  const stockNikeKyrieInfinity12 = await Stock.create({ size: 12, amount: 22 })
  NikeKyrieInfinity.addStock([
    stockNikeKyrieInfinity10,
    stockNikeKyrieInfinity11,
    stockNikeKyrieInfinity12,
  ])

  ///////////////////////

  const NikeDownshifter = await Product.create({
    model: "Air max 270",
    brand: "Nike",
    category: "Running",
    gender: "Female",
    price: 145,
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    sale: 10,
    color: "Pink",
    rating: 4,
    ratingAmount: 3,
  })
  await NikeDownshifter.addReviews([review1, review2, review4])
  const imageNikeDownshifter2 = await Image.create({
    url: "https://images.footlocker.com/is/image/EBFL2/M8326600_a2?wid=520&hei=520&fmt=png-alpha",
  })
  const imageNikeDownshifter3 = await Image.create({
    url: "https://images.footlocker.com/is/image/EBFL2/M8326600_a1?wid=520&hei=520&fmt=png-alpha",
  })
  const imageNikeDownshifter4 = await Image.create({
    url: "https://images.footlocker.com/is/image/EBFL2/M8326600_a4?wid=520&hei=520&fmt=png-alpha",
  })
  const imageNikeDownshifter = await Image.create({
    url: "https://images.footlocker.com/is/image/EBFL2/M8326600_a3?wid=520&hei=520&fmt=png-alpha",
  })
  NikeDownshifter.addImages([
    imageNikeDownshifter,
    imageNikeDownshifter2,
    imageNikeDownshifter3,
    imageNikeDownshifter4,
  ])
  const stockiNikeDownshifter10 = await Stock.create({ size: 10, amount: 20 })
  const stockiNikeDownshifter11 = await Stock.create({ size: 11, amount: 21 })
  const stockiNikeDownshifter12 = await Stock.create({ size: 12, amount: 22 })
  NikeDownshifter.addStock([
    stockiNikeDownshifter10,
    stockiNikeDownshifter11,
    stockiNikeDownshifter12,
  ])

  ///////////////////////

  const NikeDownshifterBlack = await Product.create({
    model: "Air max 270",
    brand: "Nike",
    category: "Running",
    gender: "Female",
    price: 145,
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    sale: 0,
    color: "Black",
    rating: 4,
    ratingAmount: 3,
  })
  await NikeDownshifterBlack.addReviews([review1, review2, review4])
  const imageNikeDownshifterBlack2 = await Image.create({
    url: "https://images.footlocker.com/is/image/EBFL2/H6789006_a2?wid=520&hei=520&fmt=png-alpha",
  })
  const imageNikeDownshifterBlack4 = await Image.create({
    url: "https://images.footlocker.com/is/image/EBFL2/H6789006_a4?wid=520&hei=520&fmt=png-alpha",
  })
  const imageNikeDownshifterBlack = await Image.create({
    url: "https://images.footlocker.com/is/image/EBFL2/H6789006_a3?wid=520&hei=520&fmt=png-alpha",
  })
  const imageNikeDownshifterBlack3 = await Image.create({
    url: "https://images.footlocker.com/is/image/EBFL2/H6789006_a1?wid=520&hei=520&fmt=png-alpha",
  })
  NikeDownshifterBlack.addImages([
    imageNikeDownshifterBlack,
    imageNikeDownshifterBlack2,
    imageNikeDownshifterBlack3,
    imageNikeDownshifterBlack4,
  ])
  const stockiNikeDownshifterBlack10 = await Stock.create({
    size: 10,
    amount: 20,
  })
  const stockiNikeDownshifterBlack11 = await Stock.create({
    size: 11,
    amount: 21,
  })
  const stockiNikeDownshifterBlack12 = await Stock.create({
    size: 12,
    amount: 22,
  })
  NikeDownshifterBlack.addStock([
    stockiNikeDownshifterBlack10,
    stockiNikeDownshifterBlack11,
    stockiNikeDownshifterBlack12,
  ])

  ///////////////////////

  const NikeZoomXInvincible = await Product.create({
    model: "ZoomX Invincible Run Flyknit",
    brand: "Nike",
    category: "Running",
    gender: "Female",
    price: 172,
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    sale: 20,
    color: "White",
    rating: 3.5,
    ratingAmount: 3,
  })
  await NikeZoomXInvincible.addReviews([review1, review2, review3])
  const imageNikeZoomXInvincible = await Image.create({
    url: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/65b9e6d3-4c66-4b1c-b5ca-d4a43470713b/zoomx-invincible-run-flyknit-womens-road-running-shoes-kVqSJ8.png",
  })
  const imageNikeZoomXInvincible2 = await Image.create({
    url: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/2b0cabe5-d4b1-4c27-a555-120976b88d81/zoomx-invincible-run-flyknit-womens-road-running-shoes-kVqSJ8.png",
  })
  const imageNikeZoomXInvincible3 = await Image.create({
    url: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/054ebc9a-24cc-4e41-ad34-5261e2630273/zoomx-invincible-run-flyknit-womens-road-running-shoes-kVqSJ8.png",
  })
  const imageNikeZoomXInvincible4 = await Image.create({
    url: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/71ac9fce-90d7-49fc-a593-5fe2693e5a42/zoomx-invincible-run-flyknit-womens-road-running-shoes-kVqSJ8.png",
  })
  NikeZoomXInvincible.addImages([
    imageNikeZoomXInvincible,
    imageNikeZoomXInvincible2,
    imageNikeZoomXInvincible3,
    imageNikeZoomXInvincible4,
  ])
  const stockNikeZoomXInvincible10 = await Stock.create({
    size: 10,
    amount: 20,
  })
  const stockNikeZoomXInvincible11 = await Stock.create({
    size: 11,
    amount: 21,
  })
  const stockNikeZoomXInvincible12 = await Stock.create({
    size: 12,
    amount: 22,
  })
  NikeZoomXInvincible.addStock([
    stockNikeZoomXInvincible10,
    stockNikeZoomXInvincible11,
    stockNikeZoomXInvincible12,
  ])

  ///////////////////////

  const NikeZoomXInvinciblePink = await Product.create({
    model: "ZoomX Invincible Run Flyknit",
    brand: "Nike",
    category: "Running",
    gender: "Female",
    price: 172,
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    sale: 25,
    color: "Pink",
    rating: 3.5,
    ratingAmount: 3,
  })
  await NikeZoomXInvinciblePink.addReviews([review1, review2, review3])
  const imageNikeZoomXInvinciblePink = await Image.create({
    url: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/53afa01b-cd20-4def-bd2a-201dadfae4d2/zoomx-invincible-run-flyknit-womens-road-running-shoes-kVqSJ8.png",
  })
  const imageNikeZoomXInvinciblePink2 = await Image.create({
    url: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/79429a35-9c3c-49c9-838f-53a6be45ae8f/zoomx-invincible-run-flyknit-womens-road-running-shoes-kVqSJ8.png",
  })
  const imageNikeZoomXInvinciblePink3 = await Image.create({
    url: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/94c1efe0-0614-467f-95dc-ae60432d2d45/zoomx-invincible-run-flyknit-womens-road-running-shoes-kVqSJ8.png",
  })
  const imageNikeZoomXInvinciblePink4 = await Image.create({
    url: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/6883cd6d-f35a-4d05-86fe-a431e14230f9/zoomx-invincible-run-flyknit-womens-road-running-shoes-kVqSJ8.png",
  })
  NikeZoomXInvinciblePink.addImages([
    imageNikeZoomXInvinciblePink,
    imageNikeZoomXInvinciblePink2,
    imageNikeZoomXInvinciblePink3,
    imageNikeZoomXInvinciblePink4,
  ])
  const stockNikeZoomXInvinciblePink10 = await Stock.create({
    size: 10,
    amount: 20,
  })
  const stockNikeZoomXInvinciblePink11 = await Stock.create({
    size: 11,
    amount: 21,
  })
  const stockNikeZoomXInvinciblePink12 = await Stock.create({
    size: 12,
    amount: 22,
  })
  NikeZoomXInvinciblePink.addStock([
    stockNikeZoomXInvinciblePink10,
    stockNikeZoomXInvinciblePink11,
    stockNikeZoomXInvinciblePink12,
  ])

  ///////////////////////

  const NikeZoomXInvincibleBlack = await Product.create({
    model: "ZoomX Invincible Run Flyknit",
    brand: "Nike",
    category: "Running",
    gender: "Female",
    price: 172,
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    sale: 0,
    color: "Black",
    rating: 3.5,
    ratingAmount: 3,
  })
  await NikeZoomXInvincibleBlack.addReviews([review1, review2, review3])
  const imageNikeZoomXInvincibleBlack = await Image.create({
    url: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/9314e18a-3324-4249-8592-0e795acc3db5/zoomx-invincible-run-flyknit-womens-road-running-shoes-kVqSJ8.png",
  })
  const imageNikeZoomXInvincibleBlack2 = await Image.create({
    url: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/61f49a5c-f0d0-49c9-b6d1-c12447a2ba0c/zoomx-invincible-run-flyknit-womens-road-running-shoes-kVqSJ8.png",
  })
  const imageNikeZoomXInvincibleBlack3 = await Image.create({
    url: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/b6dc1750-2110-4588-8b0d-93f5f892b648/zoomx-invincible-run-flyknit-womens-road-running-shoes-kVqSJ8.png",
  })
  const imageNikeZoomXInvincibleBlack4 = await Image.create({
    url: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/4139dcc3-2df3-4eda-9f7f-3c90099f0f35/zoomx-invincible-run-flyknit-womens-road-running-shoes-kVqSJ8.png",
  })
  NikeZoomXInvincibleBlack.addImages([
    imageNikeZoomXInvincibleBlack,
    imageNikeZoomXInvincibleBlack2,
    imageNikeZoomXInvincibleBlack3,
    imageNikeZoomXInvincibleBlack4,
  ])
  const stockNikeZoomXInvincibleBlack10 = await Stock.create({
    size: 10,
    amount: 20,
  })
  const stockNikeZoomXInvincibleBlack11 = await Stock.create({
    size: 11,
    amount: 21,
  })
  const stockNikeZoomXInvincibleBlack12 = await Stock.create({
    size: 12,
    amount: 22,
  })
  NikeZoomXInvincibleBlack.addStock([
    stockNikeZoomXInvincibleBlack10,
    stockNikeZoomXInvincibleBlack11,
    stockNikeZoomXInvincibleBlack12,
  ])

  ///////////////////////

  const NikeLegendEssential = await Product.create({
    model: "Legend Essential",
    brand: "Nike",
    category: "Running",
    gender: "Female",
    price: 137,
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    sale: 0,
    color: "Black",
    rating: 3.5,
    ratingAmount: 1,
  })
  await NikeLegendEssential.addReview(review5)
  const imageNikeLegendEssential = await Image.create({
    url: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/eacd9775-1eef-4187-b98d-969022e361f2/legend-essential-2-womens-training-shoes-LnSrgb.png",
  })
  const imageNikeLegendEssential2 = await Image.create({
    url: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/5a807375-bd66-4538-926b-b99b02f63070/legend-essential-2-womens-training-shoes-LnSrgb.png",
  })
  const imageNikeLegendEssential3 = await Image.create({
    url: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/2ed275bc-357a-4707-a14c-0da11ca2bf4b/legend-essential-2-womens-training-shoes-LnSrgb.png",
  })
  const imageNikeLegendEssential4 = await Image.create({
    url: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/e3b4dd33-620b-42f8-9f16-fed2e4ead37f/legend-essential-2-womens-training-shoes-LnSrgb.png",
  })
  NikeLegendEssential.addImages([
    imageNikeLegendEssential,
    imageNikeLegendEssential2,
    imageNikeLegendEssential3,
    imageNikeLegendEssential4,
  ])
  const stockNikeLegendEssential10 = await Stock.create({
    size: 10,
    amount: 20,
  })
  const stockNikeLegendEssential11 = await Stock.create({
    size: 11,
    amount: 21,
  })
  const stockNikeLegendEssential12 = await Stock.create({
    size: 12,
    amount: 22,
  })
  NikeLegendEssential.addStock([
    stockNikeLegendEssential10,
    stockNikeLegendEssential11,
    stockNikeLegendEssential12,
  ])

  ///////////////////////

  const NikeLegendEssentialPink = await Product.create({
    model: "Legend Essential",
    brand: "Nike",
    category: "Running",
    gender: "Female",
    price: 137,
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    sale: 0,
    color: "Pink",
    rating: 4,
    ratingAmount: 1,
  })
  await NikeLegendEssentialPink.addReview(review3)
  const imageNikeLegendEssentialPink = await Image.create({
    url: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/c373e1f7-4c2a-41d7-bf9a-77f6ac9c39cc/legend-essential-2-womens-training-shoes-LnSrgb.png",
  })
  const imageNikeLegendEssentialPink2 = await Image.create({
    url: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/8aae9721-0b49-42ef-bbf6-97cc84747d98/legend-essential-2-womens-training-shoes-LnSrgb.png",
  })
  const imageNikeLegendEssentialPink3 = await Image.create({
    url: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/76de1ccf-e6cf-4cd9-a78f-e63fb0da3f6a/legend-essential-2-womens-training-shoes-LnSrgb.png",
  })
  const imageNikeLegendEssentialPink4 = await Image.create({
    url: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/689b74c9-0653-4bf4-9713-a9eb3166afa6/legend-essential-2-womens-training-shoes-LnSrgb.png",
  })
  NikeLegendEssentialPink.addImages([
    imageNikeLegendEssentialPink,
    imageNikeLegendEssentialPink2,
    imageNikeLegendEssentialPink3,
    imageNikeLegendEssentialPink4,
  ])
  const stockNikeLegendEssentialPink10 = await Stock.create({
    size: 10,
    amount: 20,
  })
  const stockNikeLegendEssentialPink11 = await Stock.create({
    size: 11,
    amount: 21,
  })
  const stockNikeLegendEssentialPink12 = await Stock.create({
    size: 12,
    amount: 22,
  })
  NikeLegendEssentialPink.addStock([
    stockNikeLegendEssentialPink10,
    stockNikeLegendEssentialPink11,
    stockNikeLegendEssentialPink12,
  ])

  ///////////////////////

  const NikeReactInfinity = await Product.create({
    model: "React Infinity",
    brand: "Nike",
    category: "Running",
    gender: "Male",
    price: 186,
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    sale: 0,
    color: "White",
    rating: 4.5,
    ratingAmount: 2,
  })
  await NikeReactInfinity.addReviews([review3, review4])
  const imageNikeReactInfinity = await Image.create({
    url: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/bdd3f8d9-e05e-43ab-8dbe-694f9e49cb0c/react-infinity-run-flyknit-2-mens-road-running-shoes-DttDF2.png",
  })
  const imageNikeReactInfinity2 = await Image.create({
    url: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/046a48ce-3b0b-41b2-8937-5133cb2c1740/react-infinity-run-flyknit-2-mens-road-running-shoes-DttDF2.png",
  })
  const imageNikeReactInfinity3 = await Image.create({
    url: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/188658f4-980c-49ee-8fdd-05697a32490d/react-infinity-run-flyknit-2-mens-road-running-shoes-DttDF2.png",
  })
  const imageNikeReactInfinity4 = await Image.create({
    url: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/94c76582-001e-4f61-97ab-a95189cb32a1/react-infinity-run-flyknit-2-mens-road-running-shoes-DttDF2.png",
  })
  NikeReactInfinity.addImages([
    imageNikeReactInfinity,
    imageNikeReactInfinity2,
    imageNikeReactInfinity3,
    imageNikeReactInfinity4,
  ])
  const stockNikeReactInfinity10 = await Stock.create({ size: 10, amount: 20 })
  const stockNikeReactInfinity11 = await Stock.create({ size: 11, amount: 21 })
  const stockNikeReactInfinity12 = await Stock.create({ size: 12, amount: 22 })
  NikeReactInfinity.addStock([
    stockNikeReactInfinity10,
    stockNikeReactInfinity11,
    stockNikeReactInfinity12,
  ])

  ///////////////////////

  const NikeLegendEssentialGray = await Product.create({
    model: "Legend Essential",
    brand: "Nike",
    category: "Running",
    gender: "Female",
    price: 137,
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    sale: 0,
    color: "Gray",
    rating: 4,
    ratingAmount: 1,
  })
  await NikeLegendEssentialGray.addReview(review5)
  const imageNikeLegendEssentialGray = await Image.create({
    url: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/cf0bb345-427a-4f95-b5ae-e082b110122b/legend-essential-2-womens-training-shoes-LnSrgb.png",
  })
  const imageNikeLegendEssentialGray2 = await Image.create({
    url: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/02017e44-8b89-4f47-8a1d-4cb39d300590/legend-essential-2-womens-training-shoes-LnSrgb.png",
  })
  const imageNikeLegendEssentialGray3 = await Image.create({
    url: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/32616664-1c8c-413e-8adc-e3ed1cc3dfe5/legend-essential-2-womens-training-shoes-LnSrgb.png",
  })
  const imageNikeLegendEssentialGray4 = await Image.create({
    url: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/f439c9b9-479b-4cea-960b-02133d4b9b64/legend-essential-2-womens-training-shoes-LnSrgb.png",
  })
  NikeLegendEssentialGray.addImages([
    imageNikeLegendEssentialGray,
    imageNikeLegendEssentialGray2,
    imageNikeLegendEssentialGray3,
    imageNikeLegendEssentialGray4,
  ])
  const stockNikeLegendEssentialGray10 = await Stock.create({
    size: 10,
    amount: 20,
  })
  const stockNikeLegendEssentialGray11 = await Stock.create({
    size: 11,
    amount: 21,
  })
  const stockNikeLegendEssentialGray12 = await Stock.create({
    size: 12,
    amount: 22,
  })
  NikeLegendEssentialGray.addStock([
    stockNikeLegendEssentialGray10,
    stockNikeLegendEssentialGray11,
    stockNikeLegendEssentialGray12,
  ])

  ///////////////////////

  const converseChuckTaylor = await Product.create({
    model: "Chuck Taylor",
    brand: "Converse",
    category: "Urban",
    gender: "Unisex",
    price: 139,
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    sale: 0,
    color: "White",
    rating: 2,
    ratingAmount: 1,
  })
  await converseChuckTaylor.addReview(review6)
  const imagenConverseChuckTaylor2 = await Image.create({
    url: "https://images.footlocker.com/is/image/EBFL2/W7652_a2?wid=520&hei=520&fmt=png-alpha",
  })
  const imagenConverseChuckTaylor4 = await Image.create({
    url: "https://images.footlocker.com/is/image/EBFL2/W7652_a4?wid=520&hei=520&fmt=png-alpha",
  })
  const imagenConverseChuckTaylor3 = await Image.create({
    url: "https://images.footlocker.com/is/image/EBFL2/W7652_a3?wid=520&hei=520&fmt=png-alpha",
  })
  const imagenConverseChuckTaylor = await Image.create({
    url: "https://images.footlocker.com/is/image/EBFL2/W7652_a1?wid=520&hei=520&fmt=png-alpha",
  })

  converseChuckTaylor.addImages([
    imagenConverseChuckTaylor,
    imagenConverseChuckTaylor2,
    imagenConverseChuckTaylor3,
    imagenConverseChuckTaylor4,
  ])
  const stockConverseChuckTaylor10 = await Stock.create({
    size: 10,
    amount: 20,
  })
  const stockConverseChuckTaylor11 = await Stock.create({
    size: 11,
    amount: 21,
  })
  const stockConverseChuckTaylor12 = await Stock.create({
    size: 12,
    amount: 22,
  })
  converseChuckTaylor.addStock([
    stockConverseChuckTaylor10,
    stockConverseChuckTaylor11,
    stockConverseChuckTaylor12,
  ])

  ////////////////////////////////////////////////

  const converseChuckTaylorBlack = await Product.create({
    model: "Chuck Taylor",
    brand: "Converse",
    category: "Urban",
    gender: "Unisex",
    price: 139,
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    sale: 0,
    color: "Black",
    rating: 2,
    ratingAmount: 1,
  })
  await converseChuckTaylorBlack.addReview(review6)
  const imagenconverseChuckTaylorBlack4 = await Image.create({
    url: "https://images.footlocker.com/is/image/EBFL2/W9166_a2?wid=520&hei=520&fmt=png-alpha",
  })
  const imagenconverseChuckTaylorBlack = await Image.create({
    url: "https://images.footlocker.com/is/image/EBFL2/W9166_a4?wid=520&hei=520&fmt=png-alpha",
  })
  const imagenconverseChuckTaylorBlack2 = await Image.create({
    url: "https://images.footlocker.com/is/image/EBFL2/W9166_a3?wid=520&hei=520&fmt=png-alpha",
  })
  const imagenconverseChuckTaylorBlack3 = await Image.create({
    url: "https://images.footlocker.com/is/image/EBFL2/W9166_a1?wid=520&hei=520&fmt=png-alpha",
  })

  converseChuckTaylorBlack.addImages([
    imagenconverseChuckTaylorBlack,
    imagenconverseChuckTaylorBlack2,
    imagenconverseChuckTaylorBlack3,
    imagenconverseChuckTaylorBlack4,
  ])
  const stockConverseChuckTaylorBlack10 = await Stock.create({
    size: 10,
    amount: 20,
  })
  const stockConverseChuckTaylorBlack11 = await Stock.create({
    size: 11,
    amount: 21,
  })
  const stockConverseChuckTaylorBlack12 = await Stock.create({
    size: 12,
    amount: 22,
  })
  converseChuckTaylorBlack.addStock([
    stockConverseChuckTaylorBlack10,
    stockConverseChuckTaylorBlack11,
    stockConverseChuckTaylorBlack12,
  ])

  const nikeShoeSize7 = await Product.create({
    model: "Air",
    brand: "Nike",
    category: "Urban",
    gender: "Male",
    price: 166,
    description: "Nice shoe",
    sale: 0,
    color: "White",
    rating: 3,
    ratingAmount: 2,
  })
  await nikeShoeSize7.addReviews([review3, review6])
  const imageNikeSize7 = await Image.create({
    url: "https://5.imimg.com/data5/RE/US/MY-49405442/594997-500x500.jpg",
  })
  const stockNikeShoeSize7 = await Stock.create({ size: 10, amount: 0 })
  nikeShoeSize7.addImage(imageNikeSize7)
  nikeShoeSize7.addStock(stockNikeShoeSize7)

  //////////////////////////////////////////

  const nikeShoeBlue = await Product.create({
    model: "Air More Uptempo",
    brand: "Nike",
    category: "Urban",
    gender: "Kids",
    price: 141,
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    sale: 0,
    color: "Blue",
    rating: 3.5,
    ratingAmount: 2,
  })
  await nikeShoeBlue.addReview([review1, review3])
  const imageNikeBlue4 = await Image.create({
    url: "https://images.footlocker.com/is/image/EBFL2/M1027400_a2?wid=520&hei=520&fmt=png-alpha",
  })
  const imageNikeBlue = await Image.create({
    url: "https://images.footlocker.com/is/image/EBFL2/M1027400_a4?wid=520&hei=520&fmt=png-alpha",
  })
  const imageNikeBlue2 = await Image.create({
    url: "https://images.footlocker.com/is/image/EBFL2/M1027400_a3?wid=520&hei=520&fmt=png-alpha",
  })
  const imageNikeBlue3 = await Image.create({
    url: "https://images.footlocker.com/is/image/EBFL2/M1027400_a1?wid=520&hei=520&fmt=png-alpha",
  })
  nikeShoeBlue.addImage(imageNikeBlue)
  nikeShoeBlue.addImage(imageNikeBlue2)
  nikeShoeBlue.addImage(imageNikeBlue3)
  nikeShoeBlue.addImage(imageNikeBlue4)

  /////////////////////////////////////////////////////////////////77

  const nikeZoomXVaporfly = await Product.create({
    model: "ZoomX Vaporfly",
    brand: "Nike",
    category: "Running",
    gender: "Female",
    price: 163,
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    sale: 0,
    color: "Pink",
    rating: 4,
    ratingAmount: 1,
  })
  nikeZoomXVaporfly.addReview(review3)
  const imagenikeZoomXVaporfly4 = await Image.create({
    url: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/nwtrnwbxlqzqkdwfbsbd/calzado-de-carrera-para-carretera-zoomx-vaporfly-next-Sf9zRb.png",
  })
  const imagenikeZoomXVaporfly = await Image.create({
    url: "https://www.loberen.dk/sites/default/files/ao4568-600-phsrh001-750.png",
  })
  const imagenikeZoomXVaporfly3 = await Image.create({
    url: "https://www.zapatillasysneakers.com/sites/default/files/static/images/nike_zoomx_vaporfly_next6.png",
  })
  const imagenikeZoomXVaporfly2 = await Image.create({
    url: "https://www.zapatillasysneakers.com/sites/default/files/static/images/nike_zoomx_vaporfly_next5.png",
  })

  nikeZoomXVaporfly.addImages([
    imagenikeZoomXVaporfly,
    imagenikeZoomXVaporfly2,
    imagenikeZoomXVaporfly3,
    imagenikeZoomXVaporfly4,
  ])
  const stockNikeZoomXVaporfly10 = await Stock.create({ size: 10, amount: 20 })
  const stockNikeZoomXVaporfly11 = await Stock.create({ size: 11, amount: 21 })
  const stockNikeZoomXVaporfly12 = await Stock.create({ size: 12, amount: 22 })
  nikeZoomXVaporfly.addStock([
    stockNikeZoomXVaporfly10,
    stockNikeZoomXVaporfly11,
    stockNikeZoomXVaporfly12,
  ])
  const cartRodolfo1 = await ShoppingCartItem.create({
    amount: 5,
    size: 10,
    ordered: true,
  })
  cartRodolfo1.setProduct(NikeKyrieInfinityPurple) // 200 * 5
  const cartRodolfo2 = await ShoppingCartItem.create({
    amount: 1,
    size: 11,
    ordered: true,
  })
  cartRodolfo2.setProduct(NikeKyrieInfinityPurple) // 200
  const cartRodolfo3 = await ShoppingCartItem.create({
    amount: 2,
    size: 11,
    ordered: true,
  })
  cartRodolfo3.setProduct(NikeKyrieInfinityBeige) // 200
  const cartRodolfo4 = await ShoppingCartItem.create({
    amount: 5,
    size: 12,
    ordered: true,
  })
  cartRodolfo4.setProduct(nikeZoomXVaporfly) // 163 * 5
  const cartRodolfo5 = await ShoppingCartItem.create({
    amount: 3,
    size: 11,
    ordered: true,
  })
  cartRodolfo5.setProduct(NikeDownshifterBlack) // 145 * 3
  const cartRodolfo6 = await ShoppingCartItem.create({
    amount: 1,
    size: 10,
    ordered: true,
  })
  cartRodolfo6.setProduct(converseChuckTaylorBlack) // 139
  Rodolfo.addShoppingCartItems([
    cartRodolfo1,
    cartRodolfo2,
    cartRodolfo3,
    cartRodolfo4,
    cartRodolfo5,
    cartRodolfo6,
  ])
  const cartAdmin = await ShoppingCartItem.create({
    amount: 1,
    size: 12,
    ordered: true,
  })
  cartAdmin.setProduct(NikeKyrieInfinityBeige)
  admin.addShoppingCartItem(cartAdmin)
  const orderRodolfo1 = await Order.create({
    delivered: "undelivered",
    name: "Rodolfo",
    surname: "Rodriguez",
    country: "Colombia",
    city: "Bogota",
    postalCode: 11011,
    address: "AvenidaSiempreViva 123",
    floor: 2,
    apartment: "B",
    notes: "My brother pick up the order",
    telephoneNumber: 12345678,
    total: 1400,
  })
  const paymentRodolfo1 = await Payment.create({
    status: "succeeded",
    paymentId: "123asdas123",
    cardBrand: "visa",
    funding: "credit",
    last4: 1234,
  })
  await orderRodolfo1.addShoppingCartItems([
    cartRodolfo1,
    cartRodolfo2,
    cartRodolfo3,
  ])
  await orderRodolfo1.setUser(Rodolfo)
  await orderRodolfo1.setPayment(paymentRodolfo1)
  const orderRodolfo2 = await Order.create({
    delivered: "delivered",
    address: "Argentina 123",
    name: "Rodolfo",
    surname: "Rodriguez",
    country: "Colombia",
    city: "Bogota",
    postalCode: 11011,
    address: "AvenidaSiempreViva 123",
    floor: 2,
    apartment: "B",
    notes: "My brother pick up the order",
    telephoneNumber: 1283214,
    total: 815,
  })
  const paymentRodolfo2 = await Payment.create({
    status: "succeeded",
    paymentId: "123asdas123asdasdas32131",
    cardBrand: "mastercard",
    funding: "debit",
    last4: 1234,
  })
  await orderRodolfo2.addShoppingCartItem(cartRodolfo4)
  await orderRodolfo2.setUser(Rodolfo)
  await orderRodolfo2.setPayment(paymentRodolfo2)
  const orderAdmin = await Order.create({
    delivered: "completed",
    address: "Colombia 123",
    name: "Admin",
    surname: "Baes",
    country: "United States",
    city: "Washington DC",
    postalCode: 20001,
    address: "AvenidaSiempreViva 123",
    telephoneNumber: 123678,
    total: 200,
    createdAt: "2021-04-21 19:52:24.029-03",
  })
  const paymentAdmin = await Payment.create({
    status: "succeeded",
    paymentId: "1dsñlfjadslñfjdsalñfds123",
    cardBrand: "visa",
    funding: "debit",
    last4: 1234,
  })
  await orderAdmin.addShoppingCartItem(cartAdmin)
  await orderAdmin.setUser(admin)
  await orderAdmin.setPayment(paymentAdmin)
}

conn.sync({ force: false }).then(async () => {
  // await prueba()
  server.listen(process.env.PORT || 3001, () => {
    console.log("%s listening at 3001")
  })
})
