const mongoose = require('mongoose'); // Add this at top
const app = require('./app');
const http = require('http');
const connectDB = require('./config/db');

const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

// Database connection and server start
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`MongoDB Connected: ${mongoose.connection.host}`);
  });
});