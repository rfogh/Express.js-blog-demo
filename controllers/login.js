var error = require('./error'),
    User = require('../model').User;


exports.show = function(req, res) {
    res.render('login/login.ejs', { title: 'Log in' });
};


exports.login = function(req, res) {
    User.findOne({name: req.param('name')}, function(err, user) {
        error.check(err, function(req, res) {
            if (user === null || req.param('password') != user.password) {
                error.show(res, { message: 'Wrong username and/or password' });
            } else {
                req.session.loggedIn = true;
                req.session.isAdmin = user.admin;
                req.session.user = user;
                res.redirect('/');
            }
        })(req, res);
    });
    
};


exports.logout = function(req, res) {
    delete req.session.loggedIn;
    delete req.session.isAdmin;
    delete req.session.user;
    res.redirect('/');
};

