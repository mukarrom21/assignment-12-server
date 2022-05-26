// require
const express = require("express");
const cors = require("cors");
require("dotenv").config();
// express
const app = express();
// port
const port = process.env.PORT || 5000;
// middleware
app.use(cors());
app.use(express.json());

// Check in the browser http://localhost:5000
app.get("/", (req, res) => {
  res.send("assignment 12 running");
});

app.listen(port, () => {
  console.log("mmh12", port);
});
