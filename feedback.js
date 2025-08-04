// routes/feedback.js
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Load credentials from environment variables
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

router.post('/', async (req, res) => {
  const data = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: EMAIL_USER,
      to: EMAIL_USER,
      subject: 'New Feedback Received',
      text: `
You received new feedback:

Name: ${data.name}
Email: ${data.email}
Mood: ${data.mood}
Comments: ${data.comments}
Date: ${new Date().toLocaleString()}
      `,
    });

    res.status(200).json({ message: 'Feedback sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ message: 'Failed to send feedback' });
  }
});

module.exports = router;
