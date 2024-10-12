const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware handler
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err)
);

// Routes handler
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', employeeRoutes);

app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Employee API<h1>');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});