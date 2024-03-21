const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

//creating a json web token
const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

//creating a signUp controller
const signUp = async (req, res, next) => {
  const user = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
};

module.exports = { signUp };
