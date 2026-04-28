const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    title: String,
    price: Number,
    days: String,
    image: String
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "Booking",
  bookingSchema
);