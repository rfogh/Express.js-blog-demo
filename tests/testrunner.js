var reporter = require('nodeunit').reporters.default;


exports.run = function(req, res) {
    reporter.run(['tests/usertest.js']);
    
    res.end('tests run. check console for result.');
};