const express = require("express");

const propertyController = require("../controller/property.controller");

const router = express.Router();

router.post('/', propertyController.createProperty);
router.get('/', propertyController.getAllProperties);
router.get('/:id', propertyController.getPropertyById);
router.patch('/:id', propertyController.updateProperty);
router.delete('/:id', propertyController.deleteProperty);

module.exports = router;
