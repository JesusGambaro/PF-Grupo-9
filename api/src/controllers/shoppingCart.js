const { Sequelize } = require("sequelize");
const { Product, Image, Stock,Cart } = require("../db.js");

module.exports = {
     getCart: async (req, res) => {
          const {id} = req.body;
          try{
               const cart = await Cart.findAll({
                    where: {
                         id_client: id
                    }
               })
               res.send(cart)
          }catch(error){
               console.log(error);
          }
     },

     deleteCart: async (req,res) => {
          const {id_product, id_client} = req.body;
          try{
               await Cart.destroy({
                    where: {id_product, id_client}
               })
               res.send({msg: 'Product removed'})
          }catch(error){
               console.log(error);
          }
     },

     putCart: async (req,res) => {
          const {id_product, id_client, amount} = req.body;
          try {
               const product = await Cart.findOne({
                    where: {id_product, id_client}
               });
               product.amount = amount;
               product.save();
               res.send({msg: 'Product modified'})
          } catch (error) {
               console.log(error);
          }
     },

     postCart: async (req,res) => {
          const {id_product, id_client, amount} = req.body;
          try {
               const product = await Cart.findOrCreate({
                    where: {id_product, id_client}
               })
               product.amount = amount;
               product.save();
               res.send({msg: 'Product modified'})
          } catch (error) {
               console.log(error)
          }
     }
}