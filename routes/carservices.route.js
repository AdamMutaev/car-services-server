const { Router } = require("express");
const { carservicesController } = require("../controllers/carservices.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const fileMiddleware = require('../middlewares/loadingFile.middleware')

const router = Router();

router.get('/carservice', carservicesController.getAllCarservices)
router.post('/carservice/login', carservicesController.loginCarservice)
router.post('/carservice/register', carservicesController.registerCarservice)
router.patch('/carservice/:id/avatar', authMiddleware, fileMiddleware.single('img'), carservicesController.updateImg);
router.patch('/carservice/:id', authMiddleware, carservicesController.updateCarservice)
router.patch('/carservice/add/services/:id', carservicesController.pushServices)
router.delete('/carservice/:id', authMiddleware, carservicesController.deleteCarservice)

module.exports = router