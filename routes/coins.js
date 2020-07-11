const axios = require("axios");
const { Coin, validate } = require("../models/coinModel");
const express = require("express");
const router = express.Router();
const _ = require("lodash");

let otraURl = "https://e-commerce-mern-power.herokuapp.com/products";
let postURL = "https://chichin-app.herokuapp.com/coins";
const localCoins = "https://chichin-api.herokuapp.com/local";
const euroURL = "https://api.exchangeratesapi.io/latest";
const apiEndPoint =
  "https://www.binance.com/exchange-api/v1/public/asset-service/product/get-products/";

async function getData(url) {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    return error;
  }
}

router.get("/", async (req, res) => {
  let criptos = await getData(apiEndPoint);
  let euros = await getData(euroURL);
  euros = euros.rates.USD;
  let monedasLocales = await getData(localCoins);

  criptos = criptos.data;

  let ETH = await _.filter(criptos, { s: "ETHBTC" });
  let DASH = await _.filter(criptos, { s: "DASHBTC" });
  let USDT = await _.filter(criptos, { s: "BTCUSDT" });

  const coin = await Coin.find().sort("name");

  const newBTC = {
    an: USDT[0].an,
    name: USDT[0].b,
    valueBTC: 1,
    valueUSD: USDT[0].c,
  };

  const newUSD = {
    an: "Dollar",
    name: "USD",
    valueBTC: 1 / newBTC.valueUSD,
    valueUSD: 1,
  };

  const newEuro = {
    an: "Euros",
    name: "EUR",
    valueBTC: euros / newBTC.valueUSD,
    valueUSD: euros,
  };
  const newETH = {
    an: ETH[0].an,
    name: ETH[0].b,
    valueBTC: ETH[0].c,
    valueUSD: ETH[0].c * USDT[0].c,
  };

  const newDASH = {
    an: DASH[0].an,
    name: DASH[0].b,
    valueBTC: DASH[0].c,
    valueUSD: DASH[0].c * USDT[0].c,
  };

  monedasLocales[0].valueBTC = monedasLocales[0].valueUSD / newBTC.valueUSD;
  monedasLocales[1].valueBTC = monedasLocales[1].valueUSD / newBTC.valueUSD;

  res.send([
    newBTC,
    newETH,
    newDASH,
    monedasLocales[0],
    monedasLocales[1],
    newEuro,
    newUSD,
  ]);
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
