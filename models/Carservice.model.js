const mongoose = require("mongoose");

const carserviceSchema = mongoose.Schema({
  login: {
    type: String,
    unique: true,
  },
  password: String,
  img: String,
  name: String,
  service: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Service",
  }],
  phone: String,
  email: String,
  address: {
    city: String,
    street: String,
    number: String,
  }
});

const Carservice = mongoose.model('Carservice', carserviceSchema)

module.exports = Carservice
