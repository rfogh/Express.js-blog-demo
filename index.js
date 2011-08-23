var express = require('express'),
    userController = require('./controllers/user'),
    loginController = require('./controllers/login'),
    blogController = require('./controllers/blog');

var app = express.createServer();

app.configure(function() {
    app.use(express.bodyParser());
    app.use(express.static(__dirname + '/public'));
    app.use(express.cookieParser());
    app.use(express.session({ secret: "S0m3th1ng v3ry s3cr37" }));
    app.dynamicHelpers({
        session: function(req, res) {
            return req.session;
        }
    });
});


app.get('/login', loginController.show);
app.post('/login', loginController.login);
app.del('/login', loginController.logout);
app.get('/logout', loginController.logout);

app.get('/users', userController.current);
app.post('/users', userController.create);
app.put('/users', userController.update);
app.del('/users/:name', userController.remove);
app.get('/users/:name', userController.details);

app.get('/write', blogController.write);
app.get('/', blogController.show);
app.post('/', blogController.post);
app.get('/:id', blogController.read);
app.post('/:id', blogController.comment);


app.listen(process.env.C9_PORT);
