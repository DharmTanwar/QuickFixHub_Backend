const Joi = require("joi");

const userValidator = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.empty": "name is required",
    "string.min": "name must be at least 3 characters",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "email must be valid",
    "string.min": "email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters",
    "string.empty": "Password is required",
  }),

  role: Joi.string().valid("user", "provider").default("user"),

  phone: Joi.when("role", {
  is: "provider",
  then: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.empty": "Phone is required for provider",
      "string.pattern.base": "Phone number must be 10 digits",
    }),
  otherwise: Joi.forbidden(),
}),

 service: Joi.when("role", {
  is: "provider",
  then: Joi.array()
    .items(Joi.string())
    .min(1)
    .required()
    .messages({
      "array.min": "At least one service is required",
      "array.base": "Service must be an array",
    }),
  otherwise: Joi.forbidden(),
}),

  isAvailable: Joi.boolean().default(true),
});

module.exports = userValidator;
