const mongoose = require("mongoose");
const Joi = require("joi");

const coinSchema = mongoose.Schema({
  name: { type: String, required: true, trim: true },
});

const Coin = mongoose.model("Coin", coinSchema);

function validateCoin(coin) {
  const schema = {
    name: Joi.string().required(),
  };

  return Joi.validate(coin, schema);
}

module.exports.Coin = Coin;
module.exports.validate = validateCoin;
