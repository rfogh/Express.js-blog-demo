

exports.show = showError;
function showError(res, err) {
    res.render('error.ejs', {
        title: 'Error during request',
        err: err
    });
}


exports.check = function(err, callback) {
    if (typeof(err) == 'undefined' || err === null) {
        return callback;
    } else {
        return function (req, res) {
            showError(res, err);
        };
    }
};

