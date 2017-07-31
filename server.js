var express = require('express'),
  app = express(),
  server = require('http').Server(app);

app.use(express.static(__dirname + '/public'));
// Here's the new code:
app.use('/*', function(req, res){
  res.sendFile(__dirname + '/frontendLearningModulesViaRequireJS.html');
});

server.listen(17990, function() {
  console.log('Listening on port %d', server.address().port);
});
