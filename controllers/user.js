var error = require('./error'),
    model = require('../model'),
    User = model.User;
    

exports.current = function(req, res) {
    res.redirect("/"+ session.user.name);
};


exports.details = function(req, res) {
    User.findOne({name: req.params.name}, function(err, user) {
        error.check(err, function(req, res) {
            res.render('user/details.ejs', {
                title: 'Details for ' + user.name,
                user: user
            });
        })(req, res);
    });
};


exports.create = function(req, res) {
    var user = new User({
        name: req.param('name'),
        email: req.param('email'),
        password: req.param('password'),
        isAdmin: false
    });

    user.save(function(err) {
        error.check(err, function(req, res) {
            res.redirect('/login');
        })(req, res);
    });
};


exports.update = function(req, res) {
    User.findOne({_id: req.param('id')}, function(err, user) {
        error.check(err, function(req, res) {
            user.name = req.param('name');
            user.email = req.param('email');
            user.password = req.param('password');
            user.update(function(err) {
                error.check(err, function(req, res) {
                    res.redirect('/users');
                })(req, res);
            });
        })(req, res);
    });
};


exports.remove = function(req, res) {
    User.findOne({name: req.params.name}, function(err, user) {
        error.check(err, function(req, res) {
            user.remove();
            res.redirect('/users');
        })(req, res);
    });
};
