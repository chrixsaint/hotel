const Validator = require('fastest-validator');
const models = require("../models");

function createAttribute(req, res) {
    const attributeData = {
        attribute_name: req.body.attribute_name,
        description: req.body.description
    };
    
    const schema = {
        attribute_name: { type: "string", optional: false },
        description: { type: "string", optional: false }
    };

    const v = new Validator();
    const validationResponse = v.validate(attributeData, schema);

    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    models.Attribute.create(attributeData).then(result => {
        res.status(201).json({
            message: "Attribute created successfully",
            result: result
        });
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

function getAllAttributes(req, res) {
    models.Attribute.findAll()
        .then(attributes => {
            res.status(200).json({
                message: "All attributes retrieved successfully",
                attributes: attributes
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Something went wrong",
                error: error
            });
        });
}

function getAttributeById(req, res) {
    const attributeId = req.params.id;

    models.Attribute.findByPk(attributeId).then(attribute => {
        if (attribute) {
            res.status(200).json({
                message: "Attribute found",
                attribute: attribute
            });
        } else {
            res.status(404).json({
                message: "Attribute not found"
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

function updateAttribute(req, res) {
    const attributeId = req.params.id;
    const updatedAttribute = {
        attribute_name: req.body.attribute_name,
        description: req.body.description
    };

    const schema = {
        attribute_name: { type: "string", optional: false },
        description: { type: "string", optional: false }
    };

    const v = new Validator();
    const validationResponse = v.validate(updatedAttribute, schema);

    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    models.Attribute.update(updatedAttribute, { where: { id: attributeId } }).then(attribute => {
        if (attribute[0] !== 0) {
            res.status(200).json({
                message: "Attribute updated successfully",
                attribute: updatedAttribute
            });
        } else {
            res.status(404).json({
                message: "Attribute not found"
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

function deleteAttribute(req, res) {
    const attributeId = req.params.id;
    models.Attribute.destroy({ where: { id: attributeId } }).then(rowsDeleted => {
        if (rowsDeleted > 0) {
            res.status(200).json({
                message: "Attribute deleted successfully"
            });
        } else {
            res.status(404).json({
                message: "Attribute not found"
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

module.exports = {
    createAttribute: createAttribute,
    getAttributeById: getAttributeById,
    getAllAttributes: getAllAttributes,
    updateAttribute: updateAttribute,
    deleteAttribute: deleteAttribute
};
