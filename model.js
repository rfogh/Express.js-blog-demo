var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    validate = require('./validation');


var User = new Schema({
    name: { type: String, required: true, unique: true, validate: [validate.name, 'name'] },
    email: { type: String, required: true, validate: [validate.email, 'email'] },
    password: { type: String, required: true },
    admin: Boolean
});
mongoose.model('User', User);
exports.User = mongoose.model('User');


var Comment = new Schema({
    body: String,
    date: Date,
    user: ObjectId
});

var BlogPost = new Schema({
    author: ObjectId,
    title: String,
    body: String,
    date: Date,
    comments: [Comment]
});
mongoose.model('BlogPost', BlogPost);
exports.BlogPost = mongoose.model('BlogPost');
    
    
mongoose.connect('mongodb://express:tryout@staff.mongohq.com:10017/expresstryout');

