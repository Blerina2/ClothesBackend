'use strict';
const UserDto = require("../../dtos/user.dto");
const UserEntity = require("../../models/user.entity");
const {use} = require("chai");
let convertToUserEntity = function (requestBody) {
    const userEntity = new UserEntity();
    userEntity.id = requestBody.id
    userEntity.firstname = requestBody.firstname;
    userEntity.lastname = requestBody.lastname;
    userEntity.birthday = requestBody.birthday;
    userEntity.email = requestBody.email;
    userEntity.phone = requestBody.phone;
    userEntity.password = requestBody.password;
    userEntity.role = requestBody.role;
    userEntity.address = requestBody.address;
    return userEntity;
}

let convertToUserDTO = function (userSchema) {
    const userDTO = new UserDto();
    userDTO.id = userSchema._id;
    userDTO.address = userSchema.address;
    userDTO.firstname = userSchema.firstname;
    userDTO.lastname = userSchema.lastname;
    userDTO.birthday = userSchema.birthday;
    userDTO.email = userSchema.email;
    userDTO.password = userSchema.password;
    userDTO.phone = userSchema.phone;
    userDTO.role = userSchema.role;
    userDTO.createdAt = userSchema.createdAt
    userDTO.updatedAt = userSchema.updatedAt
    return userDTO;
}


const UserConverter = {
    convertToUserEntity,
    convertToUserDTO
}

module.exports = UserConverter;