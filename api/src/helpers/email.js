const nodemailer = require("nodemailer")

module.exports = {
  emailOrder: async ({ email, id }) => {
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
      to: email,
      subject: "Henry shoes",
      text: "Hello, thanks for your purchase. We hope you enjoy it",
      html: `  <p>Your order is ${id}</p>`,
    })
  },
}
