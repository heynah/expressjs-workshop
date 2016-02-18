var Sequelize = require('sequelize');
var configuration = require("../../configuration")  //more 'raw' properties than an object

module.exports = new Sequelize(configuration.database, configuration.username, configuration.password, {dialect: 'mysql'});