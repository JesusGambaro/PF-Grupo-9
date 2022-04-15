const server = require("./src/app.js");
const {conn} = require("./src/db.js");
const {Product, Image} = require("./src/db.js");

// Syncing all the models at once.
conn.sync({force: true}).then(async () => {
  const nikeShoe = await Product.create({
    model: "Air",
    brand: "Nike",
    category: "Urban",
    gender: "Male",
    price: 15000,
    description: "Nice shoe",
    sale: 0,
    size: 10,
    amount: 23,
    color: "White",
  });
  const imageNike = await Image.create({
    url: "https://5.imimg.com/data5/RE/US/MY-49405442/594997-500x500.jpg",
  });
  nikeShoe.addImage(imageNike);

  const nikeShoeSize7 = await Product.create({
    model: "Air",
    brand: "Nike",
    category: "Urban",
    gender: "Male",
    price: 15000,
    description: "Nice shoe",
    sale: 0,
    size: 7,
    amount: 15,
    color: "White",
  });
  const imageNikeSize7 = await Image.create({
    url: "https://5.imimg.com/data5/RE/US/MY-49405442/594997-500x500.jpg",
  });
  nikeShoeSize7.addImage(imageNikeSize7);

  const nikeShoeBlack = await Product.create({
    model: "Air",
    brand: "Nike",
    category: "Urban",
    gender: "Male",
    price: 15000,
    description: "Nice shoe",
    sale: 0,
    size: 10,
    amount: 12,
    color: "Black",
  });
  const imageNikeBlack = await Image.create({
    url: "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dwfb2d9764/products/NI_314193-009/NI_314193-009-1.JPG",
  });
  nikeShoeBlack.addImage(imageNikeBlack);

  const adidasShoeBlack = await Product.create({
    model: "Predator",
    brand: "Adidas",
    category: "Football",
    gender: "Male",
    price: 25000,
    description: "Adidas shoe football",
    sale: 10,
    size: 10,
    amount: 42,
    color: "Black",
  });
  const imageAdidasBlack = await Image.create({
    url: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/70ae150b4f51490d8d87ab2001505c1f_9366/Botines_de_futbol_Predator_20.3_cesped_natural_seco_Negro_EF1929_01_standard.jpg",
  });
  adidasShoeBlack.addImage(imageAdidasBlack);

  server.listen(3001, () => {
    console.log("%s listening at 3001");
  });
});
