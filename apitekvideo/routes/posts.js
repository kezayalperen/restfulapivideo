const express = require('express');
const Post = require('../models/Post');

const router = express.Router();

router.get('/' , (req,res) => {
    res.send('burası posts mekanı')
});

router.post('/' , (req,res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });

    post.save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json({mesaage : err})
        });
});

// Id göre arama

router.get('/:postId', async (req,res) =>{
    try{
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch (err) {
        res.json({mesaage: err})
    }
});

// delete post

router.delete('/:postId', async (req,res) => {
    try{
        const removedPost = await Post.remove({ _id: req.params.postId });
        res.json(removedPost);
    } catch (err) {
        res.json({mesaage: err})
    }
});

// update post

router.patch('/:postId', async (req,res) => {
    try{
        const updatedPost = await Post.updateOne(
            { _id: req.params.postId },
            { $set : { title : req.body.title }}
        );
        res.json(updatedPost);
    } catch (err) {
        res.json({mesaage: err})
    }
});


module.exports = router;