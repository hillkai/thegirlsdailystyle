var fs = require('fs'); //this is for reading files and will be helpful later
var http = require('http');

app.get('/', function(req, res){
  res.status(200).render('');
});
app.use(express.static('public'));
app.listen(port, function(){
  console.log("== Server is listening on port", port);
});
