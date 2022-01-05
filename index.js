const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require("dotenv").config();

const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(require('./routes'))


const connected = async () => {
  try {
    await mongoose.connect(process.env.MONGO_SERVER)
    console.log('Вы успешно подключились к MongoDB!');

    app.listen(port, () => {
      console.log('Server has been started!');
    })
  } catch (e) {
    console.log(e);
  }
}

connected()