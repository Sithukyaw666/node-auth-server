const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {
  registerValidation,
  loginValidation,
} = require("../validation/validation");
const User = require("../models/user.model");

router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const saltRounds = 10;
  const hashPassword = await bcrypt.hash(
    req.body.password.toString(),
    saltRounds
  );
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });
  try {
    await user.save();

    res.status(200).send("registered successfully");
  } catch {
    res.status(400).send("can't add new user");
  }
});
router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(401).send("user not found");

  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) return res.status(401).send("password incorrect");
  if (match) {
    const token = jwt.sign({ user: user._id }, process.env.TOKEN_SECRET);
    return res
      .cookie("authToken", token, { httpOnly: true })
      .redirect("/posts");
  }
});

module.exports = router;
