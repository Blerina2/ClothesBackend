'use strict';

const serverConfig = {};

serverConfig.web = {};
serverConfig.web.PROTOCOL = 'http'
serverConfig.web.HOSTNAME = 'localhost'
serverConfig.web.PORT = 8080 || process.env.WEB_PORT // default 3001
serverConfig.web.JWT_TOKEN_SECRET = 'UNIVERSITETIIPRISHTINES2023'
serverConfig.web.JWT_COOKIE_TOKEN_NAME = 'Token'
serverConfig.web.JWT_EXPIRE_TOKEN = 3600
serverConfig.web.JWT_EXPIRE_TOKEN_COOKIE = 1*60*60*1000

module.exports = serverConfig;