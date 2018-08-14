function getCommentValues(){
  var commentContent = document.getElementById('comment-text-input').value;
  var commentAuthor = document.getElementById('comment-attribution-input').value;
  if(commentContent && commentAuthor){
    var blogTitle = getBlogPostFromUrl();
    sendCommentDataToServer(blogTitle, commentContent, commentAuthor);
  }
  else{
    alert("You need to fill out both values to leave a comment!");
  }
}
function getBlogPostFromUrl(){
  var path = window.location.pathname;
  var pathParts = path.split('/');
  if(pathParts[1] === "navblog"){
    return pathParts[2];
  }
  else{
    return null;
  }
}
function sendCommentDataToServer(blogTitle, commentContent, commentAuthor){
  var request = new XMLHttpRequest();
  var requestUrl = '/navblog/' + blogTitle + '/addComment';
  console.log(requestUrl);
  request.open('POST', requestUrl);
  var requestBody = JSON.stringify({commentContent: commentContent, commentAuthor: commentAuthor});
  console.log("2");
  request.addEventListener('load', function(event){
    if(event.target.status != 200){
      alert("Sorry, there was an error when adding your comment.");
    }
    else{
      clearCommentBoxes();
      createNewComment(commentContent, commentAuthor);
    }
  });
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(requestBody);
}
function clearCommentBoxes(){
  document.getElementById('comment-attribution-input').value = "";
  document.getElementById('comment-text-input').value = "";
}
function createNewComment(commentContent, commentAuthor){
  var commentObj = {commentContent: commentContent, commentAuthor: commentAuthor};
  var blogCommentHTML = Handlebars.templates.blogcomment(commentObj);
  var blogComments = document.querySelector('.blog-comments');
  blogComments.insertAdjacentHTML('beforeend', blogCommentHTML);
}
window.addEventListener("DOMContentLoaded", function(){
  var createCommentButton = document.querySelector('#create-comment-button');
  if(createCommentButton){
    createCommentButton.addEventListener('click', getCommentValues);
  }
});
