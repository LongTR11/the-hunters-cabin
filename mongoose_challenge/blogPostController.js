const mongoose = require('mongoose');

const { BlogPosts } = require('./models')


// getAll
function getAll(req,res) {
    //use the class method to retrieve data
    //be sure to return json in your requests as we are not using a templating view engine in this app
    BlogPosts.find().then(function(blogPosts) {
        res.json(blogPosts);
    });
}

//post
function post(req,res) {
BlogPosts.save(req.body).then(function(blogPost) {
    res.json(blogPost);
    });
}

//put
function update(req, res) {
    res.json(BlogPosts.update({
        id: req.params.id,
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        created: req.body.created
    }));
}
// delete
function destroy(req, res) {
    const blogPost = req.params.id;
    BlogPosts.delete(blogPost);
    res.json({message: 'Blog post terminated.'});
}

const BlogPostController = {
    getAll: getAll,
    create: post,
    update: update,
    destroy: destroy
};

module.exports = BlogPostController;