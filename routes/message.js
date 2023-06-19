const express = require("express");
const router = express.Router();
const { Message, validateMessage } = require("../models/message");

router.post("/", async (req, res) => {
  const { first_name, last_name, email, phone, message } = req.body;

  const { error } = validateMessage(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const messageInfo = new Message({
    first_name,
    last_name,
    email,
    phone,
    message,
  });

  try {
    const result = await messageInfo.save();
  } catch (err) {
    console.log(err.message);
  }

  res.send(result);
});

module.exports = router;
