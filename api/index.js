const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const {Product, Image} = require("./src/db.js")

// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {

     const nikeShoe = await Product.create({model: "Air", brand: "Nike", category: "Urban", gender: "Male", 
          price: 15000, description: "Nice shoe", sale: 0, size: 10, amount: 23, color: "White"});
     const imageNike = await Image.create({url:"https://5.imimg.com/data5/RE/US/MY-49405442/594997-500x500.jpg"});
     nikeShoe.addImage(imageNike);

     const nikeShoeSize7 = await Product.create({model: "Air", brand: "Nike", category: "Urban", gender: "Male", 
          price: 15000, description: "Nice shoe", sale: 0, size: 7, amount: 23, color: "White"});
     const imageNikeSize7 = await Image.create({url:"https://5.imimg.com/data5/RE/US/MY-49405442/594997-500x500.jpg"});
     nikeShoeSize7.addImage(imageNikeSize7);

     const nikeShoeBlack = await Product.create({model: "Air", brand: "Nike", category: "Urban", gender: "Male", 
          price: 15000, description: "Nice shoe", sale: 0, size: 10, amount: 23, color: "Black"});
     const imageNikeBlack = await Image.create({url:"https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dwfb2d9764/products/NI_314193-009/NI_314193-009-1.JPG"});
     nikeShoeBlack.addImage(imageNikeBlack);

     server.listen(3001, () => {
          console.log('%s listening at 3001');
     });
});