const Validator = require('fastest-validator');
const models = require("../models");

function createProperty(req, res) {
    const propertyData = {
        nightly_price: req.body.nightly_price,
        property_name: req.body.property_name,
        num_guests: req.body.num_guests,
        num_beds: req.body.num_beds,
        num_bedrooms: req.body.num_bedrooms,
        num_bathrooms: req.body.num_bathrooms,
        is_guest_favourite: req.body.is_guest_favourite,
        description: req.body.description,
        address_line_1: req.body.address_line_1,
        address_line_2: req.body.address_line_2
    };
    
    const schema = {
        nightly_price: { type: "number", optional: false },
        property_name: { type: "string", optional: false },
        num_guests: { type: "number", optional: false },
        num_beds: { type: "number", optional: false },
        num_bedrooms: { type: "number", optional: false },
        num_bathrooms: { type: "number", optional: false },
        is_guest_favourite: { type: "boolean", optional: false },
        description: { type: "string", optional: false },
        address_line_1: { type: "string", optional: false },
        address_line_2: { type: "string", optional: true }
    };

    const v = new Validator();
    const validationResponse = v.validate(propertyData, schema);

    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    models.Property.create(propertyData).then(result => {
        res.status(201).json({
            message: "Property created successfully",
            result: result
        });
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

// Handle GET request to retrieve all properties.
function getAllProperties(req, res) {
    models.Property.findAll()
        .then(properties => {
            res.status(200).json({
                message: "All properties retrieved successfully",
                properties: properties
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Something went wrong",
                error: error
            });
        });
}

// Handle GET request to retrieve a specific property by ID.
function getPropertyById(req, res) {
    const propertyId = req.params.id;

    // Perform the action to retrieve a specific property by ID from the database
    models.Property.findByPk(propertyId).then(property => {
        if (property) {
            res.status(200).json({
                message: "Property found",
                property: property
            });
        } else {
            res.status(404).json({
                message: "Property not found"
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

//Handle PUT request to update a property by ID.
function updateProperty(req, res) {
    const propertyId = req.params.id;
    const updatedPropertyData = {
        nightly_price: req.body.nightly_price,
        property_name: req.body.property_name,
        num_guests: req.body.num_guests,
        num_beds: req.body.num_beds,
        num_bedrooms: req.body.num_bedrooms,
        num_bathrooms: req.body.num_bathrooms,
        is_guest_favourite: req.body.is_guest_favourite,
        description: req.body.description,
        address_line_1: req.body.address_line_1,
        address_line_2: req.body.address_line_2
    };

    const schema = {
        nightly_price: { type: "number", optional: false },
        property_name: { type: "string", optional: false },
        num_guests: { type: "number", optional: false },
        num_beds: { type: "number", optional: false },
        num_bedrooms: { type: "number", optional: false },
        num_bathrooms: { type: "number", optional: false },
        is_guest_favourite: { type: "boolean", optional: false },
        description: { type: "string", optional: false },
        address_line_1: { type: "string", optional: false },
        address_line_2: { type: "string", optional: true }
    };

    const v = new Validator();
    const validationResponse = v.validate(updatedPropertyData, schema);

    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    // Update the property
    models.Property.update(updatedPropertyData, { where: { id: propertyId } }).then(property => {
        if (property[0] !== 0) {
            res.status(200).json({
                message: "Property updated successfully",
                property: updatedPropertyData
            });
        } else {
            res.status(404).json({
                message: "Property not found"
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

// Handle DELETE request to delete a property by ID
function deleteProperty(req, res) {
    const propertyId = req.params.id;
    models.Property.destroy({ where: { id: propertyId } }).then(rowsDeleted => {
        if (rowsDeleted > 0) {
            // If at least one row was deleted, respond with success message
            res.status(200).json({
                message: "Property deleted successfully"
            });
        } else {
            // If no rows were deleted (property not found), respond with not found message
            res.status(404).json({
                message: "Property not found"
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
    createProperty: createProperty,
    getPropertyById: getPropertyById,
    getAllProperties: getAllProperties,
    updateProperty: updateProperty,
    deleteProperty: deleteProperty
};
