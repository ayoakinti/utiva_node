const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();
const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", async (req, res) => {
  // res.json({msg: "Hello!"});
  const user = new User({
    fullname: req.body.fullname,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    dateOfBirth: req.body.DOB,
    gender: req.body.gender,
    address: req.body.address,
  });
  try {
    const savedUser = await user.save();
    jwt.sign({ savedUser }, "secretkey", (err, token) => {
      res.status(200).json({savedUser,  token });
    });
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
