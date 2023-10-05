const ErrorDto = require("../dtos/error.dto");
const httpStatusCode = require("http-status-codes");

class JWTTokenError {
    error
    constructor(error) {
        this.error = error;
    }
    isJWTTokenValid() {
        if (this.error.name === 'JsonWebTokenError') {
            return new ErrorDto(this.error.message, httpStatusCode.BAD_REQUEST);
        }
    }
}

module.exports = JWTTokenError;