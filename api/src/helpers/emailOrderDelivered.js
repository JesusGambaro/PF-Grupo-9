const nodemailer = require("nodemailer")

module.exports = {
  emailOrderDelivered: async (order) => {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.KEY,
      },
      from: process.env.EMAIL,
    })
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: order.user.email,
      subject: `Henry Shoes - Your order has been delivered.`,
      text: `Hello: ${order.user.userName}Your order has been delivered.`,
      html: `  <h1>Hello ${order.user.userName}:</h1>
               <h2>Your order has been delivered</h2>
               ${order.shoppingCartItems.map(item => {
                    return `<p>Model: ${item.product.model}</p>
                    <p>Size: ${item.size}</p>
                    <p>Amount: ${item.amount}</p>
                    <p>Price: ${item.product.finalPrice}</p>
                    <p>Total: ${(item.product.finalPrice*item.amount)}</p>`
               })}

               <h2>Final Total: ${order.total}</h2>
               `
    })
  }
}
