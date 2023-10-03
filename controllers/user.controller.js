'use strict';

const httpStatusCode = require('http-status-codes');
const logger = require('../services/logger.service')
const userService = require('../services/user.service');
const userConverter = require('../middlewares/converters/user.converter');
const serverConfig = require("../configs/server.config");
const {setResponse} = require("./response.utils");


// the parameter 'next' is called, when the current middleware is done, and process to the next middleware
exports.signup = async (request, response, next) => {

    try {
        const userEntity = userConverter.convertToUserEntity(request.body);
        const createdUser = await userService.createUser(userEntity);
        logger.info(`Successfully created a new user with the ${userEntity.email}!`);
        const userDTO = userConverter.convertToUserDTO(createdUser);
        setResponse(response, httpStatusCode.CREATED, true, userDTO)
    } catch (error) {
        next(error);
    }
}

// the parameter 'next' is called, when the current middleware is done, and process to the next middleware
exports.signin = async (request, response, next) => {

    try {

        const userEntity = userConverter.convertToUserEntity(request.body);
        const userExists = await userService.findOneEmail(userEntity.email);

        if (userExists) {
            await userExists.comparePassword(userEntity.password);
            let msg = `User credentials for e-mail ${userEntity.email} correct`;
            logger.info(msg);
            const jwtToken = await userExists.generateJWTToken();
            await addJWTTokenToCookie(response, jwtToken);
            setResponse(response, httpStatusCode.OK, true, jwtToken);

        } else {
            let errorMsg = `Invalid credentials for e-mail ${userEntity.email}`;
            setResponse(response, httpStatusCode.BAD_REQUEST, false, errorMsg)
        }
    } catch (error) {
        next(error);
    }
}

// the parameter 'next' is called, when the current middleware is done, and process to the next middleware
exports.logout = async (request, response, next) => {
    response.clearCookie(serverConfig.web.JWT_COOKIE_TOKEN_NAME);
    setResponse(response, httpStatusCode.OK, true, "Logged out");
}

// the parameter 'next' is called, when the current middleware is done, and process to the next middleware
exports.findUserById = async (request, response, next) => {
    try {
        let userID = {_id: request.params.id}
        const userExists = await userService.findUserById(userID);
        if (userExists) {
            logger.info(`User with id ${request.params.id} exists`);
            return setResponse(response, httpStatusCode.OK, true, userExists);
        } else {
            let errorMsg = `User with id ${request.params.id} doesn't exists`;
            return setResponse(response, httpStatusCode.BAD_REQUEST, false, errorMsg);
        }
    } catch (error) {
        next(error);
    }
}

// the parameter 'next' is called, when the current middleware is done, and process to the next middleware
exports.deleteUserById = async (request, response, next) => {
    try {
        let userID = {_id: request.params.id}
        const userExists = await userService.deleteUserById(userID);
        if (userExists.deletedCount !== 0) {
            let msg = `User with id ${request.params.id} successfully deleted`
            return setResponse(response, httpStatusCode.NO_CONTENT, true, msg);
        } else {
            let errorMsg = `User with id ${request.params.id} doesn't exists`;
            return setResponse(response, httpStatusCode.BAD_REQUEST, false, errorMsg);
        }
    } catch (error) {
        next(error);
    }
}

// the parameter 'next' is called, when the current middleware is done, and process to the next middleware
exports.updateUser = async (request, response, next) => {
    try {
        const userEntity = userConverter.convertToUserEntity(request.body);
        let userID = {_id: request.params.id}
        delete userEntity.id
        let updatedUser = await userService.updateUser(userID, userEntity);
        logger.info(` Successfully update user with id: ${userID} !`);
        updatedUser = await userService.findOneEmail(updatedUser.email);
        const userDTO = userConverter.convertToUserDTO(updatedUser);
        setResponse(response, httpStatusCode.OK, true, userDTO)
    } catch (error) {
        next(error);
    }

}


exports.userProfile = async (request, response, next) => {
    const userDTO = userConverter.convertToUserDTO(request.body);
    setResponse(response, httpStatusCode.OK, true, userDTO);
}

const addJWTTokenToCookie = async (response, jwtToken) => {
    const options = {
        httpOnly: true,
        expires: new Date(Date.now() + serverConfig.web.JWT_EXPIRE_TOKEN_COOKIE)
    }
    response.cookie(serverConfig.web.JWT_COOKIE_TOKEN_NAME, jwtToken, options);
}
