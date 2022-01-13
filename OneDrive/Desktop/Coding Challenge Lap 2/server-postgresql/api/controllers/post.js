const express = require('express');
const router = express.Router();

const Post = require('../models/post')


async function index (req, res) {
    try {
        const posts = await Post.all
        res.status(200).json(posts)
    } catch(err) {
        res.status(500).json({err})
    }
}

async function show (req, res){
    try {
        const post = await Post.findById(req.params.id);
        const author = await post.author;
        res.status(200).json({...post, authors })    
    } catch(err) {
        res.status(500).send({err})
    }
}

async function destroy (req, res) {
    try {
        const post = await Post.findById(req.params.id);
        const resp = post.destroy();
        res.status(204).end();
    } catch (err) {
        res.status(404).json({err});
    };
}



module.exports = {index, show, destroy};