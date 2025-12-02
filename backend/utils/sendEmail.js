const nodemailer = require("nodemailer");

const dotenv = require("dotenv");

// make sure env is loaded HERE also
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});

const sendOrderEmail = async ({ to, subject, text }) => {
  const from = process.env.USER_EMAIL;

  await transporter.sendMail({
    from,
    to,
    subject,
    text,
  });
};

module.exports = sendOrderEmail;
