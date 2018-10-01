const {BlogPosts} = require('../models')

// getAll
BlogPost.find().then(function(pets) {
    res.render('blog-posts', );
});

//post

//put
function update(req, res) {
    res.render('/blog-posts/:id');
}

// delete
function destroy(req, res) {
    Pet.findByIdAndRemove(req.params.id).then(function(blogPost) {
        res.redirect('/blog-posts/:id');
    })
}

const BlogPostsController = {
    getAll: getAll,
    post: post,
    put: put,
    destroy: destroy
};

module.export = BlogPostsController;