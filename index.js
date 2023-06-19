const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

// Cross origin resource sharing setup
app.use(cors());

// inbuilt middleware to prase jason objects
app.use(express.json());

// Environment Variables
const { DATABASE_URI } = process.env;

// DataBase Setup
mongoose
  .connect(DATABASE_URI)
  .then(() => console.log("Connected to the Database"))
  .catch((err) => console.log(err.message));

// Home route

app.get("/", (req, res) => {
  res.json("Al-Hareem-Travels-Backend");
});

// Port Setup
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on Port ${port}`));
