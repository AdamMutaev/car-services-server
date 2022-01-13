const mongoose = require("mongoose");

const carserviceSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  text: String,
  password: String,
  img: {
    type: String,
    default: null,
  },
  name: String,
  service: [
    {
      name: String,
      price: Number,
    },
  ],
  phone: Number,
  address: {
    city: String,
    street: String,
    number: Number,
  },
});

const Carservice = mongoose.model("Carservice", carserviceSchema);

module.exports = Carservice;
