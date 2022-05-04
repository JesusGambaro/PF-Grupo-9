const nodemailer = require("nodemailer")

module.exports = {
  emailForgotPassword: async ({ email, token }) => {
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
      text: "Hello: You have requested to reset your password.",
      html: `  <p>Follow the next link to generate your new password:
               <a rel="noopener noreferrer" target="_blank" href="http://localhost:3000/home/forgotPassword/${token}">http://localhost:3000/home/forgotPassword/${token}</a></p>
               <p>If you didn't request this, ignore this message</p>`,
    })
  },
}
