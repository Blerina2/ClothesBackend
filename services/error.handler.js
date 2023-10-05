const httpStatusCode = require("http-status-codes");
const {setResponse} = require("../controllers/response.utils");
const loggerService = require("../services/logger.service");
const MongoServerErrorService = require("./mongo.server.error.service");
const JWTTokenError = require("./jsonwebtokenerror.service");
const errorHandler = (error, request, response, next) => {
    loggerService.error(error);

    let mongoServerErrorService = new MongoServerErrorService(error);
    let mongoServerError = mongoServerErrorService.getErrorResponse();
    if (mongoServerError) {
        error = mongoServerError;
    }

    let jsonWebTokenError = new JWTTokenError(error);
    let jwtTokenError = jsonWebTokenError.isJWTTokenValid();
    if (jwtTokenError) {
        error = jwtTokenError;
    }

    let errorStatus = error.statusCode || httpStatusCode.INTERNAL_SERVER_ERROR
    let errorMsg = error.message || 'Internal server error';
    setResponse(response, errorStatus, false, errorMsg);
}

module.exports = errorHandler;