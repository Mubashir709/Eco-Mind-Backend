require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const feedbackRoutes = require('./routes/feedback');
const app = express();

app.use(cors({
  origin: 'https://eco-mind-sage.vercel.app',
  methods: ['POST'],
  credentials: true
}));
app.use(express.json());
app.use('/api/feedback', feedbackRoutes);

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
}).catch((error) => console.error('MongoDB connection error:', error));