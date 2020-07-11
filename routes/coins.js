const axios = require("axios");
const express = require("express");
const router = express.Router();

let otraURl = "https://e-commerce-mern-power.herokuapp.com/products";

const apiEndPoint =
  "https://www.binance.com/exchange-api/v1/public/asset-service/product/get-products/";

router.get("/", async (req, res) => {
  const { data } = await axios.get(apiEndPoint);
  console.log(data);
});
