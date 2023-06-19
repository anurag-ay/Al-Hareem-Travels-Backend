const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  if (!user) return res.status(404).send("User with given email Not Found");

  // check the password
  console.log(password, user.password);
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) return res.status(401).send("Incorrect Password");

  const { first_name, last_name, phone } = user;
  const token = jwt.sign(
    { first_name, last_name, phone, email },
    process.env.jwt_secret_key
  );

  res.send(token);
});

function validate(auth) {
  const schema = Joi.object({
    email: Joi.string().email().min(2).max(255).required(),
    password: Joi.string().min(2).max(255).required(),
  });
  return schema.validate(auth);
}

module.exports = router;
