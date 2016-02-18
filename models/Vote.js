var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var Vote = sequelize.define("vote", {
    upVote: Sequelize.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        }
    }
  });

  return Vote;
};