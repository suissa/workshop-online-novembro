var http = require('http');

var beer = require('./beer');

function callback(req, res, json){
  console.log(json);
  res.end(JSON.stringify(json));
}

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});

  var url = req.url;
  var method = req.method;


  switch(url){
    case '/beers':
      beer.retrieve({}, function(json){
        callback(req, res, json);
      });
      break;
      
    case '/beers/527fe6feff5d44abbf000002':
      var query = {_id: '527fe6feff5d44abbf000002'};
      beer.retrieve(query, function(json){
        callback(req, res, json);
      });
      break;
      
    case '/beers/create':
      var dados = {
        name: "Teste",
        description: "Tem gosto de mijo de elefante",
        type: "Pilsen"
      };
      beer.create(dados, function(json){
        callback(req, res, json);
      });
      break;
      
    case '/beers/527fe77a042d0db9bf000002/delete':
      var query = {_id: '527fe77a042d0db9bf000002'};
      beer.delete(query, function(json){
        callback(req, res, json);
      });
      break;
      
    case '/beers/527fe77a042d0db9bf000002/update':
      var beer_id = "527fe77a042d0db9bf000002";
      var query = {_id: beer_id};
      var dados = {
        name: "Weiss"
      };
      beer.update(query, dados, function(json){
        callback(req, res, json);
      });
      break;

  }
  
}).listen(3000);
console.log('Server running at http://localhost:3000/');




