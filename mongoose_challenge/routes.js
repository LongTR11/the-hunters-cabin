
const express = require('express');
const router = express.Router();
const BlogPostController = require('./blogPostController');

router.get('/blog-posts', BlogPostController.getAll);
router.post('/blog-posts', BlogPostController.create); 
router.put('/blog-posts/:id', BlogPostController.update);
router.delete('/blog-posts/:id', BlogPostController.destroy);

module.exports = router;