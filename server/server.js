const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const bookingRoutes =
  require("./routes/bookingRoutes");

const authRoutes =
  require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  "/api/bookings",
  bookingRoutes
);


app.use("/api/auth", authRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    console.log(
      "MongoDB Connected"
    )
  );

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    "Server Running"
  );
});