var express = require('express');             //libraries, project modules
var app = express();
app.set('json spaces', 2);
var db = require("./models/index.js")
var mysql = require('mysql');
var bodyParser = require('body-parser');

var Models = require('./models/index');
//Models.user, Models.content, Models.vote  => Models."model title"




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
    <h2><a href="https://day16-expressjs-heynah.c9users.io/createContent">Add a New Post! </a></h2>
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
  Models.content.findAll({
  order: [['createdAt','DESC']],
  limit: 5,
  include: Models.user
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

app.get('/createContent', function(req, res, next) {
    var options = {
      root: __dirname
    };
   
    res.sendFile("form.html", options) /*, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:', fileName);
    }*/
  });
//})


  /*var options = {
    root: __dirname + '/public/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };

  var fileName = req.params.name;
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:', fileName);
    }
  });*/


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/createContent', function(req, res) {
  var url = req.body.url;
  var title = req.body.title;
  console.log("THIS IS IT")
  Models.content.create({url: url, title: title, userId:1}).then(function (user) {
    
    res.redirect("/contents")
  })
  // res.send(req.body);
});


/*Models.user.create({
  username: 'john-doe',
  password: generatePasswordHash('i-am-so-great')
}).then(function(user) {
  /* ... */
/*})*/
/*var url
var title
create content {url: req.body.url})*/

/*app.use(bodyParser.json())

app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  res.end(JSON.stringify(req.body, null, 2))
})*/


/*express route-specific

This example demonstrates adding body parsers specifically to the routes that need them. In general, this is the most recommend way to use body-parser with express.

// create application/json parser


// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// POST /login gets urlencoded bodies
app.post('/login', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
  res.send('welcome, ' + req.body.username)
})

// POST /api/users gets JSON bodies
app.post('/api/users', jsonParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
  // create user in req.body
})*/







/* YOU DON'T HAVE TO CHANGE ANYTHING BELOW THIS LINE :) */
db.sequelize.sync().then(function () {
  // Boilerplate code to start up the web server
var server = app.listen(process.env.PORT, process.env.IP, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
})




// retrieveTop5(function(res){return res});
//retrieveTop5(function(res){console.log(res)});