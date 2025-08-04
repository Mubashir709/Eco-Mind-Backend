require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express(); // ✅ This must come before app.use()

// ✅ CORS config for Vercel frontend
const corsOptions = {
  origin: 'https://eco-mind-sage.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Preflight support

// ✅ JSON middleware
app.use(express.json());

// ✅ Routes
const feedbackRoutes = require('./routes/feedback');
app.use('/api/feedback', feedbackRoutes);

// ✅ MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(process.env.PORT || 8080, () => {
    console.log(`Server running on port ${process.env.PORT || 8080}`);
  });
})
.catch((error) => console.error('MongoDB connection error:', error));
