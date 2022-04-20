const { Order } = require('../db.js');

module.exports = {
     getOrders: async () => {
          const {order} = req.query;
          try {
               if(order){
                    const orderSearched = await Order.findOne({
                         where: {
                              id: order
                         }
                    })
                    res.send(orderSearched);
               }else{
                    const allOrders = await Order.findAll()
                    res.send(allOrders)
               }
          } catch (error) {
               console.log(error);
          }
     },

     postOrder: async () => {
          try {
               await Order.create(req.body);
               res.send({msg: 'Order created'})
          } catch (error) {
               console.log(error)
          }
     },

     putOrder: async () => {
          const { id } = req.params;
          try {
               const order = Order.findOne({
                    where: {
                         id
                    }
               })
               order.delivered = req.body.delivered;
               order.save();
               res.send({msg: 'Order updated'})
          }catch(error){
               console.log(error)
          }
     },

     deleteOrder: async () => {
          const { id } = req.params;
          try{
               Order.destroy({
                    where: {id}
               })
               res.send({msg: 'Order deleted'})
          }catch(error){
               console.log(error)
          }
     },

     getLastSevenDaysOrders: async (req, res) => {
          try {
            const lastOrders = await Order.findAll({
              where: {
                createdAt: {
                  [Op.gte]: moment().subtract(7, 'days').toDate()
                }
              }
            })
            res.send(lastOrders)
          } catch (error) {
            console.log(error);
          }
        },
}