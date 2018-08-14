function getCommentValues(){
  var commentContent = document.getElementById('comment-text-input').value;
  var commentAuthor = document.getElementById('comment-attribution-input').value;
  if(commentContent && commentAuthor){
    clearCommentBoxes();
    createNewComment(commentContent, commentAuthor);
  }
  else{
    alert("You need to fill out both values to leave a comment!");
  }
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
