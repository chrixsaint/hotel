const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const userphoneController = require('../controller/userphone.controller');

// Route for handling sign-up with phone number
router.post('/signups', async (req, res) => {
    const phoneNumber = req.body.phoneNumber;

    try {
        // Sign-up with phone number and send verification code
        const success = await userphoneController.signUpWithPhoneNumber(phoneNumber);
        if (success) {
            res.status(200).json({ message: 'Verification code sent successfully' });
        } else {
            res.status(500).json({ error: 'Error sending verification code' });
        }
    } catch (error) {
        console.error('Error signing up with phone number:', error);
        res.status(500).json({ error: 'Error signing up with phone number' });
    }
});

// Route for handling OTP verification
router.post('/verify', async (req, res) => {
    const phoneNumber = req.body.phoneNumber;
    const enteredOTP = req.body.otp;

    try {
        // Verify OTP
        const isVerified = await userphoneController.verifyOTP(phoneNumber, enteredOTP);
        if (isVerified) {
            // Redirect to the signup page upon successful OTP verification
            res.redirect('/users/signup'); // You may need to change the redirect URL
        } else {
            res.status(400).json({ error: 'Invalid OTP' });
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ error: 'Error verifying OTP' });
    }
});

module.exports = router;
