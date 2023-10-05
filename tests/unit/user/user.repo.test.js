let userDataMock = require('../../mocks/user.data.mock');
let sinon = require('sinon');
let userRepo = require("../../../repositories/user.repo");
let userCollection = require('../../../models/user.model');


describe('Testing user repo', () => {

    afterEach(() => {
        sinon.restore();
    });

    it('should find one email', async () => {
        let userEntity = userDataMock.createUserEntity();
        sinon.stub(userCollection, 'findOne').returns(userEntity);
        let user = userRepo.findOneEmail('testing');
        expect(userEntity).toEqual(user);
    });

    it('should create a new user', async () => {
        let userEntity = userDataMock.createUserEntity();
        sinon.stub(userCollection, 'create').returns(userEntity);
        let user = userRepo.createUser(userEntity);
        expect(userEntity).toEqual(user);
    });
});
