var fs = require('fs'); //this is for reading files and will be helpful later
var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//this is a middleware function. It uses HTTP GET method. It returns whatever our fuction says to when a user wants to go to that specific place.
//they are also known as routes
app.get('/', function(req, res){
  res.status(200).render('home', {
    PageTitle: "HOME"
  });
});
app.get('/home', function(req, res){
  res.status(200).render('home', {
    PageTitle: "HOME"
  });
});
app.get('/aboutus', function(req, res){
  res.status(200).render('aboutus', {
    PageTitle: "ABOUT US"
  });
});
app.use(express.static('public'));
app.get('*', function(req, res){
  res.status(404).render('404', {
    PageTitle: "Error"
  });
});
//this is a callback function to let us know the server has successfully started
app.listen(3000, function(){
  console.log("== Server is listening to port 3000");
});
