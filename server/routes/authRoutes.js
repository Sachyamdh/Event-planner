const express = require("express");
const { route } = require("../app");
const router = express.Router();

//creating routes for our authentication
router.route("/signup").post();
router.route("/login").post();
router.post("/forgorpassword");
router.patch("/resetPassword/:token");

module.exports = router;
