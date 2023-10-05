'use strict';

let userRepo = require('../repositories/user.repo');
let e = require("express");

let findOneEmail = function (email) {
    return userRepo.findOneEmail(email);
}

let createUser = function (userEntity) {
    return userRepo.createUser(userEntity);
}

let findUserById = function (userId) {
    return userRepo.findUserById(userId);
}

let deleteUserById = function (userId) {
    return userRepo.deleteUserById(userId);
}

let updateUser = function (userID, userEntity) {
    return userRepo.updateUser(userID, userEntity);
}
const userService = {
    findOneEmail,
    createUser,
    findUserById,
    deleteUserById,
    updateUser
}

module.exports = userService;