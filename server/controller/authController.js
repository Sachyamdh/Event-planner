const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const appError = require("../middleware/errorHandler");
const sendMail = require("../middleware/mailer");
const { Op } = require("sequelize");
const { gmail } = require("googleapis/build/src/apis/gmail");

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

//creatign a login
const logIn = async (req, res) => {
  const { email, password } = req?.body;
  if (!email || !password) {
    throw new appError("AuthenticationError", "Email or Password empty", 404);
  }
  const user = await User.findOne({ where: { email } });
  //compares with the encrypted hashed password in the database. correct password is a prototype
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

//creating a forgot password for the system
const forgotPassword = async (req, res) => {
  const email = req?.body.email;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new appError("AuthenticationError", "Invalid Email", 404);
  }
  // create a forgot password token using a prototype
  const resetToken = await user.forgetPassword(user);
  // creates a reset URL to send
  const resetURL = `${req.protocol}://${req.get("host")}/authenticate/user/forgotpassword/${resetToken}`;
  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nToken valid for 5minutes only\n If you didn't forget your password, please ignore this email.`;
  try {
    //sendign user the email to reset his password
    await sendMail(user.email, message);
    await user.save();
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpire = undefined;
    await user.save({ validate: false });
    return next(
      new appError(
        error,
        "There was an error sending the password reset token,Try again later",
        500
      )
    );
  }
  res
    .status(200)
    .json({ status: "sucess", message: `Reset email sent at ${email}` });
};

//reseting the password
const resetPassword = async (req, res) => {
  const hashed = crypto
    .createHash("sha256")
    .update(req?.params.token)
    .digest("hex");
  //checking if the token is valid and not expired
  const user = await User.findOne({
    where: {
      passwordResetToken: hashed,
      passwordResetExpire: { [Op.gt]: Date.now() },
    },
  });
  //throwing error if the token has expired
  if (!user) {
    throw new appError(
      "ValidationError",
      "The token you provided is invalid",
      400
    );
  }

  user.password = req?.body.password;
  user.confirmPassword = req?.body.confirmPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpire = undefined;
  user.passwordChangedAt = Date.now();

  await user.save();

  const token = signToken(user.id);
  res.status(200).json({
    status: "success",
    token,
    message: "Password changed successfully",
    data: {
      user,
    },
  });
};

module.exports = { signUp, logIn, forgotPassword, resetPassword };
