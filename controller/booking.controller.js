const Validator = require('fastest-validator');
const models = require("../models");

function createBooking(req, res) {
    const checkinDate = new Date(req.body.checkin_date);
    const checkoutDate = new Date(req.body.checkout_date);
    const bookingData = {
        checkin_date: checkinDate,
        checkout_date: checkoutDate,
        nightly_price: req.body.nightly_price,
        service_fee: req.body.service_fee,
        cleaning_fee: req.body.cleaning_fee,
        total_price: req.body.total_price
        // Add other fields as needed
    };
    
    const schema = {
        checkin_date: { type: "date", optional: false },
        checkout_date: { type: "date", optional: false },
        nightly_price: { type: "number", optional: false },
        service_fee: { type: "number", optional: false },
        cleaning_fee: { type: "number", optional: false },
        total_price: { type: "number", optional: false }
        // Add other fields as needed
    };

    const v = new Validator();
    const validationResponse = v.validate(bookingData, schema);

    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    models.Booking.create(bookingData).then(result => {
        res.status(201).json({
            message: "Booking created successfully",
            result: result
        });
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

function getAllBookings(req, res) {
    models.Booking.findAll()
        .then(bookings => {
            res.status(200).json({
                message: "All bookings retrieved successfully",
                bookings: bookings
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Something went wrong",
                error: error
            });
        });
}

function getBookingById(req, res) {
    const bookingId = req.params.id;

    models.Booking.findByPk(bookingId).then(booking => {
        if (booking) {
            res.status(200).json({
                message: "Booking found",
                booking: booking
            });
        } else {
            res.status(404).json({
                message: "Booking not found"
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

function updateBooking(req, res) {
    const checkinDate = new Date(req.body.checkin_date);
    const checkoutDate = new Date(req.body.checkout_date);
    const bookingId = req.params.id;
    const updatedBookingData = {
        checkin_date: checkinDate,
        checkout_date: checkoutDate,
        nightly_price: req.body.nightly_price,
        service_fee: req.body.service_fee,
        cleaning_fee: req.body.cleaning_fee,
        total_price: req.body.total_price
        // Add other fields as needed
    };

    const schema = {
        checkin_date: { type: "date", optional: false },
        checkout_date: { type: "date", optional: false },
        nightly_price: { type: "number", optional: false },
        service_fee: { type: "number", optional: false },
        cleaning_fee: { type: "number", optional: false },
        total_price: { type: "number", optional: false }
        // Add other fields as needed
    };

    const v = new Validator();
    const validationResponse = v.validate(updatedBookingData, schema);

    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    models.Booking.update(updatedBookingData, { where: { id: bookingId } }).then(result => {
        if (result[0] !== 0) {
            res.status(200).json({
                message: "Booking updated successfully",
                booking: updatedBookingData
            });
        } else {
            res.status(404).json({
                message: "Booking not found"
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

function deleteBooking(req, res) {
    const bookingId = req.params.id;
    models.Booking.destroy({ where: { id: bookingId } }).then(rowsDeleted => {
        if (rowsDeleted > 0) {
            res.status(200).json({
                message: "Booking deleted successfully"
            });
        } else {
            res.status(404).json({
                message: "Booking not found"
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
    createBooking: createBooking,
    getBookingById: getBookingById,
    getAllBookings: getAllBookings,
    updateBooking: updateBooking,
    deleteBooking: deleteBooking
};
