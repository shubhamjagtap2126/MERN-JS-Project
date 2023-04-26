require("dotenv").config();
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hi");
});

app.listen(process.env.PORT, () => {
  console.log(`Server: Listening on http://localhost:${process.env.PORT}`);
});
