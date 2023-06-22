const express = require("express");
const router = express.Router();
const { User, validateUser } = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  // validation input
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { firstName, lastName, email, phone } = req.body;

  //  check if user exist
  let user = await User.findOne({ email: email });
  if (user) return res.status(400).send("User Already Exist");

  //  if user not exist

  // encrypt the password
  let password = req.body.password;

  try {
    password = await bcrypt.hash(password, 10);
  } catch (err) {
    console.log(err);
  }

  //  create new user and
  user = new User({
    firstName,
    lastName,
    email,
    phone,
    password,
  });

  // save it
  const result = await user.save();

  // return user to the client
  res.send(result);
});

module.exports = router;
