const express = require("express");
const attributeController = require("../controller/attribute.controller");

const router = express.Router();

router.post('/', attributeController.createAttribute);
router.get('/', attributeController.getAllAttributes);
router.get('/:id', attributeController.getAttributeById);
router.patch('/:id', attributeController.updateAttribute);
router.delete('/:id', attributeController.deleteAttribute);

module.exports = router;
