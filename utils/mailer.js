const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

module.exports = function sendNotification(data) {
  console.log(" 🟢Reached mailer. Preparing to send...");

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: 'New Feedback Received',
    text: `
You received new feedback:

Name: ${data.name}
Email: ${data.email}
Mood: ${data.mood}
Comments: ${data.comments}
    `
  };

  return transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("❌ Email sending failed:", err);
    } else {
      console.log("✅ Email sent:", info.response);
    }
  });
};
