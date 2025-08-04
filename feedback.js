const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const sendNotification = require('../utils/mailer');

router.post('/', async (req, res) => {
  console.log("✅ Feedback route hit");

  try {
    const feedback = new Feedback(req.body);
    await feedback.save();

    await sendNotification(req.body);
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving feedback' });
  }
});

module.exports = router;
