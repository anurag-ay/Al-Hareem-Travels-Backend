const mongoose = require("mongoose");
const { userSchema } = require("./user");
const Joi = require("joi");

const messageSchema = new mongoose.Schema({
  first_name: {
    type: String,
    minlength: 2,
    maxlength: 255,
    required: true,
  },
  last_name: {
    type: String,
    minlength: 2,
    maxlength: 255,
    required: true,
  },
  phone: {
    type: String,
    minlength: 10,
    maxlength: 14,
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
    first_name: Joi.string().min(2).max(255).required(),
    last_name: Joi.string().min(2).max(255).required(),
    email: Joi.string().email().min(2).max(255),
    phone: Joi.string().required().min(10).max(14),
    message: Joi.string().min(5).max(5000),
  });
  return schema.validate(contactInfo);
}

module.exports.Message = Message;
module.exports.validateMessage = validateMessage;
