
const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const { MyError } = require("../error");
const { MyResponse, getRandomOTP } = require('../common/helper')
const { OTP_EXPIRED_IN } = require('../common/constant')
const { uploadKey } = require('../config/uploadKey')





module.exports = router;
