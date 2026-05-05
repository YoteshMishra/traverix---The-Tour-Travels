const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const packages = require("./data/packages");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Traverix API is running! 🚀" });
});

// Seed route
app.get("/api/seed", async (req, res) => {
  try {
    const Package = require("./models/Package");
    await Package.deleteMany();
    await Package.insertMany(packages);
    res.json({ 
      message: "✅ Database seeded successfully!",
      count: packages.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// All Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/packages", require("./routes/packageRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));

app.listen(process.env.PORT || 5000, () => {
  console.log("Server Running");
});