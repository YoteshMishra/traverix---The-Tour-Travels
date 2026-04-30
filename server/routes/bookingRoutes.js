// backend/routes/bookingRoutes.js

const express = require("express");
const router = express.Router();

const Booking = require("../models/Booking");
const authMiddleware = require("../middleware/authMiddleware");

/* =====================================
   CREATE BOOKING (Private)
===================================== */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, image, days, price } = req.body;

    const booking = await Booking.create({
      title,
      image,
      days,
      price,
      userId: req.user.id
    });

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Booking failed",
      error: error.message
    });
  }
});

/* =====================================
   GET MY BOOKINGS (Private)
===================================== */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({
      userId: req.user.id
    }).sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
      error: error.message
    });
  }
});

/* =====================================
   GET SINGLE BOOKING (Private)
===================================== */
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch booking",
      error: error.message
    });
  }
});

/* =====================================
   DELETE BOOKING (Private)
===================================== */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Delete failed",
      error: error.message
    });
  }
});

/* =====================================
   UPDATE BOOKING (Private)
===================================== */
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id
      },
      req.body,
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Update failed",
      error: error.message
    });
  }
});

module.exports = router;