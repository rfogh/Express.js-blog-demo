
exports.name = validateUserName;
function validateUserName(name) {
    
    var validName = /^[a-zA-Z0-9_\.\-]+$/;
    
    return typeof(name) != 'undefined' && name.length > 4 && validName.test(name);
}

exports.email = validateEmail;
function validateEmail(email) {
    var validEmail = /^[a-zA-Z0-9_\.\-]+\@([a-zA-Z0-9\-]+\.)+[a-zA-Z0-9]{2,4}$/;

    return typeof(email) != 'undefined' && validEmail.test(email);
}

exports.password = validatePassword;
function validatePassword(password) {
    return typeof(password) != 'undefined' && password.length > 3;
}


