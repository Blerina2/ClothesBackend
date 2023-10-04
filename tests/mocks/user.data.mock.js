let UserEntity = require("../../models/user.entity");

function createRequestBody() {
    return {
        firstname: "user.converter.tests.js",
        lastname: "user.converter.tests.js",
        birthday: "17/02/2008",
        email: generateRandomNumber() + "userConverterTest@uni-pristina.ks",
        password: "KosovA1!?_",
        role: 1,
        address: "Sheshi “ Nëna Terezë ” p.n 10000 Prishtinë, Kosovë",
        phone: "+383 (038) 200 12 048"
    }
}

function createUserEntity() {
    let userEntity = new UserEntity();
    userEntity.firstname = "user.converter.tests.js";
    userEntity.lastname = "user.converter.tests.js";
    userEntity.birthday = "17/02/2008";
    userEntity.email = generateRandomNumber() + "userConverterTest@uni-pristina.ks";
    userEntity.password = "KosovA1!?_";
    userEntity.role = 1;
    userEntity.address = "Sheshi “ Nëna Terezë ” p.n 10000 Prishtinë, Kosovë";
    userEntity.phone = "+383 (038) 200 12 048";
    return userEntity;
}

function generateRandomNumber() {
    return Math.floor(Math.random() * 1000);
}

const UserDataMock = {
    createUserEntity,
    createRequestBody
}

module.exports = UserDataMock;