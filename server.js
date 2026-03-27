require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db"); // add this

const app = express();

// connect database
connectDB();

app.use(cors());
app.use(express.json());

// Routes
const menuRoutes = require("./routes/menuRoutes");
const tableBookingRoutes = require("./routes/tableBookingRoutes");
const orderRoutes = require("./routes/orderRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/api/menu", menuRoutes);
app.use("/api/bookings", tableBookingRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Cafe Management API Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});