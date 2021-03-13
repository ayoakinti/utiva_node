const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const bodyParser = require("body-parser");
require("dotenv/config");

const app = express();

// Bodyparser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Cors middleware
app.use(cors());

const usersRoute = require("./routes/users");
const reviewsRoute = require("./routes/reviews");

// Routes middleware
app.use("/users", usersRoute);
app.use("/reviews", reviewsRoute);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, GET, POST, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  // for preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

const PORT = process.env.PORT || "8080";

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to DB!");
  }
);

app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
