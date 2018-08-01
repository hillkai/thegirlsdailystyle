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
var Items = new Array(1);
Items[0] = {ImagePath: "/photos/CBQL8179.jpg", ItemBrand: "Forever 21 cashmere sweater", ItemLink: "www.forever21.com", ItemLinkShown: "forever21.com" }
app.get('/faveitems', function(req, res){
  res.status(200).render('items',{
    PageTitle: "FAVE ITEMS",
    ItemsInfo: Items
  });
});
/*
var Blog = new Array(1);
Blog[0] = {BlogTitle: "Best Blog", BlogText: "this is osme text", BlogPhoto: "/photos/AGQM7548.JPG"};
console.log("Length: ", Blog.length);
app.get('/blog', function(req, res){
  res.status(200).render('blog', {
    PageTitle: "BLOG",
    BlogInfo: Blog
  });
});*/
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
