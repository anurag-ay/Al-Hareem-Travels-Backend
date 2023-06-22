const mongoose = require("mongoose");
const { userSchema } = require("./user");
const Joi = require("joi");

const messageSchema = new mongoose.Schema({
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
  },
  message: {
    type: String,
    require: true,
    minLength: 5,
    maxLength: 5000,
  },
});

const Message = mongoose.model("Messages", messageSchema);

function validateMessage(contactInfo) {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(255).required().messages({
      "string.base": "First name must be a string",
      "string.empty": "First name is required",
      "string.min": "First name must have at least {#limit} characters",
      "string.max": "First name must have at most {#limit} characters",
      "any.required": "First name is required",
    }),

    lastName: Joi.string().min(2).max(255).required().messages({
      "string.base": "Last name must be a string",
      "string.empty": "Last name is required",
      "string.min": "Last name must have at least {#limit} characters",
      "string.max": "Last name must have at most {#limit} characters",
      "any.required": "Last name is required",
    }),

    email: Joi.string().email().min(2).max(255).messages({
      "string.base": "Email must be a string",
      "string.email": "Invalid email format",
      "string.min": "Email must have at least {#limit} characters",
      "string.max": "Email must have at most {#limit} characters",
    }),

    phone: Joi.string().required().min(10).messages({
      "string.base": "Phone number must be a string",
      "string.empty": "Phone number is required",
      "string.min": "Phone number must have at least {#limit} digits",
      "any.required": "Phone number is required",
    }),

    message: Joi.string().min(5).max(5000).messages({
      "string.base": "Message must be a string",
      "string.empty": "Message Should Not Be Empty",
      "string.min": "Message must have at least {#limit} characters",
      "string.max": "Message must have at most {#limit} characters",
    }),
  });
  return schema.validate(contactInfo);
}

module.exports.Message = Message;
module.exports.validateMessage = validateMessage;
