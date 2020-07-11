const axios = require("axios");
const express = require("express");
const router = express.Router();
const _ = require("lodash");

const coinsURL = "http://localhost:3900/coins";

async function getData(url) {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    return error;
  }
}

router.get("/", async (req, res) => {
  const coins = await getData(coinsURL);

  res.send(coins);
});

router.get("/:id/:ammount", async (req, res) => {
  const coins = await getData(coinsURL);

  let moneda = {
    name: req.params.id,
    ammount: req.params.ammount,
  };

  const input = _.filter(coins, { name: req.params.id });

  moneda.ammount = moneda.ammount * input[0].valueUSD;

  let result = [];

  for (let i = 0; i < coins.length; i++) {
    result[i] = {
      an: coins[i].an,
      name: coins[i].name,
      monto: moneda.ammount / coins[i].valueUSD,
    };
  }

  res.send(result);
});

module.exports = router;
