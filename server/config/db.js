const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio';
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 3000,
    });
    isConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    isConnected = false;
    // Disable command buffering when DB connection fails so queries fail-fast or return fallback data immediately
    mongoose.set('bufferCommands', false);
    console.error(`⚠️ MongoDB Connection Offline: ${error.message}`);
    console.error(`📌 API endpoints will serve initial portfolio data in standalone mode until MongoDB is connected.`);
  }
};

const getIsConnected = () => isConnected && mongoose.connection.readyState === 1;

module.exports = { connectDB, getIsConnected };
