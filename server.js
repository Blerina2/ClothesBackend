'use strict';

const serverConfig = require('./configs/server.config');
const databaseConfig = require('./configs/database.config');
const express = require("express"); // https://www.npmjs.com/package/express
const mongoose = require("mongoose"); // https://www.npmjs.com/package/mongoose
const bodyParser = require('body-parser'); // https://www.npmjs.com/package/body-parser
const morgan = require('morgan'); // https://www.npmjs.com/package/morgan
const app = express();
const cors = require("cors");
const cookieParser = require('cookie-parser');
const errorHandler = require('./services/error.handler');
const swaggerUi = require('swagger-ui-express');
const SwaggerSpec = require('./swagger');
const basicAuth = require('express-basic-auth');

// swagger: start the Express server (server.js), and navigate to http://localhost:8080/swaggerClothes-docs/ s in the browser.
app.use("/swaggerClothes-docs",basicAuth({
    users: {'ibrahim.rugova@president-ksgov.net': 'KosovA1!?_'},
    challenge: true,
}), swaggerUi.serve, swaggerUi.setup(SwaggerSpec));


// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));


// connect to database
mongoose.connect(databaseConfig.mongodb.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("Database Connected successfully"))
    .catch((err) => console.log(err))

// import routes
const userRoutes = require('./routes/user.route');

// routes middleware
app.use("/user", userRoutes);

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(errorHandler);

let corsOptions = {
    origin: `${serverConfig.web.PROTOCOL}://${serverConfig.web.HOSTNAME}:${serverConfig.web.PORT}`
};

app.use(cors(corsOptions));
//app.use(cors({ origin: '*'}))

// set port, listen for requests
app.listen(serverConfig.web.PORT, serverConfig.web.HOSTNAME, () => {
    console.log(`Server of clothes is running on ${serverConfig.web.HOSTNAME}:${serverConfig.web.PORT}.`);
});

// Need for API TEST
module.exports = app