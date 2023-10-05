'use strict';

let {createLogger, format, transports} = require("winston");

let logLevels = {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5,
};

const loggerService = createLogger({
    format: format.combine(format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}), format.prettyPrint()),
    levels: logLevels,
    transports: [new transports.Console()],
});

module.exports = loggerService;