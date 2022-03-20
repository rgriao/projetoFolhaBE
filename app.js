var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require ("cors");
const bodyParser = require("body-parser");
var fileupload = require("express-fileupload");
require('dotenv').config();

//cria o aplicativo express
var app = express();
app.use(fileupload());
app.use(bodyParser.urlencoded({extended: false}));
//depois desta inclusão e do require("body-parser") 
//acima, o req.body ficou acessível no router.post
//app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());
//Conforme a rota da url (enviada pelo FE) será acionada
//a função existente no arquivo controlador correspondente para
//manipular o banco de dados com GET e POST.
// Definir configuração gerais do aplicativo
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//com a definição do express.static (função de middleware integrada
//no Express) podemos carregar na tela o conteúdo dos arquivos
//estáticos que estão no diretório 'public'. poderia ser 'files'.
//app.use(express.static(path.join(__dirname, 'public')));
/*Processo é chamada para qualquer verbo de http, assim vale para 
todas as rotas (uri) e verbos (get, post, etc.)
var Processo = require('./app/controllers/processamentos')
app.use(Processo);*/
var CrudFolha = require('./app/controllers/manipularBanco');
app.use("/", CrudFolha);
// pegar o erro 404 e encaminhar para o manipulador de erros
/*app.use(function(err, res) {
  console.error(err.stack);
  res.status(404).send("Desculpe-me, não consigo encontrar o que foi solicitado. Tente outro caminho!");
});*/
//colocar no start do package.json heroku config -s > .env && 
//ver sucrase o que é no debug
// manipulador de erros para desenvolvimento
app.use(function(err, req, res, next) {
  // definir locais, apenas fornecendo erro no desenvolvimento
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // renderizar a página de erro 500
  res.status(err.status || 500);
  res.send('error');//res.render
});
module.exports = app;