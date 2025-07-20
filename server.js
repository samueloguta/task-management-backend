const mongoose = require('mongoose');
const app = require('./app');
const http = require('http');
const connectDB = require('./config/db');

const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

// Database connection and server start
connectDB()
  .then(() => {
    console.log('✅ MongoDB connected successfully!');
    console.log(`📊 MongoDB Host: ${mongoose.connection.host || 'Unknown'}`);

    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Failed to connect to MongoDB:', error);
    process.exit(1);
  });
