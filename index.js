var express = require('express');
var app = express();
app.set('json spaces', 2);
var Sequelize = require('sequelize');

var mysql = require('mysql');

var reddit = new Sequelize('reddit','heynah', '', {dialect: 'mysql'});

/*var connection = mysql.createConnection({
  host     : process.env.IP,
  user     : process.env.C9_USER,
  password : '',
  database : 'reddit'
});

connection.query("SELECT Account.id, AddressBook.accountId, Account.email, AddressBook.name FROM Account LEFT JOIN AddressBook on Account.id=AddressBook.accountId", 
function(err, rows){
}*/

var User = reddit.define('user', {
    username: Sequelize.STRING,
    screenName: Sequelize.STRING,
    password: Sequelize.STRING});
               //^ table,  feild definitions,table -- telling library about user table, knows ids!
var Post = reddit.define('content', {
    url: Sequelize.STRING,
    title: Sequelize.STRING
});
var Vote = reddit.define('vote', {
    upVote: Sequelize.BOOLEAN
});
// var Content = reddit.define('
Post.belongsTo(User); //{foreignKey:'userId'});
//                     // can connect children tables to parents *using Sequelizes defaults
User.hasMany(Post);

User.belongsToMany(Post, {through: Vote, as: "Upvotes"});
Post.belongsToMany(User, {through: Vote});


function op(operator, number1, number2) {
  var opp = operator;
  var result;
  switch (opp) {
    case 'add':
      result = number1+number2;
      break;
    case 'sub':
      result = number1-number2;
      break;
    case 'div':
      result = number1/number2;
      break;
    case 'mult':
      result = (number1*number2).toFixed(2);
    /*  break
      default:
      result = "Unavailable. Please choose an operation 'add', 'sub', 'mult', or 'div' and two numbers";*/
  } 
  console.log(result);
  return result;
  
  }
  
function buildHtml(contentsArray){
  var html = 
  `<div id="contents">
    <h1>List of contents</h1>
      <ul class="contents-list">`
  contentsArray.forEach(function(item){
    html +=
      `<li class="content-item">
      <h2 class="content-item__title">
        <a href="`+ item.url +`">`+ item.title + `</a>
      </h2>
      <p>Created by ` + item.user.username + `</p>
      </li>`});
      
    html += `</ul></div>`;
//console.log(html);
return html;
}

function retrieveTop5(callback) {
  Post.findAll({
  order: [['createdAt','DESC']],
  limit: 5,
  include: User
  }).then(function(res) {
    callback(res);
});

}

app.get('/hello/:firstName', function (req, res) {
  res.send("<h1>Hello " + req.params.firstName + ", you handsom devil, you!</h1>");
});

app.get('/op/:operation/:number1/:number2', function (request, response) {
  var operator = request.params.operation;
  var number1 = Number(request.params.number1);
  var number2 = Number(request.params.number2);
  var total = op(operator,number1,number2);
  total ? response.json({"Operation": operator, "First number" : number1, "Second number": number2, "Solution" : total}) 
  : response.status(400).json({error: "Wrong, Buddy! Keep trying (enter an operation 'add', 'sub', 'mult', or 'div' and 2 numbers)."});
});

app.get('/contents', function(req, res) {
  
  retrieveTop5(function(contents){
    var html = buildHtml(contents);
    res.send(html);
  });
    
});

/* YOU DON'T HAVE TO CHANGE ANYTHING BELOW THIS LINE :) */

// Boilerplate code to start up the web server
var server = app.listen(process.env.PORT, process.env.IP, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});


// retrieveTop5(function(res){return res});
retrieveTop5(function(res){console.log(res)});