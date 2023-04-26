const dotenv = require("dotenv").config();
const express = require("express");
const middleware = require("./middleware");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(middleware.errorHandler);

app.get("/", (req, res) => {
  res.status(200).send({ msg: "Home page" });
});

app.use("/task", require("./routes/tasks"));

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`⚡Server: Listening on http://localhost:${port}`);
});
