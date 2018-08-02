var fs = require('fs'); //this is for reading files and will be helpful later
var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

function getDataFromFileToStringArr(fileToBeRead){
  //Read in Items Json file
  var data = fs.readFileSync(fileToBeRead);
  data = String(data);
  data = data.replace(/\r/g, "");
  //Put first word from file in array of strings to be added to Item object
  var stringToAddToObj = get_information(data, 0);
  var arrOfObjContent = [];
  arrOfObjContent.push(stringToAddToObj);
  //add the rest of the words to the array of strings
  for(var i=stringToAddToObj.length-1; i<data.length-1; i++){
    if(data[i] == '\n'){
      i++;
      stringToAddToObj = get_information(data, i);
      arrOfObjContent.push(stringToAddToObj);
      i += stringToAddToObj.length-1;
    }
  }
  return arrOfObjContent;
}
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
function createNavBlogObj(arrOfNavContent){
  var navBlogObj = [];
  for(var i=0; i<arrOfNavContent.length; i++){
    var singleNavObj = {NavBlogImagePath: "", BlogTitle: "", BlogDescription: ""};
    singleNavObj.NavBlogImagePath = arrOfNavContent[i];
    i++;
    singleNavObj.BlogTitle = arrOfNavContent[i];
    i++;
    singleNavObj.BlogDescription = arrOfNavContent[i];
    navBlogObj.push(singleNavObj);
  }
  return navBlogObj;
}
//this is a middleware function. It uses HTTP GET method. It returns whatever our fuction says to when a user wants to go to that specific place.
//they are also known as routes
HomeObj = [
  {PrevBlogTitle: "Start of Freshman year"},
  {PrevBlogTitle: "Winter Time"},
  {PrevBlogTitle: "Disney Best Day"},
  {PrevBlogTitle: "Beach Beach Beach"},
  {PrevBlogTitle: "Hawaii Days"},
  {PrevBlogTitle: "Good Nights"}
];
app.get('/', function(req, res){
  res.status(200).render('home', {
    PageTitle: "HOME",
    LatestBlogTitle: "The Best Summer Day",
    LatestBlogDescription: "I love summertime. It can be so nic to go outside and feel the sun. It is the best. I love loe lovel love love it.",
    LatestBlogPic: "/photos/BLIK9384.jpg",
    BlogButton: HomeObj
  });
});
app.get('/home', function(req, res){
  res.status(200).render('home', {
    PageTitle: "HOME",
    LatestBlogTitle: "The Best Summer Day",
    LatestBlogDescription: "I love summertime. It can be so nic to go outside and feel the sun. It is the best. I love loe lovel love love it.",
    LatestBlogPic: "/photos/BLIK9384.jpg",
    BlogButton: HomeObj
  });
});

app.get('/aboutus', function(req, res){
  res.status(200).render('aboutus', {
    PageTitle: "ABOUT US"
  });
});

app.get('/faveitems', function(req, res){
  var arrOfItemObjContent = getDataFromFileToStringArr("information/iteminformation.json");
  var itemObj = createItemObj(arrOfItemObjContent);
  res.status(200).render('items',{
    PageTitle: "FAVE ITEMS",
    ItemsInfo: itemObj
  });
});


app.get('/navblog', function(req, res){
  var arrOfNavContent = getDataFromFileToStringArr("information/navblog.json");
  var navBlogObj = createNavBlogObj(arrOfNavContent);
  res.status(200).render('navblog', {
    PageTitle: "ALL BLOG POSTS",
    NavBlogInfo: navBlogObj
  });
});

app.get('/blog', function(req, res){
  res.status(200).render('blog', {
    PageTitle: "BLOG",
  //  BlogInfo: //Blog
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
