let userConverter = require('../../../middlewares/converters/user.converter');
let userDataMock = require('../../mocks/user.data.mock');

test('Convert request body to user DTO (Data Transfer Object)', () => {
    let userDTO = userDataMock.createRequestBody();
    let userEntity = userConverter.convertToUserEntity(userDTO);
    expect(userDTO).toEqual(userEntity);
});

test('Convert user entity to user DTO (Data Transfer Object)', () => {
    let userEntity = userDataMock.createUserEntity();
    let userDTO = userConverter.convertToUserEntity(userEntity);
    expect(userEntity).toEqual(userDTO);
});
