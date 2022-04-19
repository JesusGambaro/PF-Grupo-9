const { Sequelize } = require("sequelize");
const { Product, Image, Stock, ShoppingCartItem } = require("../db.js");

module.exports = {
     getCart: async (req, res) => {
          const {userId} = req.body;
          try{
               const cart = await ShoppingCartItem.findAll({
                    where: {
                         userId
                    }
               })
               res.send(cart)
          }catch(error){
               console.log(error);
          }
     },

     deleteCart: async (req,res) => {
          const {productId, userId} = req.body;
          try{
               await ShoppingCartItem.destroy({
                    where: {productId, userId}
               })
               res.send({msg: 'Product removed'});
          }catch(error){
               console.log(error);
          }
     },

     putCart: async (req,res) => {
          const {productId, userId, amount} = req.body;
          try {
               const product = await ShoppingCartItem.findOne({
                    where: {productId, userId}
               });
               product.amount = amount;
               product.save();
               res.send({msg: 'Product modified'})
          } catch (error) {
               console.log(error);
          }
     },

     postCart: async (req,res) => {
          const {productId, userId, amount} = req.body;
          try {
               const product = await ShoppingCartItem.findOrCreate({
                    where: {productId, userId}
               })
               product.amount = amount;
               product.save();
               res.send({msg: 'Product modified'})
          } catch (error) {
               console.log(error)
          }
     }
}