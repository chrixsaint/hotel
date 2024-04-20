const { Userphone } = require('../models');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Function to generate a random 6-digit verification code
async function generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000);
}

// Function to send verification code via SMS
async function sendVerificationCode(phoneNumber, verificationCode) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);

    try {
        await client.messages.create({
            body: `Your verification code is: ${verificationCode}`,
            to: "+2349130475128",
            from: process.env.TWILIO_PHONE_NUMBER
        });
        console.log(`Verification code sent to ${phoneNumber}`);
        return true;
    } catch (error) {
        console.error('Error sending verification code:', error);
        return false;
    }
}

// Function to handle sign-up with phone number
async function signUpWithPhoneNumber(phoneNumber) {
    const verificationCode = await generateVerificationCode();

    try {
        // Save the userphone record to the database
        await Userphone.create({
            phoneNumber,
            otp: verificationCode
        });
    } catch (error) {
        console.error('Error creating Userphone record:', error);
        return false;
    }

    // Send verification code via SMS
    return sendVerificationCode(phoneNumber, verificationCode);
}

// Function to verify OTP
async function verifyOTP(phoneNumber, enteredCode) {
    // Find the userphone record by phone number and OTP
    const userphone = await Userphone.findOne({
        where: {
            phoneNumber: phoneNumber,
            otp: enteredCode
        }
    });

    if (userphone) {
        // Mark userphone record as verified
        userphone.verified = true;
        await userphone.save();
        console.log(`Verification successful for phone number ${phoneNumber}`);
        return true;
    } else {
        console.log(`Verification failed for phone number ${phoneNumber}`);
        return false;
    }
}

module.exports = {
    signUpWithPhoneNumber: signUpWithPhoneNumber,
    verifyOTP: verifyOTP
};
