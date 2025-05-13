var express = require("express");
var app = express();
const cors = require("cors");
const multer = require("multer");
app.use(cors());
app.use("/uploads", express.static("uploads"));
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

var upload = multer({ storage: storage });

module.exports = upload
