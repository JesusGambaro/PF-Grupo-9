const server = require("./src/app.js")
const { conn } = require("./src/db.js")
const { Stock, Product, Image } = require("./src/db.js")

conn.sync({ force: true }).then(async () => {
  const NikeAirZoomAlphafly = await Product.create({
    model: "Air Zoom Alphafly",
    brand: "Nike",
    category: "Running",
    gender: "Male",
    price: 28000,
    description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    sale: 10,
    color: "Orange",
  })
  const imageNikeAirZoomAlphafly = await Image.create({
    url: "https://static.nike.com/a/images/t_default/40c3c2d4-7449-43dc-9b44-e3ad58181da8/calzado-de-carrera-en-carretera-air-zoom-alphafly-next-flyknit-ekiden-fNntgL.png",
  })
  const imageNikeAirZoomAlphafly2 = await Image.create({
    url: "https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/w_467,c_limit/bb1e9189-e599-4edf-a1f3-47a3dc7a3305/colleci%C3%B3n-hakone-ekiden.png",
  })
  const imageNikeAirZoomAlphafly3 = await Image.create({
    url: "https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/w_467,c_limit/30566e88-8c14-4b88-9014-a2a0315b0ed8/colleci%C3%B3n-hakone-ekiden.png",
  })
  const imageNikeAirZoomAlphafly4 = await Image.create({
    url: "https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/w_467,c_limit/1ddeb3c4-61aa-471f-8cc8-7e94e4f087cd/colleci%C3%B3n-hakone-ekiden.png",
  })

  NikeAirZoomAlphafly.addImages([imageNikeAirZoomAlphafly, imageNikeAirZoomAlphafly2, imageNikeAirZoomAlphafly3, imageNikeAirZoomAlphafly4])
  const stockNike10 = await Stock.create({ size: 10, amount: 20 })
  const stockNike11 = await Stock.create({ size: 11, amount: 21 })
  const stockNike13 = await Stock.create({ size: 12, amount: 22 })
  NikeAirZoomAlphafly.addStock([stockNike10, stockNike11, stockNike13])


  ///////////////////////

  const NikeAirZoomAlphaflyG = await Product.create({
    model: "Air Zoom Alphafly",
    brand: "Nike",
    category: "Running",
    gender: "Male",
    price: 28000,
    description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    sale: 10,
    color: "Green",
  })
  const imageNikeAirZoomAlphaflyG = await Image.create({
    url: "https://www.retrojordan2021.com/wp-content/uploads/2021/04/discount-nike-air-zoom-alphafly-next-volt-racer-blue-multi-color-black-dc5238-702-2.png",
  })
  const imageNikeAirZoomAlphaflyG2 = await Image.create({
    url: "https://www.retrojordan2021.com/wp-content/uploads/2021/04/discount-nike-air-zoom-alphafly-next-volt-racer-blue-multi-color-black-dc5238-702-1.png",
  })
  const imageNikeAirZoomAlphaflyG3 = await Image.create({
    url: "https://www.retrojordan2021.com/wp-content/uploads/2021/04/discount-nike-air-zoom-alphafly-next-volt-racer-blue-multi-color-black-dc5238-702-3.png",
  })
  const imageNikeAirZoomAlphaflyG4 = await Image.create({
    url: "https://www.retrojordan2021.com/wp-content/uploads/2021/04/discount-nike-air-zoom-alphafly-next-volt-racer-blue-multi-color-black-dc5238-702-1.png",
  })

  NikeAirZoomAlphaflyG.addImages([imageNikeAirZoomAlphaflyG, imageNikeAirZoomAlphaflyG2, imageNikeAirZoomAlphaflyG3, imageNikeAirZoomAlphaflyG4])
  const stockNike14 = await Stock.create({ size: 14, amount: 24 })
  const stockNike15 = await Stock.create({ size: 15, amount: 25 })
  const stockNike16 = await Stock.create({ size: 16, amount: 26 })
  NikeAirZoomAlphaflyG.addStock([stockNike14, stockNike15, stockNike16])


  //////////////////////////////////////////////

  const adidasSuperstar = await Product.create({
    model: "Superstar",
    brand: "Adidas",
    category: "Urban",
    gender: "Female",
    price: 18000,
    description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    sale: 15,
    color: "White",
  })
  const imageadidasSuperstar = await Image.create({
    url: "https://www.seekpng.com/png/detail/5-51320_adidas-shoes-png-transparent-images-adidas-superstar-onix.png",
  })
  const imageadidasSuperstar2 = await Image.create({
    url: "https://www.pngkey.com/png/detail/207-2071589_adidas-logo-tumblr-png-adidas-superstar-ice-sneaker.png",
  })
  const imageadidasSuperstar3 = await Image.create({
    url: "https://p.kindpng.com/picc/s/42-426902_adidas-kids-superstar-grade-school-casual-shoe-transparent.png",
  })
  const imageadidasSuperstar4 = await Image.create({
    url: "https://p.kindpng.com/picc/s/619-6191561_tnis-adidas-feminino-superstar-hd-png-download.png",
  })

  adidasSuperstar.addImages([imageadidasSuperstar, imageadidasSuperstar2, imageadidasSuperstar3, imageadidasSuperstar4])
  const stockAdidasSuperstar10 = await Stock.create({ size: 10, amount: 20 })
  const stockAdidasSuperstar11 = await Stock.create({ size: 11, amount: 21 })
  const stockAdidasSuperstar12 = await Stock.create({ size: 12, amount: 22 })
  adidasSuperstar.addStock([stockAdidasSuperstar10, stockAdidasSuperstar11, stockAdidasSuperstar12])


  ////////////////////////////////////////////////


  const nikeZoomXVaporfly = await Product.create({
    model: "ZoomX Vaporfly",
    brand: "Nike",
    category: "Running",
    gender: "Female",
    price: 45000,
    description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    sale: 10,
    color: "Pink",
  })
  const imagenikeZoomXVaporfly = await Image.create({
    url: "https://www.loberen.dk/sites/default/files/ao4568-600-phsrh001-750.png",
  })
  const imagenikeZoomXVaporfly2 = await Image.create({
    url: "https://www.zapatillasysneakers.com/sites/default/files/static/images/nike_zoomx_vaporfly_next5.png",
  })
  const imagenikeZoomXVaporfly3 = await Image.create({
    url: "https://www.zapatillasysneakers.com/sites/default/files/static/images/nike_zoomx_vaporfly_next6.png",
  })
  const imagenikeZoomXVaporfly4 = await Image.create({
    url: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/nwtrnwbxlqzqkdwfbsbd/calzado-de-carrera-para-carretera-zoomx-vaporfly-next-Sf9zRb.png",
  })

  nikeZoomXVaporfly.addImages([imagenikeZoomXVaporfly, imagenikeZoomXVaporfly2, imagenikeZoomXVaporfly3, imagenikeZoomXVaporfly4])
  const stockNikeZoomXVaporfly10 = await Stock.create({ size: 10, amount: 20 })
  const stockNikeZoomXVaporfly11 = await Stock.create({ size: 11, amount: 21 })
  const stockNikeZoomXVaporfly12 = await Stock.create({ size: 12, amount: 22 })
  nikeZoomXVaporfly.addStock([stockNikeZoomXVaporfly10, stockNikeZoomXVaporfly11, stockNikeZoomXVaporfly12])


  ////////////////////////////////////////////////

  const NikeDownshifter  = await Product.create({
    model: "Downshifter",
    brand: "Nike",
    category: "Running",
    gender: "Female",
    price: 33000,
    description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    sale: 10,
    color: "Pink",
  })
  const imageNikeDownshifter = await Image.create({
    url: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/509fba77-8350-4b31-9351-90f876822e35/downshifter-11-road-running-shoes-zxXWW4.png",
  })
  const imageNikeDownshifter2 = await Image.create({
    url: "https://www.retrojordan2021.com/wp-content/uploads/2021/05/nike-downshifter-11-women-sepatu-lari-wanita-2021-for-sale-cw3413-500-2.png",
  })
  const imageNikeDownshifter3 = await Image.create({
    url: "https://www.retrojordan2021.com/wp-content/uploads/2021/05/nike-downshifter-11-women-sepatu-lari-wanita-2021-for-sale-cw3413-500.png",
  })
  const imageNikeDownshifter4 = await Image.create({
    url: "https://www.efootwear.eu/media/catalog/product/cache/image/650x650/0/0/0000208929905_03_fp.jpg",
  })
  NikeDownshifter.addImages([imageNikeDownshifter, imageNikeDownshifter2, imageNikeDownshifter3, imageNikeDownshifter4])
  const stockiNikeDownshifter10 = await Stock.create({ size: 10, amount: 20 })
  const stockiNikeDownshifter11 = await Stock.create({ size: 11, amount: 21 })
  const stockiNikeDownshifter12 = await Stock.create({ size: 12, amount: 22 })
  NikeDownshifter.addStock([stockiNikeDownshifter10, stockiNikeDownshifter11, stockiNikeDownshifter12])
  
  
    ///////////////////////


  const NikeDownshifterBlack  = await Product.create({
    model: "Downshifter",
    brand: "Nike",
    category: "Running",
    gender: "Female",
    price: 33000,
    description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    sale: 0,
    color: "Black",
  })
  const imageNikeDownshifterBlack = await Image.create({
    url: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/d2bf9416-7733-4e0e-a505-97e4f8c262c7/calzado-de-running-para-carretera-downshifter-10-xvvLtx.png",
  })
  const imageNikeDownshifterBlack2 = await Image.create({
    url: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/c47702cf-6b27-4ac3-b68c-3ab33d59f805/calzado-de-running-para-carretera-downshifter-10-xvvLtx.png",
  })
  const imageNikeDownshifterBlack3 = await Image.create({
    url: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/67dd0126-1d99-402c-baa1-6d3231ee4f26/calzado-de-running-para-carretera-downshifter-10-xvvLtx.png",
  })
  const imageNikeDownshifterBlack4 = await Image.create({
    url: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/13fbc390-887a-4d8b-926b-45c5462f86d9/calzado-de-running-para-carretera-downshifter-10-xvvLtx.png",
  })
  NikeDownshifterBlack.addImages([imageNikeDownshifterBlack, imageNikeDownshifterBlack2, imageNikeDownshifterBlack3, imageNikeDownshifterBlack4])
  const stockiNikeDownshifterBlack10 = await Stock.create({ size: 10, amount: 20 })
  const stockiNikeDownshifterBlack11 = await Stock.create({ size: 11, amount: 21 })
  const stockiNikeDownshifterBlack12 = await Stock.create({ size: 12, amount: 22 })
  NikeDownshifterBlack.addStock([stockiNikeDownshifterBlack10, stockiNikeDownshifterBlack11, stockiNikeDownshifterBlack12])
  
  
    ///////////////////////

  const NikeKyrieInfinity  = await Product.create({
    model: "Kyrie Infinity",
    brand: "Nike",
    category: "Urban",
    gender: "Male",
    price: 47000,
    description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    sale: 0,
    color: "Green",
  })
  const imageNikeKyrieInfinity = await Image.create({
    url: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/31894742-692c-45d0-bba6-b034571c23b9/kyrie-infinity-basketball-shoes-LvzsVp.png",
  })
  const imageNikeKyrieInfinity2 = await Image.create({
    url: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/ce351403-5d20-4f84-8d01-ebd61a38c828/kyrie-infinity-basketball-shoes-LvzsVp.png",
  })
  const imageNikeKyrieInfinity3 = await Image.create({
    url: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/1583433a-3f93-461f-803c-92d1c87d47a1/kyrie-infinity-basketball-shoes-LvzsVp.png",
  })
  const imageNikeKyrieInfinity4 = await Image.create({
    url: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/516cded5-91a4-48d8-8e5c-a2a2d31aff0b/kyrie-infinity-basketball-shoes-LvzsVp.png",
  })
  NikeKyrieInfinity.addImages([imageNikeKyrieInfinity, imageNikeKyrieInfinity2, imageNikeKyrieInfinity3, imageNikeKyrieInfinity4])
  const stockNikeKyrieInfinity10 = await Stock.create({ size: 10, amount: 20 })
  const stockNikeKyrieInfinity11 = await Stock.create({ size: 11, amount: 21 })
  const stockNikeKyrieInfinity12 = await Stock.create({ size: 12, amount: 22 })
  NikeKyrieInfinity.addStock([stockNikeKyrieInfinity10, stockNikeKyrieInfinity11, stockNikeKyrieInfinity12])
  
  
    ///////////////////////

  const NikeKyrieInfinityPurple  = await Product.create({
    model: "Kyrie Infinity",
    brand: "Nike",
    category: "Urban",
    gender: "Male",
    price: 47000,
    description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    sale: 10,
    color: "Purple",
  })
  const imageNikeKyrieInfinityPurple = await Image.create({
    url: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/d6f5179b-2c54-47ca-ab43-6a43200cae62/kyrie-infinity-basketball-shoes-LvzsVp.png",
  })
  const imageNikeKyrieInfinityPurple2 = await Image.create({
    url: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/389bc835-458d-4877-8534-66aae2923f8e/kyrie-infinity-basketball-shoes-LvzsVp.png",
  })
  const imageNikeKyrieInfinityPurple3 = await Image.create({
    url: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/fd9e6360-4422-4863-9ad3-20b265b29146/kyrie-infinity-basketball-shoes-LvzsVp.png",
  })
  const imageNikeKyrieInfinityPurple4 = await Image.create({
    url: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/a211de35-26d2-4432-8ea8-dd6d7e550357/kyrie-infinity-basketball-shoes-LvzsVp.png",
  })
  NikeKyrieInfinityPurple.addImages([imageNikeKyrieInfinityPurple, imageNikeKyrieInfinityPurple2, imageNikeKyrieInfinityPurple3, imageNikeKyrieInfinityPurple4])
  const stockNikeKyrieInfinityPurple10 = await Stock.create({ size: 10, amount: 20 })
  const stockNikeKyrieInfinityPurple11 = await Stock.create({ size: 11, amount: 21 })
  const stockNikeKyrieInfinityPurple12 = await Stock.create({ size: 12, amount: 22 })
  NikeKyrieInfinityPurple.addStock([stockNikeKyrieInfinityPurple10, stockNikeKyrieInfinityPurple11, stockNikeKyrieInfinityPurple12])
  
  
    ///////////////////////

  const NikeKyrieInfinityBeige  = await Product.create({
    model: "Kyrie Infinity",
    brand: "Nike",
    category: "Urban",
    gender: "Male",
    price: 47000,
    description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    sale: 0,
    color: "Beige",
  })
  const imageNikeKyrieInfinityBeige = await Image.create({
    url: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/66e00d01-9ba4-4676-8e8f-6f11e977a8a2/kyrie-infinity-n7-basketball-shoes-LvzsVp.png",
  })
  const imageNikeKyrieInfinityBeige2 = await Image.create({
    url: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/6dc84506-5e9d-4f2d-a9da-d2478885dec2/kyrie-infinity-n7-basketball-shoes-LvzsVp.png",
  })
  const imageNikeKyrieInfinityBeige3 = await Image.create({
    url: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/d76ff230-2d2a-4504-ab7f-ddb4ba357b85/kyrie-infinity-n7-basketball-shoes-LvzsVp.png",
  })
  const imageNikeKyrieInfinityBeige4 = await Image.create({
    url: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/6989f9c1-174e-4fa9-a459-6580d58050aa/kyrie-infinity-n7-basketball-shoes-LvzsVp.png",
  })
  NikeKyrieInfinityBeige.addImages([imageNikeKyrieInfinityBeige, imageNikeKyrieInfinityBeige2, imageNikeKyrieInfinityBeige3, imageNikeKyrieInfinityBeige4])
  const stockNikeKyrieInfinityBeige10 = await Stock.create({ size: 10, amount: 20 })
  const stockNikeKyrieInfinityBeige11 = await Stock.create({ size: 11, amount: 21 })
  const stockNikeKyrieInfinityBeige12 = await Stock.create({ size: 12, amount: 22 })
  NikeKyrieInfinityBeige.addStock([stockNikeKyrieInfinityBeige10, stockNikeKyrieInfinityBeige11, stockNikeKyrieInfinityBeige12])
  
  
    ///////////////////////

  const NikeZoomXInvincible  = await Product.create({
    model: "ZoomX Invincible Run Flyknit",
    brand: "Nike",
    category: "Running",
    gender: "Female",
    price: 53000,
    description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    sale: 0,
    color: "White",
  })
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
  NikeZoomXInvincible.addImages([imageNikeZoomXInvincible, imageNikeZoomXInvincible2, imageNikeZoomXInvincible3, imageNikeZoomXInvincible4])
  const stockNikeZoomXInvincible10 = await Stock.create({ size: 10, amount: 20 })
  const stockNikeZoomXInvincible11 = await Stock.create({ size: 11, amount: 21 })
  const stockNikeZoomXInvincible12 = await Stock.create({ size: 12, amount: 22 })
  NikeZoomXInvincible.addStock([stockNikeZoomXInvincible10, stockNikeZoomXInvincible11, stockNikeZoomXInvincible12])
  
  
    ///////////////////////

      const NikeZoomXInvinciblePink  = await Product.create({
    model: "ZoomX Invincible Run Flyknit",
    brand: "Nike",
    category: "Running",
    gender: "Female",
    price: 53000,
    description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    sale: 0,
    color: "Pink",
  })
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
  NikeZoomXInvinciblePink.addImages([imageNikeZoomXInvinciblePink, imageNikeZoomXInvinciblePink2, imageNikeZoomXInvinciblePink3, imageNikeZoomXInvinciblePink3])
  const stockNikeZoomXInvinciblePink10 = await Stock.create({ size: 10, amount: 20 })
  const stockNikeZoomXInvinciblePink11 = await Stock.create({ size: 11, amount: 21 })
  const stockNikeZoomXInvinciblePink12 = await Stock.create({ size: 12, amount: 22 })
  NikeZoomXInvinciblePink.addStock([stockNikeZoomXInvinciblePink10, stockNikeZoomXInvinciblePink11, stockNikeZoomXInvinciblePink12])
  
  
    ///////////////////////


  const NikeZoomXInvincibleBlack  = await Product.create({
    model: "ZoomX Invincible Run Flyknit",
    brand: "Nike",
    category: "Running",
    gender: "Female",
    price: 53000,
    description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    sale: 0,
    color: "Black",
  })
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
  NikeZoomXInvincibleBlack.addImages([imageNikeZoomXInvincibleBlack, imageNikeZoomXInvincibleBlack2, imageNikeZoomXInvincibleBlack3, imageNikeZoomXInvincibleBlack4])
  const stockNikeZoomXInvincibleBlack10 = await Stock.create({ size: 10, amount: 20 })
  const stockNikeZoomXInvincibleBlack11 = await Stock.create({ size: 11, amount: 21 })
  const stockNikeZoomXInvincibleBlack12 = await Stock.create({ size: 12, amount: 22 })
  NikeZoomXInvincibleBlack.addStock([stockNikeZoomXInvincibleBlack10, stockNikeZoomXInvincibleBlack11, stockNikeZoomXInvincibleBlack12])
  
  
    ///////////////////////

  const NikeLegendEssential  = await Product.create({
    model: "Legend Essential",
    brand: "Nike",
    category: "Running",
    gender: "Female",
    price: 40000,
    description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    sale: 0,
    color: "Black",
  })
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
  NikeLegendEssential.addImages([imageNikeLegendEssential, imageNikeLegendEssential2, imageNikeLegendEssential3, imageNikeLegendEssential4])
  const stockNikeLegendEssential10 = await Stock.create({ size: 10, amount: 20 })
  const stockNikeLegendEssential11 = await Stock.create({ size: 11, amount: 21 })
  const stockNikeLegendEssential12 = await Stock.create({ size: 12, amount: 22 })
  NikeLegendEssential.addStock([stockNikeLegendEssential10, stockNikeLegendEssential11, stockNikeLegendEssential12])
  
  
    ///////////////////////

  const NikeLegendEssentialPink  = await Product.create({
    model: "Legend Essential",
    brand: "Nike",
    category: "Running",
    gender: "Female",
    price: 40000,
    description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    sale: 0,
    color: "Pink",
  })
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
  NikeLegendEssentialPink.addImages([imageNikeLegendEssentialPink, imageNikeLegendEssentialPink2, imageNikeLegendEssentialPink3, imageNikeLegendEssentialPink4])
  const stockNikeLegendEssentialPink10 = await Stock.create({ size: 10, amount: 20 })
  const stockNikeLegendEssentialPink11 = await Stock.create({ size: 11, amount: 21 })
  const stockNikeLegendEssentialPink12 = await Stock.create({ size: 12, amount: 22 })
  NikeLegendEssentialPink.addStock([stockNikeLegendEssentialPink10, stockNikeLegendEssentialPink11, stockNikeLegendEssentialPink12])
  
  
    ///////////////////////

  const NikeReactInfinity  = await Product.create({
    model: "React Infinity",
    brand: "Nike",
    category: "Running",
    gender: "Male",
    price: 48000,
    description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    sale: 0,
    color: "White",
  })
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
  NikeReactInfinity.addImages([imageNikeReactInfinity, imageNikeReactInfinity2, imageNikeReactInfinity3, imageNikeReactInfinity4])
  const stockNikeReactInfinity10 = await Stock.create({ size: 10, amount: 20 })
  const stockNikeReactInfinity11 = await Stock.create({ size: 11, amount: 21 })
  const stockNikeReactInfinity12 = await Stock.create({ size: 12, amount: 22 })
  NikeReactInfinity.addStock([stockNikeReactInfinity10, stockNikeReactInfinity11, stockNikeReactInfinity12])
  
  
    ///////////////////////

  const NikeLegendEssentialGray  = await Product.create({
    model: "Legend Essential",
    brand: "Nike",
    category: "Running",
    gender: "Female",
    price: 40000,
    description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    sale: 0,
    color: "Gray",
  })
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
  NikeLegendEssentialGray.addImages([imageNikeLegendEssentialGray, imageNikeLegendEssentialGray2, imageNikeLegendEssentialGray3, imageNikeLegendEssentialGray4])
  const stockNikeLegendEssentialGray10 = await Stock.create({ size: 10, amount: 20 })
  const stockNikeLegendEssentialGray11 = await Stock.create({ size: 11, amount: 21 })
  const stockNikeLegendEssentialGray12 = await Stock.create({ size: 12, amount: 22 })
  NikeLegendEssentialGray.addStock([stockNikeLegendEssentialGray10, stockNikeLegendEssentialGray11, stockNikeLegendEssentialGray12])
  
  
    ///////////////////////

  const converseChuckTaylor = await Product.create({
    model: "Chuck Taylor",
    brand: "Converse",
    category: "Urban",
    gender: "Unisex",
    price: 12000,
    description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    sale: 0,
    color: "White",
  })
  const imagenConverseChuckTaylor = await Image.create({
    url: "https://www.clara.es/medio/2018/10/23/converse-blancas_abd30912_800x577.png",
  })
  const imagenConverseChuckTaylor2 = await Image.create({
    url: "https://i.dlpng.com/static/png/6920936_preview.png",
  })
  const imagenConverseChuckTaylor3 = await Image.create({
    url: "https://png.pngitem.com/pimgs/s/47-478423_converse-hd-png-download.png",
  })
  const imagenConverseChuckTaylor4 = await Image.create({
    url: "https://png.pngitem.com/pimgs/s/47-477825_white-leather-converse-low-cut-hd-png-download.png",
  })

  converseChuckTaylor.addImages([imagenConverseChuckTaylor, imagenConverseChuckTaylor2, imagenConverseChuckTaylor3, imagenConverseChuckTaylor4])
  const stockConverseChuckTaylor10 = await Stock.create({ size: 10, amount: 20 })
  const stockConverseChuckTaylor11 = await Stock.create({ size: 11, amount: 21 })
  const stockConverseChuckTaylor12 = await Stock.create({ size: 12, amount: 22 })
  converseChuckTaylor.addStock([stockConverseChuckTaylor10, stockConverseChuckTaylor11, stockConverseChuckTaylor12])


  ////////////////////////////////////////////////


  const converseChuckTaylorBlack = await Product.create({
    model: "Chuck Taylor",
    brand: "Converse",
    category: "Urban",
    gender: "Unisex",
    price: 12000,
    description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    sale: 0,
    color: "Black",
  })
  const imagenconverseChuckTaylorBlack = await Image.create({
    url: "https://www.pngitem.com/pimgs/m/384-3848233_converse-all-star-hd-png-download.png",
  })
  const imagenconverseChuckTaylorBlack2 = await Image.create({
    url: "https://www.pngitem.com/pimgs/m/158-1589536_hd-pair-of-converse-shoes-transparent-png-image.png",
  })
  const imagenconverseChuckTaylorBlack3 = await Image.create({
    url: "https://www.pngitem.com/pimgs/m/485-4853948_converse-star-chevron-logo-png-download-transparent-converse.png",
  })
  const imagenconverseChuckTaylorBlack4 = await Image.create({
    url: "https://www.lavanguardia.com/files/content_image_mobile_filter/uploads/2021/05/03/608fbef3d9dc3.png",
  })

  converseChuckTaylorBlack.addImages([imagenconverseChuckTaylorBlack, imagenconverseChuckTaylorBlack2, imagenconverseChuckTaylorBlack3, imagenconverseChuckTaylorBlack4])
  const stockConverseChuckTaylorBlack10 = await Stock.create({ size: 10, amount: 20 })
  const stockConverseChuckTaylorBlack11 = await Stock.create({ size: 11, amount: 21 })
  const stockConverseChuckTaylorBlack12 = await Stock.create({ size: 12, amount: 22 })
  converseChuckTaylorBlack.addStock([stockConverseChuckTaylorBlack10, stockConverseChuckTaylorBlack11, stockConverseChuckTaylorBlack12])


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
    gender: "Kids",
    price: 15000,
    description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
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
    gender: "Unisex",
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