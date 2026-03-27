const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Attempting remote MongoDB connection...", process.env.MONGO_URI.substring(0, 15) + "...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Remote MongoDB Connected ✅");
  } catch (error) {
    console.error("Remote MongoDB Connection Failed ❌", error.message);
    console.error("⚠️ PLEASE ENSURE YOUR IP ADDRESS IS WHITELISTED IN MONGODB ATLAS!");
  }
};

module.exports = connectDB;