const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  postedUser: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  votes: {
    type: Array,
    default: null,
    votedUser: {
      type: String,
      required: true,
    },
  },
});
module.exports = mongoose.model("Post", postSchema);
