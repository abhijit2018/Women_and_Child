const mongoose = require("mongoose");
const { MONGO_URI } = require("./env");

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  await mongoose.connection.close();
  console.log("🛑 MongoDB disconnected");
};

module.exports = { connectDB, disconnectDB };
