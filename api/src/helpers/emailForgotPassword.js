const nodemailer = require("nodemailer")

module.exports = {
  emailForgotPassword: async (data) => {
    const transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "e9bb53180a3ed0",
        pass: "68ee72f350a8fc",
      },
    })

    const { email, name, token } = data

    const info = await transporter.sendMail({
      from: "HenryPF - E-commerce",
      to: email,
      subject: "Reset password",
      text: "Reset your password",
      html: `<p>Hello: ${name}, You have requested to reset your password.</p>
               <p>Follow the next Link to generate your new password:
               <a href="http://localhost:3000/user/forgot-password/${token}">Reset</a></p>
               
               <p>If you didn't request this, ignore this message</p>`,
    })

    console.log("Message sent: %s", info.messageId)
  },
}
