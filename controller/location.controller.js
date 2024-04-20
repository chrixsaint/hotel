const Validator = require('fastest-validator');
const models = require("../models");

function createLocation(req, res) {
    const locationData = {
        location_name: req.body.location_name
    };
    
    const schema = {
        location_name: { type: "string", optional: false }
        // Add other fields as needed
    };

    const v = new Validator();
    const validationResponse = v.validate(locationData, schema);

    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    models.Location.create(locationData).then(result => {
        res.status(201).json({
            message: "Location created successfully",
            result: result
        });
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

function getAllLocations(req, res) {
    models.Location.findAll()
        .then(locations => {
            res.status(200).json({
                message: "All locations retrieved successfully",
                locations: locations
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Something went wrong",
                error: error
            });
        });
}

function getLocationById(req, res) {
    const locationId = req.params.id;

    models.Location.findByPk(locationId).then(location => {
        if (location) {
            res.status(200).json({
                message: "Location found",
                location: location
            });
        } else {
            res.status(404).json({
                message: "Location not found"
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

function updateLocation(req, res) {
    const locationId = req.params.id;
    const updatedLocation = {
        location_name: req.body.location_name
        // Add other fields as needed
    };

    const schema = {
        location_name: { type: "string", optional: false }
        // Add other fields as needed
    };

    const v = new Validator();
    const validationResponse = v.validate(updatedLocation, schema);

    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    models.Location.update(updatedLocation, { where: { id: locationId } }).then(location => {
        if (location[0] !== 0) {
            res.status(200).json({
                message: "Location updated successfully",
                location: updatedLocation
            });
        } else {
            res.status(404).json({
                message: "Location not found"
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

function deleteLocation(req, res) {
    const locationId = req.params.id;
    models.Location.destroy({ where: { id: locationId } }).then(rowsDeleted => {
        if (rowsDeleted > 0) {
            res.status(200).json({
                message: "Location deleted successfully"
            });
        } else {
            res.status(404).json({
                message: "Location not found"
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
    createLocation: createLocation,
    getLocationById: getLocationById,
    getAllLocations: getAllLocations,
    updateLocation: updateLocation,
    deleteLocation: deleteLocation
};
