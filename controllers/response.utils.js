const loggerService = require("../services/logger.service");

const setResponse = (response, statusCode, success, message) => {
    loggerService.info(message);
    return response.status(statusCode).json({
        success,
        message
    });
}

const ResponseUtil = {
    setResponse
}

module.exports = ResponseUtil;

