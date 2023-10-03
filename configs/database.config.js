'use strict';

const databaseConfig = {}

databaseConfig.mongodb = {}
databaseConfig.mongodb.HOSTNAME = 'localhost'
databaseConfig.mongodb.PORT = 27017
databaseConfig.mongodb.DATABASE_NAME = 'clothes_db'
//databaseConfig.mongodb.URL = `mongodb://root:password@${databaseConfig.mongodb.HOSTNAME}:${databaseConfig.mongodb.PORT}/${databaseConfig.mongodb.DATABASE_NAME}?authSource=admin`
databaseConfig.mongodb.URL = `mongodb://${databaseConfig.mongodb.HOSTNAME}:${databaseConfig.mongodb.PORT}/${databaseConfig.mongodb.DATABASE_NAME}?authSource=admin`
databaseConfig.mongodb.USER = 'user'
databaseConfig.mongodb.ROLE = 'role'

module.exports = databaseConfig

