const axios = require("axios");
const { Coin, validate } = require("../models/coinModel");
const express = require("express");
const router = express.Router();
const _ = require("lodash");

let otraURl = "https://e-commerce-mern-power.herokuapp.com/products";
let postURL = "https://chichin-app.herokuapp.com/coins";

const apiEndPoint =
  "https://www.binance.com/exchange-api/v1/public/asset-service/product/get-products/";

router.get("/", async (req, res) => {
  let { data } = await axios.get(apiEndPoint);
  const datos = data.data;
  let ETH = await _.filter(datos, { s: "ETHBTC" });
  let DASH = await _.filter(datos, { s: "DASHBTC" });
  let USDT = await _.filter(datos, { s: "BTCUSDT" });

  const coin = await Coin.find().sort("name");

  console.log("Data ETH", data);

  const newETH = {
    name: ETH[0].an,
    valueBTC: ETH[0].c,
  };

  const newDASH = {
    name: DASH[0].an,
    valueBTC: DASH[0].c,
  };

  console.log("Data ETH", newETH);
  console.log("Data DASH", newDASH);

  res.send([newETH, newDASH]);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let coin = new Coin({
    name: req.body.name,
  });

  coin = await coin.save();
  res.send(coin);
});

module.exports = router;
