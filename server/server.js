const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });
const app = require("./app");
const { dbConnection } = require("./config/db");

process.on("uncaughtException", (err) => {
  console.log(err.message, err.name);
  console.log(err.stack);
  console.log("Unhandles Exception Error; Shutting down server");
  process.exit(1);
});

dbConnection();
const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
