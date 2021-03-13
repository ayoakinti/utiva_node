const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  email: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  phone: { type: Number, required: true, min: 6 },
  password: {
    type: String,
    required: false,
    max: 1024,
    min: 6,
  },
  created_at: { type: Number, default: Date.now() },
  dateOfBirth: { type: Date, required: false, default: "" },
  gender: { type: String, required: false },
  address: { type: String, required: false, default: "" },
  verification: {
    status: { type: Boolean, required: false, default: false },
    token: { type: String, required: false, default: "" },
    dateSent: { type: Number, required: false, default: "" },
  },
});

module.exports = mongoose.model("User", userSchema);
