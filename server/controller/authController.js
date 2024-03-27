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

//creating a reset token
// const resetToken =

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
    throw new appError("AuthenticationError", "Email or Password empty", 404);
  }
  const user = await User.findOne({ where: { email } });
  if (!user || !user.correctPassword(password, user)) {
    throw new appError("AuthenticationError", "Invalid email or password", 404);
  }
  const token = signToken(user.id);
  res.status(200).json({
    status: "succes",
    token,
    data: {
      user,
    },
  });
};

const forgotPassword = async (req, res) => {
  const { email } = req?.body.email;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new appError("AuthenticationError", "Invalid Email", 404);
  }

  const resetToken = user.forgetPassword(user);
  const resetURL = `${req.protocol}://${req.get("host")}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nToken valid for 5minutes only\n If you didn't forget your password, please ignore this email.`;

  try {
  } catch (error) {
    (user.passwordResetToken = undefined)(
      (user.passwordResetExpire = undefined)
    );
    await user.save({ validate: false });
    return next(
      new appError(
        error,
        "There was an error sending the password reset token,Try again later",
        500
      )
    );
  }
};

module.exports = { signUp, logIn, forgotPassword };
