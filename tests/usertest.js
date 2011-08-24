var nodemock = require("nodemock");

exports.details_show_user = function(test) {

    var mockedUser = nodemock.mock('findOne').takes({}, function(){}).calls(1, [undefined, { name: 'username' }])
        mockedModel = { 'User': mockedUser },
        user = require('../controllers/user')(mockedModel),
        mockReq = { params: { name: 'username' } },
        mockRes = nodemock.mock('render').takes('user/details.ejs', {});
    
    user.details(mockReq, mockRes);
    
    mockRes.assert();
    test.done();
};

exports.details_show_error = function(test) {

    var mockedUser = nodemock.mock('findOne').takes({}, function(){}).calls(1, [{ message: 'errortext' }, undefined]),
        mockedModel = { 'User': mockedUser },
        user = require('../controllers/user')(mockedModel),
        mockReq = { params: { name: 'username' } },
        mockRes = nodemock.mock('render').takes('error.ejs', {});
    
    user.details(mockReq, mockRes);
    
    mockRes.assert();
    test.done();
};
