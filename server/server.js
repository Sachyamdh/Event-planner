const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log(err.message, err.name);
  console.log(err.stack);
  console.log("Unhandles Exception Error; Shutting down server");
  process.exit(1);
});
