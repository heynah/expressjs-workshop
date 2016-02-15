var express = require('express');
var app = express();
app.set('json spaces', 2);

function op(operator, number1, number2) {
  var opp = operator
  console.log(opp)
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
      result = number1*number2;
    /*  break
      default:
      result = "Unavailable. Please choose an operation 'add', 'sub', 'mult', or 'div' and two numbers";*/
  } 
  console.log(result)
  return result;
  
  }

app.get('/hello/:firstName', function (req, res) {
  res.send("<h1>Hello " + req.params.firstName + ", you handsom devil, you!</h1>");
});

app.get('/op/:operation/:number1/:number2', function (request, response) {
  var operator = request.params.operation;
  var number1 = Number(request.params.number1);
  var number2 = Number(request.params.number2)
  var total = op(operator,number1,number2);
  total ? response.json({"Operation": operator, "First number" : number1, "Second number": number2, "Solution" : total}) 
  : response.status(400).json({error: "Wrong, Buddy! Keep trying (enter an operation 'add', 'sub', 'mult', or 'div' and 2 numbers)."});
});

/* YOU DON'T HAVE TO CHANGE ANYTHING BELOW THIS LINE :) */

// Boilerplate code to start up the web server
var server = app.listen(process.env.PORT, process.env.IP, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

/*app.get('/firstChar/:str', function(request, response) {  //dynamic endpoint :
    var theRequestedString = request.params.str;    
    var result = firstChar(theRequestedString);
    response.send(result);
}) 
*/

/*res.json([body])
Sends a JSON response. This method is identical to res.send() with an object or array as the parameter. However, you can use it to convert other values to JSON, such as null, and undefined (although these are technically not valid JSON).

res.json(null);
res.json({ user: 'tobi' });
res.status(500).json({ error: 'message' });*/