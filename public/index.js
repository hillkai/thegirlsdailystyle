function isEventActionNeeded(event){
  if(event.target.className === "blog-element" || event.target.parentElement.className === "blog-element"){
    return true;
  }
}
window.addEventListener('DOMContentLoaded', function(){
  var allBlogElementsContainer = document.getElementsByClassName("all-blog-elements-container");
  allBlogElementsContainer[0].addEventListener('click', function(){
    var actionNeeded = isEventActionNeeded(event);
    if(actionNeeded){
      console.log("true");
    }
  });
});
