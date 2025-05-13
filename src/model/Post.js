const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Post = new Schema(
  {
    _id: { type: String, required: true },
    userID: { type: String, required: true },
  },
  { collection: "post" }
);
module.exports = mongoose.model("post", Post);
