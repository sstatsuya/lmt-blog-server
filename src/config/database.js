const mongoose = require("mongoose");
const connect = async () => {
  mongoose
    .connect(
      `mongodb+srv://binpro113wer:Aa123456@cluster0.pc9zh5i.mongodb.net/LMTBlog`
    )
    .then(() => {
      console.log("Ket noi database thanh cong");
    })
    .catch((error) => {
      console.log("Ket noi database that bai " + error);
    });
};

module.exports = { connect };
