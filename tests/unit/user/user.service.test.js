let userDataMock = require('../../mocks/user.data.mock');
let sinon = require('sinon');
let userRepo = require("../../../repositories/user.repo");
let userService = require("../../../services/user.service");


describe('Testing user repo', () => {

    afterEach(() => {
        sinon.restore();
    });

    it('should find one email', async () => {
        let userEntity = userDataMock.createUserEntity();
        sinon.stub(userRepo, 'findOneEmail').returns(userEntity);
        let user = userService.findOneEmail('testing');
        expect(userEntity).toEqual(user);
    });

    it('should create a new user', async () => {
        let userEntity = userDataMock.createUserEntity();
        sinon.stub(userRepo, 'createUser').returns(userEntity);
        let user = userService.createUser(userEntity);
        expect(userEntity).toEqual(user);
    });
});
