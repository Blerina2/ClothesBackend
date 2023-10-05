const ErrorDto = require("../dtos/error.dto");
const httpStatusCode = require("http-status-codes");

class MongoServerErrorService {

    error

    constructor(error) {
        this.error = error;
    }

    getErrorResponse() {
        if (this.error.name === 'CastError') {
            return new ErrorDto("Resource error", httpStatusCode.NOT_FOUND);
        }

        if (this.error.name === 'MongoServerError') {
            if (this.error.code === 11000) {
                return new ErrorDto(`Duplicate field ${Object.keys(this.error.keyValue).toString()} value entered`, httpStatusCode.BAD_REQUEST);
            }
        }

        if (this.error.name === 'MongoServerSelectionError') {
            return new ErrorDto("Database service unavailable", httpStatusCode.SERVICE_UNAVAILABLE);
        }

        if (this.error.name === 'MongooseError') {
            return new ErrorDto("Database service unavailable", httpStatusCode.SERVICE_UNAVAILABLE);
        }

        if (this.error.name === 'ValidationError') {
            let errorMsg = Object.values(this.error.errors).map(value => value.message);
            return new ErrorDto(errorMsg, httpStatusCode.BAD_REQUEST);
        }
    }
}

module.exports = MongoServerErrorService;