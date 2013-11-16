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
      // console.log(err);
      return err;
    } else {
      // res.send(beers);
      // console.log(beers);
      return beers;
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


exports.create = module.exports.create = function(req, res){

  var dados = req.body
  console.log('dados', dados);

  var beer = new Beer(dados);

  beer.save(function(err) {
    if(err){
      console.log(err);
      var msg = 'Cerveja não pode ser cadastrada!';
      console.log(msg);
      var query = {};
      Beer.find(query, function (err, beers) {
        if(err) {
          console.log(err);
          return err;
        } else {
          res.render('beers/list', {cervejas: beers, msg: msg});
        }
      });
    } else { // SUCESSO
      var msg = 'Cerveja cadastrada com sucesso';
      console.log(msg);
      var query = {};
      Beer.find(query, function (err, beers) {
        if(err) {
          console.log(err);
          return err;
        } else {
          res.render('beers/list', {cervejas: beers, msg: msg});
        }
      });
      // res.render('beers/list');
    }
  });
};

exports.retrieve = module.exports.retrieve = Db.retrieve;

exports.update = module.exports.update = function(req, res){
  var id = req.params.id;
  var query = {_id: id};
  var dados = req.body;

  console.log('update', dados, query);
  Beer.update(query, dados, function(err, beer) {
    if(err) {
      console.log(err);

    } else {
      var query = {};
      var msg = 'Cerveja alterado com sucesso';
      console.log(msg, beer);
      Beer.find(query, function (err, beers) {
        if(err) {
          console.log(err);
          return err;
        } else {
          res.render('beers/list', {cervejas: beers, msg: msg});
        }
      });
    }
  });
};

exports.delete = module.exports.delete = function(req, res){
  var id = req.params.id;
  var query = {_id: id};

  Beer.remove(query, function (err, beers) {
    if(err) {
      console.log(err);
      return err;
    } else {
      var query = {};
      Beer.find(query, function (err, beers) {
        if(err) {
          console.log(err);
          return err;
        } else {
          res.render('beers/list', {cervejas: beers});
        }
      });
    }
  });
};

exports.list = module.exports.list = function(req, res){

  var query = {};
  Beer.find(query, function (err, beers) {
    if(err) {
      console.log(err);
      return err;
    } else {
      res.render('beers/list', {cervejas: beers});
    }
  });

}

exports.showCreate = module.exports.showCreate = function(req, res){
  res.render('beers/form', {acao: 'create'});
}

exports.showUpdate = module.exports.showUpdate = function(req, res){
  var id = req.params.id;

  var query = {_id: id};

  Beer.findOne(query, function (err, beers) {
    if(err) {
      console.log(err);
      return err;
    } else {
      res.render('beers/form', {cerveja: beers, acao: 'update'});
    }
  });
};

exports.showBeer = module.exports.showBeer = function(req, res){
  var id = req.params.id;

  var query = {_id: id};

  Beer.findOne(query, function (err, beers) {
    if(err) {
      console.log(err);
      return err;
    } else {
      res.render('beers/show', {cerveja: beers});
    }
  });
};

exports.showDelete = module.exports.showDelete = function(req, res){
  var id = req.params.id;

  var query = {_id: id};

  Beer.findOne(query, function (err, beers) {
    if(err) {
      console.log(err);
      return err;
    } else {
      res.render('beers/form', {cerveja: beers, acao: 'delete'});
    }
  });

  
};

