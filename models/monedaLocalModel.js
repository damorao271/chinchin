const mongoose = require("mongoose");
const Joi = require("joi");

const monedaLocalSchema = mongoose.Schema({
  an: { type: String, required: true, trim: true, unique: true },
  name: { type: String, required: true, trim: true, unique: true },
  valueBTC: { type: Number },
  valueUSD: { type: Number, required: true },
});

const MonedaLocal = mongoose.model("MonedaLocal", monedaLocalSchema);

function validateMonedaLocal(moneda) {
  const schema = {
    an: Joi.string().required(),
    name: Joi.string().required(),
    valueBTC: Joi.number(),
    valueUSD: Joi.number().required(),
  };

  return Joi.validate(moneda, schema);
}

module.exports.MonedaLocal = MonedaLocal;
module.exports.validate = validateMonedaLocal;
