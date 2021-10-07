require("./lib/config");

const mongoose = require("mongoose");

const express = require("express");
// const pino = require('pino-http');
const cors = require("cors");

const app = express();
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());
app.use(cors());
// app.use(pino({ level: process.env.LOG_LEVEL }));

app.use("/users", require("./routes/users"));
app.use("/google", require("./routes/google"));
app.use("/signup", require("./routes/signup"));
app.use("/login", require("./routes/login"));
app.use("/sensibo", require("./routes/sensibo"));

module.exports = app;

const host = process.env.HOST;
const port = +process.env.PORT;

const url = process.env.MONGO_URL;

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    if (process.env.NODE_ENV !== "test") {
      app.listen(port, host, () => {
        console.log(
          `The server is listening at http://${host}:${port} and is connected to MongoDB`
        );
      });
    }
  })
  .catch(() => {
    console.log(
      "Something went wrong. The server is not running and/or not connected to MongoDB!"
    );
  });
