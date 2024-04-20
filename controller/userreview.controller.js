const Validator = require('fastest-validator');
const models = require("../models");

function createUserReview(req, res) {
    const reviewData = {
        overall_rating: req.body.overall_rating,
        comment: req.body.comment,
        review_date: new Date(req.body.review_date)
    };

    const schema = {
        overall_rating: { type: "number", positive: true, integer: true, min: 1, max: 5 },
        comment: { type: "string", optional: true },
        review_date: { type: "date", optional: false }
        // Add other fields as needed
    };

    const v = new Validator();
    const validationResponse = v.validate(reviewData, schema);

    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    models.UserReview.create(reviewData).then(result => {
        res.status(201).json({
            message: "User review created successfully",
            result: result
        });
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

function getAllUserReviews(req, res) {
    models.UserReview.findAll()
        .then(reviews => {
            res.status(200).json({
                message: "All user reviews retrieved successfully",
                reviews: reviews
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Something went wrong",
                error: error
            });
        });
}

function getUserReviewById(req, res) {
    const reviewId = req.params.id;

    models.UserReview.findByPk(reviewId).then(review => {
        if (review) {
            res.status(200).json({
                message: "User review found",
                review: review
            });
        } else {
            res.status(404).json({
                message: "User review not found"
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

function updateUserReview(req, res) {
    const reviewId = req.params.id;
    const updatedReviewData = {
        overall_rating: req.body.overall_rating,
        comment: req.body.comment,
        review_date: new Date(req.body.review_date)
    };

    const schema = {
        overall_rating: { type: "number", positive: true, integer: true, min: 1, max: 5 },
        comment: { type: "string", optional: true },
        review_date: { type: "date", optional: false }
        // Add other fields as needed
    };

    const v = new Validator();
    const validationResponse = v.validate(updatedReviewData, schema);

    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    models.UserReview.update(updatedReviewData, { where: { id: reviewId } }).then(result => {
        if (result[0] !== 0) {
            res.status(200).json({
                message: "User review updated successfully",
                review: updatedReviewData
            });
        } else {
            res.status(404).json({
                message: "User review not found"
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

function deleteUserReview(req, res) {
    const reviewId = req.params.id;
    models.UserReview.destroy({ where: { id: reviewId } }).then(rowsDeleted => {
        if (rowsDeleted > 0) {
            res.status(200).json({
                message: "User review deleted successfully"
            });
        } else {
            res.status(404).json({
                message: "User review not found"
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
    createUserReview: createUserReview,
    getUserReviewById: getUserReviewById,
    getAllUserReviews: getAllUserReviews,
    updateUserReview: updateUserReview,
    deleteUserReview: deleteUserReview
};
