const Carservice = require("../models/Carservice.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.carservicesController = {
  registerCarservice: async (req, res) => {
    try {
      const { login, password, img, name, service, phone, email } = req.body;

      const hash = await bcrypt.hash(
        password,
        Number(process.env.BCRYPT_ROUNDS)
      );

      const carservice = await Carservice.create({
        login: login,
        password: hash,
        img: img,
        name: name,
        service: service,
        phone: phone,
        email: email,
      });

      res.json(carservice);
    } catch (e) {
      res.json(e);
    }
  },

  loginCarservice: async (req, res) => {
    try {
      const { login, password } = req.body;

      const condidate = await Carservice.findOne({ login });

      const valid = await bcrypt.compare(password, condidate.password);

      if (!condidate || !valid) {
        res.status(401).json("Неверный логин или пароль!");
      }

      const payload = {
        id: condidate._id,
      };

      const token = await jwt.sign(payload, process.env.SECRET_JWT_KEY, {
        expiresIn: "48h",
      });

      res.json(token);
    } catch (e) {
      res.json(e);
    }
  },

  getAllCarservices: async (req, res) => {
    try {
      const carservices = await Carservice.find();
      res.json(carservices);
    } catch (e) {
      res.json(e);
    }
  },

  updateCarservice: async (req, res) => {
    try {
      const carservice = await Carservice.findByIdAndUpdate(
        req.params.id,
        {
          login: req.body.login,
          password: req.body.password,
          img: req.body.img,
          name: req.body.name,
          $push: {
            service: req.body.service,
          },
          phone: req.body.service,
          email: req.body.email,
        },
        { new: true }
      );

      res.json(carservice);
    } catch (e) {
      res.json(e);
    }
  },

  pushServices: async (req, res) => {
    try {
      const carservice = await Carservice.findByIdAndUpdate(
        req.params.id,
        {
          $push: {
            service: req.body.service,
          },
        },
        { new: true }
      );

      res.json(carservice);
    } catch (e) {
      res.json(e);
    }
  },

  deleteCarservice: async (req, res) => {
    try {
      await Carservice.findByIdAndDelete(req.params.id);
      res.json("Автосервис успешно удален!");
    } catch (e) {
      res.json(e);
    }
  },
};
