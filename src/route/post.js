
const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const { MyError } = require("../error");
const { MyResponse, getRandomOTP } = require('../common/helper')
const { OTP_EXPIRED_IN } = require('../common/constant')
const { uploadKey } = require('../config/uploadKey')
const Post = require('../model/Post')
const User = require('../model/User')
const { GET_USER_INFO, GET_USER_PUBLIC_INFO } = require('../common/api')

router.post("/posts", async (req, res) => {
    try {
        const { offset = 0, pagesize = 10 } = req.body
        // Mặc định lấy 10 bài post đầu tiên;
        if (offset < 0 || pagesize < 0) {
            throw ''
        }
        const posts = await Post.find({}).skip(offset).limit(pagesize)
        const data = await Promise.all(posts.map(async (i) => {
            const userInfo = await User.findOne({ _id: i.authorID })
            let temp = {
                ...i.toObject(),
                author: {
                    id: userInfo._id,
                    avatar: userInfo.avatar,
                    fullname: userInfo.fullname
                }
            }
            delete temp.__v
            delete temp.authorID
            return temp
        }))
        return MyResponse({ res, data: data })
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
        const data = {
            ...newPost.toObject(),
            author: {
                id: userInfo.id,
                avatar: userInfo.avatar,
                fullname: userInfo.fullname
            }
        }
        delete data.authorID
        delete data.__v
        return MyResponse({
            res, data
        })
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
        const data = {
            ...post.toObject(),
            author: {
                id: post.authorID,
                avatar: userPublicInfo.avatar,
                fullname: userPublicInfo.fullname
            }
        }
        delete data.__v
        delete data.authorID
        return MyResponse({
            res, data
        })
    } catch (error) {
        console.log("ERROR view post ", error);
        return MyResponse({ res, status: 500, error: error })
    }
});

module.exports = router;
