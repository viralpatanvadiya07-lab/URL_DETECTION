const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`🚀 MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Database Connection Error: ${error.message}`);
    console.log('Please make sure your MONGO_URI in server/.env is correct.');
    // Don't exit the process so the server can still respond with errors
  }
};

module.exports = connectDB;
