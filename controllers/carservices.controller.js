const Carservice = require("../models/Carservice.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.carservicesController = {
  registerCarservice: async (req, res) => {
    try {
      const {
        email,
        password,
        name,
        img,
        text,
        service,
        phone,
        city,
        street,
        number,
      } = req.body;

      const hash = await bcrypt.hash(
        password,
        Number(process.env.BCRYPT_ROUNDS)
      );

      const carservice = await Carservice.create({
        email: email,
        password: hash,
        name: name,
        img: img,
        text: text,
        service: service,
        phone: phone,
        address: { city: city, street: street, number: number },
      });

      res.json(carservice);
    } catch (error) {
      res.json(error);
    }
  },

  loginCarservice: async (req, res) => {
    try {
      
      const { email, password } = req.body;

      const condidate = await Carservice.findOne({ email });

      if (!condidate) {
        return res.status(401).json({error: "Неверный логин или пароль!"});
      }

      const valid = await bcrypt.compare(password, condidate.password);

      if (!valid) {
        return res.status(401).json({error: "Неверный логин или пароль!"});
      }

      const payload = {
        id: condidate._id,
      };

      const token = await jwt.sign(payload, process.env.SECRET_JWT_KEY, {
        expiresIn: "14d",
      });

      res.json({
        token: token,
        id: condidate._id,
      });
    } catch (error) {
      res.json({
        error: error.status(401).json(error.toString()),
      });
    }
  },

  getAllCarservices: async (req, res) => {
    try {
      const carservices = await Carservice.find();
      res.json(carservices);
    } catch (error) {
      res.json(error);
    }
  },

  updateCarservice: async (req, res) => {
    try {
      let carservice = await Carservice.findByIdAndUpdate(
        req.params.id,
        {
          password: req.body.password,
          name: req.body.name,
          text: req.body.text,
          img: req.body.img,
          $push: {
            service: req.body.service,
          },
          phone: req.body.service,
          email: req.body.email,
        },
        { new: true }
      );

      res.json(carservice);
    } catch (error) {
      res.json(error);
    }
  },

  updateImg: async (req, res) => {
    try {
      await Carservice.findByIdAndUpdate(req.params.id, {
        img: req.file.path
      });
      res.status(200).json('update');
    } catch (error) {
      res.json(error);
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
    } catch (error) {
      res.json(error);
    }
  },

  deleteCarservice: async (req, res) => {
    try {
      await Carservice.findByIdAndDelete(req.params.id);
      res.json("Автосервис успешно удален!");
    } catch (error) {
      res.json(error);
    }
  },
};
