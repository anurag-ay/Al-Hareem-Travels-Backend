const express = require("express");
const router = express.Router();
const { Message, validateMessage } = require("../models/message");

router.post("/", async (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;

  const { error } = validateMessage(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const messageInfo = new Message({
    firstName,
    lastName,
    email,
    phone,
    message,
  });

  try {
    const result = await messageInfo.save();
    res.send(result);
  } catch (err) {
    console.log(err.message);
    res.status(400).send(err);
  }
});

module.exports = router;
