require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const feedbackRoutes = require('./routes/feedback');
const app = express();

// --- Fix CORS ---
const corsOptions = {
  origin: 'https://eco-mind-sage.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Handle preflight requests

// --- Middleware ---
app.use(express.json());
app.use('/api/feedback', feedbackRoutes);

// --- MongoDB ---
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
