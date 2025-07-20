// 1. DNS Configuration (MUST be at the VERY TOP)
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
console.log('DNS resolution configured to prefer IPv4');

// 2. Core Imports
const mongoose = require('mongoose');
const app = require('./app');
const http = require('http');
const connectDB = require('./config/db');

// 3. Server Setup
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

// 4. Database Connection and Server Start
connectDB()
  .then(() => {
    console.log('✅ Successfully connected to MongoDB');
    server.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 MongoDB Host: ${mongoose.connection.host}`);
    });
  })
  .catch((error) => {
    console.error('❌ Failed to initialize application:', error);
    process.exit(1);
  });

// 5. Enhanced Error Handling
process.on('unhandledRejection', (err) => {
  console.error('⚠️ Unhandled Rejection:', err);
  server.close(() => process.exit(1));
});

process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received. Closing gracefully...');
  server.close(() => {
    mongoose.connection.close(false, () => {
      console.log('🔴 MongoDB connection closed');
      process.exit(0);
    });
  });
});