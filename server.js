require('dotenv').config();
const nodemailer = require('nodemailer');

// Create a transporter object using Outlook SMTP
const transporter = nodemailer.createTransport({
    service: 'hotmail', // or 'outlook' depending on your email service
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const generateVerificationCode = (length) => {
    let code = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        code += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return code;
};


// Function to send the verification code
const sendVerificationCode = async (to, code) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: 'Password Reset Verification Code',
        text: `Your verification code is ${code}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Verification code sent to:', to);
    } catch (error) {
        console.error('Error sending verification code:', error);
    }
};

// Example usage
const recipientEmail = 'ilirmehmeti2001@outlook.com'; // Recipient email address
const verificationCode = generateVerificationCode(6); // Generate a 6-character code

sendVerificationCode(recipientEmail, verificationCode);
