//getting the necessary modules
const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/authRoutes");

//initializing express and dev environment
const app = express();

app.use(express.json());

//initailizing authentication routes
app.use("/authenticate/users", authRouter);

module.exports = app;
