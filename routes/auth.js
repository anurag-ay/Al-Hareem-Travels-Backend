const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { auth_token } = req.body;

  const { jwt_secret_key } = process.env;

  try {
    const result = jwt.verify(auth_token, jwt_secret_key);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(401).send(err);
  }
});

module.exports = router;
