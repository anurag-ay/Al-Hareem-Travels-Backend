const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minlength: 2,
    maxlength: 255,
    required: true,
  },
  lastName: {
    type: String,
    minlength: 2,
    maxlength: 255,
    required: true,
  },
  phone: {
    type: String,
    minlength: 10,
  },
  email: {
    type: String,
    minlength: 2,
    maxlength: 255,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 2,
    maxlength: 255,
    required: true,
  },
});

const User = mongoose.model("Users", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(255).required().messages({
      "string.base": "First name must be a string",
      "string.empty": "First name is required",
      "string.min": "First name must have at least {#limit} characters",
      "string.max": "First name must have at most {#limit} characters",
    }),

    lastName: Joi.string().min(2).max(255).required().messages({
      "string.base": "Last name must be a string",
      "string.empty": "Last name is required",
      "string.min": "Last name must have at least {#limit} characters",
      "string.max": "Last name must have at most {#limit} characters",
    }),

    email: Joi.string().email().min(2).max(255).required().messages({
      "string.base": "Email must be a string",
      "string.empty": "Email is required",
      "string.email": "Invalid email format",
      "string.min": "Email must have at least {#limit} characters",
      "string.max": "Email must have at most {#limit} characters",
    }),

    phone: Joi.string().required().min(10).messages({
      "string.base": "Phone number must be a string",
      "string.empty": "Phone number is required",
      "string.min": "Phone number must have at least {#limit} digits",
    }),

    password: Joi.string()
      .required()
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
      )
      .min(8)
      .messages({
        "string.base": "Password must be a string.",
        "string.pattern.base":
          "Password must be at least 8 characters long should include at least one uppercase letter, one lowercase letter, one digit, and one special character.",
        "string.empty": "Password is required.",
        "string.min": "Password must be at least {#limit} characters long.",
      }),
  });

  return schema.validate(user, { abortEarly: false });
}

module.exports.User = User;
module.exports.validateUser = validateUser;
