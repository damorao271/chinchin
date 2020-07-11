require("dotenv").config;

const mongoose = require("mongoose");
const express = require("express");
const app = express();

require("./routes")(app);

const PORT = process.env.PORT || 3000;

// Connect to ATLAS

mongoose.connect(uri, {});
