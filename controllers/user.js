module.exports = function(model) {
    if (typeof(model) == 'undefined' || model === null) {
        model = require('../model');
    }
    var error = require('./error'),
        User = model.User;

    return {
        current: function(req, res) {
            res.redirect("/users/"+ session.user.name);
        },
        
        
        details: function(req, res) {
            User.findOne({name: req.params.name}, function(err, user) {
                error.check(err, function(req, res) {
                    res.render('user/details.ejs', {
                        title: 'Details for ' + user.name,
                        user: user
                    });
                })(req, res);
            });
        },
        
        
        create: function(req, res) {
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
        },
        
        
        update: function(req, res) {
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
        },
        
        
        remove: function(req, res) {
            User.findOne({name: req.params.name}, function(err, user) {
                error.check(err, function(req, res) {
                    user.remove();
                    res.redirect('/users');
                })(req, res);
            });
        }
    };
}
