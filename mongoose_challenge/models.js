const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const blogPostSchema = mongoose.Schema({
    title: String,
    content: String,
    author: String,
    created: Date
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = {BlogPost};