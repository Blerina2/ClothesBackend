let userValidation = require('../../../middlewares/validations/user.validation');
let mocks = require('node-mocks-http');

test('Validating empty request body', () => {
    let request = mocks.createRequest();
    let response = mocks.createResponse();

    userValidation.validateRequestBody(request, response);
    expect(400).toEqual(response._getStatusCode());
    expect('Request body is missing').toEqual(response._getData().message);
    expect(false).toEqual(response._getData().success);

    request.body.firstname = '';
    request.body.lastname = '';
    request.body.birthday = '';
    request.body.email = '';
    request.body.password = '';
    request.body.role = '';

    userValidation.validateRequestBody(request, response);
    expect(400).toEqual(response._getStatusCode());
    expect('Please add a firstname to the request body,' +
        'Please add a lastname to the request body,' +
        'Please add a birthday to the request body,' +
        'Please add a e-mail to the request body,Please add a password to the request body,' +
        'Please add a role to the request body').toEqual(response._getData().message);
    expect(false).toEqual(response._getData().success);
});


test('Validating key value of request body', () => {
    let request = mocks.createRequest();
    let response = mocks.createResponse();

    request.body.firstname = 'user.validation.tests.js';
    request.body.lastname = 'user.validation.tests.js';
    request.body.birthday = '17/02/2008';
    request.body.email = 'user.validation.tests@uni-pristina.ks';
    request.body.password = 'userValidation!2023';
    request.body.role = 1;

    userValidation.validateRequestBody(request, response, next);
    expect(200).toEqual(response._getStatusCode());
    expect(undefined).toEqual(response._getData().message);
})


test('Validating birthday format of request body', () => {
    let request = mocks.createRequest();
    let response = mocks.createResponse();

    request.body.firstname = 'user.validation.tests.js';
    request.body.lastname = 'user.validation.tests.js';
    request.body.birthday = '17/0211/2008';
    request.body.email = 'user.validation.tests@uni-pristina.ks';
    request.body.password = 'userValidation!2023';
    request.body.role = 1;

    userValidation.validateRequestBody(request, response);
    expect(400).toEqual(response._getStatusCode());
    expect('Please add a birthday with this format DD/MM/YYYY (e.g 17/02/2008) and not 17/0211/2008').toEqual(response._getData().message);
    expect(false).toEqual(response._getData().success);
})


test('Validating email format of request body', () => {
    let request = mocks.createRequest();
    let response = mocks.createResponse();

    request.body.firstname = 'user.validation.tests.js';
    request.body.lastname = 'user.validation.tests.js';
    request.body.birthday = '17/02/2008';
    request.body.email = 'user.validation.testuni-pristina.ks';
    request.body.password = 'userValidation!2023';
    request.body.role = 1;

    userValidation.validateRequestBody(request, response);
    expect(400).toEqual(response._getStatusCode());
    expect('Please add a valid e-mail: user.validation.testuni-pristina.ks!').toEqual(response._getData().message);
    expect(false).toEqual(response._getData().success);
})


test('Validating password format of request body', () => {
    let request = mocks.createRequest();
    let response = mocks.createResponse();

    request.body.firstname = 'user.validation.tests.js';
    request.body.lastname = 'user.validation.tests.js';
    request.body.birthday = '17/02/2008';
    request.body.email = 'user.validation.tests@uni-pristina.ks';
    request.body.password = 'userVali';
    request.body.role = 1;

    userValidation.validateRequestBody(request, response);
    expect(400).toEqual(response._getStatusCode());
    expect('Please add a valid password. Minimum 5 and maximum 20 character. \n        Password must contain at least one uppercase character, one lowercase character, one digit, one special character').toEqual(response._getData().message);
    expect(false).toEqual(response._getData().success);
})

test('Validating role value of request body', () => {
    let request = mocks.createRequest();
    let response = mocks.createResponse();

    request.body.firstname = 'user.validation.tests.js';
    request.body.lastname = 'user.validation.tests.js';
    request.body.birthday = '17/02/2008';
    request.body.email = 'user.validation.tests@uni-pristina.ks';
    request.body.password = 'userValidation!2023';
    request.body.role = 10;

    userValidation.validateRequestBody(request, response);
    expect(400).toEqual(response._getStatusCode());
    expect('Please add a valid role to the request body').toEqual(response._getData().message);
    expect(false).toEqual(response._getData().success);
})

function next() {
    console.log("testing");
}
