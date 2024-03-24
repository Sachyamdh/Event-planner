const mailer = require("nodemailer");
const { google } = require("googleapis");
const tryCatch = require("../utils/tryCatch");
const dotenv = require("dotenv");
dotenv.config({
  path: "/home/saxyamdh/Desktop/Projects/event-planner/Event-planner/config.env",
});
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

console.log(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
);

async function sendMail(userEmail, token) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    console.log(accessToken.token);
    const transport = mailer.createTransport({
      service: process.env.SERVICE,
      port: 465,
      secure: true,
      logger: true,
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    const mailOptions = {
      from: `Event-Planner ${process.env.USER}`,
      to: userEmail,
      subject: "User API",
      text: "This is test",
    };
    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.error("Error ko message", error.message);
  }
}

module.exports = sendMail;
