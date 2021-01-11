const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const Post = require("../models/post.model");
const User = require("../models/user.model");

router.get("/", verifyToken, (req, res) => {
  Post.find({}, (err, result) => {
    if (err) return res.status(403).send("can't get the data");
    res.status(200).send(result);
  });
});
router.get("/:id", verifyToken, (req, res) => {
  Post.findById(req.params.id, (err, result) => {
    if (err) return res.status(403).send("can't get the data");
    res.status(200).send(result);
  });
});

router.post("/create", verifyToken, async (req, res) => {
  const user = await User.findById(res.user);
  const post = new Post({
    postedUser: user.name,
    text: req.body.text,
  });
  try {
    await post.save();
    res.status(200).send("post created successfully");
  } catch {
    res.status(400).send("can't create new post");
  }
});
module.exports = router;
