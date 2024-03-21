//getting the necessary modules
const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/authRoutes");
const errorController = require("./controller/errorController");
const AppError = require("./middleware/errorHandler");

//initializing express and dev environment
const app = express();

app.use(express.json());
if (process.env.NODE_ENV === "dev") {
  app.use(morgan("dev"));
}
//initailizing authentication routes
app.use("/authenticate/user", authRouter);

app.all("*", async (req, res) => {
  throw new AppError("No asscosiated routes", `Can't find the ${req.url}`, 404);
});

app.use(errorController);
module.exports = app;
