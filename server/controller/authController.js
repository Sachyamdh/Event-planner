const User = require("../models/userModel");
const tryCatch = require("../utils/tryCatch");
const jwt = require("jsonwebtoken");

//creating a json web token
const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

//creating a signUp controller
const signUp = tryCatch(async (req,res,next) => {

})

