const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
// const myPlaintextPassword = "s0//P4$$w0rD";
// const someOtherPlaintextPassword = "not_bacon";

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
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(req.body.password, salt);
  // res.json({msg: "Hello!"});
  const user = new User({
    fullname: req.body.fullname,
    email: req.body.email,
    phone: req.body.phone,
    password: hash,
    dateOfBirth: req.body.DOB,
    gender: req.body.gender,
    address: req.body.address,
  });
  try {
    const savedUser = await user.save();
    jwt.sign({ savedUser }, "secretkey", (err, token) => {
      res.status(200).json({ savedUser, token });
    });
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
