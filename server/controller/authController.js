const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const appError = require("../middleware/errorHandler");

//creating a json web token
const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

//creating a signUp controller
const signUp = async (req, res, next) => {
  const user = await User.create({
    firstName: req?.body.firstName,
    lastName: req?.body.lastName,
    age: req?.body.age,
    email: req?.body.email,
    password: req?.body.password,
    confirmPassword: req?.body.confirmPassword,
  });
  const token = signToken(user.id);
  res.status(200).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

const logIn = async (req, res) => {
  const { email, password } = req?.body;
  if (!email || !password) {
    throw new appError("ValidationError", "Email or Password empty", 404);
  }
};

module.exports = { signUp };
