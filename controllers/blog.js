var model = require('../model'),
    error = require('./error'),
    BlogPost = model.BlogPost,
    Comment = model.Comment;
    
    
exports.show = function(req, res) {
    BlogPost.find({}, function(err, posts) {
        error.check(err, function(req, res) {
            res.render('blog/show.ejs', {
                title: 'How to node',
                posts: posts
            });
        })(req, res);
    });
};


exports.read = function(req, res) {
    BlogPost.findOne({_id: req.params.id}, function(err, post) {
        error.check(err, function(req, res) {
            res.render('blog/read.ejs', {
                title: post.title,
                blog: post
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
