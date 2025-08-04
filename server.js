require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const feedbackRoutes = require('./routes/feedback');
const app = express();

// ✅ Step 1: CORS config
const corsOptions = {
  origin: 'https://eco-mind-sage.vercel.app',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200,
};

// ✅ Step 2: Apply middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Needed for preflight requests

// ✅ Step 3: JSON parser
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://eco-mind-sage.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});


// ✅ Step 4: Routes
app.use('/api/feedback', feedbackRoutes);

// ✅ Step 5: DB + Server
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
  });
})
.catch((err) => console.error('MongoDB connection error:', err));
