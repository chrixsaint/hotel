const express = require('express');
const userController = require("../controller/user.controller");

const router = express.Router();

router.post('/signup', userController.signUp);
router.post('/login', userController.login);
router.get('/verify-email/:token', userController.verifyEmail);

module.exports = router;