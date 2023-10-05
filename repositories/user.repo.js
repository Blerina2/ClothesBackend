'use strict';

const userCollection = require('../models/user.model');
let findOneEmail = function (email) {
    return userCollection.findOne({email: email});
}

let createUser = function (userEntity) {
    return userCollection.create(userEntity);
}
let findUserById = function (userId) {
    return userCollection.findById(userId);
}

let deleteUserById = function (userId) {
    return userCollection.deleteOne(userId);
}

let updateUser = function (userID, userEntity) {
    return userCollection.findByIdAndUpdate(userID, userEntity);
}
const userRepo = {
    findOneEmail,
    createUser,
    findUserById,
    deleteUserById,
    updateUser
}

module.exports = userRepo;