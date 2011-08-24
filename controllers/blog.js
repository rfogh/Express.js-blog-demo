var async = require('async'),
    model = require('../model'),
    error = require('./error'),
    User = model.User,
    BlogPost = model.BlogPost,
    Comment = model.Comment;
    
    
exports.show = function(req, res) {
    BlogPost.find({}, function(err, posts) {
        error.check(err, function(req, res) {
            async.map(posts, getAuthor, function (err, users) {
                res.render('blog/show.ejs', {
                    title: 'How to node',
                    posts: posts,
                    authors: users
                });
            });
        })(req, res);
    });
};


function getAuthor(post, callback) {
    User.findById(post.author, function (err, user) {
        callback(null, user); //eat any error
    });
};

function getUsers(comment, callback) {
    User.findById(comment.user, function (err, user) {
        callback(null, user); //eat any error
    });
};


exports.read = function(req, res) {
    BlogPost.findOne({_id: req.params.id}, function(err, post) {
        error.check(err, function(req, res) {
            getAuthor(post, function (err, user) {
                async.map(post.comments, getUsers, function(err, users) {
                    res.render('blog/read.ejs', {
                        title: post.title,
                        blog: post,
                        author: user,
                        users: users
                    });
                });
            });
        })(req, res);
    });
};


exports.write = function(req, res) {
    res.render('blog/write.ejs', { title: 'Write a blog post' });
};


exports.post = function(req, res) {
    if (!req.session.isAdmin) {
        return error.show(res, { message: 'Only admins can post' });
    }
    var blogpost = new BlogPost({
        author: req.session.user._id,
        title: req.param('title'),
        body: req.param('body'),
        date: new Date()
    });

    blogpost.save(function(err) {
        error.check(err, function(req, res) {
            res.redirect('/');
        })(req, res);
    });
};


exports.comment = function(req, res) {
    BlogPost.findOne({_id: req.params.id}, function(err, blog) {
        error.check(err, function(req, res) {
            blog.comments.push({
                body: req.param('body'),
                date: new Date(),
                user: req.session.user._id
            });
            blog.save(function(err) {
                error.check(err, function(req, res) {
                    res.redirect('/'+ req.params.id);
                })(req, res);
            });
        })(req, res);
    });
};


exports.remove = function(req, res) {
    BlogPost.findOne({_id: req.params.id}, function(err, blog) {
        error.check(err, function(req, res) {
            blog.remove();
            res.redirect('/');
        })(req, res);
    });
};
