
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/users');
    console.log('Database connected');
  } catch (e) {
    console.error('Database connection error: ' + e);
    process.exit(1);
  }
};

module.exports = connectDB;
