const Validator = require('fastest-validator');
const models = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const emailService = require('../services/emailService'); // Import email service
const userphoneController = require('./userphone.controller');
const uuid = require('uuid');
const nodemailer = require('nodemailer');



async function signUp(req, res) {
    // Handle OTP verification
    if (await userphoneController.verifyOTP(req.body.phoneNumber, req.body.otp)) {
        const birthDate = new Date(req.body.birthdate);
        // Sign up with additional details
        const userData = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            birthdate: birthDate,
            email: req.body.email
        };

        // Validate user data
        const schema = {
            first_name: { type: "string", optional: false },
            last_name: { type: "string", optional: false },
            birthdate: { type: "date", optional: false },
            email: { type: "email", optional: false }
        };
        const v = new Validator();
        const validationResponse = v.validate(userData, schema);

        if (validationResponse !== true) {
            return res.status(400).json({
                message: "Validation failed",
                errors: validationResponse
            });
        }

        // Create user
        try {
            const user = await models.User.create(userData);

            // Generate verification token (can be a JWT or any unique token)
            const verificationToken = generateVerificationToken(user.id);

            // Send confirmation email with verification link
            const verificationLink = `${process.env.BASE_URL}/verify-email/${verificationToken}`;
            await sendConfirmationEmail(user.email, verificationLink);

            // Return success response
            sendSignupSuccessResponse(res);
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Error creating user' });
        }
    } else {
        res.status(400).json({ error: 'OTP verification failed' });
    }
}

// Function to generate a verification token
function generateVerificationToken(userId) {
    // Generate a unique token using the userId or any other method
    // For simplicity, you can use a library like `uuid` to generate a UUID
    const token = uuid.v4(); // Example using `uuid` library

    return token;
}


// Function to send confirmation email
async function sendConfirmationEmail(email) {
    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
        // Provide your email service details here
        // For example, for Gmail:
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    // Email content
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: "christianochenehipeter@gmail.com",
        subject: 'Account Confirmation',
        text: 'Thank you for signing up! Your account has been successfully created.'
    };

    // Send the email
    try {
        await transporter.sendMail(mailOptions);
        console.log('Confirmation email sent successfully.');
    } catch (error) {
        console.error('Error sending confirmation email:', error);
    }
}

// Function to handle email verification
async function verifyEmail(req, res) {
    const token = req.params.token;
    // Verify the token and mark the user's email as verified in the database
    // You can redirect the user to a success page or return a JSON response
}

// Function to handle login
function login(req, res) {
    // Implementation remains the same
}
function sendSignupSuccessResponse(res) {
    // Send a success response indicating successful signup
    // You can redirect the user or return a JSON response
    res.status(200).json({ message: "Signup successful. Please check your email for verification." });
}
module.exports = {
    signUp: signUp,
    login: login,
    sendConfirmationEmail: sendConfirmationEmail,
    verifyEmail: verifyEmail,
    sendSignupSuccessResponse: sendSignupSuccessResponse,
};
