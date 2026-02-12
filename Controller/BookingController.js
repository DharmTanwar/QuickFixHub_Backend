const bookingModel = require("../Model/BookingModel");
const bookingValidation = require("../Validation/bookingValidation");
const booking = async (req, res, next) => {
  try {
    const { error, value } = bookingValidation.validate(req.body);
    if (error) {
      const err = new Error(error.details[0].message);
      err.status = 400;
      return next(err);
    }
    const { user, provider, service, bookingDate, bookingTime, status } =
      req.body;
    const booking = new bookingModel({
      user,
      provider,
      service,
      bookingDate,
      bookingTime,
      status: status || "pending",
    });
    await booking.save();
    res.status(200).json({
      success: true,
      message: "Booking save successfully",
      data: booking,
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = booking;
