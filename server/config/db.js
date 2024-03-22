const postGres = require("sequelize");

//authentiacting our credentials
const sequelize = new postGres.Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: process.env.DB_PORT,
  }
);
//initializing connection
async function dbConnection() {
  try {
    await sequelize.authenticate();

    console.log("Connection Successfull");
  } catch (error) {
    console.log("Connection failed");
  }
}

module.exports = { sequelize, dbConnection };
