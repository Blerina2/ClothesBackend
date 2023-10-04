'use strict';

const userService = require('../../services/user.service');
const ErrorDto = require("../../dtos/error.dto");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const httpStatusCode = require("http-status-codes");
const serverConfig = require("../../configs/server.config");
const loggerService = require("../../services/logger.service");


exports.isAuthenticated = async (request, response, next) => {

    let isUserFound;

    // check for basic auth header
    if (!request.headers.authorization || request.headers.authorization.indexOf('Basic ') === -1) {
        isUserFound = false;
    } else {
        isUserFound = await verifyUserCredentials(request, next);
    }

    // check for jwt token in header and cookie
    if (!isUserFound && (!request.headers.authorization || !request.headers.authorization.startsWith('Bearer')) && !request.cookie) {
        next(new ErrorDto('You must provide your credentials (token or user with password) to access the resource', httpStatusCode.UNAUTHORIZED));
    } else if (!isUserFound) {
        isUserFound = await verifyJWTToken(request, next);
    }

    if (!isUserFound) {
        next(new ErrorDto('You must provide your credentials (token or user with password) to access the resource', httpStatusCode.UNAUTHORIZED));
    }


    if (request.params.id && !isAuthorizedToPerformAction(request, isUserFound)) {
        next(new ErrorDto(`You are not allow to perform this action on this resource (${request.params.id})`, httpStatusCode.FORBIDDEN));
    }


    // // set request body, after authenticate successfully,
    // // because the controller needs to work with the data.
    // // Don't need to do again a database call.
    if (typeof request.body === 'object' && Object.keys(request.body).length === 0) {
        request.body = isUserFound;
    }

    next();
}


function isAuthorizedToPerformAction(request, userFound) {
    let userIdPath = request.params.id
    if (userIdPath && userIdPath === userFound.id) {
        return true;
    }

    return false;
}

const verifyUserCredentials = async (request, next) => {
    try {
        const base64Credentials = request.headers.authorization.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [email, password] = credentials.split(':');
        const userFound = await userService.findOneEmail(email);
        if (!userFound) {
            loggerService.info(`User not found (${email})`);
            return false
        } else {
            if (await bcrypt.compare(password, userFound.password)) {
                return userFound
            }
            return false;
        }
    } catch (error) {
        next(error);
    }
}

const verifyJWTToken = async (request, next) => {
    try {
        let token = request.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, serverConfig.web.JWT_TOKEN_SECRET);
        let id = {
            _id: decoded.id
        }

        const userFound = await userService.findUserById(id);

        if (!userFound) {
            loggerService.info(`User not found (${decoded.id})`);
            return false
        } else {
            return userFound
        }
    } catch (error) {
        next(error);
    }
}

