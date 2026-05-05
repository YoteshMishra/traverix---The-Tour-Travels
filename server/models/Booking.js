const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    title: String,
    price: Number,
    days: String,
    image: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);