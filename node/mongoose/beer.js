var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/workshop-novembro');

var db = mongoose.connection;
db.on('error', function(err){
    console.log('Erro de conexao.', err)
});

db.once('open', function () {
  console.log('Conexão aberta.')
});


var BeerSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  description: { type: String, default: '' },
  alcohol: { type: Number, min: 0},
  category: { type: String, default: ''},
  ingredients: [{
    name: { type: String, default: '' },
    qnty: { type: String, default: '' },
  }],
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: '' },
});

var Beer = mongoose.model('Beer', BeerSchema);


var dados = {
    name: 'Brew Dog',
    category: 'IPA',
    alcohol: 11
  };

var Db = {};

Db.create = function(dados){
  
  var beer = new Beer(dados);

  beer.save(function(err) {
    if(err){
      console.log(err);
    } else {
      console.log('Cerveja cadastrada com sucesso');
    }
  });
}

Db.retrieve = function(query){
  Beer.find(query, function (err, beers) {
    if(err) {
      console.log(err);
    } else {
      // res.send(beers);
      console.log(beers);
      // res.end();
    }
  });
}

Db.update = function(query, dados){
  console.log(query);
  Beer.update(query, dados, function(err, beer) {
    if(err) {
      console.log(err);
    } else {
      console.log('Cerveja atualizada com sucesso', beer);

    }
  });
}

Db.delete = function(query){
  Beer.remove(query, function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log('Cerveja deletada com sucesso!');
    }
  });
}


exports.create = module.exports.create = Db.create;

exports.retrieve = module.exports.retrieve = Db.retrieve;

exports.update = module.exports.update = Db.update;

exports.delete = module.exports.delete = Db.delete;




