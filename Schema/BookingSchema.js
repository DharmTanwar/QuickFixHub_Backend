const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bookingSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  procider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  service: {
    type: String,
    required: true,
    trim: true,
  },
  bookingDate: {
    type: Date,
    required: true,
  },

  bookingTime: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "completed", "cancelled"],
    default: "pending",
  },
});

module.exports=bookingSchema;
