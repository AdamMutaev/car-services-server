const Service = require("../models/Service.model");

module.exports.servicesController = {
  createService: async (req, res) => {
    try {
      const service = await Service.create({
        name: req.body.name,
        price: req.body.price,
      });

      res.json(service);

    } catch (e) {
      res.json(e);
    }
  },

  getAllServices: async (req, res) => {
    try {
      const services = await Service.find();

      res.json(services);

    } catch (e) {
      res.json(e);
    }
  },

  updateService: async (req, res) => {
    try {
      const service = await Service.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        price: req.body.price,
      });

      res.json(service);

    } catch (e) {
      res.json(e);
    }
  },

  deleteService: async (req, res) => {
    try {
      const service = await Service.findByIdAndRemove(req.params.id)
      res.json(service)
    } catch (e) {
      res.json(e)
    }
  }
};
