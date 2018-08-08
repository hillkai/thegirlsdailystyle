var fs = require('fs'); //this is for reading files and will be helpful later
var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

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
function makeBlogPostObj(tempStringArr){
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
function makeCommentObj(tempStringArr){
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
app.get('/blog', function(req, res){
  var tempDataArr = readBlogJsonFile("information/blogwriting.json");
  var blogPostObj = makeBlogPostObj(tempDataArr);
  tempDataArr = readBlogJsonFile("information/blogcomment.json");
  var commentPostObj = makeCommentObj(tempDataArr);
  res.status(200).render('blog', {
    PageTitle: "BLOG",
    blogInfo: blogPostObj,
    commentInfo: commentPostObj
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
