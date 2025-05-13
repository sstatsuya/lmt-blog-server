
const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const { MyError } = require("../error");
const { MyResponse, getRandomOTP } = require('../common/helper')
const { OTP_EXPIRED_IN } = require('../common/constant')
const { uploadKey } = require('../config/uploadKey')
const Post = require('../model/Post')
const { GET_USER_INFO, GET_USER_PUBLIC_INFO } = require('../common/api')

router.post("/posts", async (req, res) => {
    try {
        const { offset = 0, pagesize = 10 } = req.body
        // Mặc định lấy 10 bài post đầu tiên;
        if (offset < 0 || pagesize < 0) {
            throw ''
        }
        const posts = await Post.find({}).skip(offset).limit(pagesize)
        return MyResponse({ res, data: posts })
    } catch (error) {
        console.log("ERROR login ", error);
        return MyResponse({ res, status: 500, error: error })
    }
});

router.post("/create-post", async (req, res) => {
    try {
        const { title, content } = req.body
        const { authorization: token } = req.headers
        let error = ''
        if (!title) error = 'Thiếu title'
        else if (!content) error = 'Thiếu content'
        if (error.length > 0) throw 'Lỗi: ' + error

        const userInfoRes = await fetch(GET_USER_INFO, {
            method: 'POST',
            headers: {
                'authorization': token
            }
        })
        const userInfo = await userInfoRes.json();

        console.log('tien xem ', userInfo)
        if (userInfo.error) throw userInfo.message

        const newPost = new Post({
            _id: uuidv4(),
            title,
            content,
            createDate: new Date().valueOf(),
            authorID: userInfo.id,
        })
        await newPost.save();
        return MyResponse({ res, data: newPost })
    } catch (error) {
        console.log("ERROR createPost ", error);
        return MyResponse({ res, status: 500, error: error })
    }
});


router.get("/view/:id", async (req, res) => {
    try {
        const { id } = req.params
        const post = await Post.findOne({ _id: id })
        console.log('tien xem post ', post)
        if (!post) throw 'Post not found'
        const userPublicInfoRes = await fetch(GET_USER_PUBLIC_INFO, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Đảm bảo thông báo rằng bạn đang gửi JSON
            },
            body: JSON.stringify({
                userID: post.authorID
            })
        })
        const userPublicInfo = await userPublicInfoRes.json();
        return MyResponse({
            res, data: {
                ...post.toObject(),
                ...userPublicInfo
            }
        })
    } catch (error) {
        console.log("ERROR view post ", error);
        return MyResponse({ res, status: 500, error: error })
    }
});

module.exports = router;
