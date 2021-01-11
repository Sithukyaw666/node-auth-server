const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const app = express();
const port = process.env.PORT || 5000;
dotenv.config();
mongoose.connect(
  process.env.DB_CONFIG,

  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },

  () => console.log("connected to DB!")
);
const auth = require("./routes/auth");
const user = require("./routes/users");
const posts = require("./routes/posts");

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/", auth);
app.use("/user", user);
app.use("/posts", posts);

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});
app.listen(port, () =>
  console.log(`server is running on http://localhost:${port}`)
);
