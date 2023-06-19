require("./utils/check_env_vars")();

const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

// Cross origin resource sharing setup
app.use(cors());

// inbuilt middleware to prase json objects
app.use(express.json());

// inbuilt middleware to handle url encoded form data
app.use(express.urlencoded({ extended: false }));

// Environment Variables
const { DATABASE_URI } = process.env;

// DataBase Setup
mongoose
  .connect(DATABASE_URI)
  .then(() => console.log("Connected to the Database"))
  .catch((err) => console.log(err.message));

// Routes
app.use("/api/signup", require("./routes/signUp"));
app.use("/api/message", require("./routes/message"));
app.use("/api/signin", require("./routes/signIn"));

// Home route
app.get("/", (req, res) => {
  res.json("Al-Hareem-Travels-Backend");
});

// Port Setup
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on Port ${port}`));

// register
// login
// jwt-header => auht
