const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  count: {
    type: Number,
    required: false,
    default: 0,
  },
  userId: {
      type: String,
      required: false
  },
  comment: {
    type: String,
    required: true,
  },
  imageUrls: [
    {
      type: String,
      required: false,
    },
  ],
  videoUrls: [
    {
      type: String,
      required: false,
    },
  ],
  house: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
  },
  amenities: {
    electricity_supply: {
      type: String,
      required: false,
    },
    rooms: {
      type: Number,
      required: false,
    },
    water_supply: {
      type: String,
      required: false,
    },
    environment: {
      type: String,
      required: false,
    },
  },
  created_at: {
    type: Number,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Review", reviewSchema);
