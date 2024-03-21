const express = require("express");
const tryCatch = require("../utils/tryCatch");
const router = express.Router();
const { signUp } = require("../controller/authController");

//creating routes for our authentication
router.route("/signUp").post(tryCatch(signUp));
router.route("/login").post();
router.post("/forgorpassword");
router.patch("/resetPassword/:token");

module.exports = router;
