require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();

require("./routes")(app);

const uri = process.env.ATLAS_URI;
const PORT = process.env.PORT || 3000;

// Connect to ATLAS

mongoose
  .connect(uri, {
    dbName: "chinchin",
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connecte to MongoDB Atlas ..."))
  .catch((err) => console.log("Could not connect to MongoDB !!!"));

app.listen(PORT, console.log(`Listening on port ${PORT}`));
