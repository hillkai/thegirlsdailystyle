var fs = require('fs');
var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var os = require('os');
//var path = require('path');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.json());

//function takes pathway of file to be read
//this function takes a json or txt file and everytime is finds a * it puts the temp string and puts it into an array
//the function returns an array of strings
function readJsonFile(filePathWay){
  var data = fs.readFileSync(filePathWay);
  data = String(data);
  data = data.replace(/\r\n/g, "");
  var tempStringArr = [];
  var tempString = "";
  for(var i=0; i<data.length; i++){
    while(data[i] !== '*'){
      tempString += data[i];
      i++;
    }
    tempStringArr.push(tempString);
    tempString = "";
  }
  return tempStringArr;
}
//these functions parse an array of strings and put them in objects.
//the objects are the same as the ones that need to be used in the handlebars.
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
    var singleNavObj = {BlogLink: "", NavBlogImagePath: "", BlogTitle: "", BlogDescription: ""};
    singleNavObj.BlogLink = arrOfNavContent[i];
    i++;
    singleNavObj.NavBlogImagePath = arrOfNavContent[i];
    i++;
    singleNavObj.BlogTitle = arrOfNavContent[i];
    i++;
    singleNavObj.BlogDescription = arrOfNavContent[i];
    navBlogObj.push(singleNavObj);
  }
  return navBlogObj;
}
function createBlogPostObj(tempStringArr){
  var blogPostObj = [];
  for(var i=0; i<tempStringArr.length; i++){
    var singleObj = {blogText: "", blogImagePath: ""};
    singleObj.blogText = tempStringArr[i];
    i++;
    singleObj.blogImagePath = tempStringArr[i];
    blogPostObj.push(singleObj);
  }
  return blogPostObj;
}
function createCommentObj(tempStringArr){
  var commentObj = [];
  for(var i=0; i<tempStringArr.length; i++){
    var singleObj = {commentAuthor: "", commentContent: ""};
    singleObj.commentAuthor = tempStringArr[i];
    i++;
    singleObj.commentContent = tempStringArr[i];
    commentObj.push(singleObj);
  }
  return commentObj;
}
//this is a middleware function. It uses HTTP GET method. It returns whatever our fuction says to when a user wants to go to that specific place.
//they are also known as routes
HomeObj = [
  {PrevBlogTitle: "Start of Freshman year", PrevBlogLink: "/navblog/start-of-freshman-year"},
  {PrevBlogTitle: "Winter Time", PrevBlogLink: "/navblog/winter-time"},
  {PrevBlogTitle: "Disney Best Day", PrevBlogLink: "/navblog/disney-best-day"},
  {PrevBlogTitle: "Beach Beach Beach", PrevBlogLink: "/navblog/beach-beach-beach"},
  {PrevBlogTitle: "Hawaii Days", PrevBlogLink: "/navblog/hawaii-days"},
  {PrevBlogTitle: "Good Nights", PrevBlogLink: "/navblog/good-nights"}
];
app.get('/', function(req, res){
  res.status(200).render('home', {
    PageTitle: "HOME",
    LatestBlogTitle: "The Best Summer Day",
    LatestBlogDescription: "I love summertime. It can be so nic to go outside and feel the sun. It is the best. I love loe lovel love love it.",
    LatestBlogLink: "/navblog/the-best-summer-day",
    LatestBlogPic: "/photos/BLIK9384.jpg",
    BlogButton: HomeObj
  });
});
app.get('/home', function(req, res){
  res.status(200).render('home', {
    PageTitle: "HOME",
    LatestBlogTitle: "The Best Summer Day",
    LatestBlogDescription: "I love summertime. It can be so nic to go outside and feel the sun. It is the best. I love loe lovel love love it.",
    LatestBlogLink: "/navblog/the-best-summer-day",
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
  var tempDataArr = readJsonFile("information/iteminformation.json");
  var itemObj = createItemObj(tempDataArr);
  res.status(200).render('items',{
    PageTitle: "FAVE ITEMS",
    ItemsInfo: itemObj
  });
});
app.get('/navblog', function(req, res){
  var tempDataArr = readJsonFile("information/navblog.json");
  var navBlogObj = createNavBlogObj(tempDataArr);
  res.status(200).render('navblog', {
    PageTitle: "ALL BLOG POSTS",
    NavBlogInfo: navBlogObj
  });
});
app.get('/navblog/:blogTitle', function(req, res, next){
    var filePathWay = "information/blogposts/" + req.params.blogTitle + ".json";
    var tempDataArr = readJsonFile(filePathWay);
    var blogPostObj = createBlogPostObj(tempDataArr);
    var commentPathWay = "information/blogposts/comments/" + req.params.blogTitle + ".json";
    tempDataArr = readJsonFile(commentPathWay);
    var commentPostObj = createCommentObj(tempDataArr);
    res.status(200).render('blog', {
      PageTitle: req.params.blogTitle,
      blogInfo: blogPostObj,
      commentInfo: commentPostObj
    });
});
app.post('/navblog/:blogTitle/addComment', function(req,res,next){
  if(req.body && req.body.commentContent && req.body.commentAuthor){
    var stringToAdd = req.body.commentAuthor + os.EOL + "*" + os.EOL + req.body.commentContent + os.EOL + "*" + os.EOL;
    var commentPathWay = "information/blogposts/comments/" + req.params.blogTitle + ".json";
    fs.appendFile(commentPathWay, stringToAdd, function(err){
      if(err){
        res.status(500).send("There was an error uploading your comment");
      }
      else{
        res.status(200).end();
      }
    });
  }
  else{
    res.status(400).send("Request to this path must contain a JSON body with Comment Content and author");
  }
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
