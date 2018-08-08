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
window.addEventListener('DOMContentLoaded', function(){
  var allBlogElementsContainer = document.getElementsByClassName("all-blog-elements-container");
  allBlogElementsContainer[0].addEventListener('click', function(){
    var elementToGetTitleFrom = isEventActionNeeded(event);
    if(elementToGetTitleFrom){
      var blogTitle = elementToGetTitleFrom.querySelector(".blog-element-title").innerText);
      sendBlogRequestToServer(blogTitle);
    }
  });
});
