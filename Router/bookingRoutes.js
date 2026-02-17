const bookingController = require("../Controller/BookingController");
const express = require("express");
const router = express.Router();
const authmiddleware = require("../Middleware/authMiddleware");

router.post("/booking", authmiddleware, bookingController.booking);
router.get("/getbooking", authmiddleware, bookingController.getbooking);
module.exports = router;
