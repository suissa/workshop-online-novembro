
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var beer = require('./routes/beer');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/expose/:dir/:name', function(req, res){
  var dir = req.params.dir;
  var name = req.params.name;
  var view = dir+'/'+name;
  console.log(view);
  res.render(view);
})

app.get('/', routes.index);
app.get('/users', user.list);

// JSON API
app.get('/beers', beer.list);
app.post('/beers', beer.create);
app.put('/beers/:id', beer.update);
app.delete('/beers/:id', beer.delete);

// RENDER VIEW
app.get('/beers/create', beer.showCreate);
app.get('/beers/update/:id', beer.showUpdate);
app.get('/beers/show/:id', beer.showBeer);
app.get('/beers/delete/:id', beer.showDelete);


app.get('/teste', function(req, res){
  res.render('teste', {nome: 'Suissa'});
})



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
