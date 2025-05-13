const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Post = new Schema(
  {
    _id: { type: String },
    title: { type: String },
    content: { type: String },
    createDate: { type: Number },
    authorID: { type: String, required: true }
  },
  { collection: "post" }
);
module.exports = mongoose.model("post", Post);
