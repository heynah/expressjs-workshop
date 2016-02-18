var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("content", {
    url: Sequelize.STRING, 
    title: Sequelize.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Post.belongsTo(models.user);
        Post.belongsToMany(models.user, {through: models.vote });
      }
    }
  });

  return Post;
};
