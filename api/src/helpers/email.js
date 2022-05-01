const nodemailer = require("nodemailer")

module.exports = {
  emailOrder: async ({ owner, orderCreated, id, allShoppingCarts }) => {
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
      to: owner.email,
      subject: "Henry Shoes - Thanks for your purchase",
      text: `Hello ${owner.userName}, thanks for your purchase.`,
      html: `<h1>Hello ${owner.userName}</h1>
      <p>Thanks for your purchase.</p>
      <p>Your order id is ${id}</p>

      <h2>Order Info:</h2>
      <p>Your order will be delivered in: ${orderCreated.address} Floor: ${orderCreated.floor} Apartment: ${orderCreated.apartment} ${orderCreated.country} ${orderCreated.city} ${orderCreated.postalCode}</p>
      <p>Deliver Notes: ${orderCreated.notes}</p>
      <p>Phone number: ${orderCreated.telephoneNumber}</p>
      <p>Date: ${new Intl.DateTimeFormat('en-US', {dateStyle: 'long'}).format(orderCreated.createdAt)}</p>

      ${allShoppingCarts.map(item => {
        return `<h3>Model: ${item.product.model}</h3>
        <p>Size: ${item.size}</p>
        <p>Amount: ${item.amount}</p>
        <p>Price: ${item.product.finalPrice}</p>
        <p>Total: ${(item.product.finalPrice*item.amount)}</p>
        `
      })}

        <h2>Final Total: ${orderCreated.total}</h2>
      `,
    })
  },
}
