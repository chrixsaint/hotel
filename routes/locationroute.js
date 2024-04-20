const express = require("express");
const locationController = require("../controller/location.controller");
const router = express.Router();

router.post('/', locationController.createLocation);
router.get('/', locationController.getAllLocations);
router.get('/:id', locationController.getLocationById);
router.patch('/:id', locationController.updateLocation);
router.delete('/:id', locationController.deleteLocation);

module.exports = router;
