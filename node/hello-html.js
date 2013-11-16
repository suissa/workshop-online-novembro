var http = require('http'),
    fs = require('fs'),
    file = fs.readFileSync("teste.html");


http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(file);
}).listen(3000);
console.log("Rodando na porta 3000");