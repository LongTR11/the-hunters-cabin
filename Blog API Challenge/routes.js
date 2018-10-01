
const express = require('express');
const router = express.Router();
const {BlogPosts} = require('./models');
const 

router.get('/blog-posts', blogPostsController.getAll);
router.post('/blog-posts', BlogPosts.create()); 
router.put('/blog-posts/:id', BlogPosts.update());
router.delete('/blog-posts/:id', BlogPosts.delete());