function isEventActionNeeded(event){
  if(event.target.className === "blog-element"){
    return event.target;
  }
  else if(event.target.parentElement.className === "blog-element"){
    return event.target.parentElement;
  }
  else{
    return null;
  }
}
/*function sendBlogRequestToServer(blogTitle){
  var request = new XMLHttpRequest();
  var requestURL = '/navblog/' + theblogTitle;
//  console.log("here");
  request.open('POST', requestURL);
//  console.log("here2");
  var blogObj = {
    blogTitle: theblogTitle
  };
  //console.log("here3");
  var requestBody = JSON.stringify(blogObj);
  request.setRequestHeader(
    'Content-Type', 'application/json'
  );
  request.addEventListener('load', function(event){
    if(event.target.status !== 200){
      var message = event.target.response;
      alert("Error in loading page: "+ message);
    }
  });
  //console.log('herelast')
  request.send(requestBody);*/
//}
/*window.addEventListener('DOMContentLoaded', function(){
  console.log("runagain");
  var allBlogElementsContainer = document.getElementsByClassName("all-blog-elements-container");
  console.log(allBlogElementsContainer[0]);
  allBlogElementsContainer[0].addEventListener('click', function(){
    var elementToGetTitleFrom = isEventActionNeeded(event);
    if(elementToGetTitleFrom){
      var blogTitle = elementToGetTitleFrom.querySelector(".blog-element-title").innerText;
      blogTitle = blogTitle.toLowerCase();
      blogTitle = blogTitle.replace(/ /g, "-");
      document.location.href = "navblog/" + blogTitle;
      //sendBlogRequestToServer(blogTitle);
    }
  });
});*/
