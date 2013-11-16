var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/workshop-novembro');

var db = mongoose.connection;
db.on('error', function(err){
    console.log('Erro de conexao.', err)
});
db.once('open', function () {
  console.log('Conexão aberta.')
});



var Cat = mongoose.model('Cat', { name: String, age: Number });

var kitty = new Cat({ name: 'Osvaldinho', age: 10 });

kitty.save(function (err) {
  if (err) // ...
    console.log('meow');
  else
    console.log('Cadastrado');
});