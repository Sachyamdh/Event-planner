const morgan = require("morgan");
const express = require("express");
const cors = require('cors');

const app = express();

app.use(express.json());

module.exports = app;
