const mongoose = require('mongoose');
const dns = require('dns');

// Force IPv4 and add debug logging
dns.setDefaultResultOrder('ipv4first');
console.log('DNS configuration set to prefer IPv4');

const connectDB = async () => {
  console.log('Attempting MongoDB connection with URI:', process.env.MONGO_URI?.substring(0, 25) + '...'); // Log partial URI

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000, // Increased to 10 seconds
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (err) {
    console.error('❌ FULL CONNECTION ERROR:', {
      name: err.name,
      message: err.message,
      stack: err.stack,
      code: err.code,
      reason: err.reason?.toString(),
    });
    process.exit(1);
  }
};

module.exports = connectDB;