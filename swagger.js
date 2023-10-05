const swaggerJSDoc = require('swagger-jsdoc');
const serverConfig = require("./configs/server.config");

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'API for clothes',
        version: '1.0.0',
        description:
            'This is a REST API application for application clothes.',
    },
    servers: [
        {
            url: ${serverConfig.web.PROTOCOL}://${serverConfig.web.HOSTNAME}:${serverConfig.web.PORT},
            description: 'Local server',
        },
    ],
};

const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./routes/*.js'],
};

const SwaggerSpec = swaggerJSDoc(options);


module.exports = SwaggerSpec;
