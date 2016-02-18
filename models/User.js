//^ table,  feild definitions,table -- telling library about user table, knows ids!

var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("user", {
    username: Sequelize.STRING,
    screenName: Sequelize.STRING,
    password: Sequelize.STRING
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.content);
        User.belongsToMany(models.content, {through: models.vote, as: "Upvotes"});
      }
    }
  });

  return User;
};