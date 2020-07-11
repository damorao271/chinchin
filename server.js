require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");

const coins = require("./routes/coins");
const monedaLocal = require("./routes/monedaLocal");
const transform = require("./routes/transform");

app.use(cors());
app.use(express.json());
app.use("/coins", coins);
app.use("/local", monedaLocal);
app.use("/transform", transform);

const uri = process.env.ATLAS_URL;
const PORT = process.env.PORT || 3000;

// Connect to MDB ATLAS

mongoose
  .connect(uri, {
    dbName: "chinchin",
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas ..."))
  .catch((err) => console.log("Could not connect to MongoDB !!!"));

app.listen(PORT, console.log(`Listening on port ${PORT}`));
