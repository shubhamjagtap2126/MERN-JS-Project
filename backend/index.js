const dotenv = require("dotenv").config();
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hiiii");
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`⚡Server: Listening on http://localhost:${port}`);
});
