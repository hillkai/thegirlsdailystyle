var fs = require('fs'); //this is for reading files and will be helpful later
var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Read in Items Json file
var data = fs.readFileSync('information/iteminformation.json');
data = String(data);
data = data.replace(/\r/g, "");
//Put first word from file in array of strings to be added to Item object
var stringToAddToObj = get_information(data, 0);
var arrOfItemObjContent = [];
arrOfItemObjContent.push(stringToAddToObj);
//add the rest of the words to the array of strings
for(var i=stringToAddToObj.length-1; i<data.length-1; i++){
  if(data[i] == '\n'){
    i++;
    stringToAddToObj = get_information(data, i);
    arrOfItemObjContent.push(stringToAddToObj);
    i += stringToAddToObj.length-1;
  }
}
var itemObj = createItemObj(arrOfItemObjContent);
function get_information(stringToParse, startPointInString){
  var stringToReturn = "";
  var counter = startPointInString;
  while(stringToParse[counter] != '\n'){
    stringToReturn += stringToParse[counter];
    counter++;
  }
  return stringToReturn;
}
//take the array of strings of the item information and put them into the array
//of objects that will be used in my middleware function
function createItemObj(arrOfItemObjContent){
  var itemObj = [];
  var counter = 0;
  counter2 = 0;
  for(var i=0; i<arrOfItemObjContent.length; i++){
    var singleItemObj = {ItemImagePath: "", ItemBrand: "", ItemLinkActual: "", ItemLinkShown: ""};
    singleItemObj.ItemImagePath = arrOfItemObjContent[i];
    i++;
    singleItemObj.ItemBrand = arrOfItemObjContent[i];
    i++;
    singleItemObj.ItemLinkActual = arrOfItemObjContent[i];
    i++;
    singleItemObj.ItemLinkShown = arrOfItemObjContent[i];
    itemObj.push(singleItemObj);
  }
  return itemObj;
}

//this is a middleware function. It uses HTTP GET method. It returns whatever our fuction says to when a user wants to go to that specific place.
//they are also known as routes
var Home = new Array(1);
Home[0] = {PrevBlogTitle: "ashrioewhiorh"}
app.get('/', function(req, res){
  res.status(200).render('home', {
    PageTitle: "HOME",
    LatestBlogTitle: "BLodfshaoie",
    LatestBlogDescription: "asjehfaphweiuorhfaweuio",
    LatestBlogPic: "/photos/HBFV1696.jpg",
    BlogButton: Home
  });
});
app.get('/home', function(req, res){
  res.status(200).render('home', {
    PageTitle: "HOME",
    LatestBlogTitle: "BLodfshaoie",
    LatestBlogDescription: "asjehfaphweiuorhfaweuio",
    LatestBlogPic: "/photos/HBFV1696.jpg",
    BlogButton: Home
  });
});
app.get('/aboutus', function(req, res){
  res.status(200).render('aboutus', {
    PageTitle: "ABOUT US"
  });
});

app.get('/faveitems', function(req, res){
  res.status(200).render('items',{
    PageTitle: "FAVE ITEMS",
    ItemsInfo: itemObj
  });
});

var NavBlog = new Array(1);
NavBlog[0] = {NavBlogElePic: "photos/XZMV7893.jpg", BlogTitle: "Yayay", BlogDescription: "ashdfjhasieofnsjdhfjewh"};
app.get('/navblog', function(req, res){
  res.status(200).render('navblog', {
    PageTitle: "ALL BLOG POSTS",
    NavBlogInfo: NavBlog
  });
});

var Blog = new Array(1);
Blog[0] = {BlogTitle: "Best Blog", BlogText: "this is osme text", BlogPhoto: "/photos/AGQM7548.JPG"};
app.get('/blog', function(req, res){
  res.status(200).render('blog', {
    PageTitle: "BLOG",
    BlogInfo: Blog
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
