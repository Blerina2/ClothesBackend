'use strict';

let loggerService = require('../../services/logger.service');
let httpStatusCode = require("http-status-codes");
let {
    PASSWORD_REGEX_PATTERN,
    EMAIL_REGEX_PATTERN,
    SYSTEM_MANAGER_ROLE,
    CUSTOMER_ROLE, BIRTHDAY_REGEX_PATTERN
} = require("../utils/constantslist");
let validateRequestBody = (request, response, next) => {

    let validationFailures = [];

    let isRequestBodyEmpty = validateBody(request, validationFailures);
    validateFirstname(isRequestBodyEmpty, request, validationFailures);
    validateLastname(isRequestBodyEmpty, request, validationFailures);
    validateBirthday(isRequestBodyEmpty, request, validationFailures);
    validateEmail(isRequestBodyEmpty, request, validationFailures);
    validatePassword(isRequestBodyEmpty, request, validationFailures);
    validateRole(isRequestBodyEmpty, request, validationFailures);

    if (existsValidationFailures(response, validationFailures)) {
        return;
    }
    next();
}

let validateUpdateBody = (request, response, next) => {
    let validationFailures = [];
    let isRequestBodyEmpty = validateBody(request, validationFailures);
    validateId(isRequestBodyEmpty, request, validationFailures);
    validateFirstname(isRequestBodyEmpty, request, validationFailures);
    validateLastname(isRequestBodyEmpty, request, validationFailures);
    validateBirthday(isRequestBodyEmpty, request, validationFailures);
    validateEmail(isRequestBodyEmpty, request, validationFailures);
    validateRole(isRequestBodyEmpty, request, validationFailures);

    if (existsValidationFailures(response, validationFailures)) {
        return;
    }
    next();
}

function existsValidationFailures(response, validationFailures) {
    if (validationFailures.length !== 0) {
        response.status(httpStatusCode.BAD_REQUEST).send({
            success: false,
            message: validationFailures.toString()
        });
        return true;
    }
}

function validateBody(request, validationFailures) {
    let isRequestBodyEmpty = Object.keys(request.body).length === 0;
    if (isRequestBodyEmpty) {
        let errorMsg = `Request body is missing`
        addToValidations(errorMsg, validationFailures);
    }
    return isRequestBodyEmpty;
}

function validateBirthday(isRequestBodyEmpty, request, validationFailures) {
    if (!isRequestBodyEmpty && !isEmptyString(request.body.birthday)) {
        let errorMsg = `Please add a birthday to the request body`;
        addToValidations(errorMsg, validationFailures);
    } else if (!isRequestBodyEmpty && !isValidBirthdayFormat(request.body.birthday)) {
        let errorMsg = `Please add a birthday with this format DD/MM/YYYY (e.g 17/02/2008) and not ${request.body.birthday}`;
        addToValidations(errorMsg, validationFailures);
    }
}

function validateEmail(isRequestBodyEmpty, request, validationFailures) {
    if (!isRequestBodyEmpty && !isEmptyString(request.body.email)) {
        let errorMsg = `Please add a e-mail to the request body`;
        addToValidations(errorMsg, validationFailures);
    } else if (!isRequestBodyEmpty && !isValidEmail(request.body.email)) {
        let errorMsg = `Please add a valid e-mail: ${request.body.email}!`;
        addToValidations(errorMsg, validationFailures);
    }
}

function validatePassword(isRequestBodyEmpty, request, validationFailures) {
    if (!isRequestBodyEmpty && !isEmptyString(request.body.password)) {
        let errorMsg = `Please add a password to the request body`;
        addToValidations(errorMsg, validationFailures);
    } else if (!isRequestBodyEmpty && !isValidPassword(request.body.password)) {
        let errorMsg = `Please add a valid password. Minimum 5 and maximum 20 character. 
        Password must contain at least one uppercase character, one lowercase character, one digit, one special character`;
        addToValidations(errorMsg, validationFailures);
    }
}

function validateRole(isRequestBodyEmpty, request, validationFailures) {
    if (!isRequestBodyEmpty && !isValidRole(request.body.role)) {
        let errorMsg = `Please add a valid role to the request body`;
        addToValidations(errorMsg, validationFailures);
    }
}

function validateFirstname(isRequestBodyEmpty, request, validationFailures) {
    if (!isRequestBodyEmpty && !isEmptyString(request.body.firstname)) {
        let errorMsg = `Please add a firstname to the request body`;
        addToValidations(errorMsg, validationFailures);
    }
}

function validateLastname(isRequestBodyEmpty, request, validationFailures) {
    if (!isRequestBodyEmpty && !isEmptyString(request.body.lastname)) {
        let errorMsg = `Please add a lastname to the request body`;
        addToValidations(errorMsg, validationFailures);
    }
}

function validateId(isRequestBodyEmpty, request, validationFailures) {
    if (!isRequestBodyEmpty && !isEmptyString(request.params.id)) {
        let errorMsg = `Please add request id on the path`;
        addToValidations(errorMsg, validationFailures);
    } else if (request.body.id !== request.params.id) {
        let errorMsg = `Incompatible path id (${request.params.id} is not equal ${request.body.id}). `;
        addToValidations(errorMsg, validationFailures);
    }
}


function addToValidations(errorMsg, validationFailures) {
    loggerService.info(errorMsg);
    validationFailures.push(errorMsg);
}

function isValidPassword(password) {
    return PASSWORD_REGEX_PATTERN.test(password);
}

function isValidEmail(email) {
    return EMAIL_REGEX_PATTERN.test(email);
}

function isValidRole(role) {
    return role === SYSTEM_MANAGER_ROLE || role === CUSTOMER_ROLE;
}

function isValidBirthdayFormat(birthday) {
    return BIRTHDAY_REGEX_PATTERN.test(birthday);
}

/**
 *
 * It returns false for null, undefined, 0, 000, "", false.
 * It returns true for all string values other than the empty string (including strings like "0" and " ")
 *
 * @param word
 * @returns {boolean}
 */
function isEmptyString(word) {
    return !!word // word ? true : false
}

const userValidation = {
    validateRequestBody,
    validateUpdateBody
}

module.exports = userValidation;