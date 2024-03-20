const postGres = require("sequelize");

const sequelize = new postGres.Sequelize({
  dialect: "postgres",
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
});

async function dbConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection Successfull");
  } catch (error) {
    console.log("Connection failed", error.stack);
  }
}

module.exports = { sequelize, dbConnection };
