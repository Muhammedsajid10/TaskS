const express = require('express');
const connectDB = require('./mongoose/config');
const employeeRoutes = require('./Router/router');
const cors = require('cors');
const path = require('path');
const app = express();


connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Serve (uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/api/employees', employeeRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});










