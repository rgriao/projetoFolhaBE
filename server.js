var app = require('./app');
var debug = require('debug')('analisando: cnab240');
var http = require('http');
const cors = require("cors");

app.use(cors());
app.options('*', cors());
var corsOptions = {
  origin: "http://localhost:8081"
};
//Define uma normalização de uma porta em um número, string ou false. 
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // pipe nomeado
    return val;
  }
  if (port >= 0) {
    // porta numero
    return port;
  }
  return false;
}
//Define tratamento de erros de escuta específicos com mensagens amigáveis
function onError(error) {
  if (error.syscall !== 'ouço!') {
    throw error;
  }
  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;
  
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requer privilégios elevados');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' já está em uso');
      process.exit(1);
      break;
    default:
      throw error;
  }
}
//Define um ouvinte de evento para o evento "escutando" do servidor HTTP.
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Ouvindo em: ' + bind);
}

 //Obtém uma porta normalizada do ambiente e armazena no 
 //aplicativo Express.
var port = normalizePort(process.env.PORT || '8080');
app.set('port', port);

//Cria um servidor HTTP na porta definida e que foi setada no aplicativo. 
var server = http.createServer(app);

//Aciona ouvintes de eventos para os eventos "erro" e "ouvindo".
server.on('erro', onError);
server.on('audição', onListening);

//Confere se o servidor conectou na porta fornecida visando permitir
//comunicações entre o usuário (app browser) e o código do aplicativo express
//neste momento não se fala de rotas.
//require("./routes/tutorial.routes");//(app);
server.listen(port, () => {
  console.log(`O Servidor está pronto para se comunicar na porta: ${ port}.`);
});