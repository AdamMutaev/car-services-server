const { Router } = require("express");
const { servicesController } = require("../controllers/services.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.get('/services', servicesController.getAllServices)
router.post('/services', authMiddleware, servicesController.createService)
router.patch('/services/:id', authMiddleware, servicesController.updateService)
router.delete('/services/:id', authMiddleware, servicesController.deleteService)

module.exports = router