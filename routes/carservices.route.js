const { Router } = require("express");
const { carservicesController } = require("../controllers/carservices.controller");

const router = Router();

router.get('/carservice', carservicesController.getAllCarservices)
router.get('/carservice/login', carservicesController.loginCarservice)
router.post('/carservice/register', carservicesController.registerCarservice)
router.patch('/carservice/:id', carservicesController.updateCarservice)
router.patch('/carservice/add/services/:id', carservicesController.pushServices)
router.delete('/carservice/:id', carservicesController.deleteCarservice)

module.exports = router