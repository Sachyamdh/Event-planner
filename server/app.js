//getting the necessary modules
const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/authRoutes");

//initializing express and dev environment
const app = express();

app.use(express.json());
if ((process.env.NODE_ENV === "dev")) {
  app.use(morgan("dev"));
}
//initailizing authentication routes
app.use("/authenticate/users", authRouter);



app.all("*", async (req, res) => {
    throw new AppError("No asscosiated routes", `Can't find the ${req.url}`, 404);
  });
  
module.exports = app;
