const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

/* ---------------------------------
   CREATE BOOKING
--------------------------------- */
router.post("/", async (req, res) => {
  try {
    const booking = await Booking.create(
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create booking",
      error: error.message
    });
  }
});

/* ---------------------------------
   GET ALL BOOKINGS
--------------------------------- */
router.get("/", async (req, res) => {
  try {
    const bookings =
      await Booking.find().sort({
        createdAt: -1
      });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
      error: error.message
    });
  }
});

/* ---------------------------------
   GET SINGLE BOOKING
--------------------------------- */
router.get("/:id", async (req, res) => {
  try {
    const booking =
      await Booking.findById(
        req.params.id
      );

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

/* ---------------------------------
   DELETE BOOKING
--------------------------------- */
router.delete("/:id", async (req, res) => {
  try {
    const booking =
      await Booking.findByIdAndDelete(
        req.params.id
      );

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
      message: "Failed to delete booking",
      error: error.message
    });
  }
});

/* ---------------------------------
   UPDATE BOOKING (Optional)
--------------------------------- */
router.put("/:id", async (req, res) => {
  try {
    const booking =
      await Booking.findByIdAndUpdate(
        req.params.id,
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
      message: "Failed to update booking",
      error: error.message
    });
  }
});

module.exports = router;