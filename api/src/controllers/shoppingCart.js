
const { Product, User, ShoppingCartItem } = require("../db.js")

module.exports = {
     getCart: async (req, res) => {
          const {userId} = req.body;
          try{
               const sameUserCartItems = await ShoppingCartItem.findAll({
                    where: {
                         userId
                    }
               })
               res.send(sameUserCartItems)
          }catch(error){
               console.log(error);
          }
     },

     deleteCart: async (req,res) => {
          const { productId, userId, amount, size } = req.body;
          try{
               await ShoppingCartItem.destroy({
                    where: {productId, userId, size}
               })
               res.send({msg: 'Product removed'});
          }catch(error){
               console.log(error);
          }
     },

     putCart: async (req,res) => {
          const { productId, userId, amount, size } = req.body;
          try {
               const product = await ShoppingCartItem.findOne({
                    where: {productId, userId, size}
               });
               product.amount = amount;
               product.save();
               res.send({msg: 'Product modified'})
          } catch (error) {
               console.log(error);
          }
     },

     postCart: async (req,res) => {
          const {productId, userId, size} = req.body;
          try {
               const cartItem = await ShoppingCartItem.findOrCreate({
                    where: {productId, userId, size}
               })
               cartItem.amount = 1;
               await cartItem.save();

               const product = await Product.findOne({
                    where: {id: productId}
               })
               await cartItem.addProduct(product)

               const user = await User.findOne({
                    where: {id: userId}
               })
               await cartItem.addUser(user)

               res.send({msg: 'Cart Item created'})
          } catch (error) {
               console.log(error)
          }
     }
}