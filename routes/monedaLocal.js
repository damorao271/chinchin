const axios = require("axios");
const { MonedaLocal, validate } = require("../models/monedaLocalModel");
const express = require("express");
const router = express.Router();
const _ = require("lodash");

const apiEndPoint =
  "https://www.binance.com/exchange-api/v1/public/asset-service/product/get-products/";

router.get("/", async (req, res) => {
  const monedaLocal = await MonedaLocal.find()
    .sort("name")
    .select({ an: 1, name: 1, valueBTC: 1, valueUSD: 1, _id: 0 });
  res.send(monedaLocal);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const monedaLocal = await MonedaLocal.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    valueUSD: req.body.valueUSD,
  });

  if (!monedaLocal) return res.status(400).send("Invalid Coin");

  res.send(monedaLocal);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let monedaLocal = new MonedaLocal({
    an: req.body.an,
    name: req.body.name,
    valueBTC: req.body.valueBTC,
    valueUSD: req.body.valueUSD,
  });

  monedaLocal = await monedaLocal.save();
  res.send(monedaLocal);
});

module.exports = router;
