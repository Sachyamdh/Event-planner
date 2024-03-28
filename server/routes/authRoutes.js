const express = require("express");
const tryCatch = require("../utils/tryCatch");
const router = express.Router();
const {
  signUp,
  logIn,
  forgotPassword,
  resetPassword,
} = require("../controller/authController");

//creating routes for our authentication
router.route("/signUp").post(tryCatch(signUp));
router.route("/login").post(tryCatch(logIn));
router.route("/forgotpassword").post(tryCatch(forgotPassword));
router.patch("/resetpassword/:token", tryCatch(resetPassword));

module.exports = router;
