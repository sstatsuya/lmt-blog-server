const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LMTBlogDB = mongoose.createConnection(
  `mongodb+srv://binpro113wer:Aa123456@cluster0.pc9zh5i.mongodb.net/LMTBlog`
);

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
module.exports = LMTBlogDB.model("post", Post);
