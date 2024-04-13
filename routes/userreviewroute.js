const express = require("express");
const userReviewController = require("../controller/userreview.controller");

const router = express.Router();

router.post('/', userReviewController.createUserReview);
router.get('/', userReviewController.getAllUserReviews);
router.get('/:id', userReviewController.getUserReviewById);
router.patch('/:id', userReviewController.updateUserReview);
router.delete('/:id', userReviewController.deleteUserReview);

module.exports = router;
