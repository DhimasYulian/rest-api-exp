const express = require('express');
const router = express.Router();

const Posts = require('../../models/Posts');

// Route for GET api/post
router.get('/', async (req, res) => {
    try {
        const posts = await Posts.find();
        if (!posts) throw Error('No post');
        res.status(200).json(posts);
    } catch (error) {
        res.status(400).json({
            msg: error
        })
    }
})

// Route for GET api/post/:id
router.get('/:id', async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);
        if (!post) throw Error('No post');
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({
            msg: error
        })
    }
})

// Route for POST api/post
router.post('/', async (req, res) => {
    const newPost = new Posts(req.body);
    try {
        const post = await newPost.save();
        if (!post) throw Error('Something went wrong')
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({
            msg: error
        })
    }
    // res.send('hey this works')
})

// Route for DELETE api/post/:id
router.delete('/:id', async (req, res) => {
    try {
        const post = await Posts.findByIdAndDelete(req.params.id)
        if (!post) throw Error('No post to delete')
        res.status(200).json({
            success: true
        })
    } catch (error) {
        res.status(400).json({
            msg: error
        })
    }
})

// Route for UPDATE api/post/:id
router.patch('/:id', async (req, res) => {
    try {
        const post = await Posts.findByIdAndUpdate(req.params.id, req.body)
        if (!post) throw Error('Something wemt wrong')
        res.status(200).json({
            success: true
        })
    } catch (error) {
        res.status(400).json({
            msg: error
        })
    }
})

module.exports = router;