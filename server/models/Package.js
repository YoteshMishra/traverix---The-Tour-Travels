const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema(
  {
    id: Number,
    title: String,
    price: Number,
    days: String,
    image: String
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "Package",
  packageSchema
);