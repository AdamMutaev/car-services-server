const Carservice = require("../models/Carservice.model");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const fs = require("fs");
const path = require('path')
const jwt = require("jsonwebtoken");

module.exports.carservicesController = {
  registerCarservice: async (req, res) => {
    try {
      const {
        login,
        password,
        img,
        name,
        service,
        phone,
        email,
        city,
        street,
        number,
      } = req.body;

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
        address: { city: city, street: street, number: number },
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

      if (!condidate) {
        return res.status(401).json("Неверный логин или пароль!");
      }

      const valid = await bcrypt.compare(password, condidate.password);

      if (!valid) {
        return res.status(401).json("Неверный логин или пароль!");
      }

      const payload = {
        id: condidate._id,
      };

      const token = await jwt.sign(payload, process.env.SECRET_JWT_KEY, {
        expiresIn: "48h",
      });

      res.json({
        token: token,
      });
    } catch (e) {
      res.json({
        error: e.status(401).json(e.toString()),
      });
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

  addImageForCarservice: async (req, res) => {
    try {
      const fileName = `/static/${uuidv4()}${path.extname(
        req.files.image.name
      )}`;

      await req.files.image.mv(`./static${fileName}`, async (err) => {
        if (err) {
          console.log(err);
        } else {
          await Carservice.findByIdAndUpdate(req.params.id, {
            img: fileName,
          });
          res.json("Файл загружен");
        }
      });
    } catch (e) {
      res.json(e);
    }
  },

  addAvatar: async (req, res) => {
    try {

      const file = req.files.file;
      const carservice = await Carservice.findById(req.user.id);
      const avatarName = uuid.v4() + ".jpg";

      file.mv(`./static/${avatarName}`);
      carservice.img = avatarName;

      await carservice.save();

      res.json(avatarName);
      
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
