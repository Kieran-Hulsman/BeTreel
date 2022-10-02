const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const router = new express.Router()
const sharp = require('sharp')
const Post = require('../models/post')


const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('File  must be a png, jpg or jpeg file.'))
        }
        cb(undefined, true)
    }
})

// Create Post
router.post('/posts', upload.single('image'), async (req, res) => {
    const post = new Post(req.body)
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.post.image = buffer
    
    res.send()
    try {
        await post.save()
    } catch (e) {
        res.status(400).send(e)
    }
})

// Get recent posts
router.get('/posts', async (req, res) => {
    try {
        await Post.find({}).sort({createdAt: -1}).limit(12).then((posts) => {
            res.send(posts)
        })
    } catch (e) {
        res.status(500).send(e)
    }

})



module.exports = router
