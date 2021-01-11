const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

const User = require("../models/user.model");

router.get("/", verifyToken, (req, res) => {
  User.find({}, (err, result) => {
    if (err) return res.status(403).send("can't get the data");
    res.status(200).send(result);
  });
});
router.get("/:id", verifyToken, (req, res) => {
  User.findById(req.params.id, (err, result) => {
    if (err) return res.status(403).send("can't get the data");
    res.status(200).send(result);
  });
});
router.delete("/:id", verifyToken, (req, res) => {
  User.findByIdAndRemove(req.params.id, (err) => {
    if (err) return res.status(400).send("can't delete the user");
    res.status(200).send("Deleted the user successfully");
  });
});
router.patch("/:id", verifyToken, (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, email: req.body.email, password: req.body.password },
    (err, result) => {
      if (err) return res.status(400).send(err);
      res.status(200).send("Updated the user successfully");
    }
  );
});
module.exports = router;
