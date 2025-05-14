const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authenDB = mongoose.createConnection(
  `mongodb+srv://binpro113wer:Aa123456@cluster0.pc9zh5i.mongodb.net/authen`
);

const Account = new Schema(
  {
    _id: { type: String, required: true },
    fullname: { type: String },
    username: { type: String },
    password: { type: String, select: false },
    token: { type: String },
    role: { type: String },
    avatar: { type: String },
    address: { type: String },
    phoneNumber: { type: String },
    email: { type: String },
    otp: { type: String },
    otpTime: { type: Number },
    otpToken: { type: String },
  },
  { collection: "account" }
);
module.exports = authenDB.model("account", Account);
