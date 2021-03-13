const express = require("express");
const jwt = require("jsonwebtoken");
const verifyToken = require("./middlewares/verifyToken");

const router = express.Router();
const Review = require("../models/Review");

// Get All Reviews
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (err) {
    res.json({ message: err });
  }
});

// Get Reviews by User
router.get("/user", verifyToken, async (req, res) => {
  try {
    // const reviews = await Review.find();
    // res.json(reviews);
    var decoded = jwt.verify(req.token, "secretkey");

    const reviews = await Review.find({ userId: decoded.savedUser._id });

    res.status(200).json({
      message: "Reviews fetched Successfully",
      reviews,
    });
  } catch (err) {
    res.status(403).json({ message: err });
  }
});

// Post a Review
router.post("/", verifyToken, async (req, res) => {
  // res.json({msg: "Hello!"});
  const review = new Review({
    comment: req.body.comment,
    imageUrls: req.body.imageUrls,
    videoUrls: req.body.videoUrls,
    house: req.body.house,
    amenities: req.body.amenities,
  });

  try {
    var decoded = jwt.verify(req.token, "secretkey");
    review.userId = decoded.savedUser._id;
    const savedReview = await review.save();

    res.status(200).json({
      message: "Review created Successfully",
      savedReview,
    });
  } catch (err) {
    res.status(403).json({ message: err });
  }
});

// Get a Specific Review
router.get("/:reviewId", async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    res.json(review);
  } catch (err) {
    res.json({ message: err });
  }
});

// Delete Specific Review
router.delete("/:reviewId", async (req, res) => {
  try {
    const deletedReview = await Review.remove({ _id: req.params.reviewId });
    res.json(deletedReview);
  } catch (err) {
    res.json({ message: err });
  }
});

// Sorting Reviews By Visitors

// Sorting By Votes

router.get("/sortbyvotes", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ count: -1 });
    res.json(reviews);
  } catch (err) {
    res.json({ message: err });
  }
});

// Sorting By Dates

router.get("/sortbydates", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ created_at: -1 });
    res.json(reviews);
  } catch (err) {
    res.json({ message: err });
  }
});

// Upvoting a Review By a Visitor
router.patch("/:reviewId/upvote", async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    const upvotedReview = await Review.updateOne(
      { _id: req.params.reviewId },
      { $set: { count: review.count + 1 } }
    );
    res.json(upvotedReview);
  } catch (err) {
    res.json({ message: err });
  }
});

// Downvoting a Review By a Visitor
router.patch("/:reviewId/downvote", async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    const upvotedReview = await Review.updateOne(
      { _id: req.params.reviewId },
      { $set: { count: review.count - 1 } }
    );
    res.json(upvotedReview);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
