let userController = require('../../../controllers/user.controller');
let userService = require('../../../services/user.service');
let userDataMock = require('../../mocks/user.data.mock');
let sinon = require('sinon');
let nodeMocksHttp = require('node-mocks-http');

const flushPromises = () => new Promise(setImmediate);

describe('Testing signup in user controller', () => {

    afterEach(() => {
        sinon.restore();
    });

    it('should find one email', async () => {
        sinon.stub(userService, 'findOneEmail').resolves(userDataMock.createUserEntity());
        let request = nodeMocksHttp.createRequest();
        request.body = userDataMock.createRequestBody();
        let response = nodeMocksHttp.createResponse();
        userController.signup(request, response);
        await flushPromises();
        expect(400).toEqual(response._getStatusCode());
        expect('Email userConverterTest@uni-pristina.ks is already in use!').toEqual(response._getJSONData().message);
        expect(false).toEqual(response._getJSONData().success);
    });

    it('should create a new user', async () => {
        sinon.stub(userService, 'findOneEmail').resolves(null);
        sinon.stub(userService, 'createUser').resolves(userDataMock.createUserEntity());
        let request = nodeMocksHttp.createRequest();
        request.body = userDataMock.createRequestBody();
        let response = nodeMocksHttp.createResponse();
        userController.signup(request, response);
        await flushPromises();
        expect(201).toEqual(response._getStatusCode());
        expect('user.converter.tests.js').toEqual(response._getJSONData().message.firstname);
        expect(true).toEqual(response._getJSONData().success);
    });

    it('should fail because database connection is missing', async () => {
        sinon.stub(userService, 'findOneEmail').returns(null);
        sinon.stub(userService, 'createUser').throws();
        let request = nodeMocksHttp.createRequest();
        request.body = userDataMock.createRequestBody();
        let response = nodeMocksHttp.createResponse();
        userController.signup(request, response);
        await flushPromises();
        expect(500).toEqual(response._getStatusCode());
        expect(false).toEqual(response._getJSONData().success);
    });
});
