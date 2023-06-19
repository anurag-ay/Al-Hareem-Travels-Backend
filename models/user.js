const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
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
    first_name: Joi.string().min(2).max(255).required(),
    last_name: Joi.string().min(2).max(255).required(),
    email: Joi.string().email().min(2).max(255).required(),
    phone: Joi.string().required().min(10).max(14),
    password: Joi.string().min(2).max(255).required(),
  });

  return schema.validate(user);
}

module.exports.User = User;
module.exports.validateUser = validateUser;
module.exports.userSchema = userSchema;
