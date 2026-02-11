const Joi = require("joi");

const bookingValidation = Joi.object({
  user: Joi.string().required().messages({
    "string.empty": "User is required",
    "any.required": "User is required",
  }),

  provider: Joi.string().required().messages({
    "string.empty": "Provider is required",
    "any.required": "Provider is required",
  }),

  service: Joi.string().min(3).trim().required().messages({
    "string.empty": "Service is required",
    "string.min": "Service must be at least 3 characters",
  }),

  bookingDate: Joi.date().min("now").required().messages({
    "date.base": "Invalid date",
    "date.min": "Booking date cannot be in the past",
    "any.required": "Booking date is required",
  }),

  bookingTime: Joi.string()
    .pattern(/^\d{1,2}:\d{2}$/)
    .required()
    .messages({
      "string.pattern.base": "Time must be in HH:MM format",
      "any.required": "Booking time is required",
    }),

  status: Joi.string()
    .valid("pending", "accepted", "completed", "cancelled")
    .optional(),
});

module.exports = bookingValidation;
