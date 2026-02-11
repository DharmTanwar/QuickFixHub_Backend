const mongoose = require("mongoose");
const model = mongoose.model;
const bookingSchema = require("../Schema/BookingSchema");
const bookingModel = new model("booking", bookingSchema);
module.exports = bookingModel;
