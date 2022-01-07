const { Router } = require("express");
const { carservicesController } = require("../controllers/carservices.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.get('/carservice', carservicesController.getAllCarservices)
router.post('/carservice/login', authMiddleware, carservicesController.loginCarservice)
router.post('/carservice/register', carservicesController.registerCarservice)
router.post("/carservice/avatar", carservicesController.addAvatar);
router.patch('/carservice/:id', carservicesController.updateCarservice)
router.patch('/carservice/add/services/:id', carservicesController.pushServices)
router.delete('/carservice/:id', carservicesController.deleteCarservice)

module.exports = router