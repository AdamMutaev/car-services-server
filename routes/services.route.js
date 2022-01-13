const { Router } = require("express");
const { servicesController } = require("../controllers/services.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.get('/services', servicesController.getAllServices)
router.post('/services', servicesController.createService)
router.patch('/services/:id', servicesController.updateService)
router.delete('/services/:id', servicesController.deleteService)

module.exports = router