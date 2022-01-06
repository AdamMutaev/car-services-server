const mongoose = require("mongoose");

const serviceSchema = mongoose.Schema({
  name: String,
  price: Number,
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
